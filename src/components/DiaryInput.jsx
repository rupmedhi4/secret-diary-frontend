import axios from 'axios';
import React, { useState } from 'react';
import { useDiary } from '../Context/DiaryContext';
import { PiShootingStarFill } from "react-icons/pi";

export default function DiaryInput({ selectedDate, setShowInput }) {
  const { entryText, setEntryText, setEntries, setAddSingleEntry } = useDiary()

  const handleSave = async () => {
    if (!entryText.trim()) return;
    const newEntry = {
      date: selectedDate,
      text: entryText
    };

    const res = await axios.post(`http://localhost:5000/api/user/diary/entries`, newEntry, {
      withCredentials: true
    });
    console.log(res);
    setEntries((prev) => [res.data.entry, ...prev])
    setAddSingleEntry(res.data.entry)
    setEntryText('');
    setShowInput(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-pink-200">
      <textarea
        rows="5"
        className="w-full p-4 border border-rose-300 bg-rose-50 rounded-xl text-gray-700 focus:outline-none focus:ring focus:ring-rose-400 placeholder:text-rose-400"
        placeholder="Write your beautiful day here..."
        value={entryText}
        onChange={(e) => setEntryText(e.target.value)}
      />
      <div className="text-right mt-4">
        <button
          onClick={handleSave}
          className=" bg-rose-500 text-white px-5 py-2 rounded hover:bg-rose-600 transition"
        >
          <div className="flex items-center gap-2 cursor-pointer" >
            <PiShootingStarFill className="text-yellow-500 text-2xl" />
            <span>Save Entry</span>
          </div>

        </button>
      </div>
    </div>
  );
}
