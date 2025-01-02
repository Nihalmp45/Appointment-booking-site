import React from 'react';

const SlotGrid = ({ availableSlots, selectedSlot, setSelectedSlot }) => {
  return (
    <div className="slot-grid">
      {availableSlots.map((slot, index) => (
        <div
          key={index}
          className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
          onClick={() => setSelectedSlot(slot)}
        >
          {slot}
        </div>
      ))}
    </div>
  );
};

export default SlotGrid;
