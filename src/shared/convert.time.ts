const second = 1000;
const minute = 60000;
const hour = 3600000;

export const showTwoDigits = (value: number): string => {
    const str = String(value) || '';

    if (str.length === 1) {
        return `0${str}`;
    }

    if (!str.length) {
        return `00`;
    }

    return str;
};

let calculate = (value: number) => showTwoDigits(Math.round(value));

export const getSeconds = (time: number) => {
    return (
        calculate( time / minute ) + " : " +
        calculate( time % minute / second )
    );
};

export const getMilliseconds = (time: number) => {
    return (
        getSeconds( time ) + " : " +
        calculate( time % minute % second )
    );
};