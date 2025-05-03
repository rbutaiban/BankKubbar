import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Output() onClick = new EventEmitter<void>();
  @Input() variant: 'fill' | 'outline' | 'text' = 'fill';

  onClickHandler() {
    this.onClick.emit();
  }
}
