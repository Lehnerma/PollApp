import { Component } from '@angular/core';
import { MainHeader } from '../../components/main-header/main-header';
import { SurveysList } from '../../components/surveys-list/surveys-list';
import { MainHero } from '../../components/main-hero/main-hero';
import { ExpireList } from '../../components/expire-list/expire-list';

@Component({
  selector: 'app-home.component',
  imports: [MainHeader, 
    MainHero,
    ExpireList,
    SurveysList],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
