import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';




@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  ingredientAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [

    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 1)
    
    
    ];

    getIngredient(index: number) {

return this.ingredients[index];

    }



    getIngredients(){

      return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){


      this.ingredients.push(ingredient);
     this.ingredientAdded.next(this.ingredients.slice());
        }


      addIngredients(ingredient: Ingredient[])  {

        this.ingredients.push(...ingredient);
        this.ingredientAdded.next(this.ingredients.slice());

      }

      updateIngredient(index: number, newIngredient: Ingredient) {

        this.ingredients[index] = newIngredient;
        this.ingredientAdded.next(this.ingredients.slice());
      }

deleteIngredient(index: number) {

this.ingredients.splice(index, 1);
this.ingredientAdded.next(this.ingredients.slice());
}
  constructor() { }
}
