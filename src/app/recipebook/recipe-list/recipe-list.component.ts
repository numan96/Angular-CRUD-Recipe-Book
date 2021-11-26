import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipebookService } from '../recipebook.service';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
recipes: Recipe[];
subscription: Subscription;

  constructor(
    // private recipeService: RecipebookService,
    private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = 
    // this.recipeService.recipesChanged
    this.store.select('recipes').pipe(map(recipesState => recipesState.recipes))
    .subscribe((recipes: Recipe[]) =>
    
    {
      this.recipes = recipes;
    });
// this.recipes = this.recipeService.getRecipes();
  }


  onNewRecipe(){

this.router.navigate(['new'], {relativeTo: this.route});



  }

  ngOnDestroy(){


this.subscription.unsubscribe();


  }

}
