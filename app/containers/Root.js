import React, { Component } from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Home from './Home';

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
        <Home />
      </MuiThemeProvider>
    );
  }
}
export default withStyles(styles)(Root);
