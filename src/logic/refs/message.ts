import type { MessageI } from "../interface/MessageI.ts";

// Något av dessa meddelanden visas när kursen läggs till kurslistan
export const MESSAGE: Readonly<MessageI> = {
  INVALID_TASK: '* FEL: Att-göra-uppgift måste vara mellan 5 till 36 tecken.',
  INVALID_DATE: '* FEL: Ogiltigt datum',
  INVALID_PRIO: '*FEL: Ogiltigt prioritetvärde',
  STORAGE_FAIL: '* FEL: LocalSotrage har misslyckats',
  TODO_ADDED: '* KLART: Att-göra uppgiften har lagts till listan',
  TODO_EDITED: '* KLART: Att-göra uppgiften har redigerats',
  TODO_COMPLETE: '* KLART: Att-göra uppgiften har markerats som utförd'
}