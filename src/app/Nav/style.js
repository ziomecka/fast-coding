const style = theme => {
    const {
        palette: {
            secondary: { contrastText },
        },
        typography: { fontWeightMedium }
    } = theme;
    return {
        lessons: {
            color: contrastText,
            fontSize: '1.5rem',
            fontWeight: fontWeightMedium,
            letterSpacing: '.05rem'
        }
    }};

export default style;