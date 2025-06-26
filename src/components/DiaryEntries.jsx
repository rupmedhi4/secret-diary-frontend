import React, { useEffect, useState } from 'react';
import DiarySearch from './DiarySearch';
import axios from 'axios';
import { useDiary } from '../Context/DiaryContext';
import { useNavigate } from 'react-router-dom';
import { BsFillBookFill } from 'react-icons/bs';

export default function DiaryEntries() {
  const { entries, setEntries, setAddSingleEntry } = useDiary();
  const [displayedEntries, setDisplayedEntries,addSingleEntry] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('https://secret-diary-backend.onrender.com/api/user/diary/data', {
          withCredentials: true,
        });

        setEntries(res.data.entries || []);
        setDisplayedEntries(res.data.entries || []);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, [addSingleEntry]);

  const showEntriesHandler = (id) => {
    navigate(`/home/entries/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 max-h-95 overflow-y-scroll px-4">
      <div className="flex md:justify-between md:flex-row flex-col items-center mb-4 md:sticky top-0 bg-pink-300 rounded-md p-2 gap-4">
        <h2 className="text-xl font-semibold text-pink-700">
        <div className='flex items-center gap-4'>
        <BsFillBookFill className='text-yellow-900'/>

          <span>
         Your Past Entries
            
          </span>
        </div>
         </h2>
        <DiarySearch onFilter={setDisplayedEntries} />
      </div>

      <div className="grid gap-5">
        {displayedEntries.length > 0 ? (
          displayedEntries.map((entry) => (
            <div
              key={entry._id}
              onClick={() => showEntriesHandler(entry._id)}
              className="bg-white p-5 rounded-xl shadow border-l-4 border-pink-400 cursor-pointer hover:bg-pink-50 transition"
            >
              <div className="text-sm text-gray-500 mb-1">{entry.date}</div>
              <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">No entries found.</div>
        )}
      </div>
    </div>
  );
}
