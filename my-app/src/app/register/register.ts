import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';

function passwordMatch(g: AbstractControl) {
  const pass = g.get('password')?.value;
  const confirm = g.get('confirmPassword')?.value;
  return pass === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  regForm: FormGroup;
  showCard = false;
  userData: any;

  constructor(private fb: FormBuilder) {
    this.regForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(5)]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
          ],
        ],
        mobiles: this.fb.array([
          this.fb.control('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
        ]),
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatch },
    );
  }

  get mobileControls() {
    return this.regForm.get('mobiles') as FormArray;
  }

  addMobile() {
    this.mobileControls.push(
      this.fb.control('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    );
  }

  removeMobile(i: number) {
    this.mobileControls.removeAt(i);
  }

  onSubmit() {
    if (this.regForm.valid) {
      this.userData = JSON.parse(JSON.stringify(this.regForm.value));
      this.showCard = true;
      this.regForm.reset();
    } else {
      this.regForm.markAllAsTouched();
    }
  }

  onReset() {
    this.showCard = false;
    this.userData = null;
    this.regForm.reset();
  }
}
