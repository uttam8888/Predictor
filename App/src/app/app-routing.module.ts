import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: '',
    redirectTo: 'slides',
    pathMatch: 'full'
  },
  {
    path: 'options',
    loadChildren: () => import('./options/options.module').then( m => m.OptionsPageModule)
  },
  {
    path: 'double-tic-tac-toe',
    loadChildren: () => import('./double-tic-tac-toe/double-tic-tac-toe.module').then( m => m.DoubleTicTacToePageModule)
  },
  {
    path: 'single-tic-tac-toe',
    loadChildren: () => import('./single-tic-tac-toe/single-tic-tac-toe.module').then( m => m.SingleTicTacToePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'online-tic-tac-toe',
    loadChildren: () => import('./online-tic-tac-toe/online-tic-tac-toe.module').then( m => m.OnlineTicTacToePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
