import { Component } from '@angular/core';
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

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {
  projectId: number;
  project: Project | undefined;
  todo: Todo[] = [];
  isEditProjectModalOpen: boolean = false;
  isAddTaskModalOpen: boolean = false;
  isUpdateTaskModalOpen: boolean = false;
  editedProjectName: string = '';
  taskDescription: string = '';
  currentTodoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.getProject();
  }

  getProject(): void {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (response) => {
        this.project = response;
        this.todo = this.project.todos;
        this.editedProjectName = this.project.title;  // Initialize with current project name
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

  openUpdateTaskModal(item:Todo): void {
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
          this.toaster.error("Project name updation failed!");
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
      const req:TodoUpdateRequest={
        updatedDescription:this.taskDescription,
        projectId:this.projectId,
        todoId:this.currentTodoId
      }
      this.projectService.updateTodo(req).subscribe({
        next:(response)=>{
          this.getProject();
          this.toaster.success("Task updated successfully!");
          this.closeTaskModal();
        },error:(error)=>{
          this.toaster.error("Task failed to upate!");
        }
      })
     
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
}
