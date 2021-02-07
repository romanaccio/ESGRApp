import React from 'react';
import { Link } from 'react-router-dom';
import * as MISC from '../const/miscConsts';

const Footer = () => {
  return (
    <footer className='pt-5'>
      <div className='text-center'>
        <p className='text-sm'>
          &copy;
          <span className='px-1 '>
            <Link className='hover:underline' to='/'>
              {MISC.APP_NAME}
            </Link>
          </span>
          2021.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
