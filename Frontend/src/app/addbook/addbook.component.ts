import { Component, OnInit } from '@angular/core';
import { SerService } from '../ser.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  BookForm:any = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    summary: new FormControl('')
  })

  constructor(private bookservice:SerService, private router:Router){}
  ngOnInit(): void {
  }

  onSubmit(){
    let data = this.BookForm.value
    this.bookservice.addBook(data).subscribe(res =>{
      console.log(res)
      
      this.router.navigateByUrl('home')
    })

  }
  added(){
    
      alert('Refresh he page please')


  }

}
