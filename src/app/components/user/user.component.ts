import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  userService = inject(UserService);
  user$ = this.userService.user$;

  ngOnInit() {
    if (!this.userService.user()) {
      this.userService.getProfile().subscribe();
    }
  }
}
