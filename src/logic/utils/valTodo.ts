import { ERROR } from "../refs/error.ts";

// Konstanta värden för validering
const MAX_CHAR: Readonly<number> = 36;
const MIN_CHAR: Readonly<number> = 5;
const PRIOS: Readonly<Array<number>> 
  = [1, 2, 3];

// Validera todo-beskriviningen
const valTask = (
  task: string): boolean => {
  if(task.trim().length === 0)
    return false;
  return task.length <= MAX_CHAR 
    && task.length > MIN_CHAR;
}

// Validerar todo-prioriteten
const valPrio = (
  prio: number): boolean => {
  return PRIOS.includes(prio);
}

// Validera datumet
const valDate = (
  date: string): boolean => {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if(!pattern.test(date)) return false;
  const time = date.split('-');
  const userDate = new Date(
    Number(time[0]),
    Number(time[1]) - 1,
    Number(time[2]));
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if(userDate < now) return false;
  return true;
}

// Validera en att-göra-uppgift
export const valTodo = (task: string, 
  priority: number, date: string, 
  setMsg: (msg: string) => void)
  : boolean => {
  if(!valPrio(priority)) {
    setMsg(ERROR
      .INVALID_PRIO);
    return false;
  } else if (!valTask(task)) {
    setMsg(ERROR
      .INVALID_TASK);
    return false;
  } else if(!valDate(date)) {
    setMsg(ERROR
      .INVALID_DATE);
    return false;
  }
  return true; 
}