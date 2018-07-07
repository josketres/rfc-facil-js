import { JuristicPerson, juristicPersonTenDigitsCode } from '../src/juristic-person-tdc-code'

describe('juristic-person ten-digits-code (tdc-code) calculator', () => {
  it('should_take_first_letters_from_the_first_three_words_from_legal_name', () => {
    expect(
      juristicPersonTenDigitsCode(person('Sonora Industrial Azucarera, S. de R.L.', 29, 11, 1982))
    ).toMatch(/^SIA/)
  })
})

function person(name: string, day: number, month: number, year: number): JuristicPerson {
  return {
    name,
    day,
    month,
    year
  }
}
