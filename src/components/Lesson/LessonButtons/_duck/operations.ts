import { Dispatch } from 'redux';
import { AppRoutesEnum } from '@appTypes';
import { ThunkGetStateType } from '@applicationTypes';

const { lessons } = AppRoutesEnum;

import { openDialog, DialogsEnum } from '@app/Dialog/';
const { yesCancel } = DialogsEnum;
import { onReset, onPauseLesson, onUnpauseLesson, } from '../../_duck/operations/life';

import history from '@shared/history';
import { manageButtonFocus as buttonFocus } from '@shared/button.focus';

import getTranslation from '@shared/get.translation';

import Message from '../message';

const buttonsIds = [ 'dialogLeave', 'dialogCancel' ];
const manageButtonFocus = buttonFocus( buttonsIds, 1 );

export const onStartLeaving = (): any => (

    ( dispatch: Dispatch, getState: ThunkGetStateType ) => {

        dispatch( onPauseLesson() );

        const press = getTranslation( getState().localize, 'buttonsPress' );

        dispatch( openDialog( {
            variant: yesCancel,
            Component: Message,
            buttons: {
                buttonYes: {
                    buttonProps: {
                        id: buttonsIds[ 0 ],
                        onClick: async () => {
                            history.push( lessons );
                            return await dispatch( onReset() );
                        }
                    },
                    translationId: 'lessonDialogOKLeave',
                    aftertext: `${ press } Enter`
                },
                buttonCancel: {
                    buttonProps: {
                        id: buttonsIds[ 1 ],
                        color: 'secondary',
                        autoFocus: true,
                        onClick: async () => await dispatch( onUnpauseLesson() )
                    },
                    translationId: 'lessonDialogCancelLeave',
                    aftertext: `${ press } ESC`
                }
            },
            dialogProps: {
                onClose: () => dispatch( onUnpauseLesson() ),
                // @ts-ignore
                onKeyDown: ( e ) => manageButtonFocus( e )
            }
        } ) );
    }
);

export default {
    onStartLeaving
};
