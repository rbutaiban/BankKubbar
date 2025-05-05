import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStates = new Map<string, BehaviorSubject<boolean>>();

  private getOrCreateModalState(modalId: string): BehaviorSubject<boolean> {
    if (!this.modalStates.has(modalId)) {
      this.modalStates.set(modalId, new BehaviorSubject<boolean>(false));
    }
    return this.modalStates.get(modalId)!;
  }

  getModalState(modalId: string) {
    return this.getOrCreateModalState(modalId).asObservable();
  }

  open(modalId: string) {
    this.getOrCreateModalState(modalId).next(true);
  }

  close(modalId: string) {
    if (this.modalStates.has(modalId)) {
      this.modalStates.get(modalId)!.next(false);
    }
  }
}
