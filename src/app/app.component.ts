import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'to-do';

  constructor(private router:Router,
              private toaster:ToastrService,
              
  ){

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
