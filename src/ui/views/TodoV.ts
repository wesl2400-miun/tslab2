import { checkbox, newNode, selectbox, textfield } from "../utils/utils.ts";
import type { TodoI } from "../../logic/interface/TodoI.ts";
import { toPrio } from "../../logic/utils/toPrio.ts";
import type { TodoList } from "../../logic/feature/TodoList.ts";
import { ACTION } from "../refs/action.ts";
import type { TFormI } from "../interface/TFormI.ts";

// Hanterar ett todo-element
export class TodoV {
  private parent: HTMLElement;
  private root: HTMLElement;
  private todo: TodoI;
  private todoList: TodoList;

  constructor(
    parent: HTMLElement, 
    todo: TodoI,
    todoList: TodoList,
    ) {
    this.parent = parent;
    this.root = newNode(
      'li', parent, null);
    this.todo = todo;
    this.todoList = todoList;
    this.initRead();
  }

  // Visa informationen om en specifik att-göra-uppgift
  public initRead = (): void => {
    this.root.innerHTML = '';
    const { index, task, completed, 
      priority, date } = this.todo;
    newNode('p', this.root, task);
    newNode('p', this.root, 
      `Prioritet: ${toPrio(priority)}`);
    newNode('p',this.root,
      `Klart senast: ${date}`);
    if(completed) {
      this.initComp(index);
    } else {
      this.wireCheckbox('form', 
      this.root, index, completed);
      this.wireActBtn(ACTION.EDIT_TODO, 
        this.root, () => {
        this.initEdit();
      });
    }
  }

  // Om att-göra-uppgift är klar visa
  // 'klart'-överskrift och initiera ta-bort-knappen
  private initComp = (index: number): void => {
    const comp: HTMLElement = 
      newNode('p',this.root,'KLART');
    comp.classList.add('completed');
    const msg: HTMLElement = 
      newNode('p', this.root, null);
    msg.classList.add('error');
    this.wireActBtn(ACTION.REMOVE_TODO, 
      this.root, () => {
      this.onRemove(index, msg);
    });
  }

  // Ta bort ett todo-element
  private onRemove = (
    index: number, 
    msg: HTMLElement): void => {
    const success: boolean = 
      this.todoList.remove(index);
    if(success) {
      this.parent.removeChild(this.root);    
    } else {
      msg.textContent = 
        this.todoList.getMsg();
    }
  }

  // Returnera ett redigeringsformulär
  public tForm = (): TFormI => {
    const { index, task,
      priority, date } = this.todo;
    const form: HTMLElement = 
      newNode('form', this.root, null);
    form.classList.add('form-edit');
    const taskInp: HTMLInputElement = 
      textfield(form, 
      `${index}edit-inp`, task);
    const prioSel: HTMLInputElement = 
      selectbox(`${index}sel-opts`, form, 
        ['Hög', 'Normal', 'Låg'], priority);
    const dateInp: HTMLInputElement = 
      textfield(form,
      `${index}edit-inp`, date);
    return { form, taskInp, 
      prioSel, dateInp };
  }

  // Visa redigeringsformuläret
  public initEdit = (): void => {
    this.root.innerHTML = '';
    newNode('h3', this.root, 'Redigera');
    const { form, taskInp, 
      prioSel, dateInp } = this.tForm();
    const msg: HTMLElement = 
      newNode('p', form, null);
    msg.classList.add('error');
    this.wireActBtn(ACTION.READ_TODO, 
      this.root, () => {
      this.onEdit(msg, taskInp, 
        prioSel, dateInp);
    });
  }

  // Redigera ett todo-element
  private onEdit = (
    msg: HTMLElement,
    taskInp: HTMLInputElement,
    prioSel: HTMLInputElement,
    dateInp: HTMLInputElement): void => {
    const { index, completed} = this.todo;
    const success: boolean = 
      this.todoList.edit(index, 
        taskInp.value, completed,
        Number(prioSel.value), 
        dateInp.value);
    this.todo = this.todoList
      .getTodos()[index];
    if(success) {
      this.initRead();
    } else { 
      msg.textContent = 
        this.todoList.getMsg();
    }
  } 

  //Låt kryssrutan markera todos som klara
  private wireCheckbox = (
    wrapType: string,
    parent: HTMLElement,
    index: number,
    completed: boolean): void => {
    const compCheck: HTMLInputElement = 
      checkbox(wrapType, parent, 
        'Markera som klart', 
      `${index}comp-check`);
    compCheck.checked = completed;
    compCheck.addEventListener(
      'click', () => {
      this.todoList
        .markTodoCompleted(index);
      this.todo = this.todoList
        .getTodos()[index];
      this.initRead();
    });
  }

  // Skapa en knapp beroende på den nuvarande 
  // vyns specificerade åtgärd
  private wireActBtn = (
    action: string,
    parent: HTMLElement,
    onClick: () => void): void => {
    let actBtn: any = null;
    switch(action) {
      case ACTION.EDIT_TODO:
        actBtn = newNode(
          'button', this.root, 
          'Redigera') as HTMLButtonElement;
        break;
      case ACTION.READ_TODO:
        actBtn = newNode(
          'input', parent, 
          null) as HTMLButtonElement;
        actBtn.type = 'submit';
        actBtn.value = 'Spara';
        break;
      case ACTION.REMOVE_TODO:
        actBtn = newNode(
          'button', this.root, 
          'Ta bort') as HTMLButtonElement;
        break;
    }
    actBtn.classList.add('todo-btn');
    actBtn.addEventListener('click', () => {
      onClick();
    });
  }
}