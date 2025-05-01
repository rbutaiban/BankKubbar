import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  errorLabel?: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.errorLabel = "";
  }
  onSubmit() {
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (Response) => {
        this.router.navigate(['/']);

        console.log('Logged in:', this.loginForm.value);
        console.log('Response: ',Response);
      },
      error: (Response) => {
        this.errorLabel = "Login failed!"
      }
      
    });

    console.log('Form Data:', this.loginForm.value);
  }
}

