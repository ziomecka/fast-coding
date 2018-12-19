export { default as SERVER_CONSTANTS } from './server/constants.client.js';

import { LanguagesEnum } from '@applicationTypes';
const { pl, en } = LanguagesEnum;

export const ROOT_NODE = document.getElementById('root');

export const PAPER_PADDING = '3rem';
export const PAPER_PADDING_MAX = '6rem';

export const HOME_HEADING_ANIMATED = true;
export const HOME_NOTIFICATION = "Nice to see you";
export const HOME_WELCOME_TIMEOUT = 1000;

export const NOTIFICATION_DURATION = 2500;
export const NOTIFICATION_FONTSIZE = '1.25rem';

export const NAV_HEIGHT = 120;
export const NAV_MAXWIDTH = 400;
export const NAV_TOP = 0;
export const NAV_LEFT = 0;

export const WELCOME_BUTTON_MARGIN_TOP = 6;
export const WELCOME_BUTTON_MARGIN_RIGHT = 2;

export const NAV_WELCOME_GO_UP = 3;

export const CONTENT_PADDING_TOP = NAV_HEIGHT;

export const LESSON_BUTTONS_TOP = 200;
export const LESSON_BUTTONS_LEFT = 200;
export const LESSON_MAX_WIDTH = 900;
export const LESSON_FONT_SIZE_REM = 3.5;
export const LESSON_PARAGRAPH_SIZE_REM = 8;
export const LESSON_WRAPPER_SIZE = 15;

export const COLOR_SUCCESS = '#c5ebc3'; //'#afdobf' //'#c8ffbe' //'#c5ebc3 // '#ccdad1'
export const COLOR_CORRECTED = '#fcefe7'; //'#ffe9b2';
export const COLOR_HINTS = '#90ab8e';

export const BORDER_THIN = '.5px';

export const ELEVATION = 2;

export const LESSON_TIME_INTERVAL = 500;

export const LESSON_DEMO_TEXT = {
    [pl]: 'To jest lekcja pokazowa. ' +
    'Jeśli nigdy nie ćwiczyłeś bezwzrokowego pisania na klawiaturze, ' +
    'to może być Ci trudno osiągnąć zadowalający czas i dokładność. ' +
    'Jeśli zdecydujesz się robić małe, proste ćwiczenia każdego dnia, będziesz osiągać coraz lepsze wyniki. ' +
    'Zobacz jak Ci poszło teraz.',
    [en]: 'This is a demonstration lesson. ' +
    'If you\'ve never practiced touch typing, ' +
    'you may find it difficult to achieve satisfactory time and accuracy. ' +
    'If you decide to do small, simple excercise each day, you will achieve better and better results. ' +
    'Now look how you made it.'
};

export const LESSON_DEMO_TITLE = {
    [pl]: 'Lekcja pokazowa',
    [en]: 'Demonstration lesson'
};

export const STATS_AVERAGE_WORD_LENGTH = 5;
export const LESSONS_HEIGHT = '200px';