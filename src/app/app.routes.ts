import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Sandeep Johal | Full-Stack, Cloud and AI Developer',
  },
  {
    path: 'work/enterprise-payments',
    loadComponent: () =>
      import('./features/work/work-detail-page/work-detail-page').then((m) => m.WorkDetailPage),
    title: 'Enterprise Payments Integration Platform | Sandeep Johal',
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    title: 'Page not found | Sandeep Johal',
  },
];
