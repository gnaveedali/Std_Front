import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private router : Router,private activateRouter : ActivatedRoute,private home:AppComponent) { }
 
  image3Url:string ="/assets/img/POS.jpg";
  rememberme: boolean = false;
  ngOnInit(): void {
    this.home.Authen= false;
  }

  Login()
  {
   
    this.home.Authen= true;
    this.router.navigate(['home']);
  }
  RememberMe(event:any)
  {

  }
}
