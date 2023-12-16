import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Sidebaritems({ items, index, Icon, closeToggle }) {
    // const [Sidebaritems, setSidebaritems] = useState("#Sidebaritems.active")
  return (
    <div className='modal-container ' onClick={()=>closeToggle()}>
    
        <ul className='text-white font-bold flex flex-col space-y-5 text-[1.2rem]'>
          {items.map((item, index) => (
            <li className='flex items-center  hover:underline underline-offset-4' key={index}>
              <NavLink
                className={({ isActive }) => {
                  // isActive is accessible within this scope
                  const iconColor = isActive ? 'text-[#F26D1E]' : '';
                  return ` ${iconColor} hover:text-black`;
                }}
                to={item.path}
              >
                <div className="flex items-center">
                 
                  {item.display}
                </div>
              </NavLink>
            </li>
          ))}
          {/* <div className="flex justify-center">
          <button className='btn w-[50%] mb-5'>LOGIN</button>

          </div> */}
        </ul>
     
    </div>
  );
}

export default Sidebaritems;
