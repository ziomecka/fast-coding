
import * as React from 'react';
import { TextGeneratorProps } from './container';

class TextGeneratorComponent extends React.Component<TextGeneratorProps> {
    constructor ( props ) {
        super( props );
    }

    componentDidUpdate( prevProps: TextGeneratorProps ) {
        const { turnedOn } = this.props;
        const prevTurnedOn = prevProps.turnedOn;
        if ( turnedOn !== prevTurnedOn && turnedOn ) {
            this.props.sendText( this.prepareText() );
        }
    }

    /** Make the other signs less probably.
     *  Now I do it by creating new array.
     *  TODO Can be improved?
     */
    prepareText (): string {
        const {
            // probabilityCoefficient,
            signs,
            otherSigns,
            // length = 50
        } = this.props;

        const length = 50;
        const probabilityCoefficient = 0;

        const probability: number = (
            probabilityCoefficient > 0 &&
            probabilityCoefficient < 5
        )
            ? probabilityCoefficient
            : 3;
        let allSigns;

        /** Create new array, where signs occur x times more often then
         *  the otherSigns.
         *  (where x === probability)
         *  Do it only if there are otherSigns
         */
        if ( otherSigns && otherSigns.length ) {
            allSigns = ( () => {
                let result = [];
                for ( let i = 0; i < probability; i++ ) {
                    result = [...result, ...signs];
                }
                result = [...result, ...otherSigns];
                return result;
            } )();
        } else {
            allSigns = signs;
        }

        let noOfSigns = allSigns ? allSigns.length : 0;
        let result = '';

        /** Create text */
        if ( noOfSigns ) {
            let random = () => Math.floor( Math.random() * ( noOfSigns ) );
            for ( let i = 0, len = length; i < len; i++ ) {
                result += allSigns[random()];
            }
            random = null;
        }

        allSigns = null;
        return result;
    }

    render() {
        return null;
    }
}

export default TextGeneratorComponent;
