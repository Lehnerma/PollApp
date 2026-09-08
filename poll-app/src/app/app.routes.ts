import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { Dev } from './shared/pages/dev/dev';
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
  { path: 'dev', component: Dev },
];
