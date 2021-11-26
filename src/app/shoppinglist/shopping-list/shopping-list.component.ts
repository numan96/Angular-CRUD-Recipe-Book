import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shoppinglist.service';
import * as fromApp from 'src/app/store/app.reducer'
import * as ShoppingListActions from '../store/shoppinglist.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
ingredients: Observable<{ ingredients: Ingredient[] }>;

private subscription: Subscription;

  constructor(
    private shoppingService: ShoppinglistService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.ingredients =  this.store.select('shoppingList');
//  this.ingredients = this.shoppingService.getIngredients();

//  this.subscription = this.shoppingService.ingredientAdded.subscribe(

// (list: Ingredient[]) => {

// this.ingredients = list; }

// );
 
  }

  onEditIngredient(index: number){

// this.shoppingService.startedEditing.next(index);

this.store.dispatch(new ShoppingListActions.StartEdit(index));


  }





ngOnDestroy(): void {


// this.subscription.unsubscribe();
}
}
