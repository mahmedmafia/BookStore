import { Component, OnInit } from '@angular/core';
import { Book, BookstoreService, Author, Genre } from 'src/app/services/bookstore.service';
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css']
})
export class BookNewComponent implements OnInit {
  book: Book;
  authors: Author[];
  genres: Genre[];
  images;
  bookForm: FormGroup;
  constructor(private bookStore: BookstoreService) {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      summary: new FormControl('', Validators.required),
      isbn: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      Image: new FormControl('', Validators.required),

      genresArray: new FormArray([new FormGroup({
        id: new FormControl('')
      })]),
    });

  }
  get genresArray(): FormArray {
    return this.bookForm.get('genresArray') as FormArray;
  }
  newGenre(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
    });
  }
  addGenres() {
    this.genresArray.push(this.newGenre());
  }
  removeGenre(i) {
    this.genresArray.removeAt(i);
  }
  ngOnInit() {
    this.bookStore.getAuthors().subscribe(autho => {
      this.authors = autho;
    });
    this.bookStore.getGenres().subscribe(genres => {
      this.genres = genres;
      console.log(this.genres);
    });

  }
  selectImage(event){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.images=file;
    }
  }
  AddBook() {
    const formData=new FormData();
    console.log(this.images);
    formData.append('file',this.images);
    let formGenres = [];
    for (const key of this.genresArray.value) {
      formGenres.push(key['id']);
    }
    const newBook = { ...this.bookForm.value, genre: formGenres };
    delete newBook.genresArray;
    delete newBook.Image;
    delete newBook.genre;
    console.log(newBook);
    for(const key in newBook){
        formData.append(key,newBook[key]);
    }
    formData.append('genre', JSON.stringify(formGenres));
  
    this.bookStore.addBook(formData);
  }
  discardgenre(e){

  }
  

}
