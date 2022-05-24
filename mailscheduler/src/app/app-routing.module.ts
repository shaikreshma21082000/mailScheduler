import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogCompComponent } from './dialog-comp/dialog-comp.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MailComponent } from './mail/mail.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticateGuard } from './services/authenticate.guard';

const routes: Routes = [
  {
    path: "accounts",
    component:HeaderComponent,
    children:[
      { 
        path: '',
       component:LoginComponent},
      { 
        path: "login",
       component:LoginComponent},
      { 
        path: "register",
       component:RegisterComponent},
       {
        path:"new",
        component:DialogCompComponent
       }
     
      ]
  },
  {
    path:"",
    canActivate:[AuthenticateGuard],
    component:MailComponent
  },
    {
      path:"mail",
      redirectTo: "",
      pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
