import { get } from '@app/api/';
import { AppRoutesServerEnum } from '@appTypes';

const { isAuthorized: path } = AppRoutesServerEnum;

export const onIsAuthorized = (): any => ( (): void => {
    get( { path } );
} );

export default { onIsAuthorized };
