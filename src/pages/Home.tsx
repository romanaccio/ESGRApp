import React from 'react';
import Box from '../components/Box';
import Footer from '../components/Footer';
import Login from '../components/Login';
import { APP_NAME } from '../const/miscConsts';
const Home = () => {
  return (
    <>
      <Box title={APP_NAME}>
        <Login />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
