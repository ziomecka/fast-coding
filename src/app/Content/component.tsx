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

import { withLocation } from '@app/LocationHoc/';

const ContentComponent = class Content extends React.Component<ContentProps> {
    constructor( props: ContentProps ) {
        super( props );

        this.onDrop = this.onDrop.bind( this );
    }

    onDrop( e: React.DragEvent<HTMLElement> ) {
        this.props.onDrop.forEach( fun => fun( e ) );
    }

    render() {
        const {
            props: {
                classes: { contentBox, contentBoxHome, contentBoxOther },
                isHome,
                appLocation
            },
        } = this;

        const className = appLocation === isHome
            ? contentBoxHome
            : contentBoxOther;

        return (
            <React.Fragment>
                <DragOverable
                    className={`${ contentBox } ${ className }`}
                    id="content"
                    onDrop={ this.onDrop }
                >
                    <ContentTitle />

                    { this.props.children }

                    <Dialog />

                    <Notification />
                </DragOverable>
                <Footer />
            </React.Fragment>
        );
    }
};

export default withStyles( styles )( withLocation( ContentComponent ) );
