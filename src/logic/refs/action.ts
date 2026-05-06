import type { Action } from "../interface/Action";

export const ACTION: Readonly<Action> = {
  READ_TODO: 'add_todo',
  EDIT_TODO: 'edit_todo',
  REMOVE_TODO: 'mark_todo'
}