import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';

@Component({
  selector: 'app-live-results',
  imports: [],
  templateUrl: './live-results.html',
  styleUrl: './live-results.scss',
})
export class LiveResults {
  supabase = inject(SupabaseService);

  constructor() {
    this.supabase.subscribeToOptions();
  }
}
