import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ShoppinglistService } from 'src/app/shoppinglist/shoppinglist.service';
import { Recipe } from '../recipe.model';
import { RecipebookService } from '../recipebook.service';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shoppinglist/store/shoppinglist.actions';

import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipeDetail: Recipe;
id: number;

  constructor(private shoppingService: ShoppinglistService,
    private recipeService: RecipebookService,
    private route: ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }),
    map(recipesState => {
      return recipesState.recipes.find((recipeDetail, index) => {
    return index === this.id;
      });
    }))
// this.recipeDetail = this.recipeService.getRecipe(this.id);
.subscribe(recipe => {
  this.recipeDetail = recipe;
});
  }

  addToList(){
this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetail.ingredients));

  //  this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
  }


  onEditRecipe(){

this.router.navigate(['edit'], {relativeTo: this.route});
//this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});

  }

  onDeleteRecipe(){

// this.recipeService.deleteRecipe(this.id);
this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));

this.router.navigate(['/recipes']);

  }

}
