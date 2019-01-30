const path = require('path');

module.exports = {
    '@app': ( path.resolve ( __dirname, '../_jsFront/app/' ) ),
    '@lesson': ( path.resolve ( __dirname, '../_jsFront/lesson/' ) ),
    '@courses': ( path.resolve ( __dirname, '../_jsFront/courses/' ) ),
    '@views': ( path.resolve ( __dirname, '../_jsFront/views/' ) ),
    '@shared': ( path.resolve ( __dirname, '../_jsFront/shared/' ) ),
    '@root': ( path.resolve ( __dirname, '../_jsFront/' ) ),
    '@applicationTypes': ( path.resolve ( __dirname, '../_jsFront/_types/' ) ),
    '@appTypes': ( path.resolve ( __dirname, '../_jsFront/app/_types/' ) ),
    '@lessonTypes': ( path.resolve ( __dirname, '../_jsFront/lesson/_types/' ) ),
    '@coursesTypes': ( path.resolve ( __dirname, '../_jsFront/courses/_types/' ) ),
    '@viewsTypes': ( path.resolve ( __dirname, '../_jsFront/views/_types/' ) ),
    '@sharedTypes': ( path.resolve ( __dirname, '../_jsFront/shared/_types/'  )),
    '@appForm': ( path.resolve ( __dirname, '../_jsFront/app/_forms/Form/' )),
    '@constants': ( path.resolve ( __dirname, '../_jsFront/constants' )),
    '@constantsStyles': ( path.resolve ( __dirname, '../_jsFront/theme/constants' )),
    '@appStore': ( path.resolve ( __dirname, '../_jsFront/store' )),
    '@theme': ( path.resolve ( __dirname, '../_jsFront/theme/index' )),
    '@src': ( path.resolve ( __dirname, '../_jsFront/' )),
    '@forms': ( path.resolve ( __dirname, '../_jsFront/app/_forms/' ))
};