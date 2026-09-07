import { Component, input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  imports: [],
  templateUrl: './progressbar.html',
  styleUrl: './progressbar.scss',
})
export class Progressbar {
  optionName = input<string>();
  prefixLetter = input<string>();
  percent = input<number>(0);
}
