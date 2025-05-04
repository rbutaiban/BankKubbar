import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isOpen = false;

  constructor(private modalService: ModalService) {
    this.modalService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  @Input() modalTitle: string = 'Modal Title';
  @Input() buttonTitle: string = 'Open Modal';
  @Input() buttonVariant: 'fill' | 'outline' = 'fill';
  @Output() modalClosed = new EventEmitter<void>();

  openModal() {
    this.modalService.open();
  }

  closeModal() {
    this.modalService.close();
    this.modalClosed.emit();
  }
}
