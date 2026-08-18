import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeader } from './shared/components/main-header/main-header';
import { Hero } from './shared/components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MainHeader,
    Hero,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
