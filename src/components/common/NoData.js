import React from 'react';

const NoData = ({className}) => {
  return (
    <div className={`no-data-container ${className}`}>
      --No Data--
    </div>
  );
};

export default NoData;