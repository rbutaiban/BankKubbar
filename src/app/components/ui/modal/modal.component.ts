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
export class ModalComponent implements OnInit {
  isOpen = false;
  @Input() modalId: string = 'default';

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.getModalState(this.modalId).subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  @Input() modalTitle: string = 'Modal Title';
  @Input() buttonTitle: string = 'Open Modal';
  @Input() buttonVariant: 'fill' | 'outline' = 'fill';
  @Output() modalClosed = new EventEmitter<void>();

  openModal() {
    this.modalService.open(this.modalId);
  }

  closeModal() {
    this.modalService.close(this.modalId);
    this.modalClosed.emit();
  }
}
