import type { ActionI } from "../interface/ActionI.ts"

// Flaggor för olika åtgärder för todolistan
export const ACTION: Readonly<ActionI> = {
  READ_TODO: 'add_todo',
  EDIT_TODO: 'edit_todo',
  REMOVE_TODO: 'mark_todo'
}