import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-hero',
  imports: [RouterLink],
  templateUrl: './main-hero.html',
  styleUrl: './main-hero.scss',
})
export class MainHero {
  router = inject(Router);
}
