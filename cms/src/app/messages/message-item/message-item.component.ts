import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})

@Injectable()
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {

    let sender: string;
if (typeof this.message.sender === 'string') {
  sender = this.message.sender; // handle the string case
} else {
  sender = this.message.sender.id; // handle the Contact case
}

    this.contactService.getContact(sender)
          .subscribe(contactData => {
            const contact: Contact = contactData.contact;

            this.messageSender = contact.name;
          });

  }
}
