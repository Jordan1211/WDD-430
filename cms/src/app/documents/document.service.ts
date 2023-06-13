import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();  

  constructor(private http: HttpClient) { 
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http
      .get<Document[]>(
        'https://wdd430-cms-522ba-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        (documents: Document[]) => {
          // success method
          this.documents = documents.sort((a, b) => a.name.localeCompare(b.name));
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  
    return this.documents.slice(); // or an initial value if documents haven't been fetched yet
  }

  storeDocuments() {
    const documents = JSON.stringify(this.documents);
    this.http
      .put('https://wdd430-cms-522ba-default-rtdb.firebaseio.com/documents.json', documents,
        {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
      )
      .subscribe((response) => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
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
    if (!newDocument) {
      return;
   }

    this.maxDocumentId++
    newDocument.id = String(this.maxDocumentId)
    this.documents.push(newDocument)
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
   }

   const pos = this.documents.indexOf(originalDocument);
   if (pos < 0) {
      return;
   }

    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    this.storeDocuments();
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
    this.storeDocuments();
  }

}
