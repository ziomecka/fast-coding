import constants from './constants';

const {
    navHeight,
    navLeft,
    navTop
} = constants;

export default {
    props: {
        MuiAppBar: {
            elevation: 0
        },
        MuiPaper: {
            elevation: 3
        },
    },
    overrides: {
        MuiPaper: {
            root: {
                padding: "2em"
            }
        },
        MuiAppBar: {
            /** props: display, position, top, left, width are not needed, but
             *  included in case changes in material design
             *  */
            root: {
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
                position: "fixed",
                top: navTop,
                left: navLeft,
                height: navHeight,
                width: "100%",
                // padding: navPadding
            }
        }
    }
};