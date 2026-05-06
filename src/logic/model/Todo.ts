import type { TodoI } from "../interface/TodoI.ts";

// Modelklassen för att-göra-uppgift
export class Todo implements TodoI {
  public index: number;
  public task: string;
  public completed: boolean;
  public priority: number;
  public date: string;

  constructor(task: string,
    completed: boolean,
    priority: number, 
    date: string) {
      this.index = -1;
      this.task = task;
      this.completed = completed;
      this.priority = priority;
      this.date = date;
  }
}