
// Definierar strukturen för en att-göra-uppgift
export interface TodoI {
  index: number,
  task: string,
  completed: boolean,
  priority: number,
  date: string;
}