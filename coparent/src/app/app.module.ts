import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeadersComponent } from './headers.component';
import { BlogComponent } from './blog/blog.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogItemComponent } from './blog/blog-list/blog-item/blog-item.component';
import { AppRoutingModule } from './app-routing.modules';
import { DropdownDirective } from './shared/dropdown.directive';
import { BlogService } from './blog/blog.service';
import { TruncatePipe } from './shared/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    BlogComponent,
    BlogEditComponent,
    BlogDetailComponent,
    BlogListComponent,
    BlogItemComponent,
    DropdownDirective,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
