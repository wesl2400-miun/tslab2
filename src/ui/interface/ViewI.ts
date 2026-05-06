import type { TodoList } from "../../logic/feature/TodoList.ts";

// Definierar strukturen för vyer som ska uppdateras av app-klassen
export interface ViewI {
  init: (todoList: TodoList) => void
}