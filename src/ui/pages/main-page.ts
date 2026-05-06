import { App } from "../../logic/controller/App.ts";
import { TodoList } from "../../logic/feature/TodoList.ts";
import { NODE_ID } from "../refs/node-id.ts";
import { node } from "../utils/utils.ts";
import { TodoListV } from "../views/TodoListV.ts";


const tListNode = node(
  NODE_ID.TODO_LIST) as HTMLElement;
const todoList = new TodoList();

const app = new App(todoList);
console.log(tListNode)
const todoListV = new TodoListV(tListNode);
app.addView(todoListV);
app.refresh();
