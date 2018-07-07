import { dateCode } from './date-code'
import { removeAccents } from './common'

export interface JuristicPerson {
  name: string
  day: number
  month: number
  year: number
}

export const juristicPersonTenDigitsCode = (person: JuristicPerson): string =>
  nameCode(person.name) + dateCode(person.day, person.month, person.year)

const pipe = (...ops: any[]) => ops.reduce((a: any, b: any) => (arg: any) => b(a(arg)))

const toUpperCase = (s: string) => s.toUpperCase()

const trim = (s: string) => s.trim()

const normalize: (input: string) => string = pipe(
  toUpperCase,
  removeAccents,
  trim
)

const ignoreJuristicPersonTypeAbbreviations = (input: string) =>
  input
    .replace(/S\.?\s?EN\s?N\.?\s?C\.?/g, '')
    .replace(/S\.?\s?EN\s?C\.?\s?POR\s?A\.?/g, '')
    .replace(/S\.?\s?EN\s?C\.?/g, '')
    .replace(/S\.?\s?DE\s?R\.?\s?L\.?/g, '')
    .replace(/S\.?\s?DE\s?R\.?\s?L\.?\s?DE\s?C\.?\s?V\.?/g, '')
    .replace(/S\.?\s?A\.?\s?DE\s?C\.?\s?V\.?/g, '')
    .replace(/A\.?\s?EN\s?P\.?/, '')
    .replace(/S\.?\s?C\.?\s?[LPS]\.?/, '')
    .replace(/S\.?\s?[AC]\.?/, '')
    .replace(/S\.?\s?N\.?\s?C\.?/, '')
    .replace(/A\.?\s?C\.?/, '')

const splitWords = (input: string) => input.split(/[,\s]+/)

/*
* This list is based on Anexo V from the official documentation
* but some words have been commented out because the examples from
* the same documentation contradict the list
*/
const forbiddenWords = [
  '',
  'EL',
  'LA',
  'DE',
  'LOS',
  'LAS',
  'Y',
  'DEL',
  'MI',
  'POR',
  'CON',
  /*'AL',*/ 'SUS',
  'E',
  'PARA',
  'EN',
  'MC',
  'VON',
  'MAC',
  'VAN',
  'COMPANIA',
  'CIA',
  'CIA.',
  'SOCIEDAD',
  'SOC',
  'SOC.',
  'COMPANY',
  'CO',
  /*'COOPERATIVA', 'COOP',*/
  'SC',
  'SCL',
  'SCS',
  'SNC',
  'SRL',
  'CV',
  'SA',
  'THE',
  'OF',
  'AND',
  'A'
]

const ignoreForbiddenWords = (words: string[]) =>
  words.filter((w: string) => forbiddenWords.indexOf(w) === -1)

const markOneLetterAbbreviations = (words: string[]) =>
  words.map((w: string) => w.replace(/^([^.])\./g, '$1AABBRREEVVIIAATTIIOONN'))

const expandSpecialCharactersInSingletonWord = (words: string[]) => {
  if (words.length === 1) {
    return [
      words[0]
        .replace('@', 'ARROBA')
        .replace('´', 'APOSTROFE')
        .replace('%', 'PORCIENTO')
        .replace('#', 'NUMERO')
        .replace('!', 'ADMIRACION')
        .replace('.', 'PUNTO')
        .replace('$', 'PESOS')
        .replace('"', 'COMILLAS')
        .replace('-', 'GUION')
        .replace('/', 'DIAGONAL')
        .replace('+', 'SUMA')
        .replace('(', 'ABRE PARENTESIS')
        .replace(')', 'CIERRA PARENTESIS')
        .split(' ')
    ]
  }
  return words
}

const ignoreSpecialCharactersInWords = (words: string[]) =>
  words.map(w => w.replace('(.+?)[@´%#!.$"-/+()](.+?)', '$1$2'))

const splitOneLetterAbbreviations = (words: string[]) =>
  words.reduce((acc: string[], w: string) => {
    acc.push(...w.split('AABBRREEVVIIAATTIIOONN'))
    return acc
  }, [])

const threeDigitsCode = (words: string[]) => {
  if (words.length >= 3) {
    return '' + words[0].charAt(0) + words[1].charAt(0) + words[2].charAt(0)
  } else if (words.length == 2) {
    return '' + words[0].charAt(0) + words[1].substring(0, 2)
  } else {
    return firstThreeCharactersWithRightPad(words[0])
  }
}

const firstThreeCharactersWithRightPad = (word: string) =>
  word.length >= 3 ? word.substring(0, 3) : word.padEnd(3, 'X')

const nameCode: (input: string) => string = pipe(
  normalize,
  ignoreJuristicPersonTypeAbbreviations,
  splitWords,
  ignoreForbiddenWords,
  markOneLetterAbbreviations,
  expandSpecialCharactersInSingletonWord,
  ignoreSpecialCharactersInWords,
  splitOneLetterAbbreviations,
  threeDigitsCode
)
