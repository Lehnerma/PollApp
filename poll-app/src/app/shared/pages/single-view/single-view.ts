import { Component } from '@angular/core';
import { FillOut } from '../../components/fillout/fillout';
import { LiveResults } from '../../components/live-results/live-results';

@Component({
  selector: 'app-single-view',
  imports: [FillOut, LiveResults],
  templateUrl: './single-view.html',
  styleUrl: './single-view.scss',
})
export class SingleView {}
