// https://developers.sparkpost.com/
// https://developers.sparkpost.com/api/smtp/#header-client-configuration
require('dotenv').config();

const SparkPost = require('sparkpost');
const sparky = new SparkPost( process.env.SPARKPOST_API_KEY );

const createContent = require('./content');
const {
    EMAILS: {
        EMAIL_RESPONSES: { SUCCESS, ERROR },
        ADDRESS_FROM,
        DOMAIN
    }
} = require('../constants');


// TODO check if recipients are valid
//Check other options
/**
 *
 * @param {options} options
 * @property {string} options.emailVariant
 * @property {Array<{address: string}>} options.recipients
 * @property {string} [options.adressFrom = ADDRESS_FROM = hello]
 * @property {string} [options.domainFrom = DOMAIN = letsbitebytes.com]
 * @property {string} [options.language = pl]
 * @property {string} [options.signatureVariant = variant]
 * @property {string} [options.link]
 *
 */
const sendEmail = async (options) => {
    const {
        emailVariant,
        recipients,
        addressFrom = ADDRESS_FROM,
        domainFrom = DOMAIN,
        language = 'pl',
        signatureVariant = 'standard',
        link // optional
    } = Object(options);

    const _options = {
        "inline_css": false
    };

    try {
        let response = await sparky.transmissions.send({
            options: _options,
            content: createContent({
                emailVariant,
                addressFrom,
                domainFrom,
                language,
                signatureVariant,
                link
            }),
            recipients
        });

        if (response) {
            console.log(`Email sent: ${ JSON.stringify(response) }.`);
            response = null; // GC
            return SUCCESS;
        } else {
            console.warn(`Mail NOT SENT. Sparky response: ${ JSON.stringify(response) }`);
        }
    } catch ( err ) {
        console.warn(`SparkPost error: ${ err.message || err.toString() }`);
        return ERROR;
    }
};

module.exports = sendEmail;