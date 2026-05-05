import { checkbox, newNode } from "../utils/utils.ts";
import type { TodoI } from "../../logic/interface/TodoI.ts";

export class TodoView {
  private root: HTMLElement;
  private todo: TodoI;
  private index: number;

  constructor(
    parent: HTMLElement, 
    todo: TodoI,
    index: number) {
    this.root = newNode(
      'li', parent, null);
    this.todo = todo;
    this.index = index;
    this.initForRead();
  }

  private initForRead = (): void => {
    const { task, completed, 
      priority, date } = this.todo;
    newNode('p', this.root, task);
    newNode('p', this.root, 
      `Prioritet: ${priority}`);
    newNode('p',this.root,
      `Klart senast: ${date}`);
    const compCheck = checkbox(
      this.root, 'Klar', 
      `${this.index}comp-check`);
    compCheck.checked = completed;
    compCheck.addEventListener(
      'click', () => {
      console.log('im working');
    });
  }

  
}