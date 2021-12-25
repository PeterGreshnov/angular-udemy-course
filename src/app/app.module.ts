import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { SharedModule } from './shared/shared.module';
import { CoreModules } from './core.module';

import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    AppRoutingModule,
    SharedModule,
    CoreModules
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
