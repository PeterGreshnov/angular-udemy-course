import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Cookies', 'A nice and easy way to bake some Cookies', 'https://ih1.redbubble.net/avatar.2847441.140x140.jpg'),
    new Recipe('Burgers', 'Beef burger! Yummy!', 'https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
