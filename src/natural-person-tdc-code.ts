import { dateCode } from './date-code'
import { removeAccents } from './common'

export interface NaturalPerson {
  name: string
  firstLastName: string
  secondLastName: string
  day: number
  month: number
  year: number
}

export function naturalPersonTenDigitsCode(person: NaturalPerson): string {
  return new NameCode(person).toString() + birthdayCode(person)
}

// matches any ocurrence of the special particles as a word: '^foo | foo | foo$''
const specialParticlesRegex: RegExp = new RegExp(
  '(?:' +
    ['DE', 'LA', 'LAS', 'MC', 'VON', 'DEL', 'LOS', 'Y', 'MAC', 'VAN', 'MI']
      .map(p => `^${p} | ${p} | ${p}$`)
      .join('|') +
    ')',
  'g'
)

function birthdayCode(person: NaturalPerson): string {
  return dateCode(person.day, person.month, person.year)
}

class NameCode {
  private filteredPersonName: string

  constructor(private person: NaturalPerson) {
    this.filteredPersonName = this.getFilteredPersonName()
  }

  toString(): string {
    return this.obfuscateForbiddenWords(this.calculateCode())
  }

  private calculateCode(): string {
    if (this.isEmpty(this.person.firstLastName)) {
      return (
        this.normalize(this.person.secondLastName).substring(0, 2) +
        this.filteredPersonName.substring(0, 2)
      )
    } else if (this.isEmpty(this.person.secondLastName)) {
      return (
        this.normalize(this.person.firstLastName).substring(0, 2) +
        this.filteredPersonName.substring(0, 2)
      )
    } else if (this.isFirstLastNameIsTooShort()) {
      return (
        this.normalize(this.person.firstLastName).charAt(0) +
        this.normalize(this.person.secondLastName).charAt(0) +
        this.filteredPersonName.substring(0, 2)
      )
    } else {
      return (
        this.normalize(this.person.firstLastName).charAt(0) +
        this.firstVowelExcludingFirstCharacterOf(this.normalize(this.person.firstLastName)) +
        this.normalize(this.person.secondLastName).charAt(0) +
        this.filteredPersonName.charAt(0)
      )
    }
  }

  private obfuscateForbiddenWords(s: string): string {
    const match =
      s.match(
        /(BUE[IY]|CAC[AO]|CAGA|KOGE|KAKA|MAME|KOJO|[KQ]ULO|CAGO|CO[GJ]E|COJO|FETO|JOTO|KA[CG]O)/
      ) || s.match(/(MAMO|MEAR|M[EI]ON|MOCO|MULA|PED[AO]|PENE|PUT[AO]|RATA|RUIN)/)
    return match ? s.substring(0, 3) + 'X' : s
  }

  // filter out common names (if more than one is provided)
  private getFilteredPersonName(): string {
    const normalized = this.normalize(this.person.name)
    if (this.person.name.split(' ').length > 1) {
      return normalized.replace(/^(JOSE|MARIA|MA|MA\.)\s+/i, '')
    }
    return normalized
  }

  private normalize(s: string): string {
    return removeAccents(s.toUpperCase())
      .replace(/\s+/g, '  ') // double space to allow multiple special-particles matching
      .replace(specialParticlesRegex, '')
      .replace(/\s+/g, ' ') // reset space
      .trim()
  }

  private firstVowelExcludingFirstCharacterOf(s: string): string {
    let result: RegExpExecArray | null = /[aeiou]/i.exec(s.slice(1))
    if (!result) {
      return 'X'
    }
    return result[0]
  }

  private isFirstLastNameIsTooShort(): boolean {
    return this.normalize(this.person.firstLastName).length <= 2
  }

  private isEmpty(s: string): boolean {
    return s === null || typeof s === 'undefined' || this.normalize(s).length === 0
  }
}
