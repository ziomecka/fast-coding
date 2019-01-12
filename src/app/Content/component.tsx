import * as React from 'react';

import { ContentProps } from './container';
import { default as Dialog } from '@app/Dialog/';
import { default as Notification } from '@app/Notification/';
import DragOverable from '@app/DragOverable';
import Footer from '@app/Footer/';
import ContentTitle from '@app/ContentTitle';

/** Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { AppRoutesEnum } from '@appTypes';

const ContentComponent = class Content extends React.Component<ContentProps> {
    home: AppRoutesEnum;
    constructor( props: ContentProps ) {
        super( props );
        this.onDrop = this.onDrop.bind( this );
        this.home = AppRoutesEnum.home;
    }

    get isHome() {
        return this.props.location.pathname === this.home;
    }

    get pathname() {
        return this.props.location.pathname;
    }

    componentDidUpdate( prevProps: ContentProps ) {
        const { props: { appLocation } } = this;

        // TODO - improve / change?
        if ( appLocation !== prevProps.appLocation ) {
            this.props.changeLocation( appLocation );
        }
    }

    onDrop( e: React.DragEvent<HTMLElement> ) {
        this.props.onDrop.forEach( fun => fun( e ) );
    }

    render() {
        const {
            props: {
                classes: { contentBox, contentBoxHome, contentBoxOther },
            },
            isHome
        } = this;

        return (
            <React.Fragment>
                <DragOverable
                    className={`${contentBox} ${isHome ? contentBoxHome : contentBoxOther}`}
                    id="content"
                    onDrop={this.onDrop}
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

export default withStyles( styles )( ContentComponent );
