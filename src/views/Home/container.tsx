import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as HomeViewComponent } from './component';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { mapDispatchToProps as notificationMapDiaptchToProps, NotificationDispatch } from '../../shared/notification';
import { onAddKeyDownListener, onRemoveKeyDownListener} from './_duck/operations';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch): HomeViewDispatch => ({
    ...notificationMapDiaptchToProps(dispatch),
    addKeyDownListener: () => onAddKeyDownListener(),
    removeKeyDownListener: () => onRemoveKeyDownListener()
});

const HomeViewContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeViewComponent));

export default HomeViewContainer;

export interface HomeViewDispatch extends NotificationDispatch {
    addKeyDownListener: () => void;
    removeKeyDownListener: () => void;
};

export interface HomeViewProps extends
    HomeViewDispatch,
    RouteComponentProps<{}> {
        heading?: string;
        animateHeading?: boolean;
    };
