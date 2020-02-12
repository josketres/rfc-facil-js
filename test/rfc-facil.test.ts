import RfcFacil from '../src/rfc-facil'
import { NaturalPerson } from '../src/natural-person-tdc-code'

describe('rfc', () => {
  it('should build rfc for a natural person', () => {
    expect(
      RfcFacil.forNaturalPerson(person('Josué', 'Zarzosa', 'de la Torre', 5, 8, 1987))
    ).toEqual('ZATJ870805CK6')
  })

  it('should build rfc for a natural person with verification digit 1', () => {
    expect(RfcFacil.forNaturalPerson(person('Eliud', 'Orozco', 'Gomez', 11, 7, 1952))).toEqual(
      'OOGE520711151'
    )
  })

  it('should build rfc for a natural person with verification digit A', () => {
    expect(RfcFacil.forNaturalPerson(person('Saturnina', 'Angel', 'Cruz', 12, 11, 1921))).toEqual(
      'AECS211112JPA'
    )
  })

  it('should_build_rfc_for_a_juristic_person', () => {
    expect(
      RfcFacil.forJuristicPerson({
        name: 'AUTOS PULLMAN, S.A. DE C.V.',
        day: 30,
        month: 9,
        year: 1964
      })
    ).toEqual('APU640930KV9')
  })

  it('should build rfc for a natural person without vowel', () => {
    expect(RfcFacil.forNaturalPerson(person('MARIA SALOME', 'ELYD', 'SAENZ', 20, 1, 1958))).toEqual(
      'EXSS580120937'
    )
  })
})

function person(
  name: string,
  firstLastName: string,
  secondLastName: string,
  day: number,
  month: number,
  year: number
): NaturalPerson {
  return {
    name,
    firstLastName,
    secondLastName,
    day,
    month,
    year
  }
}
