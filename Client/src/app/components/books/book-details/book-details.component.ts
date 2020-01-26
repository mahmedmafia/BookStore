import { Component, OnInit } from '@angular/core';
import { BookstoreService, Book } from 'src/app/services/bookstore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  id;
  book: Book;
  modelOpen = false;
  constructor(private bookStore: BookstoreService, private route: ActivatedRoute, private router: Router) {

    this.route.params.subscribe(param => { this.id = param['id'] });
  }

  ngOnInit() {
    this.bookStore.getBook(this.id).subscribe(res => {
      this.book = res;
      console.log(this.book);
    });
  }
  deleteBook() {
    this.bookStore.deleteBook(this.id).subscribe(res => {
      console.log(res);
      this.router.navigate(['/books']);
      this.modelOpen = false;

    });
  }

}
