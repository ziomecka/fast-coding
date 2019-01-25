import {
    FACEBOOK_BUTTON,
    GOOGLE_BUTTON,
    GOOGLE_FORM,
    RIPPLE_CLASS_CHILD,
    RIPPLE_CLASS_PARENT,
    RIPPLE_CLASS_PULSATE
} from '../constants';

let focusIndex = 0;

const googleButtons = [
    GOOGLE_BUTTON,
    FACEBOOK_BUTTON,
];

const keydownListener = ( e: KeyboardEvent ) => {
    if ( e.keyCode === 9 ) {
        e.preventDefault();

        while ( focusIndex < googleButtons.length ) {
            // console.log(googleButtons[ focusIndex ]);
            focusGoogleButton( focusIndex );
            focusIndex++;
        }

        removeKeyDownListener();
        focusIndex = 0;
    }
};

const addKeyDownListener = (): void => document.addEventListener( 'keydown', keydownListener );
const removeKeyDownListener = (): void => document.removeEventListener( 'keydown', keydownListener );

const focusGoogleButton = ( index: number ): void => {
    let element = document.querySelector( googleButtons[ index ] ) as HTMLElement;
    if ( element ) element.focus();
    element = null; // GC
};

const formFocusListener = (): void => {
    addKeyDownListener();
    focusGoogleButton( focusIndex++ );
};

const buttonFocusListener = (): void => {
    Array.from( document.querySelector( ':focus' ).children ).some( child => {
        if ( child.className === RIPPLE_CLASS_PARENT ) {
            child.classList.add( RIPPLE_CLASS_PULSATE );
            return true;
        }
    } );
};

const buttonBlurListener = ( e: React.FocusEvent<HTMLButtonElement> ): void => {
    removeKeyDownListener();

    /** If the form blurs then zero the focusIndex */
    // @ts-ignore
    if ( e.relatedTarget && e.relatedTarget.form !== e.currentTarget.form ) {
        focusIndex = 0;
    }

    Array.from( e.currentTarget.children ).forEach( child => {
        if ( child.className.indexOf( RIPPLE_CLASS_PULSATE ) !== -1 ) {
            child.classList.remove( RIPPLE_CLASS_PULSATE );
        }
    } );
};

const onAddTabIndex = (): void => {
    let element = document.querySelector( GOOGLE_FORM );

    if ( element ) {
        element.setAttribute( 'tabindex', '5' );
        element.addEventListener( 'focus', formFocusListener );
        element = null; // GC
    }

    googleButtons.forEach( button => {
        element = document.querySelector( button );

        if ( element ) {
            element.setAttribute ( 'tabindex', '-1' );
            element.addEventListener( 'focus', buttonFocusListener );
            // @ts-ignore
            element.addEventListener( 'blur', buttonBlurListener );

            /** Add ripple element */
            let rippleParent = document.createElement( 'span' );
            let rippleChild = document.createElement( 'span' );

            rippleParent.className = RIPPLE_CLASS_PARENT;
            rippleChild.className = RIPPLE_CLASS_CHILD;

            rippleParent.append( rippleChild );
            element.append( rippleParent );

            rippleParent = null; // GC
            rippleChild = null; // GC

            element = null; // GC
        }
    } );

    element = null; // GC
};

const onRemoveTabIndex = (): void => {
    let element = document.querySelector( GOOGLE_FORM );

    if ( element ){
        element.removeEventListener( 'focus', formFocusListener );
        //@ts-ignore
        element.removeEventListener( 'blur', buttonBlurListener );
        element = null; // GC
    }

    googleButtons.forEach( button => {
        element = document.querySelector( button );
        if ( element ) {
            element.removeEventListener( 'focus', buttonFocusListener );
            //@ts-ignore
            element.removeEventListener( 'blur', buttonBlurListener );
            element = null; // GC
        }
    } );

    removeKeyDownListener();
};

export default {
    onAddTabIndex,
    onRemoveTabIndex
};
