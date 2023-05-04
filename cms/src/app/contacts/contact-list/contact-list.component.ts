import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact( 1, 'Lola Gershum', 'lgw@gmail.com', '801-123-5589' , '../../assets/images/barzeer.jpg', []),
    new Contact( 2, 'June Johanson', 'jjo@gmail.com', '801-123-7849' , '../../assets/images/jacksonk.jpg', [])  
  ];

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
  construction() {}

  ngOnInit() {
  }

}