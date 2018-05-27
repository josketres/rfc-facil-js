import RfcFacil from '../src/rfc-facil'
import { NaturalPerson } from '../src/natural-person-tdc-code'

describe('rfc', () => {
  it('should naturalPersonTenDigitsCode rfc for a natural person', () => {
    expect(
      RfcFacil.forNaturalPerson(
        person('Josué', 'Zarzosa', 'de la Torre', 5, 8, 1987)
      )
    ).toEqual('ZATJ870805CK6')
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
