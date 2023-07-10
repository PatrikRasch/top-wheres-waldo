import React, { useState } from "react";

import targetJohnnyBravo from "./../../images/cartoon-network-characters/johnny-bravo1.png";
import targetScoobyDoo from "./../../images/cartoon-network-characters/scooby-doo1.png";
import targetPlank from "./../../images/cartoon-network-characters/plank1.png";
import { GameStartedProp } from "../../interfaces";

interface Props {
  gameStarted: GameStartedProp["gameStarted"];
  setGameStarted: GameStartedProp["setGameStarted"];
}

const HeaderTargets = (props: Props) => {
  const { gameStarted, setGameStarted } = props;

  const renderGame = () => {
    if (gameStarted === true) {
      return (
        <div className="flex flex-col items-center p-1 text-2xl">
          <div className="h-8">Find, click and select us</div>
          <div className="grid grid-cols-3 justify-items-center overflow-hidden">
            <img src={targetJohnnyBravo} alt="" className="h-40 p-3 " />
            <img src={targetScoobyDoo} alt="" className="h-40 p-3" />
            <img src={targetPlank} alt="" className="h-40 p-3" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid justify-center gap-2">
          <div className="h-8 text-lg">Click to see the characters you are to find</div>
          <button
            className="h-[75px] w-[200px] justify-self-center rounded-lg bg-black text-2xl text-white hover:opacity-80"
            onClick={() => {
              setGameStarted(true);
            }}
          >
            Start Game
          </button>
        </div>
      );
    }
  };

  return <div className=" grid items-center sm:h-[15vh] xl:h-[15vh]">{renderGame()}</div>;
};

export default HeaderTargets;
