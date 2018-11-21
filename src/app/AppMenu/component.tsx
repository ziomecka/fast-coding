import * as React from 'react';

import { AppMenuProps } from './container';
import SubMenu from '../SubMenu/';

const AppMenuComponent: React.StatelessComponent<AppMenuProps> = (props) => {
  const { subMenus } = props;

  return (
    <>
      {subMenus.map((subAppMenu, ind) => {
        return <SubMenu {...subAppMenu} key={`${subAppMenu}-${ind}`} />;
      })}
    </>
  );
};

export default AppMenuComponent;