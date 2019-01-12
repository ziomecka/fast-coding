import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as ContentTitle } from './component';
import { ApplicationState } from '@appStore';

import { AppContainersEnum } from '@appTypes';
import { ApplicationContainersEnum } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

const { app, components } = ApplicationContainersEnum;
const { content } = AppContainersEnum;
const { lesson } = ComponentsContainersEnum;

import { WithStyles } from '@material-ui/core/styles';

import { LocalizeState } from 'react-localize-redux';

const mapStateToProps = ( state: ApplicationState ): IMapStateToProps => ( {
    localize: { ...state.localize },
    lessonTitle: state[ components ][ lesson ].title,
    lessonNo: state[ components ][ lesson ].no
} );

// @ts-ignore
const ContentTitleContainer = withRouter( connect( mapStateToProps )( ContentTitle ) );

export default ContentTitleContainer;

interface IMapStateToProps {
    localize: LocalizeState;
    lessonTitle: string;
    lessonNo: number;
}

export interface ContentTitleProps extends
    IMapStateToProps,
    RouteComponentProps<{}>,
    WithStyles {}
