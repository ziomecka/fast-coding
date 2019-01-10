import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as LessonsLoader } from './component';
import { LessonsLoaderState } from './_duck/reducers';

import { onLoadLessons } from './_duck/operations';

import { ApplicationContainersEnum, } from '@applicationTypes';
import { AppContainersEnum, } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

import { ApplicationState } from '@appStore';

const { app, components } = ApplicationContainersEnum;
const { lessonsLoader } = ComponentsContainersEnum;
const { user } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[components][lessonsLoader],
    authorized: state[app][user].authorized
});

const mapDispatchToProps = (dispatch: Dispatch): LessonsLoaderDispatch => ({
    loadData: () => dispatch(onLoadLessons())
});

const LessonsLoaderContainer = connect(mapStateToProps, mapDispatchToProps)(LessonsLoader);

export default LessonsLoaderContainer;

interface MapStateToPropsI extends LessonsLoaderState {
    authorized: boolean;
};

export interface LessonsLoaderDispatch {
    loadData: () => Action;
};

export interface LessonsLoaderProps extends
    LessonsLoaderDispatch,
    MapStateToPropsI {};