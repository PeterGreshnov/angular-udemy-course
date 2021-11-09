import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub!: Subscription;
  collapsed = true;
  isAuthenticated = false;

  constructor(private dataStorage:DataStorageService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(
        user => {
          // this.isAuthenticated = !user ? false : true;  - this is a direct way of writing this expression;
          // and here is another option:
          this.isAuthenticated = !!user; // if !user = true (there is NO user) - then we get isAuthenticated = false;
          console.log('Not user', !user);
          console.log('NOT Not user', !!user);
        }
      )
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveRecipes() {
    this.dataStorage.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
