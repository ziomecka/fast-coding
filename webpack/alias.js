const path = require('path');

module.exports = {
    '@app': ( path.resolve ( __dirname, '../src/app/' ) ),
    '@components': ( path.resolve ( __dirname, '../src/components/' ) ),
    '@views': ( path.resolve ( __dirname, '../src/views/' ) ),
    '@shared': ( path.resolve ( __dirname, '../src/shared/' ) ),
    '@root': ( path.resolve ( __dirname, '../src/' ) ),
    '@applicationTypes': ( path.resolve ( __dirname, '../src/_types/' ) ),
    '@appTypes': ( path.resolve ( __dirname, '../src/app/_types/' ) ),
    '@componentsTypes': ( path.resolve ( __dirname, '../src/components/_types/' ) ),
    '@viewsTypes': ( path.resolve ( __dirname, '../src/views/_types/' ) ),
    '@sharedTypes': ( path.resolve ( __dirname, '../src/shared/_types/'  )),
    '@appForm': ( path.resolve ( __dirname, '../src/forms/Form/' )),
    '@constants': ( path.resolve ( __dirname, '../src/constants' )),
    '@constantsStyles': ( path.resolve ( __dirname, '../src/theme/constants' )),
    '@appStore': ( path.resolve ( __dirname, '../src/store' )),
    '@forms': ( path.resolve ( __dirname, '../src/forms/' )),
    '@src': ( path.resolve ( __dirname, '../src/' ))
};