import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerService } from '../ser.service';



@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  
  books:any;  // for storing all books

  constructor(private book: SerService, private router:Router) { }

  ngOnInit(): void {


    this.book.getBooks().subscribe(res=>{          // for getting all books
      this.books = res
      
      console.log(this.books)
    })

  }


  // editFunction(id:any){
  //   this.router.navigateByUrl(`edit/${id}`)
  //   console.log(id)
  // }

  // deleteFunction(id:any){
  //   this.book.deleteBook(id).subscribe(res=>{
  //     console.log(res)
  //     this.ngOnInit()
  //   })
  // }

  

}
