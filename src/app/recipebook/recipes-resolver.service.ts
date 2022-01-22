import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from './recipe.model';
import { RecipebookService } from './recipebook.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipebook/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private _store: Store<fromApp.AppState>,
    private _actions$: Actions,
    private _recipesService: RecipebookService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this._recipesService.getRecipes();

    if (recipes.length === 0) {
      return this._store.select('recipes').pipe(
        take(1),
        map((recipesState) => {
          return recipesState.recipes;
        }),
        switchMap((recipes) => {
          if (recipes.length === 0) {
            this._store.dispatch(new RecipesActions.FetchRecipes());
            return this._actions$.pipe(
              ofType(RecipesActions.SET_RECIPES),
              take(1)
            );
          } else {
            return of(recipes);
          }
        })
      );
    } else {
      return recipes;
    }
  }
}
