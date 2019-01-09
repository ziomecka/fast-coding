import * as React from 'react';
import { TypographyClassKey } from '@material-ui/core/Typography';

type PreType = 'pre-wrap' | 'pre';

type ComponentType  = React.ComponentClass | React.FunctionComponent;

type VariantType = TypographyClassKey | 'span';

interface Component {
    component?: ComponentType,
    variant?: VariantType,
    pre?: PreType
}

type Translation = {
    id?: string;
    text?: string;
};

export type TranslationT = Translation & Component

type ContentT = { content: TranslationT[] } & Component

export type IRenderType = ContentT | TranslationT

export type IRenderInfo = IRenderType[]

const isString = (value: any) => typeof value === 'string';

export function isContent(item: IRenderType): item is ContentT {

    /** Content is array and does not have id and does not have text */
    if ( Array.isArray( (<ContentT>item).content ) &&
         (<TranslationT>item).id === undefined &&
         (<TranslationT>item).text === undefined ) {
        return true;
    }

    return false;
}

export function isTranslation(item: IRenderType): item is TranslationT {

    /** Does not have content and has either id of type string or text of type string */
    if ( ( (<ContentT>item).content === undefined ) &&
         ( isString( (<TranslationT>item).id ) || isString( (<TranslationT>item).text) ) ) {
        return true;
    };

    return false;
}

export default IRenderType;

export enum InfoEnum {
    dialog = 'DIALOG',
    standalone = 'STANDALONE'
}