import { Component } from '@angular/core';
import { ToastMsg } from '../../components/toast-msg/toast-msg';

@Component({
  selector: 'app-dev',
  imports: [ToastMsg],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {}
