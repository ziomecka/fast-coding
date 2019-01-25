const insert = require('./insert');

const insertTranslations = async () => {
    return await insert('./translations/', 'translations');
};

module.exports = { insertTranslations };