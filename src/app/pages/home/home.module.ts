import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProjectComponent } from './project/project.component';
import { FormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details/project-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidenavComponent,
    ProjectComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
