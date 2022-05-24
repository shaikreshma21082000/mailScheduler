import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { GetPostService } from '../services/get-post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private getpost:GetPostService ) { }
  hide=true;
  

  ngOnInit(): void {
  }
  loginForm=new FormGroup({
  emailFormControl:new FormControl('', [Validators.required, Validators.email]),
  passwordFormControl:new FormControl('', [Validators.required])
  })

  login(){
    console.log(this.loginForm.value);
    this.getpost.loginEmail=this.loginForm.controls['emailFormControl'].value;
    this.getpost.LoginUser(this.loginForm.value);
    this.getpost.getAccount();
    
  }
  
}
