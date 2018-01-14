/**
 * Expresión regular simple para validar un email basado en RFC 5322.
 *
 * @type {RegExp}
 */
const regexp = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/**
 * Verifica si el texto puede ser considerado como un email.
 *
 * @param {String} value Valor a validar.
 *
 * @return {Boolean} `true` si el valor pasa la validación.
 */
module.exports = function email(value)
{
    return typeof value === 'string'
        ? regexp.test(value)
        : false;
};
