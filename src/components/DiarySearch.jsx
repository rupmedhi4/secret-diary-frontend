import React, { useState, useEffect } from 'react';
import { useDiary } from '../Context/DiaryContext';

export default function DiarySearch({ onFilter }) {
  const [searchDate, setSearchDate] = useState('');
  const { entries } = useDiary();

  useEffect(() => {
    if (searchDate === '') {
      onFilter(entries); 
    } else {
      const results = entries.filter((entry) => entry.date === searchDate);
      onFilter(results);
    }
  }, [searchDate, entries]);

  return (
    <div>
      <h2 className="text-lg font-medium text-purple-700 mb-2">Search diary by date</h2>
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="cursor-pointer px-4 py-2 border border-purple-300 bg-purple-50 rounded focus:outline-none focus:ring focus:ring-purple-400 shadow"
      />
    </div>
  );
}
