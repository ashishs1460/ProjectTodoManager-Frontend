import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent implements OnInit {
  userId: number | null = null;
  user: User | null = null;
  logoText: string = "!Unknown";
  logoIcon: string = "?";
  navbarData = [
    {
      routerLink: "/home",
      icon: 'fas fa-home',
      label: 'Home'
    },
    {
      routerLink: "/home/project",
      icon: 'fas fa-folder',
      label: 'Projects'
    }

  
  ];

  isProjectRouteActive = false;

  constructor(private userService: UserService, private router: Router) {
    // Listen for route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isProjectRouteActive = event.urlAfterRedirects.includes('project');
      }
    });
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.getUser();
  }

  getUser(): void {
    if (this.userId) {
      this.userService.findUser(this.userId).subscribe({
        next: (response) => {
          console.log(">>>>>", response);
          this.user = response;
          this.logoText = this.user.firstName + " "+this.user.lastName; 
          this.logoIcon = this.user.firstName.charAt(0).toUpperCase(); 
        },
        error: (err) => {
          console.error('Failed to fetch user', err);
         
        }
      });
    }
  }
}
