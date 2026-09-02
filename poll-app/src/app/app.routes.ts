import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { Dev } from './shared/pages/dev/dev';
import { CreateSurvey } from './shared/pages/create-survey/create-survey';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'create-new-survey',
    component: CreateSurvey,
  },
  { path: 'dev', component: Dev },
];
