import { JuristicPerson, juristicPersonTenDigitsCode } from '../src/juristic-person-tdc-code'

describe('juristic-person ten-digits-code (tdc-code) calculator', () => {
  // rule 1
  it('should_take_first_letters_from_the_first_three_words_from_legal_name', () => {
    expect(
      juristicPersonTenDigitsCode(fromName('Sonora Industrial Azucarera, S. de R.L.'))
    ).toMatch(/^SIA/)
  })

  // rule 2 part 1
  it('should_take_creation_date_in_format_yy_mm_dd', () => {
    expect(
      juristicPersonTenDigitsCode(person('Sonora Industrial Azucarera, S. de R.L.', 29, 11, 1982))
    ).toEqual('SIA821129')
  })

  // rule 2 part 2
  it('should_prepend_zero_to_one_digit_numbers_in_creation_date', () => {
    expect(
      juristicPersonTenDigitsCode(person('Sonora Industrial Azucarera, S. de R.L.', 5, 2, 1983))
    ).toMatch(/830205$/)

    expect(
      juristicPersonTenDigitsCode(person('Sonora Industrial Azucarera, S. de R.L.', 5, 12, 1983))
    ).toMatch(/831205$/)

    expect(
      juristicPersonTenDigitsCode(person('Sonora Industrial Azucarera, S. de R.L.', 15, 2, 1983))
    ).toMatch(/830215$/)
  })

  // no test for rule 3

  // rule 4
  it('should_consider_abreviations_as_if_they_where_words', () => {
    expect(juristicPersonTenDigitsCode(fromName('F.A.Z., S.A.'))).toMatch(/^FAZ/)
    expect(juristicPersonTenDigitsCode(fromName('U.S. Ruber Mexicana, S.A.'))).toMatch(/^USR/)
    expect(juristicPersonTenDigitsCode(fromName('H. Prieto y Martínez, S. de R.L.'))).toMatch(
      /^HPM/
    )
  })

  // rule 5
  it('should_ignore_all_juristic_person_type_abreviations', () => {
    expect(
      juristicPersonTenDigitsCode(fromName('Guantes Industriales Guadalupe, S. en C.'))
    ).toMatch(/^GIG/)
    expect(
      juristicPersonTenDigitsCode(fromName('Construcciones Metálicas Mexicanas, S.A.'))
    ).toMatch(/^CMM/)
    expect(
      juristicPersonTenDigitsCode(fromName('Fundición de Precisión Eutectic, S. de R.L.'))
    ).toMatch(/^FPE/)

    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S. en C.'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S.C.L.'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, SCL'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S. en C.'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S en C'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S. en C. por A.'))).toMatch(
      /^GIN/
    )
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S en C por A'))).toMatch(
      /^GIN/
    )
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S.A.'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, SA'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S.C.'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, SC'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S.A. de C.V.'))).toMatch(
      /^GIN/
    )
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, SA de CV'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S. de R.L.'))).toMatch(
      /^GIN/
    )
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S de RL'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S. en N.C.'))).toMatch(
      /^GIN/
    )
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S en NC'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S.N.C.'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, SNC'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, A.C.'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, AC'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, A. en P.'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, A en P'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, S.C.S.'))).toMatch(/^GIN/)
    expect(juristicPersonTenDigitsCode(fromName('Guantes Industriales, SCS'))).toMatch(/^GIN/)
  })

  // rule 6
  it('should_use_first_and_second_letters_of_second_word_if_only_two_words_are_elegible', () => {
    expect(juristicPersonTenDigitsCode(fromName('Aceros Ecatepec, S.A.'))).toMatch(/^AEC/)
    expect(juristicPersonTenDigitsCode(fromName('Fonograbaciones Cinelandia, S. de R.L.'))).toMatch(
      /^FCI/
    )
    expect(juristicPersonTenDigitsCode(fromName('Distribuidora Ges, S.A.'))).toMatch(/^DGE/)
  })
})

function fromName(name: string): JuristicPerson {
  return {
    name,
    day: 29,
    month: 11,
    year: 1982
  }
}

function person(name: string, day: number, month: number, year: number): JuristicPerson {
  return {
    name,
    day,
    month,
    year
  }
}
