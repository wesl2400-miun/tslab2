
const prios = new Map([
  ['1', 'Hög'],
  ['2', 'Normal'],
  ['3', 'Låg']
]);

export const toPrio = (priority: string): string => {
  return prios.get(priority) || 'Error';
}