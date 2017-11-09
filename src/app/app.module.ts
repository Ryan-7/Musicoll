import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { LandingComponent } from './landing/landing.component';
import { HttpService } from './services/http.service';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectLandingComponent } from './projects/project-landing/project-landing.component';
import { SearchPipe } from './shared/search.pipe';
import { ShortenPipe } from './shared/shorten.pipe';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsComponent,
    LandingComponent,
    ProjectDetailComponent,
    ProjectLandingComponent,
    SearchPipe,
    ShortenPipe,
    SignInComponent,
    SignupComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
