import { Project } from "./project";

// todo.model.ts
export interface Todo {
    id: number;
    description: string;
    status: string;
    createdDate: string; 
    updatedDate: string; 
    project: Project; 
  }
  