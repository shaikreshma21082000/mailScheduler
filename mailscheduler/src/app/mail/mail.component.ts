import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCompComponent } from '../dialog-comp/dialog-comp.component';
import { GetPostService } from '../services/get-post.service';



@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  accId: any;
  acc:any={};
  constructor(public dialog:MatDialog,private getPost:GetPostService,private http:HttpClient) {
    console.log("inside constructor");
    this.accounts=this.getPost.filteredAccounts;
  }
  accounts:any;
  showaccount="";
  mails:any=[];
  ngOnInit(): void {   
    console.log("ng oninit is called") ;
  }
 
openDialog(){
  this.getPost.dialogForm=new FormGroup({
    accountName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    incomingServer:new FormControl('',[Validators.required]),
    incomingServerPort:new FormControl('',[Validators.required]),
    outgoingServer:new FormControl('',[Validators.required]),
    outgoingServerPort:new FormControl('',[Validators.required])
  })
    this.dialog.open(DialogCompComponent,{
      disableClose:true
    }).afterClosed().subscribe(res=>{
        console.log(res);
        
})
}

populateDialogForm(){
  console.log("inside the populate dialog form");
  this.getPost.populateDialogForm();
  this.dialog.open(DialogCompComponent);
}


showAcc(acc:any){
  this.showaccount=acc.accountName;
  this.accId=acc.id;
  console.log("account is clicked",this.showaccount);
  this.getPost.accountClicked(acc.email);
  this.mails=this.getPost.mail;
  this.getPost.accountName=acc.accountName;
  this.getPost.emails=acc.email;
  this.getPost.password=acc.password;
  this.getPost.incomingServer=acc.incomingServer;
  this.getPost.incomingServerPort=acc.incomingServerPort;
  this.getPost.outgoingServer=acc.outgoingServer;
  this.getPost.outgoingServerPort=acc.outgoingServerPort;
  this.getPost.clickedDialogId=acc.id;
  this.getPost.clickedDialogMail=acc.email;
  console.log("values are initialised");
  console.log(this.getPost.accountName);
  
}

mailForm=new FormGroup({
  to:new FormControl('',[Validators.required]),
  cc:new FormControl('',[Validators.required]),
  bcc:new FormControl(''),
  subject:new FormControl('',[Validators.required]),
  body:new FormControl('',[Validators.required]),
  scheduledDate:new FormControl('',[Validators.required]),
  scheduledTime:new FormControl('',[Validators.required])
})

sendMailData(){
  var urlOfMail="http://localhost:3001/emails"+"/"+this.getPost.clickedMailId;
  this.http.delete(urlOfMail).subscribe(
  (data)=>{console.log("DELETED")},
  (err)=>{console.log(err);},
  ()=>{this.populateMailToEmpty();})

  this.getPost.savemail(this.mailForm.value);
  console.log(this.mailForm.value.cc,"cc");
  console.log(this.mails,"all mails aftersubmitting");
  setTimeout(()=>{
    this.populateMailToEmpty();
    this.mails=this.getPost.mail;},1000);
    this.getPost.clickedMailId="";
}

clearmail(){
  var urlOfMail="http://localhost:3001/emails"+"/"+this.getPost.clickedMailId;
  this.http.delete(urlOfMail).subscribe(
  (data)=>{console.log("DELETED")},
  (err)=>{console.log(err);},
  ()=>{
       console.log("inside complete method of clear mail")
       this.getPost.accountClicked(this.getPost.clickedMail);
       this.mails=this.getPost.mail;}
)
this.populateMailToEmpty();
this.getPost.clickedMail="";
this.getPost.clickedMailId="";
}


populateMail(mail:any){
  this.mailForm=new FormGroup({
    to:new FormControl(mail.to,[Validators.required]),
    cc:new FormControl(mail.cc,[Validators.required]),
    bcc:new FormControl(mail.bcc),
    subject:new FormControl(mail.subject,[Validators.required]),
    body:new FormControl(mail.body,[Validators.required]),
    scheduledDate:new FormControl(mail.scheduledDate,[Validators.required]),
    scheduledTime:new FormControl(mail.scheduledTime,[Validators.required])
  })
  this.getPost.clickedMailId=mail.id;
  this.getPost.clickedMail=mail.cc;
}
populateMailToEmpty(){
  this.mailForm=new FormGroup({
    to:new FormControl('',[Validators.required]),
    cc:new FormControl('',[Validators.required]),
    bcc:new FormControl(''),
    subject:new FormControl('',[Validators.required]),
    body:new FormControl('',[Validators.required]),
    scheduledDate:new FormControl('',[Validators.required]),
    scheduledTime:new FormControl('',[Validators.required])
})
}
}

