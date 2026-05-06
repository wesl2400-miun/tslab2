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
  }

  // Hämta todo-listan
  public getTodos = (): Todo[] => this.todos;

  // Hämta statusen för den nuvarande åtgärden
  public getMsg = () => this.message;

  // Uppdatera statusen för den nuvarande åtgärden
  public setMsg = (msg: string) => {
    this.message = msg;
  }

  // Lägg till en att-göra-uppgift i todo-listan
  public addTodo = (
    task: string,
    priority: number, 
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

  // Markera en att-göra-uppgift som klar
  public markTodoCompleted = (
    todoIndex: number): void => {
    const backup: TodoI[] = 
      [...this.todos];
    this.todos[todoIndex]
      .completed = true;
    this.trySave(backup);
  }

  // Redigera en vald att-göra-uppgift
  public edit = (
    index: number,
    task: string,
    completed: boolean,
    priority: number,
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

  // Ta bort en vald att-göra-uppgift
  public remove = (
    index: number): boolean => {
    const backup = [...this.todos];
    this.todos = this.todos.filter(todo => 
      todo.index !== index);
    this.updateIndexes();
    return this.trySave(backup);
  }
  

  // Uppdatera indexvärdena för alla att-göra-uppgufter
  private updateIndexes = (): void => {
    const len = this.todos.length;
    for(let i = 0; i < len; i++) {
      this.todos[i].index = i;
    }
  }

  // Lagra todo-listan i localStorage
  private saveToLocalStorage = (): 
    void => {
    save(MEMORY.TODO_LIST, 
      this.todos);
  }

  // Ladda upp todo-listan från localStorage
  private loadFromLocalStorage = (): 
    void => {
    this.todos = load(
      MEMORY.TODO_LIST) || [];
  }
}