import * as React from 'react';

import { Translate } from 'react-localize-redux';

/** Materials core */
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

import { FooterProps } from './container';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import { Link } from 'react-router-dom';

import Media from 'react-media';
import { MEDIA_DESKTOP_LG, MEDIA_DESKTOP_MD} from '@constantsStyles';

import { AppRoutesEnum } from '@appTypes';
const { privacyPolicy } = AppRoutesEnum;

const FooterComponent: React.StatelessComponent< FooterProps > = props => {
    const coded = 'footerCoded';
    const author = 'footerAuthor';
    const privacyPolicy = 'privacyPolicy';
    const cols = 2;
    const spacing = 4;

    const {
        classes: {
            footerPaper,
            footerGrid,
            footerColumnItem,
            footerColumnContainer
        }
    } = props;

    const columnProps = {
        classes: {
            item: footerColumnItem,
            container: footerColumnContainer
        },
        item: true,
        container: true,
        direction: 'column',
        justify: 'center',
        component: Paper
    };

    return (
        <Paper className={ footerPaper } >
            <Grid
                container
                direction="row"
                className={ footerGrid }
                justify="space-between"
                alignItems="flex-start"
            >
                {/*
                // @ts-ignore */}
                <Grid { ...columnProps } alignItems="flex-start" >
                    <List dense disablePadding >
                        <ListItem>
                            <span style={{ whiteSpace: 'pre' }}>
                                <Translate id={ coded } />
                            </span>
                            <span>
                                <Translate id={ author } />
                            </span>
                        </ListItem>
                        <ListItem
                            button
                            ContainerComponent="a"
                            ContainerProps={{
                                // href: ''
                            }}
                        >
                            <Link to={ privacyPolicy } >
                                <Translate id={ privacyPolicy } />
                            </Link>
                        </ListItem>
                    </List>
                </Grid>
                {/*
                // @ts-ignore */}
                <Grid { ...columnProps } alignItems="flex-end" >
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withStyles(styles)(FooterComponent);
