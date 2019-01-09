import * as React from 'react';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { InfoProps } from './container';
import { isContent, isTranslation, IRenderType, InfoEnum } from './_duck/types';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { withLocalize } from 'react-localize-redux';

const { standalone } = InfoEnum;

/** Component used to display texts received from server that are stoed in
 *  'translations' state.
 *  However, it may be used to display translations stored in localize
 */
const InfoComponent: React.StatelessComponent< InfoProps > = props => {
    const {
        variant,
        render,
        displayError = false,
        translate,
        activeLanguage,
        useLocalize,
        id: translationsId,
        translations
    } = props;

    const className = ( variant ===  standalone )
        ? props.classes.standalone
        : null;

    const errMessage = displayError ? 'Missing translation' : null;

    const getTranslation = useLocalize
        ? (id: string): string => {
            const a = translate(id)
            return translate(id) as string;
        }
        : (() => {

            const trans = Array.isArray( translations )
                ? translations.filter(translation => translation.id === translationsId)[0]
                : null;

            const activeLanguageTranslations = Object(trans) === trans
                ? trans[ activeLanguage.code ]
                : {};

            return (id: string, text: string): string => activeLanguageTranslations[id] || text || errMessage;
        })();

    const display = (item: IRenderType, txt: string, key: string | number): JSX.Element => {
        const { component, variant = 'body1', pre } = item;
        const Component = component || Typography;

        const componentProps = ( Component === Typography )
            ? { variant, style: { whiteSpace: pre } }
            : null;

        return (txt &&
            <React.Fragment {...{ key }}>
                { variant !== 'span' &&
                    <Component { ...componentProps }>
                        { txt }
                    </Component>
                }

                { variant === 'span' &&
                    <span { ...componentProps }>
                        { txt }
                    </span>
                }
            </React.Fragment>
        );
    };

    /** (useLocalize || translations) check used in order to
     *  avoid displaying only some parts of text in case translations have not been received from server */
    return ((useLocalize || translations) &&
        <Paper { ...{ className } }>
            { render.map((item: IRenderType, ind: number) => {
                if ( isTranslation(item) ) {
                    const { id, text } = item;

                    return display(item, getTranslation(id, text), ind);
                }

                if ( isContent(item) ) {
                    const { content, component, variant, pre } = item;
                    const Component = component || Typography;

                    const componentProps = ( Component === Typography )
                        ? { variant, style: { whiteSpace: pre } }
                        : null;

                    return (
                        <Component { ...componentProps } key={ ind }>
                            { Object.keys(content).map((i, ind) => {
                                if ( isTranslation(content[i]) ) {
                                    const { id, text } = content[i];
                                    return display(content[i], getTranslation(id, text), ind);
                                }

                                console.error('Some item in Info component is neither Content nor translation. Not rendered');
                                return null;
                            })}
                        </Component>
                    );
                }
            })}
        </Paper>
    );
};

export default withLocalize(withStyles(styles)(InfoComponent));
