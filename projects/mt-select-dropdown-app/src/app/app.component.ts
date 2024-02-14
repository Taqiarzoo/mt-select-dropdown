import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//for Development 
import { MtSelectDropdownComponent } from '../../../mt-select-dropdown/src/lib/mt-select-dropdown.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MtSelectDropdownService } from '../../../mt-select-dropdown/src/lib/mt-select-dropdown.service';
import { HttpService } from './http.service';
//after publishing 
// import { MtSelectDropdownComponent } from 'mt-select-dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MtSelectDropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MtSelectDropdown-app';
  http = inject(HttpService)
  selectedOption = [
    { id: 1, name: 'India' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'JAP' },
    { id: 4, name: 'PUK' },
    { id: 5, name: 'RAT' },
    { id: 6, name: 'PAT' },
  ]
}
