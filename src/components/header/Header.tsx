import React from "react";
import HeaderTargets from "./HeaderTargets";

const Header = () => {
  return (
    <div className="grid w-screen grid-cols-3 items-center bg-white">
      <div className="justify-self-center text-5xl">Home</div>
      <div className="grid items-center justify-center">
        <HeaderTargets />
      </div>
      <div className="justify-self-center text-5xl">Counter</div>
    </div>
  );
};

export default Header;
