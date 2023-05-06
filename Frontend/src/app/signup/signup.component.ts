import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  signupStatus:any
  msg:any

  constructor(private router: Router,private fb:FormBuilder, private book:SerService){}

  data: any = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.minLength(6)])
  })

  ngOnInit(): void {
  }


  signupfunction(data:any){
    console.log("frontend", data.value);

    this.book.signup(data.value).subscribe(res =>{
      console.log(res);

      if(this.signupStatus.status == '1'){
        console.log("signup success");
        this.router.navigateByUrl('home')
        
      }
      else if(this.signupStatus.status == '2'){
        this.msg = 'Enter required details'
      }
      else{
        console.log("signup failed");
        this.msg = 'Email ID already exists'
      }
      
    })
    
  }
  

}
