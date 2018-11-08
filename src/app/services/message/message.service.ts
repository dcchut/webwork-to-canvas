import { Injectable } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages = [];

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.clearMessages();
      }
    });
  }

  public addMessage(message: String) {
    this.messages.push({text: message});
  }

  public addMessageIfNew(message: String) {
    if (this.messages.filter(x => x.text === message).length == 0) {
      this.addMessage(message);
    }
  }

  public deleteMessage(message) {
    this.messages = this.messages.filter(x => x != message);
  }

  public clearMessages() {
    this.messages = [];
  }
}
