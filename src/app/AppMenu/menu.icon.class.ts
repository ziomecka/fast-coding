const style = theme => {
    const {
        typography: {
            h2: { fontSize: buttonFontSize },
        }
    } = theme;

    return {
        menuIconClass: {
            position: 'relative',
            fontSize: buttonFontSize,
            padding: 0,
            marginLeft: '20px',
            '&:nth-of-type(1)': {
                marginLeft: 0 // for Home Icon on xs screen
            }
        }
    };
};

export default style;
