import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { Project } from '../../../model/project';
import { Todo } from '../../../model/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  userId: number | null = 1; // Set default or get from route
  user: User | undefined;
  project: Project[] | undefined = [];
  todo: Todo[] | undefined = [];
  content: boolean = true;

  constructor(private userService: UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.getUser();
  }

  getUser(): void {
    if (this.userId) {
      this.userService.findUser(this.userId).subscribe({
        next: (response) => {
          this.user = response;
          this.project = this.user.projects;
        },
        error: (err) => {
          console.error('Failed to fetch user', err);
        }
      });
    }
  }
  showProjectDetails(id:number){
   
    this.router.navigate(['/home/projectDetails', id]);
  }
  
}
