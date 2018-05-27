import homoclave from './homoclave'
import verificationDigit from './verification-digit'
import { calculate as tenDigitsCode, NaturalPerson } from './tdc-code'

export function forNaturalPerson(person: NaturalPerson): string {
  const t: string = tenDigitsCode(person)
  const h: string = homoclave(fullName(person))
  const v: string = verificationDigit(t + h)
  return t + h + v
}

function fullName(p: NaturalPerson): string {
  return `${p.firstLastName} ${p.secondLastName} ${p.name}`
}
