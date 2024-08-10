import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptor/http-token-interceptor';
import { StoreModule } from '@ngrx/store';
import { spinnerReducer } from './store/spinner.reducer';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoadingSpinnerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
       
      timeOut: 3000, // Example timeout
      preventDuplicates: true,
      progressBar: true
    }),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({spinner:spinnerReducer}, {}),
    HttpClientModule
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:HttpTokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
