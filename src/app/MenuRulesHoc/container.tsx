import { connect } from 'react-redux';

import { default as MenuProviderComponenet } from './component';

import { ApplicationState } from '@store';

import { withRouter, RouteComponentProps} from 'react-router-dom';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

const { app } = ApplicationContainersEnum;
const { user } = AppContainersEnum;

import { LocalizeState } from 'react-localize-redux';

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    authorized: state[app][user].authorized,
    localize: state.localize
});

// @ts-ignore
const MenuProviderContainer = withRouter(connect(mapStateToProps)(MenuProviderComponenet));

export default MenuProviderContainer;

interface MapStateToPropsI {
    authorized: boolean;
    localize: LocalizeState;
};

export interface MenuProviderProps extends
    MapStateToPropsI,
    RouteComponentProps<{}> {};