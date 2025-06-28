import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useDiary } from '../Context/DiaryContext';
import { GiOpenBook } from 'react-icons/gi';

export default function SingleEntries() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { entries, setEntries } = useDiary();

    const [found, setFound] = useState(null);

    useEffect(() => {
        const entry = entries.find((e) => e._id === id);
        setFound(entry);
        setLoading(false);

    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-50">
                <div className="text-pink-500 text-xl font-semibold animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!found) {
       navigate("/")
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-100 to-fuchsia-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-xl border-l-4 border-pink-400">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-pink-700 flex items-center gap-4">
                        <GiOpenBook />
                        Diary Entry
                    </h2>
                    <button
                        onClick={() => navigate(-1)}
                        className=" cursor-pointer flex items-center gap-2 text-pink-500 hover:text-pink-600 text-sm"
                    >
                        <FaArrowLeft />
                        Back
                    </button>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Date:</span> {found.date}
                </div>

                <div className="bg-pink-50 border border-pink-200 p-4 rounded-md whitespace-pre-wrap text-gray-700">
                    {found.content}
                </div>
            </div>
        </div>
    );
}
