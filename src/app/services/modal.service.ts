import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStates = new Map<string, BehaviorSubject<boolean>>();

  getModalState(modalId: string) {
    if (!this.modalStates.has(modalId)) {
      this.modalStates.set(modalId, new BehaviorSubject<boolean>(false));
    }
    return this.modalStates.get(modalId)!.asObservable();
  }

  open(modalId: string) {
    if (!this.modalStates.has(modalId)) {
      this.modalStates.set(modalId, new BehaviorSubject<boolean>(false));
    }
    this.modalStates.get(modalId)!.next(true);
  }

  close(modalId: string) {
    if (this.modalStates.has(modalId)) {
      this.modalStates.get(modalId)!.next(false);
    }
  }
}
