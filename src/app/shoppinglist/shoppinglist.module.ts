import { NgModule } from '@angular/core';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shoppinglist-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [SharedModule, RouterModule, ShoppingListRoutingModule, FormsModule],
})
export class ShoppinglistModule {}
