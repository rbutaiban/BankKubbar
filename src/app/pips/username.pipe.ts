import { inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';
import { map, Observable, Subscription } from 'rxjs';

@Pipe({
  name: 'username',
  standalone: true,
  pure: false,
})
export class UsernamePipe implements PipeTransform, OnDestroy {
  usersService = inject(UserService);
  private usernames: { [id: string]: string } = {};
  private subscriptions: Subscription[] = [];

  transform(id: string, ...args: unknown[]): string {
    if (!id) return 'Unknown User';

    // Return cached username if available
    if (this.usernames[id]) {
      return this.usernames[id];
    }

    // Set initial value
    this.usernames[id] = 'Unknown User';

    // Create subscription to update the value
    const sub = this.usersService
      .getUserById(id)
      .pipe(map((user) => user?.username || 'Unknown User'))
      .subscribe((username) => {
        this.usernames[id] = username;
      });

    this.subscriptions.push(sub);
    return this.usernames[id];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
