import { default as restoreState } from './restore.state';
import { default as handleKeys } from './handle.keys';
import { default as life } from './life';

export default { ...restoreState, ...handleKeys, ...life };