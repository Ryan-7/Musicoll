import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';

const routes: Routes = [
    { path: 'projects', component: ProjectsComponent, children: [
        {path: ':id', component: ProjectDetailComponent}
    ] },
    { path: '', component: LandingComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}