import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ChevronRight from '@material-ui/icons/ChevronRight';

const AboutViewComponent: React.StatelessComponent<{}> = () => {
    const technologies = [
        'React, redux, typescript',
        'Node.js, mongoDB, redis'
    ];

    return (
        <Paper>
            <p>The fast coding application has been coded by &nbsp;
                <a
                    href="https://www.linkedin.com/in/katarzynaziomekzdanowicz/"
                    style={{ textDecoration: "underline" }}
                >
                    Katarzyna Ziomek-Zdanowicz
                </a>.
            </p>
            <p>Following technologies, libreries and tools were used:</p>
            <List>
                {technologies.map((technology, ind) => (
                    <ListItem key={`${technology}-${ind}`}>
                        <ChevronRight />
                        <ListItemText>
                            {technology}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default AboutViewComponent;
