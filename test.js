const assert     = require('assert');
const validators = require('./index');
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
    const _type = typeof value;
    const _size = _type === 'string'
        ? value.length
        : value;
    const _increment = validator.substr(0, 3) === 'min' ? 1 : -1;
    const _validator = validators[_type][validator];
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
    for (const _validator of [ 'maxValue', 'minValue' ])
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
    const _validator = validators[type][validator];
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
    const _validator = validators.string.email;
    for (const _email of Object.keys(_emails))
    {
        testValidate('email', _emails[_email], _validator(_email));
    }
    testTypes('email', 'string');
}

function testUtilValidate()
{
    const _buildValidators = length => Array.from({ length }).map((v,i) => value => value > i);
    const _validate        = require('./src/util/validate');

    testValidate('validate - default: true', true,  _validate());
    testValidate('validate - []',            true,  _validate([]));
    testValidate('validate - !function',     false, _validate(5));
    testValidate('validate - [!function]',   false, _validate([5]));
    testValidate('validate - [function]',    true,  _validate(Boolean, true));
    testValidate('validate - [function]',    false, _validate(Boolean, false));
    testValidate('validate - function[]',    true,  _validate(_buildValidators(10), 20));
    testValidate('validate - function[]',    false, _validate(_buildValidators(10), 4));
}
//------------------------------------------------------------------------------
testEmail();
testNumberValidators();
testStringValidators();
testUtilValidate();
console.log('Total aserciones: %d', numAssertions);
