import { TodoList } from "../../logic/feature/TodoList.ts";
import type { ViewI } from "../interface/ViewI.ts";
import { TodoV } from "./TodoV.ts";

// Visar listan av att-göra-uppgifter och
// hanterar logiken bakom tilläggning av nya todos
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

  // Uppdatera todo-listan
  private update = (todoList: TodoList) => {
    this.root.innerHTML = '';
    todoList.getTodos().forEach(todo => {
      new TodoV(this.root, todo, todoList);
    });
  }

  // Initiera todo-element
  // Rensa addMsg-meddelandet 
  // när något av inmatningsfält fokuseras
  // Gör lägg-till-formuläret interaktivt
  public init = (todoList: TodoList): void => {
    const inputs = [this.tNameInp, 
      this.tPrioInput, this.tDateInp];
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        console.log('henlo')
        this.addMsg.innerHTML = '';
      });
    });
    this.update(todoList);
    this.wireAddBtn(todoList);
  }

  // Lägg till en att-göra-uppgift när addBtn-knappen klickas
  private wireAddBtn = (todoList: TodoList): void => {
    this.addBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const success = todoList.addTodo(
        this.tNameInp.value, 
        Number(this.tPrioInput.value),
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