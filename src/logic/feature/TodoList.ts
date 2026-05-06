import type { TodoI } from "../interface/TodoI.ts";
import { Todo } from "../model/Todo.ts";
import { MEMORY } from "../refs/memory.ts";
import { ERROR } from "../refs/error.ts";
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
    task: string,
    priority: string, 
    date: string): boolean => {
    const isValid: boolean = valTodo(task, 
      priority, date, this.setMsg);
    if(!isValid) return false;
    const backup: TodoI[] 
      = [...this.todos];
    const todo: TodoI = new Todo(
      task, false, priority, date);
    this.todos.push(todo);
    this.updateIndexes();
    return this.trySave(backup);
  }

  // Om localSotrage misslyckas, 
  // kommer todos backas till det föregående tillståndet
  // Detta hade inte behövts göras, om signaturen 
  // för saveToLocalStorage från uppgiften 
  // tillät parametrar eller returvärden
  private trySave = (
    backup: TodoI[]): boolean => {
    try {
      this.saveToLocalStorage();
      return true;
    } catch(err: any) {
      this.todos = backup;
      console.error(err.message);
      this.setMsg(ERROR
        .STORAGE_FAIL);
      return false;
    }
  }

  public markTodoCompleted = (
    todoIndex: number): void => {
    const backup: TodoI[] = 
      [...this.todos];
    this.todos[todoIndex]
      .completed = true;
    this.trySave(backup);
  }

  public edit = (
    index: number,
    task: string,
    completed: boolean,
    priority: string,
    date: string
  ): boolean => {
    const isValid: boolean = valTodo(task, 
      priority, date, this.setMsg);
    if(!isValid) return false;
    const backup: TodoI[] = 
      [...this.todos];
    this.todos[index] = new Todo(
      task, completed, priority, date);
    this.todos[index].index = index;
    return this.trySave(backup);
  }

  public remove = (
    index: number): boolean => {
    const backup = [...this.todos];
    this.todos = this.todos.filter(todo => 
      todo.index !== index);
    this.updateIndexes();
    return this.trySave(backup);
  }
  
  private updateIndexes = (): void => {
    const len = this.todos.length;
    for(let i = 0; i < len; i++) {
      this.todos[i].index = i;
    }
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
}