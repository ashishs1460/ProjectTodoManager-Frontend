import { Todo } from "./todo";
import { User } from "./user";

export interface Project {
    id: number;
    title: string;
    createdDate: string; // Use string to match LocalDate format (ISO string)
    todos: Todo[]; // Assuming you might use a list of Todo items
    user: User; // Reference to the User entity
  }