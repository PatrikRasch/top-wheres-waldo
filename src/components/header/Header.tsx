import React, { useState } from "react";
import HeaderTargets from "./HeaderTargets";
import Counter from "./Counter";
import { TimeProp } from "../../interfaces";
import { GameStartedProp } from "../../interfaces";

interface Props {
  gameStarted: GameStartedProp["gameStarted"];
  setGameStarted: GameStartedProp["setGameStarted"];
  time: TimeProp["time"];
  setTime: TimeProp["setTime"];
}

const Header = (props: Props) => {
  const { time, setTime } = props;
  const { gameStarted, setGameStarted } = props;
  return (
    <div className="grid w-screen grid-cols-3 items-center bg-white">
      <div className="justify-self-center text-5xl">Home</div>
      <div className="grid items-center justify-center">
        <HeaderTargets gameStarted={gameStarted} setGameStarted={setGameStarted} />
      </div>
      <div className="justify-self-center text-5xl">
        <Counter
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          time={time}
          setTime={setTime}
        />
      </div>
    </div>
  );
};

export default Header;
