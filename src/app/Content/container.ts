import { connect } from 'react-redux';

import { default as Content } from './component';
import { ApplicationState } from '@appStore';

import { ContentState } from './_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

const { app } = ApplicationContainersEnum;
const { content } = AppContainersEnum;

import { WithStyles } from '@material-ui/core/styles';
import { ILocationContextProps } from '@app/AppLocation/';

const mapStateToProps = ( state: ApplicationState ): ContentState => ( {
    ...state[ app ][ content ]
} );

// @ts-ignore
const ContentContainer = connect( mapStateToProps )( Content );

export default ContentContainer;

export interface ContentProps extends
    ILocationContextProps,
    ContentState,
    WithStyles {}
