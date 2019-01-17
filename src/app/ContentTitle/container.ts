import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as ContentTitle } from './component';
import { ApplicationState } from '@appStore';
import { TextTranslationsI } from '@applicationTypes';
import { WithStyles } from '@material-ui/core/styles';

import { LocalizeState } from 'react-localize-redux';
import { ILocationContextProps } from '@app/AppLocation/';

const mapStateToProps = ( state: ApplicationState ): IMapStateToProps => ( {
    localize: { ...state.localize },
    lessonTitle: state.components.lesson.title,
    lessonNo: state.components.lesson.no
} );

// @ts-ignore
const ContentTitleContainer = withRouter( connect( mapStateToProps )( ContentTitle ) );

export default ContentTitleContainer;

interface IMapStateToProps {
    localize: LocalizeState;
    lessonTitle: TextTranslationsI;
    lessonNo: number;
}

export interface ContentTitleProps extends
    IMapStateToProps,
    ILocationContextProps,
    RouteComponentProps<{}>,
    WithStyles {}
