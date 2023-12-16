import React, { useState } from 'react';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import { userURL } from '../Base/Constent';
import { Link } from 'react-router-dom';
import '../Styles/Home.css'

// const encodeProductId = (productId) => {
//   return btoa(productId);
// };
function SearchBar() {
  const [activeSearch, setActiveSearch] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value;

    if (query === '') {
      setActiveSearch([]);
      return false;
    }

    try {
      const response = await axios.get(`${userURL}/search/products/${query}`);
      setActiveSearch(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div>
      <form action="" className='relative'>
        <div className="relative md:block flex justify-center">
          <input
            type="search"
            placeholder='Find here....'
            className='md:w-full w-[80%] sm:p-4 p-2 rounded-full bg-white'
            onChange={(e) => handleSearch(e)}
          />
        </div>
        {
          activeSearch.length > 0 && (
            <div className="absolute custom-scrollbar max-h-[250px] sm:max-h-[300px] overflow-x-auto sm:top-16 top-12 z-50 p-2 bg-white text-black w-[70%] sm:w-full rounded-xl left-1/2 -translate-x-1/2  flex flex-col gap-2 cursor-pointer shadow-xl">
              {
                activeSearch.map((search) => (
                  // <Link to={`/search/products/${search._id}`} key={search._id}>
                  <Link to={`/product/${search._id}`} key={search._id}>
                    <div className="w-full hover:bg-slate-200 rounded-xl p-2">
                      {search.productName}
                    </div>
                  </Link>
                ))
              }
            </div>
          )
        }
      </form>
    </div>
  );
}

export default SearchBar;
