import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
  new Document( 1, 'MARVEL - Rocket Racoon', 'This is a test document. Just needs to be a little bit longer to match the assignment.' , 'www.google.com', []),
  new Document( 2, 'MARVEL - Star Lord', 'This is a test document. Just needs to be a little bit longer to match the assignment.' , 'www.marvel.com', []),
  new Document( 3, 'MARVEL - Peter Parker', 'This is a test document. Just needs to be a little bit longer to match the assignment.' , 'www.twitter.com', []),  
  new Document( 4, 'MARVEL - Miles Morales', 'Yet another test document. Just needs to be a little bit longer to match the assignment.' , 'www.disney.com', []),
  new Document( 5, 'MARVEL - Wand Vision', 'Another one (DJ Khaled Voice). Just needs to be a little bit longer to match the assignment.' , 'www.facebook.com', [])    
 ];

onSelected(document: Document) {
  this.selectedDocumentEvent.emit(document);
}
construction() {}

ngOnInit() {
}

}
