import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message/message.service';
import {SlideInOutAnimation} from '../../animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  animations: [SlideInOutAnimation]
})
export class MessagesComponent implements OnInit {
  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  deleteMessage(message) {
    this.messageService.deleteMessage(message);
  }
}
