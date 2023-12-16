// import React from "react";
// import { FaFacebookF, FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// const SocialIcons = ({ Icons }) => {
//   const iconComponents = {
//     'logo-facebook': { icon: <FaFacebookF />, link: Icons.find(icon => icon.name === 'logo-facebook')?.link },
//     'logo-twitter': { icon: <FaTwitter />, link: Icons.find(icon => icon.name === 'logo-twitter')?.link },
//     'logo-github': { icon: <FaGithub />, link: Icons.find(icon => icon.name === 'logo-github')?.link },
//     'logo-linkedin': { icon: <FaLinkedin />, link: Icons.find(icon => icon.name === 'logo-linkedin')?.link },
//     'logo-instagram': { icon: <FaInstagram />, link: Icons.find(icon => icon.name === 'logo-instagram')?.link },
//   };

//   return (
//     <div className="">
//       {Object.keys(iconComponents).map((iconName) => (
//         <Link
//           key={iconName}
//           to={iconComponents[iconName].link}
//           className="p-2 cursor-pointer inline-flex items-center
//         rounded-full bg-gray-700 mx-1.5 text-xl hover:text-black hover:bg-teal-500
//         duration-300 "
//         >
//           {iconComponents[iconName].icon}
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default SocialIcons;
