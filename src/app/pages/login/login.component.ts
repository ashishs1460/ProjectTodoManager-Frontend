import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  token:string;
  userId:number|null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private tokenService:TokenService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next:(response)=>{
          
          
          this.token= response.token;
          this.userId = response.user.id;
          this.tokenService.setAccessToken(this.token);
          localStorage.setItem('userId',this.userId.toString());
          this.router.navigate(['/home'])
        },
        error: (err) => {
          
          if (err.status === 403) {
            this.toastr.error('Invalid email or password');
          } else {
            this.toastr.error('Login failed', 'Error');
          }
        }
      },
      
      )
    } else {
      this.toastr.error('Please fill in all fields correctly.', 'Validation Error');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  get f() {
    return this.loginForm.controls;
  }
}
