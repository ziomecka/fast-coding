import { MediaEnum } from './_duck';
const { lg, md, sm, xl, xs} = MediaEnum;

export const BREAKPOINTS = new Map( [
    [ xs, 0 ],
    [ sm, 600 ],
    [ md, 960 ],
    [ lg, 1280 ],
    [ xl, 1920 ],
] );

export default BREAKPOINTS;
