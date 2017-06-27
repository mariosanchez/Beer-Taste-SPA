import React from 'react';

export const Logged = (props) =>{

  if (props.USER_ID) {
    return (<span>🙂</span>);
  }

  return (<span>🙁</span>);
};

export default Logged;
