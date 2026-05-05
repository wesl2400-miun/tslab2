import { MESSAGE } from "../refs/message.ts";

const MAX_CHAR: Readonly<number> = 36;
const MIN_CHAR: Readonly<number> = 5;
const PRIOS: Readonly<Array<string>> 
  = ['1', '2', '3'];

const valTask = (
  task: string): boolean => {
  if(task.trim().length === 0)
    return false;
  return task.length <= MAX_CHAR 
    && task.length > MIN_CHAR;
}

const valPrio = (
  prio: string): boolean => {
  return PRIOS.includes(prio);
}

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

export const valTodo = (task: string, 
  priority: string, date: string, 
  setMsg: (msg: string) => void)
  : boolean => {
  if(!valPrio(priority)) {
    setMsg(MESSAGE
      .INVALID_PRIO);
    return false;
  } else if (!valTask(task)) {
    setMsg(MESSAGE
      .INVALID_TASK);
    return false;
  } else if(!valDate(date)) {
    setMsg(MESSAGE
      .INVALID_DATE);
    return false;
  }
  setMsg(MESSAGE.TODO_ADDED);
  return true; 
}