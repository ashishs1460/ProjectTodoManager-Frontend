import { Component } from '@angular/core';
import { RegistrationRequest } from '../../model/registration-request';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerRequest:RegistrationRequest ={
    firstName:'',
    lastName:'',
    email:'',
    password:''
  }
  errorMsg:string[] = []

  constructor(private router:Router,
    private authService:AuthService ,
    private toastr : ToastrService     
  ){}

  register() {
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        console.log('Response:', response); // Log the response object
        if (response.status === 201) {
          this.router.navigate(['/login'])
        } else {
          this.toastr.error('Unexpected response status', 'Error');
        }
      },
      error: (err) => {
        console.error('Error:', err); 
        if (err.status === 409) {
          this.toastr.error(err.error?.message || 'User already exists', 'Error');
        } else {
          this.toastr.error('Registration failed', 'Error');
        }
      }
    });
  }

  login(){
    this.router.navigate(['login']);
  }
}
