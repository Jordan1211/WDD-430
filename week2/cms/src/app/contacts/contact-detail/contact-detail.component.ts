import { Component } from '@angular/core';
import { Contact } from '../contact-list/contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  contact= 
    new Contact( 1, 'Lola Gershum', 'lgw@gmail.com', '801-123-5589' , '../../assets/images/barzeer.jpg', [])
}
