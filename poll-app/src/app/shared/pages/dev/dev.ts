import { Component } from '@angular/core';
import { QuestionEditor } from '../../components/question-editor/question-editor';


@Component({
  selector: 'app-dev',
  imports: [QuestionEditor],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {}
