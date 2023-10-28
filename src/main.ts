import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutes } from "./app/app.routes";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(AppRoutes), ToastrModule.forRoot({ preventDuplicates: true })),
    provideAnimations()
]
});

