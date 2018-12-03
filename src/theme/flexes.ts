const flexRow = {
    display: 'flex'
};

const flexColumn = {
    ...flexRow,
    flexDirection: 'column'
};

const flexColumnJustifyFlexStart = {
    ...flexColumn,
    justifyContent: 'flex-start'
};

const flexColumnJustifySpaceBetween = {
    ...flexColumn,
    justifyContent: 'space-between'
};

const flexColumnJustifyFlexStartAlignCenter = {
    ...flexColumnJustifyFlexStart,
    alignItems: 'center'
};

const flexRowJustifyCenter = {
    ...flexRow,
    justifyContent: 'center'
};

const flexRowJustifyCenterAlignCenter = {
    ...flexRowJustifyCenter,
    alignItems: 'center'
};

const flexRowJustifyFlexEnd = {
    ...flexRow,
    justifyContent: 'flex-end'
};

const flexRowJustifyFlexEndAlignCenter = {
    ...flexRowJustifyFlexEnd,
    alignItems: 'center'
};

export {
    flexColumn,
    flexColumnJustifyFlexStart,
    flexColumnJustifyFlexStartAlignCenter,
    flexColumnJustifySpaceBetween,
    flexRow,
    flexRowJustifyCenter,
    flexRowJustifyCenterAlignCenter,
    flexRowJustifyFlexEnd,
    flexRowJustifyFlexEndAlignCenter
};