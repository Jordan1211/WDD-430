import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();  

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id)
   }

   getMaxId(): number {

    let maxId = 0;

    this.documents.forEach(document => {
      if (parseInt(document.id) > maxId) {
        maxId = parseInt(document.id)
      } 
    });

    return maxId
  }
  
  addDocument(newDocument: Document) {
    if (!document) {
      return;
   }

    this.maxDocumentId++
    let newDocumentId = parseInt(newDocument.id)
    newDocumentId = this.maxDocumentId
    this.documents.push(newDocument)
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!document) {
      return;
   }

   const pos = this.documents.indexOf(originalDocument);
   if (pos < 0) {
      return;
   }

    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

}
