import { Component, OnInit } from '@angular/core';
import {WebworkToCanvasService} from '../../services/webwork-to-canvas/webwork-to-canvas.service';
import {Router} from '@angular/router';
import {Papa} from 'ngx-papaparse';
import {MessageService} from '../../services/message/message.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SlideInOutAnimation} from '../../animations';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: [],
  animations: [SlideInOutAnimation]
})

export class SelectComponent implements OnInit {
  constructor(private webworkToCanvasService : WebworkToCanvasService,
              private router: Router,
              private papa: Papa,
              private messageService: MessageService) { }

  ngOnInit() {
    this.webworkToCanvasService.clear();
  }

  public handleWebworkInput = (file: File) => {
    this.papa.parse(file,{
      complete: (result) => {
        this.webworkToCanvasService.setWebworkData(result.data);
      }
    });
  };

  public handleCanvasInput = (file: File) => {
    this.papa.parse(file,{
      complete: (result) => {
        this.webworkToCanvasService.setCanvasData(result.data);
        this.webworkToCanvasService.canvasFilename = file.name;
      }
    });
  };

  submitForm(): void {
    if (this.webworkToCanvasService.done()) {
      this.router.navigate(['/columns']);
    } else {
      // invalid submission - show a message
      this.messageService.addMessageIfNew('<strong>Your submission was invalid.</strong> Both files are required.');
    }
  }
}
