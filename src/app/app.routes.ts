import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'subscribe',
    loadComponent: () => import('./pages/subscribe/subscribe.page').then( m => m.SubscribePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
