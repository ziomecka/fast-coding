// https://developers.sparkpost.com/
// https://developers.sparkpost.com/api/smtp/#header-client-configuration
require('dotenv').config();

const SparkPost = require('sparkpost');
const sparky = new SparkPost(); //uses process.env.SPARKPOST_API_KEY

const createContent = require('./content');

const testRecipients = [
    { address: 'ziomecka@poczta.onet.pl' }
];

const sendEmail = async (options) => {
    const {
        recipients = [ ...testRecipients ]
    } = Object(options);

    const options = {
        "sandbox": true,
        "inline_css": false
    };

    try {
        return await sparky.transmissions.send({
            options,
            content: createContent(),
            recipients
        });
    } catch ( err ) {
        console.warn(`SparkPost error: ${ err.message || err.toString() }`);
    }
};

module.exports = sendEmail;