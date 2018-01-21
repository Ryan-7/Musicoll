import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectLandingComponent } from './projects/project-landing/project-landing.component';
import { AboutComponent } from "./about/about.component";

const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuardService], children: [
        { path: '', component: ProjectLandingComponent },
        { path: ':id', component: ProjectDetailComponent }
    ] },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'about', component: AboutComponent},
    { path: 'unauthorized', component: UnauthorizedComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}