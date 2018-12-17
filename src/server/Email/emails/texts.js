const { DOMAIN, ROUTES: { CHANGE_PASSWORD }, REMIND_PASSWORD: { LINK_ACTIVE_MINUTES }} = require('../../constants');

module.exports = {
    pl: {
        remindPassword: (options) => {
            const { link } = options;
            // TODO validate if correct link
            return [
                `Zmień hasło.`,
                `Link będzie aktywny przez ${ LINK_ACTIVE_MINUTES } minut.`,
                `<a href=${ DOMAIN }${ CHANGE_PASSWORD }?${ link } }>Link do zmiany hasła</a>`
            ];
        }
    }
};