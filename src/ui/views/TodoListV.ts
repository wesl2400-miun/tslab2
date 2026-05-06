import { TodoList } from "../../logic/feature/TodoList.ts";
import type { ViewI } from "../interface/ViewI.ts";
import { TodoV } from "./TodoV.ts";

export class TodoListV implements ViewI {
  private root: HTMLElement;
  private addMsg: HTMLElement;
  private addBtn: HTMLButtonElement;
  private tNameInp: HTMLInputElement;
  private tPrioInput: HTMLInputElement;
  private tDateInp: HTMLInputElement;
  
  constructor(
    root: HTMLElement,
    addMsg: HTMLElement,
    addBtn: HTMLButtonElement,
    tNameInp: HTMLInputElement,
    tPrioInput: HTMLInputElement,
    tDateInp: HTMLInputElement) {
    this.root = root;
    this.addMsg = addMsg;
    this.addBtn = addBtn;
    this.tNameInp = tNameInp;
    this.tPrioInput = tPrioInput;
    this.tDateInp = tDateInp;
  }

  private update = (todoList: TodoList) => {
    this.root.innerHTML = '';
    todoList.getTodos().forEach(todo => {
      new TodoV(this.root, todo, todoList);
    });
  }

  public init = (todoList: TodoList): void => {
    this.update(todoList);
    this.addBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const success = todoList.addTodo(
        this.tNameInp.value, 
        this.tPrioInput.value,
        this.tDateInp.value);
      if(success) {
        this.update(todoList);
      } else {
        this.addMsg.textContent = 
          todoList.getMsg();
      }
    });
  }
}