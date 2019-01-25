require('dotenv').config();

const regards = {
    pl: 'Pozdrawiam',
    en: 'Best regards'
};

module.exports = {
    standard: (options) => {
        const {
            language = 'pl',
            name = process.env.SIGNATURE_NAME
        } = Object(options);

        return (
            `<p>${ regards[language] }</p>` +
            `<p>${ name }</p>`
        );
    }
};