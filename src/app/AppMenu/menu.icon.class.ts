const style = theme => {
    const {
        typography: {
            h2: { fontSize: fontSize_SM },
            h3: { fontSize: fontSize_XS }
        }
    } = theme;

    return {
        menuIconClass: {
            position: 'relative',
            fontSize: fontSize_XS,
            padding: 0,
            marginLeft: '20px',
            '&:nth-of-type(1)': {
                marginLeft: 0 // for Home Icon on xs screen
            },
            [ theme.breakpoints.up( 'sm' ) ]: {
                fontSize: fontSize_SM,
            },
        }
    };
};

export default style;
