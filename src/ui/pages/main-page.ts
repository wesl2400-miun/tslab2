import { App } from "../../logic/controller/App.ts";
import { TodoList } from "../../logic/feature/TodoList.ts";
import { NODE_ID } from "../refs/node-id.ts";
import { node } from "../utils/utils.ts";
import { TodoListV } from "../views/TodoListV.ts";

const tListNode = node(
  NODE_ID.TODO_LIST) as HTMLElement;
const addMsg = node(
  NODE_ID.ADD_MSG) as HTMLElement;
const addBtn = node(
  NODE_ID.ADD_BTN) as HTMLButtonElement;
const tNameInp = node(
  NODE_ID.TODO_NAME) as HTMLInputElement;
const tPrioInp = node(
  NODE_ID.TODO_PRIO) as HTMLInputElement;
const tDateInp = node(
  NODE_ID.TODO_DATE) as HTMLInputElement;

const todoList = new TodoList();

const app = new App(todoList);
console.log(tListNode)
const todoListV = new TodoListV(
  tListNode, addMsg, addBtn, 
  tNameInp, tPrioInp, tDateInp);
app.addView(todoListV);
app.init();
