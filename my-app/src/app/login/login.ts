import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../Services/AuthService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  loginForm: FormGroup;
  errorMsg: string = '';
  isLoading = false;
  loggedUser: any = null;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (data: any) => {
        this.authService.setToken(data.access_token);

        this.loginForm.reset();

        this.toastr.success('Login successful', 'Welcome!');

        this.router.navigate(['/products']);
      },

      error: (err: any) => {
        this.errorMsg = err.error?.message || 'Invalid credentials. Please try again.';
        this.isLoading = false;
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onReset() {
    this.loginForm.reset();
    this.errorMsg = '';
  }
}
