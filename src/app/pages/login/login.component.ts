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
  transfer : boolean = false;

  constructor(
    private authService: AuthService,
    private route:ActivatedRoute,
    private router: Router,
    fb: FormBuilder
  ) {
    
    super(fb);
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.route.queryParams.subscribe((params)=>{
      this.transfer = params['transfer']

    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (Response) => {
        console.log(this.transfer)
        if (this.transfer){
          this.router.navigate(['/transfer'],{queryParamsHandling:'preserve'})
        }
        else
        this.router.navigate(['/dashboard']);
      },
      error: (Response) => {
        this.errorLabel = 'Login failed!';
      },
    });

    console.log('Form Data:', this.loginForm.value);
  }
}
