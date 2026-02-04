import { ApplicationConfig, importProvidersFrom, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http'; // Importado withFetch
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment';
import { provideClientHydration } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withFetch()
    ),
    {
      provide: 'SocialAuthServiceConfig',
      useFactory: (platformId: Object) => {
        // Se estiver no Servidor, retorna config vazia para não travar
        if (!isPlatformBrowser(platformId)) {
          return { autoLogin: false, providers: [] };
        }
        // Se estiver no Navegador, retorna a config real
        return {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID)
            }
          ],
          onError: (err) => console.error('SocialAuthError:', err)
        } as SocialAuthServiceConfig;
      },
      deps: [PLATFORM_ID] // Necessário para injetar o ID da plataforma
    }
  ]
};