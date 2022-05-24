import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetPostService } from '../services/get-post.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private getPost:GetPostService) { }
  hide1=true;
  hide2=true;
  ngOnInit(): void {
  }

  registerForm=new FormGroup({
    emailFormControl:new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl:new FormControl('', [Validators.required]),
    ConfirmpasswordFormControl:new FormControl('',[Validators.required])
    })
    register(){
      console.log(this.registerForm.value);
      this.getPost.registerUser(this.registerForm.value);
    }
}
