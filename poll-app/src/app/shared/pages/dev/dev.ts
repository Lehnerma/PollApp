import { Component } from '@angular/core';
import { Status } from '../../components/status/status';

@Component({
  selector: 'app-dev',
  imports: [Status],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {}
