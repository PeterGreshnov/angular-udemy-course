import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() currentPage = new EventEmitter<string>();

  collapsed = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  onShoppinglistClick(){
    this.currentPage.emit('shoppingList');
  }

  onRecipiesClick(){
    this.currentPage.emit('recipies');
  }

}
