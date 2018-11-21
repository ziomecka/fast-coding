import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ChevronRight from '@material-ui/icons/ChevronRight';

const AboutViewComponent: React.StatelessComponent<{}> = function () {
  const technologies = [
    'React',
    'JavaScript, Typescript, Sass, CSS, HTML',
    'Node.js',
    'MongoDB',
    'Redis',
    'babel, eslint',
    'lodash',
    'jest, chai, enzyme, sinon',
    'CI with gitub - travis - heroku',
    'webpack'
  ];

  return (
    <Paper>
      <p>The fast coding application has been coded by Katarzyna Ziomek-Zdanowicz</p>
      <p>Following frameworks, libraries, technologies and tools were used:</p>
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
