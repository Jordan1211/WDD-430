import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Blogpost } from '../../blog.model';

@Component({
  selector: 'cpa-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent {
  @Input() blogpost: Blogpost;
  @Output() blogSelected = new EventEmitter<void>();

  onSelected() {
    this.blogSelected.emit();
  }
}
