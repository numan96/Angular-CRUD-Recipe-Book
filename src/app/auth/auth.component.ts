import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from 'src/app/store/app.reducer';
import * as authActions from './store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  public isLoginMode = true;
  public isLoading = false;
  private _error: string = null;
  private _alertHost: PlaceholderDirective;
  private _closeSub: Subscription;
  private _storeSub: Subscription;
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this._storeSub = this._store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this._error = authState.authError;
      if (this._error) {
        this.showErrorAlert(this._error);
      }
    });
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this._store.dispatch(
        new authActions.LoginStart({ email: email, password: password })
      );
    } else {
      this._store.dispatch(
        new authActions.SignupStart({ email: email, password: password })
      );
    }

    form.reset();
  }

  ngOnDestroy() {
    if (this._storeSub) {
      this._storeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this._componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this._alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;

    this._closeSub = componentRef.instance.close.subscribe(() => {
      this._closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
