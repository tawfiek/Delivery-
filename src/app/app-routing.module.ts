import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/user/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    loadChildren: './sign-in/sign-in.module#SignInPageModule',
  },
  {
    path: 'sign-up',
    loadChildren: './sign-up/sign-up.module#SignUpPageModule'
  },
  { path: 'new-order', loadChildren: './new-order/new-order.module#NewOrderPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
