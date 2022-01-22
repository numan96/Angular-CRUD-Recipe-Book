import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shoppinglist/store/shoppinglist.actions';

import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  public recipeDetail: Recipe;
  private _id: number;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this._route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this._id = id;
          return this._store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find((recipeDetail, index) => {
            return index === this._id;
          });
        })
      )

      .subscribe((recipe) => {
        this.recipeDetail = recipe;
      });
  }

  public addToList() {
    this._store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipeDetail.ingredients)
    );
  }

  public onEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._route });
  }

  public onDeleteRecipe() {
    this._store.dispatch(new RecipesActions.DeleteRecipe(this._id));

    this._router.navigate(['/recipes']);
  }
}
