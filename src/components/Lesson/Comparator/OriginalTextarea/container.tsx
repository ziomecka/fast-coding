import { connect } from 'react-redux';

import { default as OriginalTextArea } from './component';
import { ApplicationState } from '@store';

import { ApplicationContainersEnum } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

import { ComparatorState } from '../_duck/reducers';
import { LessonState } from '../../_duck/reducers';

import { WithStyles } from '@material-ui/core/styles';

const { components } = ApplicationContainersEnum;
const { comparator, lesson } = ComponentsContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[components][comparator],
    ...state[components][lesson]
});

const OriginalTextAreaContainer = connect(mapStateToProps)(OriginalTextArea);

export default OriginalTextAreaContainer;

interface MapStateToPropsI extends ComparatorState, LessonState {};

export interface OriginalTextAreaProps extends
    MapStateToPropsI,
    WithStyles {};