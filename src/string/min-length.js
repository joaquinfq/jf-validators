const get = require('../util/get');
/**
 * Verifica si el texto tiene la longitud mínima requerida.
 *
 * @param {String} value            Valor a validar.
 * @param {Object} config           Configuración del validador.
 * @param {Number} config.minLength Longitud mínima a verificar (0 por defecto).
 *
 * @return {Boolean} `true` si el valor pasa la validación.
 */
module.exports = function minLength(value, config = {})
{
    return typeof value === 'string'
        ? value.length >= get(config, 'minLength', 0)
        : false;
};
