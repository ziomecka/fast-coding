import * as React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import HomeView from './home/';
import LessonsView from './lessons/';
import LessonView from './lesson/';
import AboutView from './about/';
import LoginView from './login/';
import NewUserView from './newuser/';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme/';

const Root: React.StatelessComponent<{}> = () => {
  return (
    <MuiThemeProvider {...{ theme }}>
      <BrowserRouter>
        <Route path="/">
          <HomeView>
            <Switch>
              <Route exact path="/lessons" component={LessonsView} />
              <Route path="/lessons/:id" component={LessonView} />
              <Route path="/about" component={AboutView} />
              <Route path="/login" component={LoginView} />
              <Route path="/newuser" component={NewUserView} />
            </Switch>
          </HomeView>
        </Route>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default Root;
