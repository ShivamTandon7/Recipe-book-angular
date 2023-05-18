import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipes } from "./recipes.model";
@Injectable()
export class RecipesService {
    recipesChanged = new Subject<Recipes[]>();
    // private recipes: Recipes[] = [
    //     new Recipes('Butter Chicken', 'Butter Chicken Recipe', 'assets/images/butter-chicken-Recipe.jpg', [new Ingredient('Meat', 1), new Ingredient('French Fries', 1)]),
    //     new Recipes('Handi Chicken', 'Handi Chicken Recipe', 'assets/images/butter-chicken-Recipe.jpg', [new Ingredient('Buns', 1), new Ingredient('French Fries', 1)])
    // ];
    private recipes: Recipes[] = [];
    constructor(private slService: ShoppingListService){

    }

    getRecipes() {
        return this.recipes.slice();
    }
    
    setRecipes(recipes: Recipes[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipes){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipes){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}