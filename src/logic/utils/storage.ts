
// Omvandla ett objekt till JSON-format och spara i localStorage
export const save = (key: string, obj: any): void => {
  const json = JSON.stringify(obj);
  localStorage.setItem(key, json);
}

// Hämta JSON-formaterad data från LocalStorage och omvandla den till ett JavaScript-objekt
export const load = (key: string): any => {
  const json = localStorage.getItem(key);
  if(!json) return null;
  return JSON.parse(json);
}