import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent extends BaseFormComponent {
  registerForm!: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    super(fb);
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.errorLabel = '';
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (Response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (Response) => {
        this.errorLabel = 'Registeration failed!';
      },
    });
  }
}
