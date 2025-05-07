import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent extends BaseFormComponent {
  loginForm!: FormGroup;
  transfer: boolean = false;
  username: string = '';
  amount: number = 0;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder
  ) {
    super(fb);
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.route.queryParams.subscribe((params) => {
      this.transfer = params['transfer'];
      this.username = params['username'];
      this.amount = params['amount'];
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (Response) => {
        if (this.transfer) {
          this.router.navigate(['/transfer'], {
            queryParams: {
              username: this.username,
              amount: this.amount,
            },
          });
        } else this.router.navigate(['/dashboard']);
      },
      error: (Response) => {
        this.errorLabel = 'Login failed!';
      },
    });
  }
}
