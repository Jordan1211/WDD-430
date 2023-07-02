import { Component, OnInit } from '@angular/core';
// import { Document } from '../document.model';
import { Blogpost } from '../blog.model';
// import { DocumentService } from '../document.service';
import { BlogService } from '../blog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cpa-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit{
  blogpost: Blogpost;
  id: string;
  nativeWindow: any;

  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private router: Router,
              private windowRefService: WindRefService) {}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];


        this.blogService.getBlogpost(this.id)
          .subscribe(blogData => {
            this.blogpost = blogData.blogpost;
          });


      }
    )

    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onEditBlog() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView() {
    if (this.blogpost.imageUrl) {
      this.nativeWindow.open(this.blogpost.imageUrl);
    }
  }

  onDelete() {
    this.blogService.deleteBlogpost(this.blogpost);
    this.router.navigate(['/blog'], {relativeTo: this.route});
 }
}
