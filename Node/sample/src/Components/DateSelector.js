import React from 'react';

const DateSelector = ({ date, setDate }) => {
  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default DateSelector;
