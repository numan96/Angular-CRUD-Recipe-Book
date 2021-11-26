import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";



const routes: Routes = [
   
  {path: '', component: ShoppingListComponent, children: [

    {path: 'edit', component: ShoppingListEditComponent }
    
    ] }
]
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}