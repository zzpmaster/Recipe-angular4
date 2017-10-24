import { Component, OnInit, OnDestroy, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex = 0;
  editedItem: Ingredient;

  // @ViewChild('nameInput') nameInputRef: ElementRef;     //ViewChild 处理html中#xxx的
  // @ViewChild('amountInput') amountInputRef: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      })
    })
  }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    //const newIngredient = new Ingredient(
      // this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);

    // this.ingredientAdded.emit(newIngredient);
    // this.shoppingListService.addIngredient(newIngredient);

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  onClear() {
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
