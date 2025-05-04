import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() routerLink: string[] = [];
  @Output() onClick = new EventEmitter<void>();
  @Input() variant: 'fill' | 'outline' | 'text' = 'fill';

  onClickHandler() {
    this.onClick.emit();
  }
}
