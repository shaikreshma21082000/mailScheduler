import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCompComponent } from '../dialog-comp/dialog-comp.component';

@Injectable({
  providedIn: 'root'
})
export class GetPostService {
  accounts:any=[];
  filteredAccounts:any=[];
  notFilteredmail:any=[];
  mail:any=[];
  login:boolean=false;
  redirectUrl:string="";
  loginEmail='';
  count:any;
  mailcount:any;
  email:any=[];
  dialogAccount: any;
  Lastmail: any=[];
  clickedMailId:any;
  clickedMail:any;
  clickedDialogId:any;
  clickedDialogMail:any;
  constructor(private http:HttpClient,public dialog:MatDialog) {
    this.count=0;
    this.mailcount=0;
   }
  
 

  registerUser(data:any){
    console.log(data,"register");
    this.http.post('http://localhost:3000/register',data).subscribe(
      (data)=>{console.log(data);},
      (err)=>{console.log(err);
        alert("ERROR!! Not Registered");},
      ()=>{alert("Registered Successfully");}
    )
  }

  LoginUser(data:any){
    console.log(data,"login"); 
    this.login=true;
    this.http.post('http://localhost:3000/authenticate',data).subscribe(
      (data)=>{console.log(data);},
      (err)=>{console.log(err);},
      ()=>{console.log("Login Successfully");}
    )
  }

saveAccount(data:any){
  this.http.post('http://localhost:3001/mail-configurations',data).subscribe(
    (data)=>{console.log(data);
       },
    (err)=>{console.log(err);},
    ()=>{console.log("saved Successfully");
                     this.getAccount(); });   
}

getAccount(){
  var loginAccountName:any=this.loginEmail.split("@");
  var arrayAccountName:any=[];
  this.http.get('http://localhost:3001/mail-configurations').subscribe(
    (data)=>{console.log(data,"getAccounts");
          this.accounts=data;
        if(this.count==0){
          for(var i=0;i<this.accounts.length;i++){
            arrayAccountName=this.accounts[i].email.split("@");
            if(arrayAccountName[0]==loginAccountName[0])
                this.filteredAccounts.push(this.accounts[i]);
            }
            this.count++;
        }
        else{
              this.filteredAccounts.push(this.accounts[this.accounts.length-1]);
              console.log("lastacc",this.filteredAccounts); 
            }
            },
    (err)=>{console.log(err)},
    ()=>{console.log("data emitted completely");}
  )
}

savemail(data:any){
  this.http.post('http://localhost:3001/emails',data).subscribe(
    (data)=>{console.log("inside save mail after posting",data);},
    (err)=>{console.log(err);},
    ()=>{console.log("saved Successfully");
   this.accountClicked(data.cc); })    
}

accountClicked(mail:any){
  this.notFilteredmail=[];
  this.mail=[];
  return this.http.get('http://localhost:3001/emails').subscribe(
    (data)=>{console.log(data)
              this.notFilteredmail=data; 
              for(var i=0;i<this.notFilteredmail.length;i++){
                  if(this.notFilteredmail[i].cc==mail)
                     this.mail.push(this.notFilteredmail[i]);
              }
              console.log(this.mail);
            },
    (err)=>{console.log(err)},
    ()=>{console.log("data emitted completely");}
  )
}


  accountName?:any='';
  emails?:any='';
  password?:any='';
  incomingServer?:any='';
  incomingServerPort?:any='';
  outgoingServer?:any='';
  outgoingServerPort?:any='';
  dialogForm:any;

  
populateDialogForm(){
 this.dialogForm=new FormGroup({
    accountName:new FormControl(this.accountName,[Validators.required]),
    email:new FormControl(this.emails,[Validators.required]),
    password:new FormControl(this.password,[Validators.required]),
    incomingServer:new FormControl(this.incomingServer,[Validators.required]),
    incomingServerPort:new FormControl(this.incomingServerPort,[Validators.required]),
    outgoingServer:new FormControl(this.outgoingServer,[Validators.required]),
    outgoingServerPort:new FormControl(this.outgoingServerPort,[Validators.required])
})
}
}