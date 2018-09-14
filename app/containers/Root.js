import React, { Component } from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Router from '../router';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: purple
  }
});

const styles = theme => {};

class Root extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router />
      </MuiThemeProvider>
    );
  }
}
export default withStyles(styles)(Root);
