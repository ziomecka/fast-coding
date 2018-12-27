const style = theme => {
    const {
        typography: {
            h3: { fontSize: fontSizeMenuIcon },
        }
    } = theme;

    return {
        menuIconClass: {
            [theme.breakpoints.down('lg')]: {
                fontSize: '2rem'
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: fontSizeMenuIcon
            }
        }
    };
};

export default style;