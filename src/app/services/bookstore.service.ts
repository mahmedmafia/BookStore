import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookstoreService {
  BaseUrl = 'http://127.0.0.1:3000/';
  BooksUrl = this.BaseUrl + 'Books';
  AuthorsUrl = this.BaseUrl + 'Authors';
  GenresUrl = this.BaseUrl + 'genres';
  BooksChanged = new Subject<Book[]>();
  constructor(private http: HttpClient) { }
  mapBook(doc): Book {
    const LocalHostUrl = "http://localhost:3000/";
    let Image;
    if (!doc.Image) {
      Image = null;
    } else {
      Image = LocalHostUrl + doc.Image;
    }
    return {

      id: doc._id,
      title: doc.title,
      summary: doc.summary,
      author: doc.author,
      isbn: doc.isbn,
      genre: doc.genre,
      Image: Image,
    };
  }
  mapAuthor(doc) {
    const LocalHostUrl = "http://localhost:3000/";
    let Image;
    if (!doc.Image) {
      Image = null;
    } else {
      Image = LocalHostUrl + doc.Image;
    }
    return {

      id: doc._id,
      books: doc.books,
      first_name: doc.first_name,
      last_name: doc.last_name,
      date_of_birth: doc.date_of_birth,
      date_of_death: doc.date_of_death,
      Image: Image,
    };
  }
  mapAuthors(docs) {
    return docs.map(doc => {
      const LocalHostUrl = "http://localhost:3000/";
      let Image;
      if (!doc.Image) {
        Image = null;
      } else {
        Image = LocalHostUrl + doc.Image;
      }
      return {

        id: doc._id,
        books: doc.books,
        first_name: doc.first_name,
        last_name: doc.last_name,
        date_of_birth: doc.date_of_birth,
        date_of_death: doc.date_of_death,
        Image: Image,
      };
    });

  }
  mapBooks(docs): Book[] {
    return docs.map(doc => {
      const LocalHostUrl = "http://localhost:3000/";
      let Image;
      if (!doc.Image) {
        Image = null;
      } else {
        Image = LocalHostUrl + doc.Image;
      }
      return {

        id: doc._id,
        title: doc.title,
        summary: doc.summary,
        author: doc.author,
        isbn: doc.isbn,
        genre: doc.genre,
        Image: Image,
      };
    });
  }

  getBooks(query = '') {

    this.http.get<Book[]>(this.BooksUrl, { params: { title: query } })
      .pipe(map(docs => docs['books']), map(this.mapBooks)).subscribe(res => {
        this.BooksChanged.next(res);
      });
  }
  serachBooks(query) {
    console.log('seraching', query);
    this.getBooks(query);
  }
  getBook(id) {
    return this.http.get<Book>(this.BooksUrl + '/' + id).pipe(map(doc => doc['doc']), map(this.mapBook));
  }
  getAuthor(id) {
    return this.http.get<Author>(this.AuthorsUrl + '/' + id)
      .pipe(map(docs => docs['docs']), map(doc => {
        return {

          id: doc._id,
          books: doc.books,
          first_name: doc.first_name,
          last_name: doc.last_name,
          date_of_birth: doc.date_of_birth,
          date_of_death: doc.date_of_death,
        };

      }));
  }
  getAuthors() {
    return this.http.get<Author[]>(this.AuthorsUrl)
      .pipe(map(docs => docs['docs']), map(this.mapAuthors));

  }
  getGenres() {
    return this.http.get<Genre[]>(this.GenresUrl)
      .pipe(map(docs => docs['docs']), map(docs => {
        return docs.map(doc => {
          return {
            id: doc._id,
            name: doc.name
          };
        });

      }));
  }
  addBook(newBook) {
    this.http.post(this.BooksUrl, newBook).subscribe(res => {
      console.log(res);
    });
  }
  deleteBook(id) {
    return this.http.delete(this.BooksUrl + '/' + id);
  }
  addAuthor(newAuthor) {
    this.http.post(this.AuthorsUrl, newAuthor).subscribe(res => {
      console.log(res);
    }, (err) => {
      console.log(err.error.error.message)
    });
  }
}

export interface Book {
  id: String,
  title: String,
  author: Author,
  summary: String,
  isbn: String,
  genre?: Genre[],
  Image?: String,
}
export interface Genre {
  id: String,
  name: String,
}
export interface Author {
  id: String,
  date_of_birth: Date,
  date_of_death: Date,
  first_name: String,
  last_name: String,
  books: Book[],
  Image: String,
}