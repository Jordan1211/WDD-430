import { Component, Injectable, OnInit, OnDestroy} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

@Injectable()
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contactList : Contact[]) => {
        this.contacts = contactList;
      }
    )
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  search(value: string) {

    this.term = value;
    
    }  

}