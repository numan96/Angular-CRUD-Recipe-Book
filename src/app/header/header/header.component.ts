
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as authActions from 'src/app/auth/store/auth.actions';
import * as RecipeActions from '../../recipebook/store/recipe.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;

private userSub: Subscription;
isAuthenticated = false;

  constructor(
    // private dataStorageService: DataStorageService, private authService: AuthService, 
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {

   this.userSub =  this.store.select('auth').pipe(map(authState => 
     authState.user
   )).subscribe(user => {
this.isAuthenticated = !!user;
console.log(!user);
console.log(!!user);
   });
  }

  ngOnDestroy(){

    this.userSub.unsubscribe();
  }

  onSaveData(){

this.store.dispatch(new RecipeActions.storeRecipes());
    //this.dataStorageService.storeRecipes();
  }

  onFetchData(){
this.store.dispatch(new RecipeActions.FetchRecipes());
    // this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {

    this.store.dispatch(new authActions.Logout());
  }

}
