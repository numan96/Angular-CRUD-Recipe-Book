import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import * as authActions from 'src/app/auth/store/auth.actions';
import * as RecipeActions from '../../recipebook/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public collapsed: boolean = true;
  public isAuthenticated: boolean = false;

  constructor(private _store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this._store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  public onSaveData() {
    this._store.dispatch(new RecipeActions.storeRecipes());
  }

  public onFetchData() {
    this._store.dispatch(new RecipeActions.FetchRecipes());
  }

  public onLogout() {
    this._store.dispatch(new authActions.Logout());
  }
}
