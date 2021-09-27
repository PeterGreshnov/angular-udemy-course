import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number | undefined;
  editMode: boolean = false;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // for our own observables (not managed by Angular) we will have to clean subscriptions (unsubscribe) on Destroy
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          console.log("editMode = ", this.editMode);
        }
      );
  }
}
