import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as ShoppingListActions from '../store/shoppinglist.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private _store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this._store.select('shoppingList');
  }

  public onEditIngredient(index: number) {
    this._store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
