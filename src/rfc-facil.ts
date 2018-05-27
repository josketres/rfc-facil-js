import homoclave from './homoclave'
import verificationDigit from './verification-digit'
import {
  naturalPersonTenDigitsCode,
  NaturalPerson
} from './natural-person-tdc-code'

export default class RfcFacil {
  public static forNaturalPerson(person: NaturalPerson): string {
    const t: string = naturalPersonTenDigitsCode(person)
    const h: string = homoclave(naturalPersonFullName(person))
    const v: string = verificationDigit(t + h)
    return t + h + v
  }
}

function naturalPersonFullName(p: NaturalPerson): string {
  return `${p.firstLastName} ${p.secondLastName} ${p.name}`
}
