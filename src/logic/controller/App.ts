import type { TodoList } from "../feature/TodoList.ts";
import type { ViewI } from "../../ui/interface/ViewI.ts";

// Hanterar kommunikationen mellan vyer och todo-listan
export class App {
  private todoList: TodoList;
  private views: ViewI[];

  constructor(todoList: TodoList) {
    this.todoList = todoList;
    this.views = [];
  }

  // Lägg till en vy som ska kommunicera med todo-listan
  addView = (view: ViewI): void => {
    this.views.push(view);
  }

  // Låt vyerna hämta todo-listan
  init = (): void => {
    this.views.forEach(view => {
      view.init(this.todoList);
    })
  }
}