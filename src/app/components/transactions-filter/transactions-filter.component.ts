import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transactions-filter',
  standalone: true,
  imports: [],
  templateUrl: './transactions-filter.component.html',
  styleUrl: './transactions-filter.component.css',
})
export class TransactionsFilterComponent {
  constructor(private fb: FormBuilder) {}
}
