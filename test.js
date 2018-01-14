const assert      = require('assert');
const validators  = {
    email     : require('./src/email'),
    maxLength : require('./src/max-length'),
    maxValue  : require('./src/max-value'),
    minLength : require('./src/min-length'),
    minValue  : require('./src/min-value')
};
const typeValues = [
    0,
    1,
    null,
    undefined,
    false,
    true,
    'test@test.com',
    () => null,
    {},
    []
];
let numAssertions = 0;

function testConfig(validator, value)
{
    const _size  = typeof value === 'string'
        ? value.length
        : value;
    const _increment = validator.substr(0, 3) === 'min' ? 1 : -1;
    const _validator = validators[validator];
    // Valor por defecto.
    testValidate(validator, true, _validator(value));
    // Valor límite
    testValidate(validator, true, _validator(value, { [validator] : _size }));
    // Valor fuera de límite
    testValidate(validator, false, _validator(value, { [validator] : _size + _increment }));
    // Valor dentro del límite
    testValidate(validator, true, _validator(value, { [validator] : _size - _increment }));
}

function testValidate(description, expected, value)
{
    assert.strictEqual(value, expected, description);
    ++numAssertions;
}

//------------------------------------------------------------------------------
// Validadores de atributos numéricos.
//------------------------------------------------------------------------------
function testNumberValidators()
{
    const _value  = new Date().getTime();
    for (const _validator of ['maxValue', 'minValue'])
    {
        testConfig(_validator, _value);
        testTypes(_validator, 'number');
    }
}

//------------------------------------------------------------------------------
// Validadores de atributos de textos.
//------------------------------------------------------------------------------
function testStringValidators()
{
    const _value  = 'Lorem ipsum dolor sit amet';
    for (const _validator of ['maxLength', 'minLength'])
    {
        testConfig(_validator, _value);
        testTypes(_validator, 'string');
    }
}

//------------------------------------------------------------------------------
// Verifica que el validador procese todos los tipos de datos.
//------------------------------------------------------------------------------
function testTypes(validator, type)
{
    const _validator = validators[validator];
    for (const _type of typeValues)
    {
        testValidate(validator, typeof _type === type, _validator(_type));
    }
}

//------------------------------------------------------------------------------
// Validador de email
//------------------------------------------------------------------------------
function testEmail()
{
    const _emails = {
        'a@a.com'                            : true,
        'a.b@a.com'                          : true,
        'a.b.c@a.b.com'                      : true,
        'abcdefghijklmnopqrstuvwxyz@abc.com' : true,
        'abc~def$ghi%jkl@abc.com'            : true,
        'abcdefghijklmnopqrstuvwxyzabc.com'  : false,
        '123456789'                          : false
    };
    const _validator = validators.email;
    for (const _email of Object.keys(_emails))
    {
        testValidate('email', _emails[_email], _validator(_email));
    }
    testTypes('email', 'string');
}
testEmail();
testNumberValidators();
testStringValidators();
console.log('Total aserciones: %d', numAssertions);
