import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('openClose', [
      state(
        'active',
        style({
          transform: 'scale(1) rotateY(0deg)',
          'box-shadow': '3px 5px 10px rgb(112, 110, 110)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'scale(0.7) rotateY(-180deg)',
        })
      ),
      transition('active <=> inactive', [animate('500ms')]),
    ]),
  ],
})
export class HomeComponent {
  userLoggedIn: boolean = this.authService.isLoggedIn();
  userName: string = this.authService.getLoggedInUser();
  isCardOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   this.userLoggedIn = this.authService.isLoggedIn();

  //   if(!this.userLoggedIn){
  //     this.router.navigate(["/login"]);
  //   }else{
  //     this.userName = this.authService.getLoggedInUser();
  //   }
  // }

  public toggleCard(): void {
    this.isCardOpen = !this.isCardOpen;
  }
}
