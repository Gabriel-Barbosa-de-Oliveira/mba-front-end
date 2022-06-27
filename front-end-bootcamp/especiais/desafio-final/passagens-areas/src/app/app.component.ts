import { Component } from '@angular/core';
import { BackendService } from './service/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public countries: Array<any> = [];

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.getCountries();
  }

  private getCountries(): void {
    this.backendService.getDataFromBackend().subscribe((countries) => {
      this.countries = countries;
    });
  }
}
