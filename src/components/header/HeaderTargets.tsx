import React from "react";

import targetJohnnyBravo from "./../../images/cartoon-network-characters/johnny-bravo1.png";
import targetScoobyDoo from "./../../images/cartoon-network-characters/scooby-doo1.png";
import targetPlank from "./../../images/cartoon-network-characters/plank1.png";

const HeaderTargets = () => {
  return (
    <div>
      <div className="flex h-48 flex-col items-center p-1 text-2xl">
        <div className="h-8">Find, click and select us</div>
        <div className="grid grid-cols-3 justify-items-center overflow-hidden">
          <img src={targetJohnnyBravo} alt="" className="h-40 p-3 " />
          <img src={targetScoobyDoo} alt="" className="h-40 p-3" />
          <img src={targetPlank} alt="" className="h-40 p-3" />
        </div>
      </div>
    </div>
  );
};

export default HeaderTargets;
