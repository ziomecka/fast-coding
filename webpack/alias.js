const path = require('path');

module.exports = {
    '@app': ( path.resolve ( __dirname, '../src/app/' ) ),
    '@lesson': ( path.resolve ( __dirname, '../src/lesson/' ) ),
    '@courses': ( path.resolve ( __dirname, '../src/courses/' ) ),
    '@views': ( path.resolve ( __dirname, '../src/views/' ) ),
    '@shared': ( path.resolve ( __dirname, '../src/shared/' ) ),
    '@root': ( path.resolve ( __dirname, '../src/' ) ),
    '@applicationTypes': ( path.resolve ( __dirname, '../src/_types/' ) ),
    '@appTypes': ( path.resolve ( __dirname, '../src/app/_types/' ) ),
    '@lessonTypes': ( path.resolve ( __dirname, '../src/lesson/_types/' ) ),
    '@coursesTypes': ( path.resolve ( __dirname, '../src/courses/_types/' ) ),
    '@viewsTypes': ( path.resolve ( __dirname, '../src/views/_types/' ) ),
    '@sharedTypes': ( path.resolve ( __dirname, '../src/shared/_types/'  )),
    '@appForm': ( path.resolve ( __dirname, '../src/app/_forms/Form/' )),
    '@constants': ( path.resolve ( __dirname, '../src/constants' )),
    '@constantsStyles': ( path.resolve ( __dirname, '../src/theme/constants' )),
    '@appStore': ( path.resolve ( __dirname, '../src/store' )),
    '@theme': ( path.resolve ( __dirname, '../src/theme/index' )),
    '@src': ( path.resolve ( __dirname, '../src/' )),
    '@forms': ( path.resolve ( __dirname, '../src/app/_forms/' ))
};