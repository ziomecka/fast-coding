import * as React from 'react';

import { Translate } from 'react-localize-redux';

/** Materials core */
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

import { FooterProps } from './container';
import Grid from '@material-ui/core/Grid';
import PrivacyPolicy from '@app/PrivacyPolicy';
import TermsOfService from '@app/TermsOfService';

import GridList from '@material-ui/core/GridList';
import ListItem from '@material-ui/core/ListItem';

import OpenDialogButton from '@app/OpenDialogButton';
import { DialogsEnum } from '@app/Dialog/';

import { InfoEnum } from '@app/Info';

import { withLocation } from '@app/AppLocation';

const { dialog } = InfoEnum;
const { yes } = DialogsEnum;

const FooterComponent: React.StatelessComponent< FooterProps > = props => {
    const coded = 'footerCoded';
    const author = 'footerAuthor';

    const {
        classes: {
            footerPaper,
            footerLessonClass,
            footerGrid,
            footerGridList,
            footerColumnItem,
            footerColumnContainer,
            footerListItem
        },
        isLesson,
        appLocation
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
        <Paper className={ `${ footerPaper } ${ appLocation === isLesson ? footerLessonClass : '' }` } >
            <Grid
                container
                direction="row"
                className={ footerGrid }
                justify="space-between"
                alignItems="flex-start"
            >
                {/*
                // @ts-ignore */}
                <Grid { ...columnProps } alignItems="flex-start" style={{ paddingRight: '1em' }} >
                    <GridList className={ footerGridList }>
                        <ListItem className={ footerListItem }>
                            <Translate id={ coded } />
                            <Translate id={ author } />
                        </ListItem>
                    </GridList>
                </Grid>
                {/*
                // @ts-ignore */}
                <Grid { ...columnProps } alignItems="flex-end" style={{ paddingLeft: '1em' }} >
                    <GridList className={ footerGridList }>
                        <ListItem className={ footerListItem }>
                            <OpenDialogButton
                                translationId="privacyPolicy"
                                options={{
                                    variant: yes,
                                    closeOnBackdrop: true,
                                    closeOnEscape: true,
                                    Component: () => <PrivacyPolicy variant={ dialog } />
                                }}
                            />
                        </ListItem>

                        <ListItem className={ footerListItem }>
                            <OpenDialogButton
                                translationId="termsOfService"
                                options={{
                                    closeOnBackdrop: true,
                                    closeOnEscape: true,
                                    variant: yes,
                                    Component: () => <TermsOfService variant={ dialog } />
                                }}
                            />
                        </ListItem>
                    </GridList>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withStyles( styles )( withLocation( FooterComponent ) );
