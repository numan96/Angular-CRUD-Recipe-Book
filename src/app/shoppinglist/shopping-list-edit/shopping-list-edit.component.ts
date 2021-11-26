import { Component, OnDestroy, OnInit, ViewChild,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppinglistService } from '../shoppinglist.service';
import * as ShoppingListActions from '../store/shoppinglist.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
@ViewChild('f', {static: false}) slForm: NgForm
subscription: Subscription;
editMode = false;
editedIngredient: Ingredient;



  constructor(private shoppingService: ShoppinglistService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
   this.subscription =  this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedIngredient = stateData.editedIngredient;
        this.slForm.setValue({

          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
          
          });
      } else {
        this.editMode = false;
      }
    })
   
  }

  ngOnDestroy(){

this.subscription.unsubscribe();
this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddIngredient(form: NgForm){
const value = form.value;
const newIngredient = new Ingredient(value.name, value.amount);

if (this.editMode) {
this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
  // this.shoppingService.updateIngredient(this.editedIngredientIndex, newIngredient);

} else {
this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));

 } 

form.reset();
this.editMode = false;


}


onClear(){
this.slForm.reset();
this.editMode = false;
this.store.dispatch(new ShoppingListActions.StopEdit());
}

onDelete(){


// this.shoppingService.deleteIngredient(this.editedIngredientIndex);
this.store.dispatch(new ShoppingListActions.DeleteIngredient());
 this.onClear();
  
  }
}
