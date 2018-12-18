import { connect } from 'react-redux';

import { default as LessonsView } from './component';
import { ApplicationState } from '../../store';
import { WithStyles } from '@material-ui/core';

import {
    ApplicationContainers,
    ComponentsContainersEnum
} from '@applicationTypes';

const { components } = ApplicationContainers;
const { lessonsLoader } = ComponentsContainersEnum;

import { LessonsLoaderState } from '../../components/LessonsLoader/_duck/reducers';

const mapStateToProps = (state: ApplicationState): LessonsLoaderState => ({
    ...state[components][lessonsLoader]
});

const LessonsViewContainer = connect(mapStateToProps)(LessonsView);

export default LessonsViewContainer;

export interface LessonsViewProps extends LessonsLoaderState, WithStyles {};