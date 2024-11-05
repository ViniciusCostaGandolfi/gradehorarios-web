import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsApiLoaderService {
  private googleMapsLoaded: Promise<void>;
  private googleMapsLoading: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.googleMapsLoaded = new Promise<void>((resolve, reject) => {
      // Only execute in browser environment
      if (isPlatformBrowser(this.platformId)) {
        if (typeof google !== 'undefined' && google.maps) {
          resolve();
        } else if (!this.googleMapsLoading) {
          this.googleMapsLoading = true;
          const apiKey = environment.GOOGLE_MAPS_API_KEY
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            this.googleMapsLoading = false;
            resolve();
          };
          script.onerror = (error) => {
            this.googleMapsLoading = false;
            reject(error);
          };
          document.head.appendChild(script);
        }
      }
    });
  }

  public loadApi(): Promise<void> {
    return this.googleMapsLoaded;
  }
}
