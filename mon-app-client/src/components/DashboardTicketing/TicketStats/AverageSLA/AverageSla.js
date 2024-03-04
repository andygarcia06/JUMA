import React from 'react';

const AverageSLA = ({ slaAverage }) => {
  return (
    <div className="average-sla">
      <p>SLA Moyen: {slaAverage ? slaAverage.toFixed(2) : 'N/A'} heures</p>
    </div>
  );
};

export default AverageSLA;
