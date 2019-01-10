import * as React from 'react';
import context, { MenuRulesHocType } from './context';

const { Consumer } = context;

export interface WithMenuRules {
    menuRules: MenuRulesHocType
}

const MenuRulesHoc = (Component) => (props => {
    return (
        <Consumer>{ menuRules => (
            <Component {...{ menuRules }} { ...props } />
        ) }</Consumer>
    );
});

export default MenuRulesHoc;
