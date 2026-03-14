import { isPlatformBrowser } from '@angular/common';
import type { AfterViewInit} from '@angular/core';
import { Component, EventEmitter, inject,Output, PLATFORM_ID } from '@angular/core';

import { environment } from '../../../environments/environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any;

@Component({
  selector: 'app-google-btn',
  standalone: true,
  template: `<div id="google-btn-container" class="w-full flex justify-center overflow-hidden rounded-lg"></div>`,
  styles: []
})
export class GoogleBtnComponent implements AfterViewInit {
  @Output() tokenReceived = new EventEmitter<string>();

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initGoogleAuth();
    }
  }

  private initGoogleAuth(): void {
    if (typeof google === 'undefined' || !google.accounts) {
      // Script might not be loaded yet, retry after a short delay
      setTimeout(() => { this.initGoogleAuth(); }, 100);
      return;
    }

    google.accounts.id.initialize({
      client_id: environment.GOOGLE_CLIENT_ID,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn-container'),
      { theme: 'outline', size: 'large', type: 'standard', width: 400 } // Customize as needed
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleCredentialResponse(response: any): void {
    if (response?.credential) {
      this.tokenReceived.emit(response.credential);
    }
  }
}
