import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { BookNewComponent } from './components/books/book-new/book-new.component';
import { NewAuthorComponent } from './components/authors/new-author/new-author.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthorsComponent } from './components/authors/authors.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/books' },
  { path: 'books', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent },

  { path: 'authors/new', component: NewAuthorComponent },

  { path: 'books/new', component: BookNewComponent },

  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'user', component: AuthComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
