
// Mappar numeriska värden till användarvänliga
// prioritet-överskrifter
const prios: Map<number, string> = new Map([
  [ 1, 'Hög'],
  [ 2, 'Normal'],
  [ 3, 'Låg']
]);

// Omvandla ett numeriskt värde till en prioritet-överskrift
export const toPrio = (priority: number): string => {
  return prios.get(priority) || 'Error';
}