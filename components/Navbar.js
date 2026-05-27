import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white w-[80vw] flex justify-between absolute top-10 right-[10vw] rounded-full p-3 px-7">
      <div className="logo flex gap-20 items-center">
        <img
          className="h-6"
          loading="eager"
          src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
          alt="logo_img"
        />
        <ul className="flex gap-10">
          <li>Products</li>
          <li>Templates</li>
          <li>Marketplace</li>
          <li>Learn</li>
          <li>Pricing</li>
        </ul>
      </div>

      <div className="flex gap-2">
        <div className="login bg-gray-400 p-4 rounded-lg">Login</div>
        <div className="signup bg-gray-900 text-white p-4 rounded-full">
          Sign up
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
