import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { mainURL, userURL } from '../../Base/Constent';
import axios from 'axios';

function SearchBarPage() {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
//   const { query } = useParams();
//   const [results, setResults] = useState(null);
// console.log(results,'results')
//   useEffect(() => {
//     axios.get(`${userURL}/search/product/${query}`)
//       .then((response) => setResults(response.data))
//       .catch((error) => console.error(error));
//   }, [query]);

//   if (!results) {
//     return <div>Loading...</div>;
//   }
  

  return (
    <div className=''>
      <div className="flex items-center justify-center p-10 gap-5">
        {/* <h1 className='text-[1.3rem] font-bold'>Looking For: <span>{results.productName}</span></h1> */}
    
      <div className="grid gap-5 grid-cols-4 product-card-container">
      {searchResults.map((result, index) => (
          <div key={index} className="product-card h-[220px] w-[200px] md:h-[215px] md:w-[215px] lg:h-[250px] lg:w-[250px]  my-4 border rounded-md overflow-hidden shadow-md">
            <img
              src={`${mainURL}/Public/ProductsImages/${result.file[0]}`}
              alt={result.productName}
              className='w-full lg:h-[190px] h-[150px] p-1 sm:object-cover sm:object-center'
            />
            <div className="p-2">
              <p className="text-center font-bold text-sm mb-1">{result.productName}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-xs">{result.category}</p>
                <Link to={`/product/${result._id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default SearchBarPage;
