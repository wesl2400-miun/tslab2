import type { TodoI } from "../interface/TodoI.ts";

export class Todo implements TodoI {
  public index: number;
  public task: string;
  public completed: boolean;
  public priority: string;
  public date: string;

  constructor(task: string,
    priority: string, 
    date: string) {
      this.index = -1;
      this.task = task;
      this.completed = false;
      this.priority = priority;
      this.date = date;
  }
}