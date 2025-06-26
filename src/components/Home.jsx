import React, { useEffect, useState } from 'react';
import Header from './Header';
import DateSelector from './DateSelector';
import DiaryInput from './DiaryInput';
import DiaryEntries from './DiaryEntries';
import { BsFillHeartFill } from "react-icons/bs";



export default function DiaryHome({ setCookie }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [showInput, setShowInput] = useState(false);


  return (
    <div className="min-h-screen w-full bg-gradient-to-bl from-rose-100 via-pink-100 to-fuchsia-100 p-6 text-gray-800">
      <Header setCookie={setCookie} />
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="text-center my-6">
        <button
          onClick={() => setShowInput(!showInput)}
          className="bg-pink-500 text-white px-6 py-3 rounded shadow hover:bg-pink-600 transition"
        >
        <div className='flex items-center gap-4 cursor-pointer'>
          <BsFillHeartFill className='text-red-900 text-xl'/>
          Write Today’s Diary
        </div>
        </button>
      </div>

      {showInput && (
        <DiaryInput selectedDate={selectedDate} setShowInput={setShowInput} />
      )}

      <DiaryEntries />
    </div>
  );
}
