import { Component } from '@angular/core';
import { QuestionsListEditor } from '../../components/questions-list-editor/questions-list-editor';

@Component({
  selector: 'app-dev',
  imports: [QuestionsListEditor],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {}
