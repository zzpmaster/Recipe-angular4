import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Store} from '@ngrx/store';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipes.model';

import * as RecipeActions from '../store/recipes.actions';
import * as fromRecipe from '../store/recipes.reducers';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              private recipesService: RecipesService, 
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipesService.getRecipe(this.id);
      this.store.select('recipes').take(1).subscribe((recipeState: fromRecipe.State) => {
        const recipe = recipeState.recipes[this.id];
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe.ingredients) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                Validators.required, , Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required, , Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
      })
    );
  }

  onSubmit() {
    const recipe = new Recipe(this.recipeForm.value['name'], 
      this.recipeForm.value['description'], 
      this.recipeForm.value['imagePath'], 
      this.recipeForm.value['ingredients']);
    if (this.editMode) {
      // this.recipesService.updateRecipe(this.id, recipe);
      this.store.dispatch(new RecipeActions.UpdateRecipes({
        index: this.id,
        recipe: recipe
      }));
    } else {
      // this.recipesService.addRecipe(recipe);
      this.store.dispatch(new RecipeActions.AddRecipes(recipe));
    }
    this.onCancel();
  }

  onCancel() {
    // this.router.navigate(['/recipes', this.id]);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
