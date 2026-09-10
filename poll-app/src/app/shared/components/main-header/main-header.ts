import { Component, inject, output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'main-header',
  imports: [RouterLink],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {
  logoClick = output<void>();
  private route = inject(ActivatedRoute);
  private path = this.route.snapshot.routeConfig?.path;
  currentLogo = this.path === '' ? 'assets/img/logo-full-orange.png' : 'assets/img/logo-full-purple.png';
}
