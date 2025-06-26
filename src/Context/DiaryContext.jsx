import { createContext, useContext, useState } from 'react';

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
    const [entries, setEntries] = useState([]);
    const [entryText, setEntryText] = useState('');
    const [addSingleEntry, setAddSingleEntry] = useState('');

    return (
        <DiaryContext.Provider value={{ entries, setEntries,entryText, setEntryText,setAddSingleEntry,addSingleEntry }}>
            {children}
        </DiaryContext.Provider>
    );
};

export const useDiary = () => useContext(DiaryContext);
