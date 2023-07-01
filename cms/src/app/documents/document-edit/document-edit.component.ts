import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  originalDocument: Document;
  document: Document;
  id: string;
  editMode: boolean = false;
  submitted = false;
  
  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = !!this.id;

      if (this.editMode) {
        this.documentService.getDocument(this.id).subscribe(documentData => {
          this.originalDocument = documentData.document;

          if (this.originalDocument) {
            this.document = JSON.parse(JSON.stringify(this.originalDocument));
          }
        });
      }
    });
  }
  
  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document(
      value.id, 
      value.name,
      value.url, 
      value.description,
      value.children
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }
}