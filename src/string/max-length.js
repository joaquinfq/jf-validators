const get = require('../util/get');
/**
 * Verifica si el texto tiene una longitud máxima especificada.
 *
 * @param {String} value            Valor a validar.
 * @param {Object} config           Configuración del validador.
 * @param {Number} config.maxLength Longitud máxima a verificar (255 por defecto).
 *
 * @return {Boolean} `true` si el valor pasa la validación.
 */
module.exports = function maxLength(value, config = {})
{
    return typeof value === 'string'
        ? value.length <= get(config, 'maxLength', 255)
        : false;
};
