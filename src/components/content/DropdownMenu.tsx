import React from "react";
import targetJohnnyBravo from "./../../images/cartoon-network-characters/johnny-bravo1.png";
import targetScoobyDoo from "./../../images/cartoon-network-characters/scooby-doo1.png";
import targetPlank from "./../../images/cartoon-network-characters/plank1.png";

interface DropdownMenuProps {
  closeDropdown: () => void;
}

// const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
//   const handleCloseDropdown = () => {
//     props.closeDropdown();
//   };

const DropdownMenu = (props: DropdownMenuProps) => {
  const handleCloseDropdown = () => {
    props.closeDropdown();
  };

  return (
    <div className="rounded-xl bg-white p-4 text-2xl shadow-xl">
      <div className="flex cursor-pointer items-center justify-evenly gap-4 rounded-t-xl p-3 hover:bg-gray-200">
        <img src={targetJohnnyBravo} alt="" className="h-24 w-auto" />
        <div>Johnny Bravo</div>
      </div>
      <div className="h-px bg-gray-900"></div>
      <div className="flex cursor-pointer items-center justify-evenly gap-4 p-3 hover:bg-gray-200">
        <img src={targetScoobyDoo} alt="" className="h-24 w-auto" />
        <div>Scooby-Doo</div>
      </div>
      <div className="h-px bg-gray-900"></div>
      <div className="flex cursor-pointer items-center justify-start gap-6 p-3 hover:bg-gray-200">
        <img src={targetPlank} alt="" className="h-24 w-auto" />
        <div>Plank</div>
      </div>
      <div className="h-px bg-gray-900"></div>
      <button
        className="w-full cursor-pointer gap-6 justify-self-center rounded-b-xl p-3 font-bold hover:bg-gray-500 hover:text-white"
        onClick={() => handleCloseDropdown()}
      >
        Close
      </button>
    </div>
  );
};

export default DropdownMenu;
