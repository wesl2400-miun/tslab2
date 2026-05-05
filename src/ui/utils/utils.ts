
// Hämta ett existerande HTML-element
export const node = (ref: string): 
  HTMLInputElement | HTMLElement | null => {
    return document.getElementById(ref);
}

// Skapa ett nytt HTML-element
export const newNode = (type: string, 
  parent: HTMLElement, 
  text: string | null):
  HTMLElement => {
  const elmnt = document.createElement(type);
  if(text) elmnt.textContent = text;
  parent.appendChild(elmnt);
  return elmnt;
}

// Skapa en kryssruta
export const checkbox = (
  parent: HTMLElement, 
  title: string, 
  id: string): HTMLInputElement => {
  const form = newNode(
    'form', parent, null);
  form.classList.add('checkbox');
  const input = newNode('input', 
    form, null) as HTMLInputElement;
  input.type = 'checkbox';
  input.id = id;
  input.name = id;
  const label = newNode('label', form, title);
  label.setAttribute('for', id);
  return input;
}
