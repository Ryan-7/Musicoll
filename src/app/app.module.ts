import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { LandingComponent } from './landing/landing.component';
import { HttpService } from './services/http.service';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsComponent,
    LandingComponent,
    ProjectDetailComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
