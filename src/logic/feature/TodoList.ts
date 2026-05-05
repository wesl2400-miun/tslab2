import type { TodoI } from "../interface/TodoI.ts";
import { Todo } from "../model/Todo.ts";
import { ACTION } from "../refs/action.ts";
import { MEMORY } from "../refs/memory.ts";
import { MESSAGE } from "../refs/message.ts";
import { load, save } from "../utils/storage.ts";
import { valTodo } from "../utils/valTodo.ts";

export class TodoList {
  private todos: TodoI[];
  private message: string;

  constructor() {
    this.todos = [];
    this.loadFromLocalStorage();
    this.message = '';
    console.log(this.todos);
  }

  public getTodos = (): Todo[] => this.todos;

  public getMsg = () => this.message;

  public setMsg = (msg: string) => {
    this.message = msg;
  }

  public addTodo = (
    action: string,
    index: number,
    task: string,
    completed: boolean, 
    priority: string, 
    date: string): boolean => {
    const isValid: boolean = valTodo(task, 
      priority, date, this.setMsg);
    if(!isValid) return false;
    const backup = [...this.todos];
    switch(action) {
      case ACTION.ADD_TODO:
        this.add(task, 
          priority, date);
        break;
      case ACTION.EDIT_TODO:
        this.edit(index, task, 
          completed, priority, date);
        break;
    }
    try {
      this.saveToLocalStorage();
      this.setMsg(MESSAGE
        .TODO_ADDED);
      return true;
    } catch(err: any) {
      this.onBackup(backup, err);
      return false;
    }
  }

  public markTodoCompleted = (
    todoIndex: number): void => {
    const backup = [...this.todos];
    this.todos[todoIndex]
      .completed = true;
    try {
      this.saveToLocalStorage();
      this.setMsg(MESSAGE
        .TODO_COMPLETE);
    } catch(err: any) {
      this.onBackup(backup, err);
    }
  }

  private add = (task: string, 
    priority: string, 
    date: string): void => {
    const todo: TodoI = new Todo(task, 
      false, priority, date);
    this.todos.push(todo);
    todo.index = this.todos
      .indexOf(todo);
  }

  private edit = (index: number,
    task: string,
    completed: boolean,
    priority: string,
    date: string
  ) => {
    this.todos[index] = new Todo(task, 
      completed, priority, date);
  }

  private saveToLocalStorage = (): 
    void => {
    save(MEMORY.TODO_LIST, 
      this.todos);
  }

  private loadFromLocalStorage = (): 
    void => {
    this.todos = load(
      MEMORY.TODO_LIST) || [];
  }

  // Om localSotrage misslyckas, 
  // kommer todos backas till det föregående tillståndet
  // Detta hade inte behövts göras, om signaturen 
  // för saveToLocalStorage från uppgiften 
  // tillät parametrar eller returvärden
  private onBackup = (backup: TodoI[], 
    err: any) => {
    this.todos = backup;
    console.error(err.message);
    this.setMsg(MESSAGE
      .STORAGE_FAIL);
  }
}