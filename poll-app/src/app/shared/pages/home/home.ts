import { Component } from '@angular/core';
import { MainHeader } from '../../components/main-header/main-header';
import { SurveysList } from '../../components/surveys-list/surveys-list';
import { MainHero } from '../../components/main-hero/main-hero';
import { ExpireList } from '../../components/expire-list/expire-list';

@Component({
  selector: 'app-home',
  imports: [MainHeader, MainHero, ExpireList, SurveysList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
