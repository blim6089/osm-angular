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
    const markers = [
      {
        name: 'Paula',
        coordinate: { lat: '-33.4564958', lon: '-70.6195518' },
        url: 'https://citadu-bucket.s3.amazonaws.com/1.png',
        category: 'Plus',
      },
      {
        name: 'Estrella',
        coordinate: { lat: '-33.4444602', lon: '-70.6345516' },
        url: 'https://citadu-bucket.s3.amazonaws.com/2.png',
        category: 'Black',
      },
      {
        name: 'Sofía',
        coordinate: { lat: '-33.4440991', lon: '-70.6089736' },
        url: 'https://citadu-bucket.s3.amazonaws.com/3.png',
        category: 'VIP',
      },
      {
        name: 'María Teresa',
        coordinate: { lat: '-33.4539038', lon: '-70.6369804' },
        url: 'https://citadu-bucket.s3.amazonaws.com/4.png',
        category: 'Black',
      },
      {
        name: 'Patricia',
        coordinate: { lat: '-33.447493', lon: '-70.6225626' },
        url: 'https://citadu-bucket.s3.amazonaws.com/5.png',
        category: 'Black',
      },
    ];

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
      console.log('data response', res);
    });

    markers.map((item) => {
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
  }
}
