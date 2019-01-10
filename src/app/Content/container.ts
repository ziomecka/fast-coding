import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Content } from './component';
import { ApplicationState } from '@appStore';

import { ContentState } from './_duck/reducers';

import { mapDispatchToProps as notificationMapDiaptchToProps, NotificationDispatch } from '@shared/notification';
import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum, AppLocationEnum } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

const { app, components } = ApplicationContainersEnum;
const { content } = AppContainersEnum;
const { lesson } = ComponentsContainersEnum;

import { changeLocation, changeTitle, ChangeLocationAction, ChangeTitleAction } from './_duck/actions';

import { WithStyles } from '@material-ui/core/styles';

import { LocalizeState } from 'react-localize-redux';

interface MapStateToPropsI extends ContentState {
    localize: LocalizeState;
    lessonTitle: string;
    lessonNo: number;
}

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    ...state[app][content],
    localize: { ...state.localize },
    lessonTitle: state[components][lesson].title,
    lessonNo: state[components][lesson].no
} );

const mapDispatchToProps = ( dispatch: Dispatch ): ContentDispatch => ( {
    ...notificationMapDiaptchToProps( dispatch ),
    changeLocation: ( appLocation: AppLocationEnum ) => dispatch( changeLocation( appLocation ) ),
    changeTitle: ( title ) => dispatch( changeTitle( title ) )
} );

// @ts-ignore
const ContentContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( Content ) );

export default ContentContainer;

export interface ContentDispatch extends NotificationDispatch {
    changeLocation: ( appLocation: AppLocationEnum ) => ChangeLocationAction;
    changeTitle: ( title: string ) => ChangeTitleAction;
}

export interface ContentProps extends ContentDispatch,
    MapStateToPropsI,
    RouteComponentProps<{}>,
    WithStyles {}
