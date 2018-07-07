export function removeAccents(input: string): string {
  return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
