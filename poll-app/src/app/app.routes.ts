import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { Dev } from './shared/pages/dev/dev';
import { CreateSurvey } from './shared/pages/create-survey/create-survey';
import { SingleView } from './shared/pages/single-view/single-view';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'create-new-survey',
    component: CreateSurvey,
  },
  {
    path: 'fillout/:id',
    component: SingleView,
  },
  { path: 'dev', component: Dev },
];
