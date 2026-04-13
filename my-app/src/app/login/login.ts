import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../Services/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  loggedUser: any = null;
  errorMsg: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';

    try {
      const { email, password } = this.loginForm.value;

      const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        this.errorMsg = data.message || 'Invalid credentials. Please try again.';
        return;
      }

      this.authService.setToken(data.access_token);
      this.loggedUser = { email };
      this.loginForm.reset();
      setTimeout(() => this.router.navigate(['/products']), 800);
    } catch (err) {
      this.errorMsg = 'Network error. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  onReset() {
    this.loginForm.reset();
    this.loggedUser = null;
    this.errorMsg = '';
  }
}


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './login.html',
//   styleUrl: './login.scss'
// })
// export class Login {
//   loginForm: FormGroup;
//   isSubmitted = false;
//   loggedUser: any = null;

//   constructor(private fb: FormBuilder) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   onLogin() {
//     this.isSubmitted = true;
//     if (this.loginForm.valid) {
//       this.loggedUser = this.loginForm.value;
//       console.log("Logged In:", this.loggedUser);
//       this.loginForm.reset(); 
//       this.isSubmitted = false;
//     }
//   }

//   onReset() {
//     this.isSubmitted = false;
//     this.loginForm.reset();
//     this.loggedUser = null;
//   }
// }
