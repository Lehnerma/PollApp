import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeader } from './shared/components/main-header/main-header';
import { Hero } from './shared/components/hero/hero';
//import { SurveysList } from './shared/components/surveys-list/surveys-list';
import { SupabaseService } from './shared/services/supabase-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MainHeader,
    Hero,
  //SurveysList,
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  supabaseService = inject(SupabaseService);
}
