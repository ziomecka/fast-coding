import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as TranslationsLoader } from './component';

import { onLoadTranslations } from './_duck/operations';

const mapStateToProps = () => ( {} );

const mapDispatchToProps = ( dispatch: Dispatch ): TranslationsLoaderDispatch => ( {
    loadData: () => dispatch( onLoadTranslations() )
} );

const TranslationsLoaderContainer = connect( mapStateToProps, mapDispatchToProps )( TranslationsLoader );

export default TranslationsLoaderContainer;

export interface TranslationsLoaderDispatch {
    loadData: () => Action;
}

export interface TranslationsLoaderProps extends
    TranslationsLoaderDispatch {}