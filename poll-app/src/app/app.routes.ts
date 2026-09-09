import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home';
import { SingleView } from './shared/pages/single-view/single-view';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'fillout/:id',
    component: SingleView,
  },
];
