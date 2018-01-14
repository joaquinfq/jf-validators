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
        if (typeof validators === 'function')
        {
            validators = [validators];
        }
        if (Array.isArray(validators))
        {
            _isValid = validators.every(
                validator => typeof validator === 'function'
                    ? validator(value, config)
                    : false
            );
        }
        else
        {
            _isValid = false;
        }
    }

    return _isValid;
};
