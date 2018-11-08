import {Component, OnInit} from '@angular/core';
import {WebworkToCanvasService} from '../../services/webwork-to-canvas/webwork-to-canvas.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MessageService} from '../../services/message/message.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SlideInOutAnimation} from '../../animations';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
  animations: [SlideInOutAnimation],
})
export class ColumnsComponent implements OnInit {
  constructor(private webworkToCanvasService: WebworkToCanvasService,
              private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService) {
  }

  public columnForm = this.fb.group({
    canvasColumn: [''],
    webworkColumn: [''],
    crns: ['']
  });

  public canvasColumns;
  public webworkColumns;
  public crnList;

  ngOnInit() {
    if (!this.webworkToCanvasService.done()) {
      this.router.navigateByUrl('/');
    } else {
      this.canvasColumns = this.webworkToCanvasService.canvasColumns;
      this.webworkColumns = this.webworkToCanvasService.webworkColumns;
      this.crnList = this.webworkToCanvasService.getCRNList();

      // select all of the crn's by default
      this.columnForm.controls['crns'].setValue(this.crnList);
    }
  }

  submitForm() {
    const canvasColumn = this.columnForm.get('canvasColumn').value;
    const webworkColumn = this.columnForm.get('webworkColumn').value;
    const crns = this.columnForm.get('crns').value;

    if (canvasColumn != '' && webworkColumn != '' && crns != '') {
      const csv = this.webworkToCanvasService.generateCSV(canvasColumn, webworkColumn, crns);

      // download the csv file
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
      element.setAttribute('download', 'w2c_' + this.webworkToCanvasService.canvasFilename);

      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      // send a message if we did something bad
      this.messageService.addMessageIfNew(`<strong>Your submission was invalid.</strong> Make sure you select at least one CRN.`);
    }
  }

  restart() {
    this.router.navigateByUrl('/');
  }
}
