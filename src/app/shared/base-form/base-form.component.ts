import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  template: '',
})
export class BaseFormComponent {
  @Input() form!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  errorLabel = '';

  constructor(protected fb: FormBuilder) {}

  protected validateForm(): boolean {
    if (this.form.invalid) {
      return false;
    }
    return true;
  }

  protected handleError(error: any): void {
    console.error('Operation failed:', error);
    this.errorLabel = 'Operation failed!';
  }

  protected resetForm(): void {
    this.form.reset();
    this.errorLabel = '';
  }
}
