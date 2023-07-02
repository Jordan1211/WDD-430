import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Blogpost } from '../blog.model';

@Component({
  selector: 'cpa-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit{
  @ViewChild('f') signupForm: NgForm;
  originalBlogpost: Blogpost;
  blogpost: Blogpost;
  id: string;
  editMode: boolean = false;
  submitted = false;
  
  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = !!this.id;

      if (this.editMode) {
        this.blogService.getBlogpost(this.id).subscribe(blogData => {
          this.originalBlogpost = blogData.blogpost;

          if (this.originalBlogpost) {
            this.blogpost = JSON.parse(JSON.stringify(this.originalBlogpost));
          }
        });
      }
    });
  }
  
  onSubmit(form: NgForm) {
    let value = form.value;
    let newBlogpost = new Blogpost(
      value.id, 
      value.title,
      value.imageUrl, 
      value.description,
      value.author
    );

    if (this.editMode) {
      this.blogService.updateBlogpost(this.originalBlogpost, newBlogpost);
    } else {
      this.blogService.addBlogpost(newBlogpost);
    }
    
    this.router.navigate(['/blogposts'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['/blogposts'], { relativeTo: this.route });
  }

}
