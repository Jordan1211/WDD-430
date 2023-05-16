import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[]= [
    new Message('4567', 'This is a test 1', 'John needs to talk to you after the meeting', 'John Doe'),
    new Message('8902', 'This is a test 2', 'This is really just for testing', 'Jane Doe'),
    new Message('9999', 'This is a test 3', 'Luke he is your father, listen to him!', 'Darth Vader')
  ]

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
