import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  contactSelectedEvent = new EventEmitter<Contact[]>();  
  contactChangedEvent = new EventEmitter<Contact[]>();  

  constructor(private http: HttpClient) { 
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    this.http
      .get<Contact[]>(
        'https://wdd430-cms-522ba-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe(
        (contacts: Contact[]) => {
          // success method
          this.contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  
    return this.contacts.slice(); // or an initial value if documents haven't been fetched yet
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts);
    this.http
    .put('https://wdd430-cms-522ba-default-rtdb.firebaseio.com/contacts.json', contacts,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    )
    .subscribe((response) => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id)
   }
   
   getMaxId(): number {

    let maxId = 0;
    this.contacts.forEach(contact => {
      if (parseInt(contact.id) > maxId) {
        maxId = parseInt(contact.id)
      } 
    });

    return maxId
  }

 addContact(newContact: Contact) {
  if (!newContact) {
    return;
 }

  this.maxContactId++
  newContact.id = String(this.maxContactId)
  this.contacts.push(newContact)
  this.storeContacts();
}

updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    return;
 }

 const pos = this.contacts.indexOf(originalContact);
 if (pos < 0) {
    return;
 }

  newContact.id = originalContact.id
  this.contacts[pos] = newContact
  this.storeContacts();
}

deleteContact(contact: Contact) {
  if (!contact) {
     return;
  }
  const pos = this.contacts.indexOf(contact);
  if (pos < 0) {
     return;
  }
  this.contacts.splice(pos, 1);
  this.storeContacts();
}

}
