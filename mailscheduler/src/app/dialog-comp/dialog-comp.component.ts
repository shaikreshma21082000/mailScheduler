import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetPostService } from '../services/get-post.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  accountName:String;
  email:String;
  password:String;
  incomingServer:String;
  incomingServerPort:String;
  outgoingServer:String;
  outgoingServerPort:String;
}



@Component({
  selector: 'app-dialog-comp',
  templateUrl: './dialog-comp.component.html',
  styleUrls: ['./dialog-comp.component.css']
})
export class DialogCompComponent implements OnInit {

  
  constructor(private getPost:GetPostService,@Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    this.dialogForm=this.getPost.dialogForm;
  }

  ngOnInit(): void {
    console.log("inside dialod ng oninit"); 
  }

  dialogForm=new FormGroup({
    accountName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    incomingServer:new FormControl('',[Validators.required]),
    incomingServerPort:new FormControl('',[Validators.required]),
    outgoingServer:new FormControl('',[Validators.required]),
    outgoingServerPort:new FormControl('',[Validators.required])
  })
  
  saveaccount(){
    this.getPost.saveAccount(this.dialogForm.value); 
  }

delete(){

}
}
