import React, { useState, useEffect } from "react";
import { TimeProp } from "../../interfaces";
import { GameStartedProp } from "../../interfaces";

interface Props {
  gameStarted: GameStartedProp["gameStarted"];
  setGameStarted: GameStartedProp["setGameStarted"];
  time: TimeProp["time"];
  setTime: TimeProp["setTime"];
}

const Counter = (props: Props) => {
  const { time, setTime } = props;
  const { gameStarted, setGameStarted } = props;
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, gameStarted]);

  return (
    <div>
      <div>{time}s</div>
    </div>
  );
};

export default Counter;
