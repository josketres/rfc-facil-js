import { forNaturalPerson } from '../src/rfc'
import { NaturalPerson } from '../src/tdc-code'

describe('rfc', () => {
  it('should calculate rfc for a natural person', () => {
    expect(
      forNaturalPerson(person('Josué', 'Zarzosa', 'de la Torre', 5, 8, 1987))
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
