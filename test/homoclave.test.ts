import calculate from '../src/homoclave'

describe('homoclave calculator', () => {
  it('should naturalPersonTenDigitsCode homoclave for simple name', () => {
    expect(calculate('Perez Garcia Juan')).toEqual('LN')
  })

  it('should naturalPersonTenDigitsCode same homoclave for names with and without accents', () => {
    expect(calculate('Perez Garcia Juan')).toEqual(
      calculate('Pérez García Juan')
    )
  })

  it('should naturalPersonTenDigitsCode homoclave for person with more that one name', () => {
    expect(calculate('Del real Anzures Jose Antonio')).toEqual('N9')
  })

  it('should naturalPersonTenDigitsCode homoclave for name with n-tilde', () => {
    expect(calculate('Muñoz Ortega Juan')).toEqual('T6')
  })

  it('should naturalPersonTenDigitsCode homoclave for name with multiple n-tilde', () => {
    expect(calculate('Muñoz Muñoz Juan')).toEqual('RZ')
  })

  it('should naturalPersonTenDigitsCode different homoclave for name with and without n-tilde', () => {
    expect(calculate('Muñoz Ortega Juan')).not.toEqual(
      calculate('Munoz Ortega Juan')
    )
  })

  it('should naturalPersonTenDigitsCode homoclave for name with u-umlaut', () => {
    expect(calculate('Argüelles Ortega Jesus')).toEqual('JF')
  })

  it('should naturalPersonTenDigitsCode same homoclave for name with and without u-umlaut', () => {
    expect(calculate('Argüelles Ortega Jesus')).toEqual(
      calculate('Arguelles Ortega Jesus')
    )
  })

  it('should naturalPersonTenDigitsCode homoclave for name with ampersand', () => {
    expect(calculate('Perez&Gomez Garcia Juan')).toEqual('2R')
  })

  it('should naturalPersonTenDigitsCode different homoclave for name with and without ampersand', () => {
    expect(calculate('Perez&Gomez Garcia Juan')).not.toEqual(
      calculate('PerezGomez Garcia Juan')
    )
  })

  it('should naturalPersonTenDigitsCode same homoclave for name with and without special-characters', () => {
    expect(calculate("Mc.Gregor O'Connor-Juarez Juan")).toEqual(
      calculate('McGregor OConnorJuarez Juan')
    )
  })
})
