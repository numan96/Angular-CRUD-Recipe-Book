import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shoppinglist.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  public editMode = false;
  @ViewChild('f', { static: false }) private _slForm: NgForm;
  private _editedIngredient: Ingredient;

  constructor(private _store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this._store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this._editedIngredient = stateData.editedIngredient;
        this._slForm.setValue({
          name: this._editedIngredient.name,
          amount: this._editedIngredient.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy() {
    this._store.dispatch(new ShoppingListActions.StopEdit());
  }

  public onAddIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this._store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this._store.dispatch(
        new ShoppingListActions.AddIngredient(newIngredient)
      );
    }

    form.reset();
    this.editMode = false;
  }

  public onClear() {
    this._slForm.reset();
    this.editMode = false;
    this._store.dispatch(new ShoppingListActions.StopEdit());
  }

  public onDelete() {
    this._store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
