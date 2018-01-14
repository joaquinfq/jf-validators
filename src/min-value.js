const get = require('./util/get');
/**
 * Verifica si el valor numérico es mayor o igual al valor especificado.
 *
 * @param {*}      value  Valor a validar.
 * @param {Object} config Configuración del validador.
 * @param {Number} config.minValue Valor mínimo permitido (0 por defecto).
 *
 * @return {Boolean} `true` si el valor pasa la validación.
 */
module.exports = function minValue(value, config = {})
{
    return typeof value === 'number'
        ? value >= get(config, 'minValue', -Number.MAX_VALUE)
        : false;
};
