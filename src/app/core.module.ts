import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { LoggingService } from "./logging.service";
import { RecipesService } from "./recipes/recipes.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";


@NgModule({
    providers: [
        ShoppingListService,
        RecipesService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ]
})


export class CoreModule {}