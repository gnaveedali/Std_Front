import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.scss']
})
export class ItemDescriptionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
