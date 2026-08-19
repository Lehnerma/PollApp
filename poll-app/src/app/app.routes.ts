import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { Dev } from './shared/pages/dev/dev';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {path: 'dev',
    component: Dev
  }
];
