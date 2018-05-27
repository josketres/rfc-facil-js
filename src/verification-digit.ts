const map: { [key: string]: number } = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 18,
  J: 19,
  K: 20,
  L: 21,
  M: 22,
  N: 23,
  '&': 24,
  O: 25,
  P: 26,
  Q: 27,
  R: 28,
  S: 29,
  T: 30,
  U: 31,
  V: 32,
  W: 33,
  X: 34,
  Y: 35,
  Z: 36,
  ' ': 37,
  Ñ: 38
}

export default function calculate(rfc12Digits: string): string {
  const sum: number = rfc12Digits
    .split('')
    .map(c => map[c.toUpperCase()] || 0)
    .reduce(
      (sum: number, current: number, index: number) =>
        sum + current * (13 - index),
      0
    )
  const reminder: number = sum % 11
  if (reminder === 0) {
    return '0'
  } else {
    return (11 - reminder).toString(16).toUpperCase() // from 1 to A (hex)
  }
}
