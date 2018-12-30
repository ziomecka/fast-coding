const { REMIND_PASSWORD: { LINK_ACTIVE_MINUTES }} = require('../../constants');

module.exports = {
    pl: {
        remindPassword: (options) => {

            // TODO validate if correct link
            return [
                `Zmień hasło.`,
                `Link będzie aktywny przez ${ LINK_ACTIVE_MINUTES } minut.`,
                `<a href="${ options.link }">Link do zmiany hasła</a>`
            ];
        }
    }
};