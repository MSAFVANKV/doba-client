// import React, { useState } from 'react'
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// const markers = [
//   {
//     id:1,
//     name:"mavoor",
//     position: { lat: 40.0703493, lng: 49.3694411}
//   }
// ]

// function GMap() {
//   const googleMapsApiKey = 'AIzaSyBaTBTLggy6XDZY8up8FiZr_Qq_y-wpzxw'
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: import.meta.env.GOOGLE_MAP_API_KEY
//   })
//   console.log(googleMapsApiKey, "api key");

//   const [activeMarker, setActiveMarker] = useState(null)
//   const handleSctiveMarker = (marker) => {
//     if(marker === activeMarker) {
//       return
//     }
//     setActiveMarker(marker)
//   }

//   return (
//     <div className='container '>
//         <div className="w-full h-[300px] m-5">
//             <span className='text-center'>GOOGLE MAP</span>
//             {
//               isLoaded ? (
//                 <GoogleMap center={{lat:40.3947365, lng:49.6898045}} 
//                 zoom={10}
//                 onClick={()=> setActiveMarker(null)}
//                 mapContainerStyle={{
//                   width:"100%",
//                   height:"90vh"
//                 }}
//                 >  
//                   {
//                     markers.map(({id, name, position}) => {
//                       <Marker
//                       key={id}
//                       position={position}
//                       onClick={() => handleSctiveMarker(id)}
//                     />
//                     })
//                   }
//                 </GoogleMap>
//               ):null
//             }
//         </div>
//     </div>
//   )
// }

// export default GMap