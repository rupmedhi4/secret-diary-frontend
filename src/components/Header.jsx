import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import useLogout from '../customHook/useLogout';
import { useNavigate } from 'react-router-dom';
import useGreeting from '../customHook/useGreeting';
import Cookies from 'js-cookie';
import { useDiary } from '../Context/DiaryContext';

export default function Header() {
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState('');
const{token,setToken}=useDiary()

  useEffect(() => {
    useGreeting(setGreeting)
  }, []);

  const logoutHandler = () => {
    Cookies.remove('jwt');
    setToken(null)
    navigate("/")
  }

  return (
    <div className="flex flex-col md:flex-row  md:justify-between items-center md:mb-8 mb-16">
      <h1 className=" md:mb-0 mb-6 text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500 drop-shadow-sm">
        {greeting}, Dear
      </h1>
      <button
        onClick={logoutHandler}
        className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600 text-lg ">
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}
