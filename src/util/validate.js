/**
 * Valida un valor pasando una lista de validadores.
 *
 * @param {Function|Function[]} validators Validadores a usar.
 * @param {*}                   value      Valor a validar.
 * @param {Object}              config     Configuración a usar.
 *
 * @return {Boolean} `true` si el valor pasa todos los validadores.
 */
module.exports = function validate(validators, value, config = {})
{
    let _isValid = true;
    if (validators)
    {
        if (!Array.isArray(validators))
        {
            validators = [ validators ];
        }
        _isValid = validators.every(
            validator => typeof validator === 'function'
                ? validator(value, config)
                : false
        );
    }

    return _isValid;
};
