import * as React from 'react';

import { CoursesProps } from './container';
import Course from '@components/Course/';

/** Materials core */
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';

const CoursesComponent: React.StatelessComponent<CoursesProps> = props => {
    return (
        <Grid
            container
            direction="row"
            wrap="wrap"
        >
            {/*
                GridListTile is used in the Course component because
                its' class depends on the fact whether the course expansion panel is expanded or not.

                If the GridListTile is used in other component than the GridList's component then
                the GridList props like 'cols' do not affect the GridListTile.
                It's material design issue.

                So the props of GridListTile are set in the Course component.
            */}
            <GridList>
                { props.lessons && props.lessons.map( ( lesson ) => <Course { ...lesson } tabIndex={ -1 } key={ lesson._id }/> )}
            </GridList>
        </Grid>
    );
};

export default CoursesComponent;
