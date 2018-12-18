const signatures = require('./signatures');

const wrap = value => `<html><body>${ value }</body></html>`;

module.exports = {
    standard: (paragraphs = [], signature = 'standard') => (
        wrap(
            `${ paragraphs.map(p => `<p>${p}</p>`).join('') }`
            `${ signatures[signature]() }`
        )
    )
};