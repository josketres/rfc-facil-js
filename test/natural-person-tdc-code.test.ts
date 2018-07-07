import { NaturalPerson, naturalPersonTenDigitsCode } from '../src/natural-person-tdc-code'

describe('ten-digits-code (tdc-code) calculator', () => {
  it('should naturalPersonTenDigitsCode tdc for simple test-case', () => {
    expect(
      naturalPersonTenDigitsCode(person('Juan', 'Barrios', 'Fernandez', 13, 12, 1970))
    ).toEqual('BAFJ701213')
  })

  it('should naturalPersonTenDigitsCode tdc for one digit month/day', () => {
    expect(naturalPersonTenDigitsCode(person('Juan', 'Barrios', 'Fernandez', 1, 2, 1970))).toEqual(
      'BAFJ700201'
    )
  })

  it('should naturalPersonTenDigitsCode tdc for date after year 2000', () => {
    expect(naturalPersonTenDigitsCode(person('Juan', 'Barrios', 'Fernandez', 1, 12, 2001))).toEqual(
      'BAFJ011201'
    )
  })

  it('should exclude special particles in both last-names', () => {
    // DE, LA, LAS, MC, VON, DEL, LOS, Y, MAC, VAN, MI
    expect(
      naturalPersonTenDigitsCode(person('Eric', 'Mc Gregor', 'Von Juarez', 13, 12, 1970))
    ).toEqual('GEJE701213')
  })

  it('should exclude special particles in first last-name', () => {
    expect(
      naturalPersonTenDigitsCode(person('Josue', 'de la Torre', 'Zarzosa', 13, 12, 1970))
    ).toEqual('TOZJ701213')
  })

  it('should exclude special particles in second last-name', () => {
    expect(
      naturalPersonTenDigitsCode(person('Josue', 'Zarzosa', 'de la Torre', 13, 12, 1970))
    ).toEqual('ZATJ701213')
  })

  it('should use first word of compound first last name', () => {
    expect(
      naturalPersonTenDigitsCode(person('Antonio', 'Ponce de León', 'Juarez', 13, 12, 1970))
    ).toEqual('POJA701213')
  })

  it('should use first two letters of name if first last-name has just one letter', () => {
    expect(naturalPersonTenDigitsCode(person('Alvaro', 'de la O', 'Lozano', 13, 12, 1970))).toEqual(
      'OLAL701213'
    )
  })

  it('should use first two letters of name if first last-name has just two letters', () => {
    expect(naturalPersonTenDigitsCode(person('Ernesto', 'Ek', 'Rivera', 13, 12, 1970))).toEqual(
      'ERER701213'
    )
  })

  it('should use first name if person has multiple names', () => {
    expect(
      naturalPersonTenDigitsCode(person('Luz María', 'Fernández', 'Juárez', 13, 12, 1970))
    ).toEqual('FEJL701213')
  })

  it('should use second name if person has multiple names and first name is Jose', () => {
    expect(
      naturalPersonTenDigitsCode(person('José Antonio', 'Camargo', 'Hernández', 13, 12, 1970))
    ).toEqual('CAHA701213')
  })

  it('should use second name if person has multiple names and first name is Maria', () => {
    expect(
      naturalPersonTenDigitsCode(person('María Luisa', 'Ramírez', 'Sánchez', 13, 12, 1970))
    ).toEqual('RASL701213')
  })

  it('should use second name if person has multiple names and first name is Maria (Ma)', () => {
    expect(
      naturalPersonTenDigitsCode(person('Ma Luisa', 'Ramírez', 'Sánchez', 13, 12, 1970))
    ).toEqual('RASL701213')
  })

  it('should use second name if person has multiple names and first name is Maria (Ma.)', () => {
    expect(
      naturalPersonTenDigitsCode(person('Ma. Luisa', 'Ramírez', 'Sánchez', 13, 12, 1970))
    ).toEqual('RASL701213')
  })

  it('should use first 2 letters of second last-name if first last-name is: empty', () => {
    expect(naturalPersonTenDigitsCode(person('Juan', '', 'Martínez', 13, 12, 1970))).toEqual(
      'MAJU701213'
    )
  })

  it('should use first 2 letters of second last-name if first last-name is: null', () => {
    expect(
      naturalPersonTenDigitsCode(person('Juan', null as any, 'Martínez', 13, 12, 1970))
    ).toEqual('MAJU701213')
  })

  it('should use first 2 letters of first last-name if second last-name is: empty', () => {
    expect(naturalPersonTenDigitsCode(person('Gerarda', 'Zafra', '', 13, 12, 1970))).toEqual(
      'ZAGE701213'
    )
  })

  it('should use first 2 letters of first last-name if second last-name is: null', () => {
    expect(
      naturalPersonTenDigitsCode(person('Gerarda', 'Zafra', null as any, 13, 12, 1970))
    ).toEqual('ZAGE701213')
  })

  it('should replace final letter with X if name-code makes a forbidden word (BUEI -> BUEX)', () => {
    expect(naturalPersonTenDigitsCode(person('Ingrid', 'Bueno', 'Ezquerra', 13, 12, 1970))).toEqual(
      'BUEX701213'
    )
  })

  it('should replace final letter with X if name-code makes a forbidden word (BUEY -> BUEX)', () => {
    expect(naturalPersonTenDigitsCode(person('Yngrid', 'Bueno', 'Ezquerra', 13, 12, 1970))).toEqual(
      'BUEX701213'
    )
  })

  it('should use ma when first name starts with ma but is not maria', () => {
    expect(
      naturalPersonTenDigitsCode(person('Marco Antonio', 'Cano', 'Barraza', 13, 12, 1970))
    ).toEqual('CABM701213')
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
