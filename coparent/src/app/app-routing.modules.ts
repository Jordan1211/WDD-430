import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from "./blog/blog.component";
import { BlogEditComponent } from "./blog/blog-edit/blog-edit.component";
import { BlogDetailComponent } from "./blog/blog-detail/blog-detail.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/blog', pathMatch: 'full'},
    { path: 'blog', component: BlogComponent, children: [
        { path: 'new', component: BlogEditComponent},
        { path: ':id', component: BlogDetailComponent},
        { path: ':id/edit', component: BlogEditComponent},
    ]}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}