import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    This is home page <Link to="/editor">Go to editor</Link>
  </div>
);

export default HomePage;
