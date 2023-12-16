import React from "react";
import { RiCustomerService2Fill } from "react-icons/ri";

const FooterItems = ({ Links, title, isContact }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold sm:text-[1.5rem] text-[1rem]">
        {isContact ? (
          <>
            <RiCustomerService2Fill className="inline-block mr-2" />
            {title}
          </>
        ) : (
          title
        )}
      </h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a target="_blank"
  rel="noopener noreferrer"
            className=" hover:text-teal-400 duration-300
          sm:text-base text-sm cursor-pointer leading-6 "
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FooterItems;
