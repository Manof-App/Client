import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Location } from '../../models/Location';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  constructor(private http: HttpClient) {}

  getLocationDetails(latitude, longitude) {
    return this.http.get<Location>(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=he`
    );
  }
}
