import type { MemoryI } from "../interface/MemoryI.ts";

// Nyckelordet för att hämta att-göra-listan från localStorage
export const MEMORY: Readonly<MemoryI> = {
  TODO_LIST: 'memory_todo_list'
}
