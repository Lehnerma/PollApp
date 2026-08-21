import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status',
  imports: [TitleCasePipe],
  templateUrl: './status.html',
  styleUrl: './status.scss',
})

export class Status {
  status = (input('draft'));
}
