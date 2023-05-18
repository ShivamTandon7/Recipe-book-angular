import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipes } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipes[];
  subscription: Subscription;
  constructor(private recipesService: RecipesService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.recipesService.recipesChanged.subscribe((recipes: Recipes[])=>{
      this.recipes = recipes;
    })
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
