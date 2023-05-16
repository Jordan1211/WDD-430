import { Component, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender: string = 'Jordan Gresham'
  @ViewChild('subject', {static: true}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: true}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    const messageSubject = this.subjectRef.nativeElement.value;
    const messageText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message ('1234', messageSubject, messageText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';

  }
}
