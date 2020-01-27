import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { BookNewComponent } from './components/books/book-new/book-new.component';
import { NewAuthorComponent } from './components/authors/new-author/new-author.component';
import { AuthorDetailsComponent } from './components/authors/author-details/author-details.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { NavComponent } from './components/nav/nav.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorsComponent,
    BookDetailsComponent,
    BookNewComponent,
    NewAuthorComponent,
    AuthorDetailsComponent,
    AuthComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
