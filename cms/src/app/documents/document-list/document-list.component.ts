import { Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

@Injectable()
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  documentId: string = '';
  private subscription: Subscription;

constructor(private documentService: DocumentService) {
  this.documents = this.documentService.getDocuments()
}

ngOnInit() {
  this.documents = this.documentService.getDocuments();
  this.subscription = this.documentService.documentListChangedEvent
  .subscribe(
    (documentsList : Document[]) => {
      this.documents = documentsList;
    }
  )
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
