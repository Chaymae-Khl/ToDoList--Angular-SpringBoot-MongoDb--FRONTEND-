import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../Entities/user';
import { AuthService } from '../Services/authentication/auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-sign-up',
  templateUrl: './sign-in-sign-up.component.html',
  styleUrls: ['./sign-in-sign-up.component.css']
})
export class SignInSignUpComponent {
  user=new User;
  registerForm: any;
  constructor(private http:HttpClient,private authService:AuthService,private router: Router){}
  message:any;

  onSubmit(form:NgForm){

    const username = form.value.username;
    const password = form.value.password;
    this.http.post('http://localhost:8089/authentication/login',{
        username: username,
        password:password,
       
    }).subscribe((res:any)=>{
     console.log(res);
     localStorage.setItem('sessionId',res.message);
     this.router.navigate(['/list-page']);
    }, 
    err=>{
        console.log(err);
       this.message="Mots de pass ou login Incorrecte";
    });
}




  signupUser(){
    // console.log(this.user);
    this.authService.signUp(this.user).subscribe(res =>{
        console.log("success");
         this.onLoginClick();
    })
   
        
}





  // form Animations
  onSignupClick(): void {
    const loginForm = document.querySelector("form.login") as HTMLElement;
    const loginText = document.querySelector(".title-text .login") as HTMLElement;
    if (loginForm && loginText) {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    }
  }

  onLoginClick(): void {
    const loginForm = document.querySelector("form.login") as HTMLElement;
    const loginText = document.querySelector(".title-text .login") as HTMLElement;
    if (loginForm && loginText) {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    }
  }

  onSignupLinkClick(event: Event): void {
    event.preventDefault();
    const signupBtn = document.querySelector("label.signup") as HTMLElement;
    if (signupBtn) {
      signupBtn.click();
    }
  }
}
