import { EventEmitter, Injectable } from '@angular/core';
import { Blogpost } from './blog.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogposts: Blogpost[] = [];
  blogListChangedEvent = new Subject<Blogpost[]>();
  maxDocumentId: number;

  blogSelectedEvent = new EventEmitter<Blogpost[]>();
  blogChangedEvent = new EventEmitter<Blogpost[]>();  

  constructor(private http: HttpClient) { 
    this.maxDocumentId = this.getMaxId();
  }

  getBlogposts(): Blogpost[] {
    this.http.get<{ message: string, blogposts: Blogpost[] }>('http://localhost:3000/blogposts')
      .subscribe(
        (responseData) => {
          this.blogposts = responseData.blogposts;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  
    return this.blogposts.slice();
  }

  getBlogpost(id) {
    return this.http.get<{ message: string, blogpost: Blogpost}>('http://localhost:3000/blogposts/'+ id)
   }

   getMaxId(): number {

    let maxId = 0;

    if (Array.isArray(this.blogposts)) {
      for (const blogpost of this.blogposts) {
        let currentId = parseInt(blogpost.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
    }

    return maxId
  }
  
  addBlogpost(blogpost: Blogpost) {
    if (!blogpost) {
      return;
    }

    blogpost.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, blogpost: Blogpost }>('http://localhost:3000/blogposts',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.blogposts.push(responseData.blogpost);
          this.sortAndSend();
        }
      );
  }

  updateBlogpost(originalBlogpost: Blogpost, newBlogpost: Blogpost) {
    if (!originalBlogpost || !newBlogpost) {
      return;
    }

    const pos = this.blogposts.findIndex(d => d.id === originalBlogpost.id);

    if (pos < 0) {
      return;
    }

    newBlogpost.id = originalBlogpost.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/blogposts/' + originalBlogpost.id,
    newBlogpost, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.blogposts[pos] = newBlogpost;
          this.sortAndSend();
        }
      );
  }

  deleteBlogpost(blogpost: Blogpost) {

    if (!blogpost) {
      return;
    }

    const pos = this.blogposts.findIndex(d => d.id === blogpost.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/blogposts/' + blogpost.id)
      .subscribe(
        (response: Response) => {
          this.blogposts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    this.blogposts.sort((a, b) => a.title > b.title ? 1 : b.title > a.title ? -1 : 0);
    this.blogListChangedEvent.next(this.blogposts.slice());
  }

}
