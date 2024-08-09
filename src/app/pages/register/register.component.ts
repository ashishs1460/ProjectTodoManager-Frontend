import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Note: Change to 'styleUrls' for an array
})
export class RegisterComponent {
  registerForm: FormGroup; // Declare FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    // Initialize form with validation rules
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.router.navigate(['/login']);
          } else {
            this.toastr.error('Unexpected response status', 'Error');
          }
        },
        error: (err) => {
          if (err.status === 409) {
            this.toastr.error(err.error?.message || 'User already exists', 'Error');
          } else {
            this.toastr.error('Registration failed', 'Error');
          }
        }
      });
    } else {
      this.toastr.error('Please fill in all fields correctly.', 'Validation Error');
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  
  get f() {
    return this.registerForm.controls;
  }
}
