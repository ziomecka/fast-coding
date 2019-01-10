import * as React from 'react';

import { MenuButtonProps } from './container';

/* Materials */
import MaterialIconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import getTranslation from '@shared/get.translation';

import { withMenuRules } from '@app/MenuRulesHoc/'

const MenuButtonComponent: React.StatelessComponent<MenuButtonProps> = props => {
    const {
        history,
        rules : componentRules,
        appRoute,
        title,
        menuRules,
        iconButton: { className: iconButtonClassName, ...other } = { className: '' },
        classes: { menuIconClass },
        icon
    } = props;

    const onClick = () => {
        history.push(appRoute);
    };

    const areMenuButtonRulesMet = (): boolean => {
        return (
            !componentRules ||
            componentRules.every(rule => menuRules({ path: appRoute })[rule]())
        );
    };

    const IconButton = (
        <MaterialIconButton
            className={ `${ menuIconClass } ${ iconButtonClassName ? iconButtonClassName : '' }` }
            { ...{ onClick } }
            { ...other }
        >
            { icon }
        </MaterialIconButton>
    );

    return (
        <>{
            areMenuButtonRulesMet() && (
                ( title && (
                    <Tooltip title={ getTranslation(props.localize, title) }>
                        { IconButton }
                    </Tooltip>
                )
            ) || <> { IconButton } </>)
        }</>
    );
}

export default withMenuRules(withStyles(styles)(MenuButtonComponent));