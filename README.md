# jf-validators [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![npm install jf-validators](https://nodei.co/npm/jf-validators.png?compact=true)](https://npmjs.org/package/jf-validators/)

## English

Validators for various types of data and occasions.

## Español

Validadores para diversos tipos de datos y ocasiones.
Todos los validadores son funciones que aceptan 2 parámetros:

- `value`  : Valor a validar.
- `config` : Configuración a usar por el validador (opcional). Es un objeto para permitir configurar el validador.

El validador debe retornar `true` en caso de ser válido el valor.

### Validadores disponibles

- number:
    - `max-value` : Verifica si el valor numérico es menor o igual al valor especificado.
    - `min-value` : Verifica si el valor numérico es mayor o igual al valor especificado.
- string:
    - `email`     : Verifica si el texto puede ser considerado como un email.
    - `max-length`: Verifica si el texto tiene una longitud máxima especificada.
    - `min-length`: Verifica si el texto tiene la longitud mínima requerida.

### Ejemplo de uso

```js
const assert    = require('assert');
const maxLength = require('jf-validators/src/string/max-length');
const minLength = require('jf-validators/src/string/min-length');

const value     = 'Lorem ipsum'; // Texto con 11 caracteres.

// Verifica que la longitud mínima sea 0 (valor por defecto).
assert.equal(true, minLength(value));
// Verifica que la longitud mínima sea 255 (valor por defecto).
assert.equal(true, maxLength(value));
// Configuración de los validadores de tal manera que fallen.
const config = {
    // La longitud máxima permitida es menor que la del valor actual.
    maxLength : value.length - 1,
    // La longitud mínima permitida es mayor que la del valor actual.
    minLength : value.length + 1
}
// false: la longitud actual es de 11 pero el máximo permitido es 10
assert.equal(false, maxLength(value, config));
// false: la longitud actual es de 11 pero el mínimo permitido es 12
assert.equal(false, minLength(value, config));
``` 

Se puede ver el archivo [./test.js](test.js) para más ejemplos de configuraciones.
