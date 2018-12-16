require('dotenv').config();
const htmls = require('./htmls');

const createContent = (options) => {
    const {
        address = 'kasia',
        subject = 'nowy temat',
        paragraphs = [
            'Pierwszy akapit',
            'Drugi akapit'
        ],
        emailVariant = 'standard',
        domain = process.env.SPARKPOST_SANDBOX_DOMAIN
    } = Object(options);

    return {
        from: `${ address }@${ domain }`,
        subject,
        html: htmls[emailVariant](paragraphs)
    };
};

module.exports = createContent;