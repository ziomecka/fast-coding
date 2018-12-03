import * as React from 'react';
import { TableProps } from './container';

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFoot from '@material-ui/core/TableFooter';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const TableComponent: React.StatelessComponent<TableProps> = props => {
    const { head, body, foot, tableProps,
            tableHeadProps,
            tableBodyProps,
            tableFootProps,
            tableHeadRowProps,
            tableHeadCellProps,
            tableBodyRowProps,
            tableBodyCellProps,
            tableFootRowProps,
            tableFootCellProps,
            classes: { tableClass }
    } = props;

    return (
        <Table className={ tableClass } { ...tableProps }>
            { head && (
                <TableHead { ...tableHeadProps }>
                    <TableRow { ...tableHeadRowProps }>
                        {head.map((headCell, cellInd) => (
                            <TableCell key={`head-${cellInd}`} { ...tableHeadCellProps }>
                                { headCell }
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            ) }

            { body && (
                <TableBody { ...tableBodyProps }>
                    {body.map((row, rowInd) => (
                        <TableRow key={rowInd} { ...tableBodyRowProps }>
                            {row.map((rowCell, cellInd) => (
                                <TableCell key={`row-${rowInd}-${cellInd}`} { ...tableBodyCellProps }>
                                    { rowCell }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            )}

            { foot && (
                <TableFoot { ...tableFootProps } >
                    {foot.map((footCell, cellInd) => (
                        <TableRow key={`foot-${cellInd}`}{ ...tableFootRowProps }>
                            <TableCell { ...tableFootCellProps }>
                                { footCell }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableFoot>
            ) }
        </Table>
    );
};

export default withStyles(styles)(TableComponent);