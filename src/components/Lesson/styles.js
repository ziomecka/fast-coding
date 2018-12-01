const styles = theme => {
    const { typography: { h6: { fontSize: inviteFontSize } } } = theme;

    return {
        lessonPaper: {
            position: 'relative',
        },
        lessonInvite: {
            padding: 0,
            margin: 0,
            fontSize: inviteFontSize
        }
    };
};

export default styles;