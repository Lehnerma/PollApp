import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main-header',
  imports: [],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {
  route = inject(ActivatedRoute);
  private path = this.route.snapshot;

  currentLogo = this.route.url ? '../assets/img/logo-full-orange.png' : '../assets/img/logo-full-purple.png';
}
