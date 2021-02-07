import React from 'react';
import Box from '../components/Box';
import Login from '../components/Login';
import { APP_NAME } from '../const/miscConsts';
const Home = () => {
  return (
    <Box title={APP_NAME}>
      <Login />
    </Box>
  );
};

export default Home;
