import { toPrio } from "../../logic/utils/toPrio";

// Hämta ett existerande HTML-element
export const node = (ref: string): 
  HTMLInputElement | HTMLElement | null => {
    return document.getElementById(ref);
}

// Skapa ett nytt HTML-element
export const newNode = (type: string, 
  parent: HTMLElement, 
  text: string | null):HTMLElement 
  | HTMLInputElement | HTMLButtonElement => {
  const elmnt = document.createElement(type);
  if(text) elmnt.textContent = text;
  parent.appendChild(elmnt);
  return elmnt;
}

// Skapa en kryssruta
export const checkbox = (
  wrapType: string,
  parent: HTMLElement, 
  title: string, 
  id: string): HTMLInputElement => {
  const wrapper = newNode(
    wrapType, parent, null);
  wrapper.classList.add('checkbox');
  const label = newNode('label', 
    wrapper, title);
  label.setAttribute('for', id);
  const input = newNode('input', 
    wrapper, null) as HTMLInputElement;
  input.type = 'checkbox';
  input.id = id;
  input.name = id;
  return input;
}

// Skapa ett inmatningsfält 
export const textfield = (parent: HTMLElement, 
  id: string, value: string): HTMLInputElement => {
  const input = newNode('input', 
    parent, null) as HTMLInputElement;
  input.type = 'text';
  input.id = id;
  input.name = id;
  input.value = value;
  return input;
}

// Skapa en rullista
export const selectbox = (
  id: string,
  parent: HTMLElement,
  options: string[],
  selOpt: string
): HTMLInputElement => {
  const select = newNode(
    'select', parent, 
    null) as HTMLInputElement;
  select.id = id;
  select.name = id;
  let optNr = 1;
  options.forEach(opt => {
    const option = newNode(
      'option', select, 
      opt) as HTMLInputElement;
    option.value = `${optNr}`;
    if(toPrio(selOpt) === opt)
      option.setAttribute(
        'selected', 'true');
    optNr++;});
  return select;
}