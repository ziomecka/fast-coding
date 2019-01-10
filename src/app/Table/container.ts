import { TableProps } from '@material-ui/core/Table';
import { TableHeadProps } from '@material-ui/core/TableHead';
import { TableBodyProps } from '@material-ui/core/TableBody';
import { TableFooterProps } from '@material-ui/core/TableFooter';
import { TableRowProps } from '@material-ui/core/TableRow';
import { TableCellProps } from '@material-ui/core/TableCell';

import Table from './component';
import { WithStyles } from '@material-ui/core/styles';

export interface TableI {
    head?: JSX.Element[];
    body: JSX.Element[][];
    foot?: JSX.Element[];
    tableProps?: TableProps;
    tableHeadProps?: TableHeadProps;
    tableBodyProps?: TableBodyProps;
    tableFootProps?: TableFooterProps;
    tableHeadRowProps?: TableRowProps;
    tableHeadCellProps?: TableCellProps;
    tableBodyRowProps?: TableRowProps;
    tableBodyCellProps?: TableCellProps;
    tableFootRowProps?: TableRowProps;
    tableFootCellProps?: TableCellProps;
}

export interface TableProps extends WithStyles, TableI {}

export default Table;
