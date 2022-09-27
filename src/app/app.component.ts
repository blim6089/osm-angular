import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from './api.service';
import * as L from 'leaflet';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  map: any;

  constructor(private api: ApiService) {}

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  private loadMap(): void {

    // this.map.flyTo([-33.447493, -70.6225626], 13);
    this.api.get().subscribe((res) => {
      console.log('data response', res);
    });
  }
}
