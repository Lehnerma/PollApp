import { Routes } from '@angular/router';
import { DropdownComponent } from './shared/components/dropdown-component/dropdown-component';
import { HomeComponent } from './shared/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dropdown',
    component: DropdownComponent,
  },
];
