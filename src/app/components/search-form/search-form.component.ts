import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ChangeDetectionStrategy, Component, Output, Input, EventEmitter, inject, OnInit} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule, MatEndDate, MatStartDate} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule, FormErrorComponent],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent implements OnInit{

  searchForm!: FormGroup;
  errorLabel = '';
  private modalService = inject(ModalService);
  @Output() formEmitter = new EventEmitter<FormGroup>();
  @Input() modalId: string = 'search-modal';

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
          startDate: ['', Validators.required],
          endDate: ['', Validators.required],
          amount: ['', Validators.required],
        });
  }

  ngOnInit(): void {
    this.searchForm.reset();
    this.searchForm.get('startDate')?.setValue(new Date());
    this.searchForm.get('endDate')?.setValue(new Date());
    this.errorLabel = '';
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      this.errorLabel = 'form invalid';
      return;
    }
    if (this.searchForm.value.amount <= 0) {
      this.errorLabel = 'Amount must be greater than 0';
      return;
    }
    
    this.formEmitter.emit(this.searchForm);
    this.searchForm.reset();
    this.searchForm.get('startDate')?.setValue(new Date());
    this.searchForm.get('endDate')?.setValue(new Date());
    this.errorLabel = '';
    this.modalService.close(this.modalId);

  }
  
}
