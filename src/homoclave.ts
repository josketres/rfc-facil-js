const map: { [key: string]: string } = {
  ' ': '00',
  '0': '00',
  '1': '01',
  '2': '02',
  '3': '03',
  '4': '04',
  '5': '05',
  '6': '06',
  '7': '07',
  '8': '08',
  '9': '09',
  '&': '10',
  A: '11',
  B: '12',
  C: '13',
  D: '14',
  E: '15',
  F: '16',
  G: '17',
  H: '18',
  I: '19',
  J: '21',
  K: '22',
  L: '23',
  M: '24',
  N: '25',
  O: '26',
  P: '27',
  Q: '28',
  R: '29',
  S: '32',
  T: '33',
  U: '34',
  V: '35',
  W: '36',
  X: '37',
  Y: '38',
  Z: '39',
  Ñ: '40'
}

const digits: string = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ'

export default function calculate(fullName: string): string {
  const mappedFullName: string =
    '0' +
    normalize(fullName)
      .split('')
      .map(mapCharacterToTwoDigitsCode)
      .join('')

  const sum: number = sumPairsOfDigits(mappedFullName)
  const lastThreeDigits: number = sum % 1000
  const quo: number = lastThreeDigits / 34
  const reminder: number = lastThreeDigits % 34
  return digits.charAt(quo) + digits.charAt(reminder)
}

// remove accents without removing the Ñ (u0303)
// and remove special characters: .'-,
function normalize(input: string): string {
  return input
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u0302]/g, '')
    .replace(/[\u0304-\u036f]/g, '')
    .replace(/N\u0303/g, 'Ñ')
    .replace(/[-\.',]/g, '') // remove .'-,
}

function sumPairsOfDigits(input: string): number {
  let sum: number = 0
  for (let i = 0; i < input.length - 1; i++) {
    let firstPair: number = parseInt(input.substring(i, i + 2), 10)
    let secondPair: number = parseInt(input.substring(i + 1, i + 2), 10)
    sum += firstPair * secondPair
  }
  return sum
}

function mapCharacterToTwoDigitsCode(c: string): string {
  const m = map[c]
  if (!m) {
    throw Error(`No two-digit code mapping for char ${c}`)
  }
  return m
}
