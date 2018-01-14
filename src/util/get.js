/**
 * Devuelve el valor de la configuración si está presente,
 * en caso contrario devuelve el valor por defecto.
 *
 * @param {Object} config       Configuración a usar.
 * @param {String} key          Nombre de la clave a leer.
 * @param {*}      defaultValue Valor por defecto a devolver si no existe la clave.
 *
 * @return {*}
 */
module.exports = function get(config, key, defaultValue)
{
    return config && config[key] !== undefined
        ? config[key]
        : defaultValue;
};
