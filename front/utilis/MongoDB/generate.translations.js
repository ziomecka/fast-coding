const fs = require('fs');
const path = require('path');

const translationsUrl = './translations';
const translationsDataUrl = './translations.data';

const _path = path.resolve(__dirname, translationsDataUrl);

const getTranslations = () => {
    try {
        const files = fs.readdirSync(translationsDataUrl);

        for (let file of files) {

            fs.writeFileSync(path.resolve(__dirname, translationsUrl, `${ file }`), JSON.stringify({
                ...JSON.parse(fs.readFileSync(path.resolve(_path, file)))
            }));
        }
    } catch (err) {
        throw err;
    }
};

module.exports = getTranslations;

require('make-runnable');