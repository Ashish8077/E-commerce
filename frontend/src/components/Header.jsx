import React from "react";

const Header = ({ background, category }) => {
  return (
    <header
      className={`bg-no-repeat bg-cover bg-center  text-white text-center h-80  flex flex-col justify-center items-center`}
      style={{ backgroundImage: `url(${background})` }}>
      <h1 className="text-4xl font-extrabold ">{category}</h1>
      <p className="mt-2 text-white text-lg ">
        Browse, filter, and sort products to find your perfect match!
      </p>
    </header>
  );
};

export default Header;
