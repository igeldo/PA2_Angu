import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from '@conciso/auth';
import { LoadingInterceptor } from '@conciso/shared';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), 
    provideAnimations(), 
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
};
