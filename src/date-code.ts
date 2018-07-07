export function dateCode(day: number, month: number, year: number): string {
  return year.toString().slice(-2) + zeroPadded(month) + zeroPadded(day)
}

function zeroPadded(n: number): string {
  return ('00' + n).slice(-2)
}
