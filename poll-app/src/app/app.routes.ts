import { Routes } from '@angular/router';
import { DropdownComponent } from './shared/components/dropdown-component/dropdown-component';
import { MainHeader } from './shared/components/main-header/main-header';

export const routes: Routes = [
      {
    path: '',
    component: MainHeader,
  },
  {
    path: 'dropdown',
    component: DropdownComponent
  }
];
