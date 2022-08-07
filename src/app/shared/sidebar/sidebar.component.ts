import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() SideNavToggle = new EventEmitter();  
  panelOpenState = false;

  constructor(private router : Router) { }

  ShowtypeValue:boolean=false;

  ngOnInit(): void {
    jQuery(document).ready(function(){
      jQuery('#slide').click(function(){
        jQuery('#box').toggle(1000);
        
    });
    });
  }

  openSidenav() {
    this.SideNavToggle.emit();
   
 }
 openNav()
 {
   if(this.ShowtypeValue == false)
   {
    {
      this.ShowtypeValue = true;
      document.getElementById("mySidenav")!.style.width = "250px";
      document.getElementById("main")!.style.marginLeft = "250px";
    }
   }
   else{
    this.ShowtypeValue = false;
    document.getElementById("mySidenav")!.style.width = "0";
    document.getElementById("main")!.style.marginLeft= "0";
   }
  
 
}
Home()
{
  this.router.navigate(['home']);
}

SaleInvoice()
{
  this.router.navigate(['saleInvoice']);
}
  

}
