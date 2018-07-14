# rfc-facil-js
Librería para calcular el Registro Federal de Contribuyentes en México (RFC) - Javascript

[![Build Status](https://travis-ci.org/josketres/rfc-facil-js.svg?branch=master)](https://travis-ci.org/josketres/rfc-facil-js) 

Instalación
---
```sh
npm install rfc-facil
```

Uso
---
Calcular el rfc de una persona física:
```typescript
import RfcFacil from 'rfc-facil';

// Josué Zarzosa de la Torre nacido el 5 de Agosto de 1987
const rfc: string = RfcFacil.forNaturalPerson({
   name: 'Josué',
   firstLastName: 'Zarzosa',
   secondLastName: 'de la Torre',
   day: 5,
   month: 8,
   year: 1987
});
console.log(rfc); // ZATJ870805CK6
```

Calcular el rfc de una persona moral:
```typescript
// persona moral con razon-social Sonora Industrial Azucarera, S. de R. L.
// y fecha de creacion del 20 de Noviembre de 1982
const rfc: string = RfcFacil.forJuristicPerson({
  name: 'Sonora Industrial Azucarera, S. de R. L.',
  day: 29,
  month: 11,
  year: 1982
});
console.log(rfc); // SIA-821129LS8
```

