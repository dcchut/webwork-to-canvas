import {Injectable} from '@angular/core';
import {Papa} from 'ngx-papaparse';

@Injectable({
    providedIn: 'root'
})

export class WebworkToCanvasService {
    constructor(private papa: Papa) {}

    public canvasColumns = [];
    public webworkColumns = [];
    public canvasFilename = '';

    private canvasData = null;
    private webworkData = null;

    private canvasColumnIDMap = Object();
    private webworkColumnIDMap = Object();


    public setWebworkData(data) {
        this.webworkData = data;
        this.processWebworkColumns();
    }

    public setCanvasData(data) {
        this.canvasData = data;
        this.processCanvasColumns();
    }

    public clear() {
      this.canvasColumns = [];
      this.webworkColumns = [];
      this.canvasFilename = '';

      this.canvasData = null;
      this.webworkData = null;

      this.canvasColumnIDMap = Object();
      this.webworkColumnIDMap = Object();
    }

    public getCRNList() {
        const crnList = [];
        const data = this.canvasData;

        // compute the list of CRN's that appear in the file uploaded from canvas
        for (let i = 3, len = data.length; i < len; i++) {
            if (data[i].length <= 1) {
                continue;
            }
            // will only work until the year 9999
            let crn = data[i][4].match(/[0-9]{5}/);
            if (crn !== null) {
                crn = crn[0];
                if (!crnList.includes(crn)) {
                    crnList.push(crn);
                }

            }
        }
        return crnList;
    }

    public generateCSV(canvasColumn, webworkColumn, crns) {
        // get the column ID associated with this canvas column
        const canvasColumnId = this.canvasColumnIDMap[canvasColumn];
        const webworkColumnId = this.webworkColumnIDMap[webworkColumn];

        // start off by finding all students enrolled in a valid CRN
        const students = new Object();
        const studentIds = [];
        let data = this.canvasData;

        // process the data coming from canvas
        for (let i = 2, len = data.length; i < len; i++) {
            if (data[i].length <= 1) {
                continue;
            }

            let validStudent = false;

            for (let j = 0; j < crns.length; j++) {
                if (data[i][4].includes(crns[j])) {
                    validStudent = true;
                    continue;
                }
            }


            // if the student isn't in our list of CRNs or is the test student, continue on
            if (!validStudent || data[i][0].includes('Test Student')) {
                continue;
            }

            // otherwise keep track of the students id, and put their data into the students object
            var studentId = parseInt(data[i][2], 10);
            studentIds.push(studentId);

            // we store their previous score on this assignment, just in case
            students[studentId] = data[i].slice(0, 5).concat([data[i][canvasColumnId]]);
        }

        // now process the data coming from webwork
        data = this.webworkData;

        // now, transport their scores from webwork
        for (let i = 7, len = data.length; i < len; i++) {
            studentId = parseInt(data[i][0], 10);

            // if the student id wasn't in canvas, we ignore it
            if (!studentIds.includes(studentId)) {
                continue;
            }

            // otherwise update the students score with the data from webwork
            students[studentId][5] = data[i][webworkColumnId].trim();
        }

        // csv file for output
        let csvRows = [];
        csvRows.push(this.canvasData[0].slice(0, 5).concat([this.canvasData[0][canvasColumnId]]));
        csvRows.push(['    Points Possible', '', '', '', '', this.canvasData[1][canvasColumnId]]);

        // list all of the output rows in order
        for (let i = 0, len = studentIds.length; i < len; i++) {
            csvRows.push(students[studentIds[i]]);
        }

        // now generate CSV file
        return this.papa.unparse(csvRows);
    }

    // have we got both data for canvas & data for webwork?
    public done(): boolean {
        return (this.canvasData != null && this.webworkData != null);
    }

    private processCanvasColumns() {
        const data = this.canvasData;
        const canvasColumns = [];

        /* Compute the names of the canvas columns */
        for (let i = 5, len = data[0].length; i < len; i++) {
            const colName = data[0][i];
            if (!colName.includes('Current Points') && !colName.includes('Final Points')
                && !colName.includes('Current Score') && !colName.includes('Final Score')) {
                canvasColumns.push(colName);
                this.canvasColumnIDMap[colName] = i;
            }
        }
        this.canvasColumns = canvasColumns;
    }

    private processWebworkColumns() {
        const data = this.webworkData;
        const webworkColumns = [];

        /* Compute the names of the webwork columns */
        for (let i = 6, len = data[0].length; i < len; i++) {
            webworkColumns.push(data[1][i]);
            this.webworkColumnIDMap[data[1][i]] = i;
        }
        this.webworkColumns = webworkColumns;
    }
}
