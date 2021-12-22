import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
  declarations: [
    DropdownDirective,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    CommonModule
  ]
})

export class SharedModule {}
