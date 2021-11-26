import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shoppinglist/shoppinglist.service';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shoppinglist/store/shoppinglist.actions';
import * as fromApp from 'src/app/store/app.reducer';


@Injectable({
  providedIn: 'root'
})
export class RecipebookService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [

  //   new Recipe('1','KFC Zinger Burger',
  //   'a spicy KFC zinger!',
  //   'https://cdn-anmik.nitrocdn.com/kQDttHBvkmdpAiIYLaxVOothBahVPiXD/assets/static/source/rev-da60ee6/wp-content/uploads/2020/08/kfc-zinger-burger.jpg',
  //   [

  //     new Ingredient('Chicken Meat', 1),
  //     new Ingredient('Buns', 2)
  //   ]),
  //   new Recipe('2','Beef Burrito', 
  //   'a tasty beef burrito, yum!', 
  //   'https://www.wearesovegan.com/wp-content/uploads/2019/10/veganindianchickpeatikkaburrito-h1-1170x1645.jpg', 
  //   [
  //     new Ingredient('Beef Meat', 1),
  //     new Ingredient('Peppers', 1),
  //     new Ingredient('Onions', 1)
  //   ])
  //   ];
private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }



    getRecipes() {

return this.recipes.slice();

    }

getRecipe(index: number) {

return this.recipes[index];


}

addIngredientsToShoppingList(ingredients: Ingredient[]){
  // this.slService.addIngredients(ingredients);
  this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
}


addRecipe(recipe: Recipe) {

this.recipes.push(recipe);
this.recipesChanged.next(this.recipes.slice());
}


updateRecipe(index: number, newRecipe: Recipe) {

this.recipes[index] = newRecipe;
this.recipesChanged.next(this.recipes.slice());
}


deleteRecipe(index: number){


  this.recipes.splice(index, 1);
  this.recipesChanged.next(this.recipes.slice());
}


  constructor(private slService: ShoppinglistService,  private store: Store<fromApp.AppState>) { }
}
