import React from 'react';

export const BeerPicture = ({ picture })=> {
  const pictureStyle = { background: `url(${picture}) white no-repeat center center`};

  return <div className="picture" style={pictureStyle}/>
};

export default BeerPicture;
