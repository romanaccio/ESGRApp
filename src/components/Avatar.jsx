import React from 'react';
import UserIcon from '../icons/UserIcon';
import PropTypes from 'prop-types';

const Avatar = ({ username, photoURL, rounded = true, small = false }) => {
  console.log('Avatar');
  let className = 'shadow overflow-hidden';
  if (small) className += ' h-8 w-8';
  else className += ' h-24 w-24';
  if (rounded) {
    className += ' rounded-full';
  }
  return (
    <>
      {photoURL ? (
        <div className={className}>
          <img
            className='h-full w-full object-cover'
            src={photoURL}
            alt={username}
          />
        </div>
      ) : (
        <UserIcon small={small} />
      )}
    </>
  );
};

Avatar.propTypes = {
  username: PropTypes.string,
  photoURL: PropTypes.string,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
};
export default Avatar;
