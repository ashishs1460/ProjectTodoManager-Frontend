import { Project } from "./project";

// todo.model.ts
export interface Todo {
    id: number;
    description: string;
    status: string;
    createdDate: string; // Use string to match LocalDate format (ISO string)
    updatedDate: string; // Use string to match LocalDate format (ISO string)
    project: Project; // Reference to the Project entity
  }
  