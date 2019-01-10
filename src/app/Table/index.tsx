import * as React from 'react';

import TableContext, { defaultTable, WithTableContextProps } from './context';
import { TableProps } from './container';

const { Provider, Consumer } = TableContext;

export interface WithTableProps extends TableProps, WithTableContextProps {};

const withTable = (SomeComponent) => {
    return class extends React.Component<WithTableProps> {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <Provider value={ defaultTable }>
                    <Consumer>
                        { defaultTable => (
                            <SomeComponent { ...this.props } createTable={defaultTable.createTable}/>
                        ) }
                    </Consumer>
                </Provider>
            );
        }
    };
};

export default withTable;