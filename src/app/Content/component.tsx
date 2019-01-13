import * as React from 'react';

import { ContentProps } from './container';
import { default as Dialog } from '@app/Dialog/';
import { default as Notification } from '@app/Notification/';
import DragOverable from '@app/DragOverable/';
import Footer from '@app/Footer/';
import ContentTitle from '@app/ContentTitle/';

/** Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { withLocation } from '@app/AppLocation/';

const Content: React.StatelessComponent<ContentProps> = props => {
    const {
        classes: { contentBox, contentBoxHome, contentBoxOther, contentBoxLesson },
        isHome, isLesson,
        appLocation
    } = props;

    const onDrop = ( e: React.DragEvent<HTMLElement> ) => {
        props.onDrop.forEach( fun => fun( e ) );
    };

    const className = appLocation === isHome
        ? contentBoxHome
        : appLocation !== isLesson
            ? contentBoxOther
            : contentBoxLesson;

    return (
        <React.Fragment>
            <DragOverable
                className={`${ contentBox } ${ className }`}
                id="content"
                { ...{ onDrop } }
            >
                <ContentTitle />

                { props.children }

                <Dialog />

                <Notification />
            </DragOverable>
            <Footer />
        </React.Fragment>
    );
};

export default withStyles( styles )( withLocation( Content ) );
