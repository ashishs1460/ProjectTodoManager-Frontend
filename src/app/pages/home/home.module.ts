import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidenavComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
