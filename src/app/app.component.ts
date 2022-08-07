import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  constructor(private router : Router,private activateRouter : ActivatedRoute) { }
  // login='True';
  Authen:boolean=false;

  title = 'Standard_Trading';

  ngOnInit(): void {

    // if(this.Authen ==false)
    // {
    //   this.router.navigate(['login']);
    // }
  }

  home()
  {
    
    if(this.Authen ==true)
    {
      this.router.navigate(['home']);
     }
     
    else{
      this.router.navigate(['login']);
      
    }
    }
    
}
