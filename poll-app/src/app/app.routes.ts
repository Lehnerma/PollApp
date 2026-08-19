import { Routes } from '@angular/router';
import { DropdownComponent } from './shared/components/dropdown-component/dropdown-component';
import { HomeComponent } from './pages/home/home.component/home.component';

export const routes: Routes = [
      {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dropdown',
    component: DropdownComponent
  }
];
