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
