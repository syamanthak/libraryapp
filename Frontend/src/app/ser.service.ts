import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SerService {

  apiUrl:string =`api`
  // apiUrl:String = 'http://localhost:2003/api'

  constructor(private http:HttpClient) { }

  //signup
  signup(data:any){
    return this.http.post(`${this.apiUrl}/signup`,{data})
  }

  // login
  login(data:any){
    return this.http.post(`${this.apiUrl}/login`,{data})
  }


  // -------------------------Books-------------------------

   // getting all books
   getBooks(){
    return this.http.get(`${this.apiUrl}/book`)
  }

  
  // adding a new book
  addBook(data:any){
    return this.http.post(`${this.apiUrl}/book`,data)
  }

  // editing an existing book
  editBook(id:any, data:any){
    return this.http.put(`${this.apiUrl}/book/${id}`,{data,id})
  }

  // getting single book
  getSingleBook(id:any){
    return this.http.get(`${this.apiUrl}/book/${id}`)
  }

  // deleting a book
  deleteBook(id:any){
    return this.http.delete(`${this.apiUrl}/book/${id}`)
  }


}
