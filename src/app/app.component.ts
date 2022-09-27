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
    this.map = L.map('map', { attributionControl: false }).setView(
      [-33.447493, -70.6225626],
      14
    );
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: environment.mapbox.accessToken,
      }
    ).addTo(this.map);

    // this.map.flyTo([-33.447493, -70.6225626], 13);
    this.api.get().subscribe((res) => {
      console.log(res);return
      res.map((item: any) => {
        const icon = new L.DivIcon({
          className: 'marker',
          html: `<img class="marker-image" src="${item.url}"/>`,
          popupAnchor: [30, -10],
        });
        const marker = L.marker(
          [Number(item.coordinate.lat), Number(item.coordinate.lon)],
          {
            icon,
          }
        ).bindPopup(`<div class="popup">
                      <div>
                        <img src="${item.url}" />
                        <span>${item.name}</span>
                      </div>
                      <span>${item.category}</span>
                    </div>`);
        marker.addTo(this.map);
      });
    });
  }
}
