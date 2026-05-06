import type { TodoList } from "../../logic/feature/TodoList.ts";

export interface ViewI {
  init: (todoList: TodoList) => void
}