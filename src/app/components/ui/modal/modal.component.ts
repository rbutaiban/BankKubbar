import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isOpen = false;

  @Input() modalTitle: string = 'Modal Title';
  @Input() buttonTitle: string = 'Open Modal';
  @Input() buttonVariant: 'fill' | 'outline' = 'fill';

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
