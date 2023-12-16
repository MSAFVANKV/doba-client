import React from 'react';
import { NavLink } from 'react-router-dom';

function HeaderItems({ items, index, Icon }) {
    return (
        <div className=''>
            <li className='text-black font-bold flex items-center justify-center hover:underline underline-offset-4' key={index}>
                <NavLink
                    className={({ isActive }) => {
                        // isActive is accessible within this scope
                        const iconColor = isActive ? 'text-[#F26D1E]' : 'text-black';
                        return ` ${iconColor} hover:text-black`;
                    }}
                    to={items.path}
                >
                    <div className="flex items-center">
                        {Icon && (
                            <Icon
                                className={({ isActive }) => (isActive ? 'text-[#F26D1E]' : 'text-black')}
                            />
                        )}
                        {items.display}
                    </div>
                </NavLink>
            </li>
        </div>
    );
}

export default HeaderItems;
