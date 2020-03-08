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
import RfcFacil from 'rfc-facil';

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

Fuentes
---
Esta librería se basa en documentación oficial obtenida por medio del IFAI (Instituto Federal de Acceso a la Información). El documento puede ser consultado en el sitio de [INFOMEX](https://www.infomex.org.mx/gobiernofederal/moduloPublico/moduloPublico.action) con el folio `0610100135506`.


Cabe advertir que sólo la Secretaría de Hacienda y Crédito Público, a través del Servicio de Administración Tributaria, es la única instancia que oficialmente asigna las claves de RFC a los contribuyentes que así lo soliciten, a partir de la aplicación de este procedimiento a la base de datos del Padrón de Contribuyentes, con la finalidad de identificar homonimias y evitar la duplicidad de registros.

### En otros Lenguajes
- Java [josketres/rfc-facil](https://github.com/josketres/rfc-facil)
- Ruby [acrogenesis/rfc_facil](https://github.com/acrogenesis/rfc_facil)
- .NET [migsalazar/RfcFacil](https://github.com/migsalazar/RfcFacil)

License
-------

    Copyright 2018 Josué Zarzosa de la Torre

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

