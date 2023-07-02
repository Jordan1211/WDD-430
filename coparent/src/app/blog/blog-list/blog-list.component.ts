import { Component, Injectable, OnDestroy, OnInit} from '@angular/core';
// import { Document } from '../document.model';
import { Blogpost } from '../blog.model';
// import { DocumentService } from '../document.service';
import { BlogService } from '../blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cpa-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})

@Injectable()
export class BlogListComponent implements OnInit, OnDestroy {
  blogposts: Blogpost[] = [];
  blogId: string = '';
  private subscription: Subscription;

constructor(private blogService: BlogService) {
  this.blogposts = this.blogService.getBlogposts()
}

ngOnInit() {
  this.blogposts = this.blogService.getBlogposts();
  this.subscription = this.blogService.blogListChangedEvent
  .subscribe(
    (blogpostsList : Blogpost[]) => {
      this.blogposts = blogpostsList;
    }
  )
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
