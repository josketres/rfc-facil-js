import calculate from '../src/verification-digit'

describe('verification digit calculator', () => {
  it('should naturalPersonTenDigitsCode verification digit', () => {
    expect(calculate('GODE561231GR')).toEqual('8')
    expect(calculate('AECS211112JP')).toEqual('A')
    expect(calculate('OOGE52071115')).toEqual('1')
  })
})
