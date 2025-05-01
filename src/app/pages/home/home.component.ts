import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userLoggedIn: boolean = false;
  userName: string = "";

  constructor(private authService: AuthService, private router: Router){
    
  }

  ngOnInit(): void {
    this.userLoggedIn = this.authService.isLoggedIn();

    if(!this.userLoggedIn){
      this.router.navigate(["/login"]);
    }else{
      this.userName = this.authService.getLoggedInUser();
    }
  }  
    
}
