import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as LessonsLoader } from './component';
import { LessonsLoaderState } from './_duck/reducers';

import { onLoadData } from '../../app/CSR/_duck/operations';

import { ApplicationContainers, ComponentsContainers } from '../../_common/';

import { ApplicationState } from '../../_reducers/';

import { LocalStorageItemTypes } from '../../_common/index';

const { components } = ApplicationContainers;
const { lessonsLoader } = ComponentsContainers;

const mapStateToProps = (state: ApplicationState) => ({
    ...state[components][lessonsLoader]
});

const mapDispatchToProps = (dispatch: Dispatch): LessonsLoaderDispatch => ({
    loadData: (url, applicationContainer, container, lsItem) => (
        dispatch(onLoadData(url, applicationContainer, container, lsItem))
    )
});

const LessonsLoaderContainer = connect(mapStateToProps, mapDispatchToProps)(LessonsLoader);

export default LessonsLoaderContainer;

export interface LessonsLoaderDispatch {
    loadData: (
        url: string,
        applicationContainer: ApplicationContainers,
        container: ComponentsContainers,
        lsItem: LocalStorageItemTypes
    ) => void;
};

export interface LessonsLoaderProps extends LessonsLoaderDispatch, LessonsLoaderState {};