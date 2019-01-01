const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');

const coursesUrl = './courses';
const coursesDataUrl = './courses.data';

const _path = path.resolve(__dirname, coursesDataUrl);
const lessonsFile = 'lessons.json';
const courseFile = 'course.json';

const getTitle = (cv) => {
    const compileTitle = (txt) => {
        return cv.signs.reduce((acc, cv) => {
            acc += ` ${cv}`;
            return acc;
        }, txt );
    };

    return { en: compileTitle('Keys:'), pl: compileTitle('Klawisze:') } ;
};

const getText = (cv) => {
    const {
        signs,
        otherSigns,
        length = Math.max(Math.min(100, signs.length * 20), 50)
    } = cv;

    const probability = 3;

    let allSigns;

    /** Create new array, where signs occur x times more often then
     *  the otherSigns.
     *  (where x === probability)
     *  Do it only if there are otherSigns
     */
    if (otherSigns && otherSigns.length) {
        allSigns = (() => {
            let result = [];

            for (let i = 0; i < probability; i++) {
                result = [...result, ...signs];
            }

            result = [...result, ...otherSigns];
            return result;
        })();
    } else {
        allSigns = signs;
    }

    let noOfSigns = allSigns ? allSigns.length : 0;
    let result = '';

    /** Create text */
    if (noOfSigns) {
        let random = () => Math.floor(Math.random() * (noOfSigns));

        for (let i = 0, len = length; i < len; i++) {
            result += allSigns[random()];

            if (Math.random() < 0.2 && i < (len - 1)) {
                result += " ";
                i++;
            }
        }

        random = null;
    }

    allSigns = null;
    return result;
};

const getCourse = (dir, file) => ({
    ...JSON.parse(fs.readFileSync(path.resolve(_path, dir, file ))),
    "_id": `course-${ uuid() }`
});

const getLessons = (dir, file) => {
    const data = fs.readFileSync(path.resolve(_path, dir, file ));

    let i = 0;

    return JSON.parse(data).reduce((acc, cv) => {
        acc.push({
            "title": getTitle(cv),
            "signs": cv.signs,
            "otherSigns": cv.otherSigns,
            "level": cv.level,
            "_id": `lesson-${ uuid() }`,
            "category": cv.category || "standard",
            "no": i++,
            "text": getText(cv)
        });

        return acc;
    }, []);
};

const getCourses = () => {
    try {
        const dirs = fs.readdirSync(coursesDataUrl);

        for (let dir of dirs) {

            fs.writeFileSync(path.resolve(__dirname, coursesUrl, `${dir}.json`), JSON.stringify({
                ...getCourse(dir, courseFile),
                "lessons": getLessons(dir, lessonsFile)
            }));
        }
    } catch (err) {
        throw err;
    }
};

module.exports = getCourses;

require('make-runnable');