const styles = theme => {
    const {
        typography: { h6: { fontSize: inviteFontSize } },
        palette: { secondary: { main: hintColor } },
        spacing: { unit: spacingUnit }
    } = theme;

    return {
        lessonPaper: {
            position: 'relative',
        },
        lessonInvite: {
            padding: 0,
            margin: 0,
            fontSize: inviteFontSize,
        },
        lessonTime: {
            position: 'relative',
            '&:after': {
                content: "attr(aftertext)",
                color: hintColor,
                position: 'absolute',
                marginLeft: spacingUnit
            }
        }
    };
};

export default styles;