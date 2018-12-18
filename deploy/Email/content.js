require('dotenv').config();
const html = require('./emails/');

const createContent = (options) => {
    const {
        addressFrom,
        domainFrom,
        language,
        emailVariant,
        signatureVariant,
        link
    } = Object(options);

    if ( !addressFrom || !domainFrom || !language || !emailVariant || !signatureVariant ) {
        console.warn('Create content: missing arguments');
    }

    return {
        from: `${ addressFrom }@${ domainFrom }`,
        ...html({
            emailVariant,
            signatureVariant,
            language,
            link
        })
    };
};

module.exports = createContent;