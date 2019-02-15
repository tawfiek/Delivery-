import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: '', loadChildren: './sign-in/sign-in.module#SignInPageModule', pathMatch: 'full' },
  { path: 'my-orders', loadChildren: './orders/my-orders/my-orders.module#MyOrdersPageModule' },
  { path: 'orders-to-deliver', loadChildren: './orders/orders-to-deliver/orders-to-deliver.module#OrdersToDeliverPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
