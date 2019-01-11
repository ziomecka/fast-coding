import * as React from 'react';
import Table, { TableI } from './container';

export interface WithTableContextProps {
    createTable: ( props: TableI ) => JSX.Element
}

export const defaultTable: WithTableContextProps = {
    createTable: ( props: TableI ): JSX.Element => (
        <Table { ...props} />
    )
};

const context = React.createContext( defaultTable );

export default context;
