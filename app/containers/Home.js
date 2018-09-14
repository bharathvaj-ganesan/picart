import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Editor from './Editor';

class Home extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={8}>
        <Grid item xs={10}>
          <h2 className="text__primary text--center">PiC ArT</h2>
          <Editor />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
