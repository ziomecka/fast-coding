import { default as Info } from './component';

import { connect } from 'react-redux';
import { ApplicationState } from '@appStore';

import { AppContainersEnum } from '@appTypes';
import { ApplicationContainersEnum } from '@applicationTypes';

import { LocalizeState, LocalizeContextProps } from 'react-localize-redux';

import { TranslationsLoaderState } from '@app/TranslationsLoader/_duck/reducers';
import { IRenderInfo, InfoEnum } from './_duck/types';

import { WithStyles } from '@material-ui/core/styles';

const { app } = ApplicationContainersEnum;
const { translationsLoader } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): IMapStateToProps => ({
    localize: state.localize,
    ...state[ app ][ translationsLoader ]
});

const InfoContainer = connect(mapStateToProps)(Info);

export default InfoContainer;

interface IMapStateToProps extends TranslationsLoaderState {
    localize: LocalizeState;
}

export interface InfoProps extends
WithStyles,
LocalizeContextProps,
IMapStateToProps {
    render: IRenderInfo;
    displayError?: boolean;
    useLocalize?: boolean;
    id?: string;
    variant: InfoEnum
};