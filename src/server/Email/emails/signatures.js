require('dotenv').config();

const regards = {
    pl: 'Pozdrawiam',
    en: 'Best regards'
};

const { EMAILS: { NAME }} = require('../../constants');

module.exports = {
    pl: {
        standard: (options) => {
            const {
                name = NAME
            } = Object(options);

            return (
                `<p>${ regards.pl }</p>` +
                `<p>${ name }</p>`
            );
        }
    }
};