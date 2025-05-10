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
  selectedFile: File | null = null;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    super(fb);
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,15}')]],
      image: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.errorLabel = '';
  }

  fileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.registerForm.patchValue({ image:this.selectedFile});
    }
  }
  
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const formData = new FormData();
      formData.append('username', this.registerForm.get('username')?.value);
      formData.append('password',this.registerForm.get('password')?.value);
    if(this.selectedFile){
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.authService.register(formData).subscribe({
      next: (Response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (Response) => {
        this.errorLabel = 'Registeration failed!';
      },
    });
  }
}
