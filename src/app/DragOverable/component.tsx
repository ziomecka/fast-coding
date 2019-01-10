import * as React from 'react';
import { DragOverableProps } from './container';

/** Materials */
import Paper from '@material-ui/core/Paper';

const DragOverableComponent: React.StatelessComponent<DragOverableProps> = props => {
    const { onDragOver, onDrop, ...other } = props;

    const _onDragOver = ( e ) => {
        onDragOver ||
        e.preventDefault();
    };

    return (
        <Paper
            onDragOver={( e ) => _onDragOver( e )}
            {...{ onDrop }}
            {...other}
        >
            {props.children}
        </Paper>
    );
};

export default DragOverableComponent;
