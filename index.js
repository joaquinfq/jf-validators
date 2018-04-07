module.exports = {
    // Validadores numéricos.
    number : {
        maxValue : require('./src/number/max-value'),
        minValue : require('./src/number/min-value')
    },
    // Validadores para textos.
    string : {
        email     : require('./src/string/email'),
        maxLength : require('./src/string/max-length'),
        minLength : require('./src/string/min-length')
    },
    // Utilidades
    util   : {
        validate : require('./src/util/validate')
    }
};
