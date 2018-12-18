import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as LessonsLoader } from './component';
import { LessonsLoaderState } from './_duck/reducers';

import { onLoadLessons } from './_duck/operations';

import { ApplicationContainers, ComponentsContainersEnum } from '@applicationTypes';;

import { ApplicationState } from '../../_reducers/';

const { components } = ApplicationContainers;
const { lessonsLoader } = ComponentsContainersEnum;

const mapStateToProps = (state: ApplicationState) => ({
    ...state[components][lessonsLoader]
});

const mapDispatchToProps = (dispatch: Dispatch): LessonsLoaderDispatch => ({
    loadData: () => dispatch(onLoadLessons())
});

const LessonsLoaderContainer = connect(mapStateToProps, mapDispatchToProps)(LessonsLoader);

export default LessonsLoaderContainer;

export interface LessonsLoaderDispatch {
    loadData: () => void;
};

export interface LessonsLoaderProps extends LessonsLoaderDispatch, LessonsLoaderState {};