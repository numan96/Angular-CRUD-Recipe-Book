import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipebook/recipe.model';
import { RecipebookService } from '../recipebook/recipebook.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipebook/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipebookService, private store: Store<fromApp.AppState>
    // private authService: AuthService
    ) { }


  storeRecipes() {

const recipes = this.recipeService.getRecipes();

this.http.put('https://ng-course-recipe-book-4243a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {

console.log(response);

});

  }



  fetchRecipes() {
  return this.http.get<Recipe[]>('https://ng-course-recipe-book-4243a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
  )
  .pipe (
map(recipes => {

  return recipes.map(recipe => {
  
    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
  });
  }), tap(recipes => {
    // this.recipeService.setRecipes(recipes);
this.store.dispatch(new RecipesActions.SetRecipes(recipes));

  })
  );

  }
}
