import { Component } from '@angular/core';
import { PhoneLogo } from '../../components/phone-logo/phone-logo';

@Component({
  selector: 'app-dev',
  imports: [PhoneLogo],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {}
