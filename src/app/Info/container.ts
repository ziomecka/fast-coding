import { default as Info } from './component';

import { connect } from 'react-redux';
import { ApplicationState } from '@appStore';

import { AppContainersEnum } from '@appTypes';
import { ApplicationContainersEnum } from '@applicationTypes';

import { LocalizeState } from 'react-localize-redux';

import { TranslationsLoaderState } from '../TranslationsLoader/_duck/reducers';
import { RenderType } from './_duck/types';

const { app } = ApplicationContainersEnum;
const { translationsLoader } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): IMapStateToProps => ({
    localize: state.localize,
    ...state[ app ][ translationsLoader ]
});

const InfoContainer = connect(mapStateToProps)(Info);

export default InfoContainer;

interface IMapStateToProps extends TranslationsLoaderState {
    localize: LocalizeState
}

export interface InfoProps extends
IMapStateToProps {
    render: RenderType;
    displayError?: boolean;
    useLocalize?: boolean;
};