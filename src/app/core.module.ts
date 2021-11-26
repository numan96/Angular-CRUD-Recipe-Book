import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipebookService } from "./recipebook/recipebook.service";
import { ShoppinglistService } from "./shoppinglist/shoppinglist.service";

@NgModule({
    providers: [
        ShoppinglistService,
        RecipebookService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ]
})
export class CoreModule {}
