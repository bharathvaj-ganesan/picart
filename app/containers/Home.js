import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Editor from './Editor';

class Home extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={8}>
        <Grid item xs={10}>
          <h1
            className="text__primary text--center"
            style={{ fontSize: '3rem' }}
          >
            PICART
          </h1>
          <Editor />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
