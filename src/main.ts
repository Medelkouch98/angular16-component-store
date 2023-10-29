import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutes } from './app/app.routes';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app/core/store/app.state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterSerializer } from './app/core/store/router/custom-ruter-serliazer.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(AppRoutes),
      ToastrModule.forRoot({ preventDuplicates: true }),
      StoreModule.forRoot(reducers, {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }),
      StoreRouterConnectingModule.forRoot({
        serializer: CustomRouterSerializer,
      }),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
        name: environment.appName,
      })
    ),
    provideAnimations(),
  ],
});
