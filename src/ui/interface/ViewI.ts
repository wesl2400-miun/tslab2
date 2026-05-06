import type { TodoList } from "../../logic/feature/TodoList.ts";

export interface ViewI {
  refresh: (todoList: TodoList) => void
}