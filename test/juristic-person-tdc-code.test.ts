import { JuristicPerson, juristicPersonTenDigitsCode } from '../src/juristic-person-tdc-code'

describe('juristic-person ten-digits-code (tdc-code) calculator', () => {
  // rule 1
  it('should_take_first_letters_from_the_first_three_words_from_legal_name', () => {
    expect(fromName('Sonora Industrial Azucarera, S. de R.L.')).toMatch(/^SIA/)
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
    expect(fromName('F.A.Z., S.A.')).toMatch(/^FAZ/)
    expect(fromName('U.S. Ruber Mexicana, S.A.')).toMatch(/^USR/)
    expect(fromName('H. Prieto y Martínez, S. de R.L.')).toMatch(/^HPM/)
  })

  // rule 5
  it('should_ignore_all_juristic_person_type_abreviations', () => {
    expect(fromName('Guantes Industriales Guadalupe, S. en C.')).toMatch(/^GIG/)
    expect(fromName('Construcciones Metálicas Mexicanas, S.A.')).toMatch(/^CMM/)
    expect(fromName('Fundición de Precisión Eutectic, S. de R.L.')).toMatch(/^FPE/)

    expect(fromName('Guantes Industriales, S. en C.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S.C.L.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, SCL')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S. en C.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S en C')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S. en C. por A.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S en C por A')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S.A.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, SA')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S.C.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, SC')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S.A. de C.V.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, SA de CV')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S.A.P.I. de C.V.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, SAPI de CV')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S.A.S. de C.V.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, SAS de CV')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S. de R.L.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S de RL')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S. en N.C.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S en NC')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S.N.C.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, SNC')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, A.C.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, AC')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, A. en P.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, A en P')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, S.C.S.')).toMatch(/^GIN/)
    expect(fromName('Guantes Industriales, SCS')).toMatch(/^GIN/)
  })

  // rule 6
  it('should_use_first_and_second_letters_of_second_word_if_only_two_words_are_elegible', () => {
    expect(fromName('Aceros Ecatepec, S.A.')).toMatch(/^AEC/)
    expect(fromName('Fonograbaciones Cinelandia, S. de R.L.')).toMatch(/^FCI/)
    expect(fromName('Distribuidora Ges, S.A.')).toMatch(/^DGE/)
  })

  // rule 7
  it('should_use_first_three_letters_of_first_word_if_only_one_word_is_elegible', () => {
    expect(fromName('Arsuyama, S.A.')).toMatch(/^ARS/)
    expect(fromName('Calidra, S.A.')).toMatch(/^CAL/)
    expect(fromName('Electrólisis, S.A.')).toMatch(/^ELE/)
  })

  // rule 8
  it('should_fill_with_character_X_if_only_one_word_is_elegible_and_is_smaller_than_3_characters_long', () => {
    expect(fromName('Al, S.A.')).toMatch(/^ALX/)
    expect(fromName('Z, S.A.')).toMatch(/^ZXX/)
  })

  // rule 9
  it('should_ignore_articles_prepositions_conjunctions_and_contractions', () => {
    expect(fromName('El abastecedor Ferretero Electrico, S.A.')).toMatch(/^AFE/)
    expect(fromName('Cigarros la Tabacalera Mexicana, S.A. de C.V.')).toMatch(/^CTM/)
    expect(fromName('Los Viajes Internacionales de Marco Polo, S.A.')).toMatch(/^VIM/)
    expect(fromName('Artículos y Accesorios para Automóviles, S.A.')).toMatch(/^AAA/)
    expect(fromName('Productos de la Industria del Papel, S.A.')).toMatch(/^PIP/)
  })

  // rule 10 - part 1 (arabic numerals)
  it('should_translate_arabic_numerals_and_treat_them_as_words', () => {
    expect(fromName('El 12, S.A.')).toMatch(/^DOC/)
    expect(fromName('El 2 de Enero, S. de R.L.')).toMatch(/^DEN/)
    expect(fromName('El 505, S.A.')).toMatch(/^QCI/)
  })

  // rule 10 - part 2 (roman numerals)
  it('should_translate_roman_numerals_and_treat_them_as_words', () => {
    expect(fromName('Editorial Siglo XXI, S.A.')).toMatch(/^ESV/)
  })

  // rule 11
  it('should_ignore_the_word_compania_and_its_abbreviation', () => {
    expect(fromName('Compañía Periodística Nacional Electrica, S.A.')).toMatch(/^PNE/)
    expect(fromName('Cía. De Artículos Nacionales Eléctricos, S. de R.L.')).toMatch(/^ANE/)
    expect(fromName('Cía. Nal. De Subsistencias Mexicanas, S.A.')).toMatch(/^NSM/)
  })

  // rule 11
  it('should_ignore_the_word_sociedad_and_its_abbreviation', () => {
    expect(fromName('Sociedad Cooperativa de Producción Agrícola de Michoacán')).toMatch(/^CPA/)
    expect(fromName('Soc. de Consumo Agrícola del Sur, S.C.L.')).toMatch(/^CAS/)
  })

  // rule 12 - part 1
  it('should_exclude_special_characters', () => {
    expect(fromName('LA S@NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('EL C@FE.NET')).toMatch(/^CFE/)

    // extended examples to cover all characters from list anexo VI
    expect(fromName('LA S@NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S´NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S%NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S#NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S!NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S.NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S$NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S"NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S-NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S/NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S+NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S(NDIA S.A DE C.V.')).toMatch(/^SND/)
    expect(fromName('LA S)NDIA S.A DE C.V.')).toMatch(/^SND/)
  })

  // rule 12 - part 2
  it('should_expand_special_characters_that_appear_in_a_singleton_word', () => {
    expect(fromName('LA @ S.A DE C.V.')).toMatch(/^ARR/)
    expect(fromName('LA @ DEL % SA DE CV')).toMatch(/^APO/)
    expect(fromName('@ COMER.COM')).toMatch(/^ACO/)
    expect(fromName('LAS ( BLANCAS )')).toMatch(/^APB/)
    expect(fromName('EL # DEL TEJADO')).toMatch(/^NTE/) // this example is wrong in the official documentation
    expect(fromName('LA / DEL SUR')).toMatch(/^DSU/)

    // extended examples to cover all characters from list anexo VI
    expect(fromName('LA . S.A. DE C.V.')).toMatch(/^PUN/)
    expect(fromName('LA ´ S.A. DE C.V.')).toMatch(/^APO/)
    expect(fromName('LA ! S.A. DE C.V.')).toMatch(/^ADM/)
    expect(fromName('LA $ S.A. DE C.V.')).toMatch(/^PES/)
    expect(fromName('LA " S.A. DE C.V.')).toMatch(/^COM/)
    expect(fromName('LA - S.A. DE C.V.')).toMatch(/^GUI/)
    expect(fromName('LA + S.A. DE C.V.')).toMatch(/^SUM/)
    expect(fromName('LA ) S.A. DE C.V.')).toMatch(/^CPA/)
  })
})

function fromName(name: string): string {
  return juristicPersonTenDigitsCode({
    name,
    day: 29,
    month: 11,
    year: 1982
  })
}

function person(name: string, day: number, month: number, year: number): JuristicPerson {
  return {
    name,
    day,
    month,
    year
  }
}
