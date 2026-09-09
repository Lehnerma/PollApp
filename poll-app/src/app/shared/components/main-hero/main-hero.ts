import { Component, inject } from '@angular/core';
import { App } from '../../../app';
import { PhoneLogo } from '../phone-logo/phone-logo';

@Component({
  selector: 'app-main-hero',
  imports: [PhoneLogo],
  templateUrl: './main-hero.html',
  styleUrl: './main-hero.scss',
})
export class MainHero {
  app = inject(App);
}
