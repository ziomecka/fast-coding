const subjects = require('./subjects');
const texts = require('./texts');
const signatures = require('./signatures');
const wrap = require('./html');

module.exports = ( options ) =>  {
    const {
        emailVariant,
        signatureVariant = 'standard',
        language = 'pl',
        link
    } = options;

    return {
        subject: subjects[language][emailVariant](),
        html: wrap(
            `${ texts[language][emailVariant]({ link }).map(p => `<p>${ p }</p>`).join('') }` +
            `${ signatures[language][signatureVariant]() }`
        )
    };
};