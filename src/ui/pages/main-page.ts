import { Todo } from "../../logic/model/Todo.ts";
import { node } from "../utils/utils.ts";
import { TodoView } from "../views/TodoView.ts";




const test = node('test') as HTMLElement;
new TodoView(test, new Todo(
  'Gå ut med hunden Fluffy',
  false,
  '1',
  '2026-06-01'), 0);