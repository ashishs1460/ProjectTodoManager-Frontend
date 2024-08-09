import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { getLoading } from './store/spinner.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'to-do';
  showLoading$:Observable<boolean|undefined>;
  constructor(private router:Router,
              private toaster:ToastrService,
              private store: Store
              
  ){

  }
  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
  }
  login(){
    this.router.navigateByUrl('login')
    this.toaster.error("Login successful!");
    this.toaster.success("Registration success");
  }
  register(){
    this.router.navigateByUrl('register')
  }
  showAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'Your operation was successful!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
