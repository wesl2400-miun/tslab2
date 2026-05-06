import type { TodoList } from "../feature/TodoList.ts";
import type { ViewI } from "../../ui/interface/ViewI.ts";

export class App {
  private todoList: TodoList;
  private views: ViewI[];

  constructor(todoList: TodoList) {
    this.todoList = todoList;
    this.views = [];
  }

  addView = (view: ViewI): void => {
    this.views.push(view);
  }

  refresh = (): void => {
    this.views.forEach(view => {
      view.refresh(this.todoList);
    })
  }
}