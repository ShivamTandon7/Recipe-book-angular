import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipesService } from "../recipes/recipes.service";
import { Recipes } from "../recipes/recipes.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipesService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.post('',recipes).subscribe(
            (response)=>{
                console.log(response);
            }
        );

    }
    fetchRecipes() {
        return this.http
            .get<Recipes[]>(
                ''
            ).pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }))  
    }
}