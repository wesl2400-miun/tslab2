import { checkbox, newNode, selectbox, textfield } from "../utils/utils.ts";
import type { TodoI } from "../../logic/interface/TodoI.ts";
import { toPrio } from "../../logic/utils/toPrio.ts";
import type { TodoList } from "../../logic/feature/TodoList.ts";
import { ACTION } from "../../logic/refs/action.ts";
import type { TFormI } from "../interface/TFormI.ts";

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

  private initComp = (index: number): void => {
    const comp = newNode('p',
      this.root,'KLART');
    comp.classList.add('completed');
    const msg = newNode('p', this.root, null);
    msg.classList.add('error');
    this.wireActBtn(ACTION.REMOVE_TODO, 
      this.root, () => {
      this.onRemove(index, msg);
    });
  }

  private onRemove = (
    index: number, msg: HTMLElement): void => {
    const success = this.todoList
      .remove(index);
    if(success) {
      this.parent.removeChild(this.root);    
    } else {
      msg.textContent = 
        this.todoList.getMsg();
    }
  }

  public tForm = (): TFormI => {
    const { index, task,
      priority, date } = this.todo;
    const form = newNode('form', 
      this.root, null);
    form.classList.add('form-edit');
    const taskInp = textfield(form,
      `${index}edit-inp`, task);
    const prioSel = selectbox(`${index}sel-opts`,
      form, ['Hög', 'Normal', 'Låg'], priority);
    const dateInp = textfield(form,
      `${index}edit-inp`, date);
    return { form, taskInp, 
      prioSel, dateInp };
  }

  public initEdit = (): void => {
    this.root.innerHTML = '';
    newNode('h3', this.root, 'Redigera');
    const { form, taskInp, 
      prioSel, dateInp } = this.tForm();
    const msg = newNode('p', form, null);
    msg.classList.add('error');
    this.wireActBtn(ACTION.READ_TODO, 
      this.root, () => {
      this.onEdit(msg, taskInp, 
        prioSel, dateInp);
    });
  }

  private onEdit = (
    msg: HTMLElement,
    taskInp: HTMLInputElement,
    prioSel: HTMLInputElement,
    dateInp: HTMLInputElement): void => {
    const { index, completed} = this.todo;
    const success = this.todoList.edit(
      index, taskInp.value, completed,
      prioSel.value, dateInp.value);
    this.todo = this.todoList
      .getTodos()[index];
    if(success) {
      this.initRead();
    } else { 
      msg.textContent = 
        this.todoList.getMsg();
    }
  } 

  private wireCheckbox = (
    wrapType: string,
    parent: HTMLElement,
    index: number,
    completed: boolean): void => {
    const compCheck = checkbox(
      wrapType, parent, 'Markera som klart', 
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

  private wireActBtn = (
    action: string,
    parent: HTMLElement,
    onClick: () => void): void => {
    let actBtn = null;
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