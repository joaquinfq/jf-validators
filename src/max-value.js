const get = require('./util/get');
/**
 * Verifica si el valor numérico es menor o igual al valor especificado.
 *
 * @param {Number} value  Valor a validar.
 * @param {Object} config Configuración del validador.
 * @param {Number} config.maxValue Valor máximo permitido (MAX_VALUE por defecto).
 *
 * @return {Boolean} `true` si el valor pasa la validación.
 */
module.exports = function maxValue(value, config = {})
{
    return typeof value === 'number'
        ? value <= get(config, 'maxValue', Number.MAX_VALUE)
        : false;
};
