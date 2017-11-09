import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: Ingredient[];
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService,
             private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredients();

    // select 意思
    // private stroe: Store<{shoppingList: {ingredients: Ingredient[]}]>
    // 获取{ingredients: Ingredient[]}
    this.shoppingListState = this.store.select('shoppingList');

    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // })
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
