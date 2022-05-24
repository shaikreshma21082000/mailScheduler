import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GetPostService } from './get-post.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  constructor(private getPost:GetPostService,private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("entered in method of auth guard.state.url",state.url);
    if(state.url=='/')
      return this.userLogin(state.url);;
    return true;
  }
  
  userLogin(url:string){
    console.log(url);
    if(this.getPost.login)
      return this.getPost.login;
    this.getPost.redirectUrl =url;
    return this.route.parseUrl('/accounts/login');
  }  
}
