import { animate } from '@angular/animations';
import { state, style, transition } from '@angular/animations';
import { trigger } from '@angular/animations';
import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bank-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './bank-card.component.html',
  styleUrl: './bank-card.component.css',
  animations: [
    trigger('openClose', [
      state(
        'active',
        style({
          transform: 'rotateY(0deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition('active <=> inactive', [animate('500ms')]),
    ]),
  ],
})
export class BankCardComponent {
  isCardOpen = true;
  @Input() amount: number | null = 0;
  @Input() cardTitle: string = '';

  public toggleCard(): void {
    this.isCardOpen = !this.isCardOpen;
  }
}
