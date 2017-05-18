import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 
    'http://cdn2.stylecraze.com/wp-content/uploads/2014/08/Top-15-Yummy-Indian-Breakfast-Recipes-For-Your-Kids1.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 
    'http://cdn2.stylecraze.com/wp-content/uploads/2014/08/Top-15-Yummy-Indian-Breakfast-Recipes-For-Your-Kids1.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
