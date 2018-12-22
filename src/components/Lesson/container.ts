import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Lesson } from './component';
import { ApplicationState } from '@store';

import { LessonState } from './_duck/reducers';
import { restoreState } from './_duck/actions';

import { mapDispatchToProps as notificationMapDiaptchToProps, NotificationDispatch } from '@shared/notification';

import { LocalStorageItemEnum } from '@appTypes';
import { ComponentsContainersEnum, ComparatorContainersEnum } from '@componentsTypes';
import { ApplicationContainersEnum } from '@applicationTypes';

const { components } = ApplicationContainersEnum;
const { lesson, comparator } = ComponentsContainersEnum;
const { stats } = ComparatorContainersEnum;

import { onReset } from './_duck/operations/life';
import { onRestoreState, onKeepState } from './_duck/operations/restore.state';
import { moveLessonButtons } from './LessonButtons/_duck/actions';
import { registerOnDrop, deregisterOnDrop } from '@app/Content/_duck/actions';

import { WithStyles } from '@material-ui/core/styles';

import { LocalizeState } from 'react-localize-redux';
import { onStartLeaving } from './LessonButtons/_duck/operations';

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => {
    const { time, start, stop, running } = state[components][comparator][stats];

    return {
        ...state[components][lesson],
        time,
        start,
        stop,
        running,
        localize: { ...state.localize }
    };
};

const mapDispatchToProps = (dispatch: Dispatch): LessonDispatch => ({
    ...notificationMapDiaptchToProps(dispatch),
    reset: () => dispatch(onReset()),
    registerOnDrop: (fun) => dispatch(registerOnDrop(fun)),
    deregisterOnDrop: (fun) => dispatch(deregisterOnDrop(fun)),
    onMoveLesonButtons: (x, y) => dispatch(moveLessonButtons(x, y)),
    restoreState: () => dispatch(onRestoreState(LocalStorageItemEnum.lesson, restoreState)),
    keepState: () => dispatch(onKeepState(LocalStorageItemEnum.lesson, lesson)),
    startLeaving: () => dispatch(onStartLeaving())
});

// @ts-ignore
const LessonContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Lesson));

export default LessonContainer;

interface MapStateToPropsI extends LessonState {
    start: number;
    time: number;
    stop: number;
    running: boolean;
    localize: LocalizeState;
}

export interface LessonDispatch extends NotificationDispatch {
    reset: () => void;
    registerOnDrop: (fun: Function) => void;
    deregisterOnDrop: (fun: Function) => void;
    onMoveLesonButtons: (x: number | 'auto', y: number | 'auto') => void;
    restoreState: () => Action;
    keepState: () => Action;
    startLeaving: () => Action;
};

export interface LessonProps extends LessonDispatch,
    MapStateToPropsI,
    RouteComponentProps<{}>,
    WithStyles {};