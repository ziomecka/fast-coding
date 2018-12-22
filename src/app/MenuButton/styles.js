const style = theme => {
    const {
        typography: {
            h3: { fontSize: fontSizeMenuIcon },
        }
    } = theme;

    return {
        menuIconClass: {
            fontSize: fontSizeMenuIcon
        }
    };
};

export default style;