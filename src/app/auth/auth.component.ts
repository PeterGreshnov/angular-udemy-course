import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective, { static: true })
  alertHost: PlaceholderDirective | null = null;

  private closeSub: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub?.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email: string = authForm.value['email'];
    const password: string = authForm.value['password'];

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (authResponseData) => {
        console.log(authResponseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage; // for programmatic component option we don't need that property anymore;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  onHanldeError() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewCOntainerRef = this.alertHost?.viewContainerRef;
    hostViewCOntainerRef?.clear();

    const componentRef = hostViewCOntainerRef?.createComponent(alertCmpFactory);

    if (componentRef) {
      componentRef.instance.message = errorMessage;
    }

    this.closeSub = componentRef?.instance.close.subscribe(
      () => {
        this.closeSub?.unsubscribe();
        hostViewCOntainerRef?.clear();
        //componentRef.destroy();
      }
    );

  }
}
