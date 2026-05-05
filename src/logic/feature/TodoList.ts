import type { TodoI } from "../interface/TodoI.ts";
import { Todo } from "../model/Todo.ts";
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
    task: string,
    priority: string, 
    date: string): boolean => {
    const isValid: boolean = valTodo(task, 
      priority, date, this.setMsg);
    if(!isValid) return false;
    const backup: TodoI[] 
      = [...this.todos];
    const todo: TodoI = new Todo(
      task, priority, date);
    this.todos.push(todo);
    todo.index = this.todos
      .indexOf(todo);
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
      this.setMsg(MESSAGE
        .TODO_SAVED);
      return true;
    } catch(err: any) {
      this.todos = backup;
      console.error(err.message);
      this.setMsg(MESSAGE
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
    priority: string,
    date: string
  ): boolean => {
    const backup: TodoI[] = 
      [...this.todos];
    this.todos[index] = new Todo(
      task, priority, date);
    return this.trySave(backup);
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