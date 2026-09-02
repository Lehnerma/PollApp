import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main-header',
  imports: [],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {
  private route = inject(ActivatedRoute);
  private path = this.route.snapshot.routeConfig?.path;

  currentLogo = this.path === '' ? '../assets/img/logo-full-orange.png' : '../assets/img/logo-full-purple.png';
}
