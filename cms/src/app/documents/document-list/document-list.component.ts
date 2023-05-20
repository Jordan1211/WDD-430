import { Component, Injectable, OnInit} from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

@Injectable()
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

constructor(private documentService: DocumentService) {}

ngOnInit() {
  this.documents = this.documentService.getDocuments()
}

onSelected(document: Document[]) {
  this.documentService.documentSelectedEvent.emit(document);
}

}
