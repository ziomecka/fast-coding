const path = require('path');

module.exports = {
    '@app': ( path.resolve ( __dirname, '../front/app/' ) ),
    '@lesson': ( path.resolve ( __dirname, '../front/lesson/' ) ),
    '@courses': ( path.resolve ( __dirname, '../front/courses/' ) ),
    '@views': ( path.resolve ( __dirname, '../front/views/' ) ),
    '@shared': ( path.resolve ( __dirname, '../front/shared/' ) ),
    '@root': ( path.resolve ( __dirname, '../front/' ) ),
    '@applicationTypes': ( path.resolve ( __dirname, '../front/_types/' ) ),
    '@appTypes': ( path.resolve ( __dirname, '../front/app/_types/' ) ),
    '@lessonTypes': ( path.resolve ( __dirname, '../front/lesson/_types/' ) ),
    '@coursesTypes': ( path.resolve ( __dirname, '../front/courses/_types/' ) ),
    '@viewsTypes': ( path.resolve ( __dirname, '../front/views/_types/' ) ),
    '@sharedTypes': ( path.resolve ( __dirname, '../front/shared/_types/'  )),
    '@appForm': ( path.resolve ( __dirname, '../front/app/_forms/Form/' )),
    '@constants': ( path.resolve ( __dirname, '../front/constants' )),
    '@constantsStyles': ( path.resolve ( __dirname, '../front/theme/constants' )),
    '@appStore': ( path.resolve ( __dirname, '../front/store' )),
    '@theme': ( path.resolve ( __dirname, '../front/theme/index' )),
    '@src': ( path.resolve ( __dirname, '../front/' )),
    '@forms': ( path.resolve ( __dirname, '../front/app/_forms/' ))
};