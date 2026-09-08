import { Component, inject } from '@angular/core';
import { App } from '../../../app';

@Component({
  selector: 'app-main-hero',
  imports: [],
  templateUrl: './main-hero.html',
  styleUrl: './main-hero.scss',
})
export class MainHero {
  app = inject(App);
}
