import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipebook/recipes.module').then((m) => m.RecipesModule),
  },

  {
    path: 'shoppinglist',
    loadChildren: () =>
      import('./shoppinglist/shoppinglist.module').then(
        (m) => m.ShoppinglistModule
      ),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
