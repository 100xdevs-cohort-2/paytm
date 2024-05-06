import React from 'react';
import { useRecoilValue } from 'recoil';
import { usernameAtom } from '../store/atom/Username';

const AppBar = () => {
  const name = localStorage.getItem('name');
  const icon = name.charAt(0);

  return (
    <div className='flex w-full bg-white justify-between p-2 text-black font-bold'>
      <p>Payment app</p>
      <div className='flex items-center justify-center'>
        <p>Hello,</p>
        <div className='bg-gray-300 text-black w-8 h-8 rounded-full flex items-center justify-center'>{icon}</div>
      </div>
    </div>
  );
};

export default AppBar;
