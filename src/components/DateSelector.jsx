import React from 'react';

export default function DateSelector({ selectedDate, setSelectedDate }) {
  return (
    <div className="text-center mb-4">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="px-4 py-2 border border-pink-300 bg-pink-50 rounded focus:outline-none focus:ring focus:ring-pink-400 shadow"
      />
      <p className="mt-2 text-sm text-pink-700">
        Reflect your thoughts for <strong>{selectedDate}</strong>
      </p>
    </div>
  );
}
