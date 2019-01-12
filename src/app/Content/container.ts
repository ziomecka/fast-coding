import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Content } from './component';
import { ApplicationState } from '@appStore';

import { ContentState } from './_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum, AppLocationEnum } from '@appTypes';

const { app } = ApplicationContainersEnum;
const { content } = AppContainersEnum;

import { changeLocation, ChangeLocationAction } from './_duck/actions';

import { WithStyles } from '@material-ui/core/styles';

const mapStateToProps = ( state: ApplicationState ): ContentState => ( {
    ...state[ app ][ content ]
} );

const mapDispatchToProps = ( dispatch: Dispatch ): ContentDispatch => ( {
    changeLocation: ( appLocation: AppLocationEnum ) => dispatch( changeLocation( appLocation ) ),
} );

// @ts-ignore
const ContentContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( Content ) );

export default ContentContainer;

export interface ContentDispatch {
    changeLocation: ( appLocation: AppLocationEnum ) => ChangeLocationAction;
}

export interface ContentProps extends ContentDispatch,
    ContentState,
    RouteComponentProps<{}>,
    WithStyles {}
