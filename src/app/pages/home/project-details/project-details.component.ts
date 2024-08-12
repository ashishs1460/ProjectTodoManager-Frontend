import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../model/project';
import { ToastrService } from 'ngx-toastr';
import { ProjectUpdateRequest } from '../../../model/project-update-request';
import { TodoCreationRequest } from '../../../model/todo-creation-request';
import { Todo } from '../../../model/todo';
import { TodoRequest } from '../../../model/todo-request';
import Swal from 'sweetalert2';
import { TodoUpdateRequest } from '../../../model/todo-update-request';
import { TodoStatusUpdateRequest } from '../../../model/todo-status-update-request';
import { GistService } from '../../../services/gist.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectId: number;
  project: Project | undefined;
  todo: Todo[] = [];
  status: string;
  isEditProjectModalOpen = false;
  isAddTaskModalOpen = false;
  isUpdateTaskModalOpen = false;
  editedProjectName = '';
  taskDescription = '';
  currentTodoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toaster: ToastrService,
    private gistService: GistService
  ) {}

  ngOnInit(): void {
   
    const idParam = this.route.snapshot.paramMap.get('id');
    this.projectId = idParam ? +idParam : 0;
    this.getProject();

   
  }

  private handleOAuthCallback(): void {
   
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');
    const savedState = localStorage.getItem('oauth_state'); 

    if (code && state && state === savedState) { 
      
      this.gistService.getGithubToken(code).subscribe({
        next: (response) => {
          const accessToken = response.access_token;
          const gistData = {
            description: `Project summary for ${this.project?.title}`,
            public: false,
            files: {
              [`${this.project?.title}.md`]: {
                content: this.generateMarkdown()
              }
            }
          };

          this.gistService.createGist(accessToken, gistData).subscribe({
            next: () => {
              this.toaster.success("Gist created successfully!");
            },
            error: (err) => {
              this.toaster.error("Failed to create Gist.");
              console.error(err);
            }
          });
        },
        error: (err) => {
          console.error('Failed to exchange code for token', err);
        }
      });
    }
  }

  getProject(): void {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (response) => {
        this.project = response;
        this.todo = this.project.todos;
        this.editedProjectName = this.project.title;  // Initialize with current project name
        this.handleOAuthCallback();
      },
      error: (err) => {
        console.error('Failed to fetch project', err);
      }
    });
  }

  openEditProjectModal(): void {
    this.isEditProjectModalOpen = true;
  }

  closeEditProjectModal(): void {
    this.isEditProjectModalOpen = false;
    this.editedProjectName = this.project?.title || '';
  }

  openAddTaskModal(): void {
    this.isAddTaskModalOpen = true;
    this.taskDescription = '';  // Reset the task description
    this.currentTodoId = null;
  }

  openUpdateTaskModal(item: Todo): void {
    this.isUpdateTaskModalOpen = true;
    this.taskDescription = item.description;
    this.currentTodoId = item.id;
  }

  closeTaskModal(): void {
    this.isAddTaskModalOpen = false;
    this.isUpdateTaskModalOpen = false;
  }

  updateProject(): void {
    if (!this.editedProjectName.trim()) {
      this.toaster.error("Project name can't be empty!");
    } else if (this.editedProjectName === this.project?.title) {
      this.toaster.info("No changes were made to the project name.");
    } else {
      const req: ProjectUpdateRequest = {
        projectId: this.projectId,
        updatedName: this.editedProjectName
      };
      this.projectService.updateProject(req).subscribe({
        next: (response) => {
          this.getProject();
          this.toaster.success("Project name updated successfully!");
          this.closeEditProjectModal();
        },
        error: (error) => {
          this.toaster.error("Project name update failed!");
        }
      });
    }
  }

  addTask(): void {
    if (!this.taskDescription.trim()) {
      this.toaster.error("Task description can't be empty!");
    } else {
      const req: TodoCreationRequest = {
        projectId: this.projectId,
        description: this.taskDescription
      };
      this.projectService.createTodo(req).subscribe({
        next: (response) => {
          this.getProject();
          this.toaster.success("Task added successfully!");
          this.closeTaskModal();
        },
        error: (error) => {
          this.toaster.error("Failed to add task!");
        }
      });
    }
  }

  updateTask(): void {
    if (!this.taskDescription.trim()) {
      this.toaster.error("Task description can't be empty!");
    } else {
      const req: TodoUpdateRequest = {
        updatedDescription: this.taskDescription,
        projectId: this.projectId,
        todoId: this.currentTodoId
      };
      this.projectService.updateTodo(req).subscribe({
        next: (response) => {
          this.getProject();
          this.toaster.success("Task updated successfully!");
          this.closeTaskModal();
        },
        error: (error) => {
          this.toaster.error("Task update failed!");
        }
      });
    }
  }

  deleteTodo(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const req: TodoRequest = {
          projectId: this.projectId,
          todoId: id
        };
        this.projectService.deleteTodo(req).subscribe({
          next: (response) => {
            this.getProject();
            this.toaster.success("Task deleted successfully!");
          },
          error: (error) => {
            this.toaster.error("Unable to delete!");
          }
        });
      }
    });
  }

  updateStatus(item: Todo): void {
    this.status = item.status === "PENDING" ? "COMPLETE" : "PENDING";
    this.currentTodoId = item.id;
    const req: TodoStatusUpdateRequest = {
      projectId: this.projectId,
      todoId: this.currentTodoId,
      status: this.status
    };
    this.projectService.updateProjectStatus(req).subscribe({
      next: (response) => {
        this.getProject();
        this.toaster.success("Status updated successfully!");
      },
      error: (error) => {
        this.toaster.error("Status update failed!");
      }
    });
  }

  generateMarkdown(): string {
    if (!this.project) {
      return '';
    }

    const title = `# ${this.project.title}\n\n`;
    const totalTodos = this.todo.length;
    const completedTodos = this.todo.filter(todo => todo.status === 'COMPLETE').length;
    const summary = `**Summary:** ${completedTodos} / ${totalTodos} completed\n\n`;

    let pendingTasks = '## Pending Tasks\n';
    let completedTasks = '## Completed Tasks\n';

    this.todo.forEach(item => {
      if (item.status === 'PENDING') {
        pendingTasks += `- [ ] ${item.description}\n`;
      } else if (item.status === 'COMPLETE') {
        completedTasks += `- [x] ${item.description}\n`;
      }
    });

    return title + summary + pendingTasks + '\n' + completedTasks;
  }

  exportAsGist(): void {
    const markdownContent = this.generateMarkdown();
    const gistData = {
      description: `Project summary for ${this.project?.title}`,
      public: false,
      files: {
        [`${this.project?.title}.md`]: {
          content: markdownContent
        }
      }
    };

    this.downloadMarkdownFile(`${this.project?.title}.md`, markdownContent);

    const clientId = 'Ov23liaBWWxDIVoTIIlM'; 
    const redirectUri = `https://project-todo-manager-frontend.vercel.app/home/projectDetails/${this.projectId}`; 
    const state = this.generateState();

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=gist&state=${state}`;
    localStorage.setItem('oauth_state', state); 

    window.location.href = githubAuthUrl; 
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  }
  private downloadMarkdownFile(fileName: string, content: string): void {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
}
