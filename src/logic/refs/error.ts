import type { ErrorI } from "../interface/ErrorI.ts";

// Felmeddelanden
export const ERROR: Readonly<ErrorI> = {
  INVALID_TASK: '* FEL: Att-göra-uppgift måste vara mellan 5 till 36 tecken.',
  INVALID_DATE: '* FEL: Ogiltigt datum',
  INVALID_PRIO: '* FEL: Ogiltigt prioritetvärde',
  STORAGE_FAIL: '* FEL: LocalSotrage har misslyckats',
}