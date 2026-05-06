import { TodoList } from "../../logic/feature/TodoList.ts";
import type { ViewI } from "../interface/ViewI.ts";
import { TodoV } from "./TodoV.ts";

export class TodoListV implements ViewI {
  private root: HTMLElement;
  
  constructor(root: HTMLElement) {
    console.log('root', root)
    this.root = root;
  }

  refresh = (todoList: TodoList): void => {
    todoList.getTodos().forEach(todo => {
      new TodoV(this.root, todo, todoList);
    })
  }
}