import React from "react";
import HeaderTargets from "./HeaderTargets";
import Counter from "./Counter";
import { TimeProp } from "../../interfaces";
import { GameStartedProp } from "../../interfaces";
import { ShowScoreboardProp } from "../../interfaces";

interface Props {
  gameStarted: GameStartedProp["gameStarted"];
  setGameStarted: GameStartedProp["setGameStarted"];
  time: TimeProp["time"];
  setTime: TimeProp["setTime"];
  showScoreboard: ShowScoreboardProp["showScoreboard"];
  setShowScoreboard: ShowScoreboardProp["setShowScoreboard"];
}

const Header = (props: Props) => {
  const { time, setTime } = props;
  const { gameStarted, setGameStarted } = props;
  const { showScoreboard, setShowScoreboard } = props;
  return (
    <div className="grid min-h-[200px] w-screen grid-cols-3 items-center bg-white">
      <button
        className="w-[200px] justify-self-center rounded-md bg-black p-6 text-xl text-white hover:opacity-90"
        onClick={() => {
          setShowScoreboard(true);
        }}
      >
        Scoreboard
      </button>
      <div className="grid min-w-max items-center justify-center">
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
