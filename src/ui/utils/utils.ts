
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
