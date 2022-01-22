import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipebookService {
  private _recipes: Recipe[] = [];

  public getRecipes() {
    return this._recipes.slice();
  }

  constructor() {}
}
