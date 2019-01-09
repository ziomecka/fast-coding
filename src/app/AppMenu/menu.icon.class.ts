const style = theme => {
    const {
        typography: {
            h2: { fontSize: buttonFontSize },
        }
    } = theme;

    return {
        menuIconClass: {
            position: 'relative',
            fontSize: buttonFontSize
        }
    };
};

export default style;