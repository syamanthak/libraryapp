import { Component, OnInit } from '@angular/core';
import { SerService } from '../ser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  data={
    email: '',
    password: ''
  }

  loginStatus:any
  msg:any

  constructor(private book:SerService, private router:Router) { }


  ngOnInit(): void {
  }

  loginFunction(data:any){
    // console.log(data)
    this.book.login(data).subscribe(res=>{
      console.log(res)
      this.loginStatus=res
      
      if(this.loginStatus.status == '1'){
        console.log('login success')
        this.router.navigateByUrl('library')
      }
      else if(this.loginStatus.status == '-1'){
        this.msg = 'Please enter credentials'
      }
      else if(this.loginStatus.status == '2'){
        this.msg = 'Your email or password is incorrect.'
      }
      else{ 
        console.log("login failed")
        this.msg = 'No account found with that email address!'
      }  
    })
  }

}
