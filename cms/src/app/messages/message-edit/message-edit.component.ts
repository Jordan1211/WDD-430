import { Component, ViewChild, Output, ElementRef, EventEmitter, OnInit, Injectable } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

@Injectable()
export class MessageEditComponent implements OnInit{
  currentSender = '648a099ce6047e4a841ad5c7';
  @ViewChild('subject', {static: true}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: true}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    
  }

  onSendMessage() {
    const messageSubject = this.subjectRef.nativeElement.value;
    const messageText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message ('19', messageSubject, messageText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';

  }

  
}
