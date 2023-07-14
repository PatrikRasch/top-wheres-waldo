import React, { useState, useEffect } from "react";

import { getDocs, collection } from "firebase/firestore";
import { db } from "./../config/firebase.config";

import { ScoreboardProp } from "../interfaces";
import { ShowScoreboardProp } from "../interfaces";
import { ShowGameoverProp } from "../interfaces";
import { ShowPlayAgainProp } from "../interfaces";
import { TimeProp } from "../interfaces";
import { CharacterListProp } from "../interfaces";
import { GameStartedProp } from "../interfaces";
import { JohnnyBravoFoundProp } from "../interfaces";
import { ScoobyDooFoundProp } from "../interfaces";
import { PlankFoundProp } from "../interfaces";

interface Props {
  showGameover: ShowGameoverProp["showGameover"];
  setShowGameover: ShowGameoverProp["setShowGameover"];
  scoreboard: ScoreboardProp["scoreboard"];
  setScoreboard: ScoreboardProp["setScoreboard"];
  showScoreboard: ShowScoreboardProp["showScoreboard"];
  setShowScoreboard: ShowScoreboardProp["setShowScoreboard"];
  showPlayAgain: ShowPlayAgainProp["showPlayAgain"];
  setShowPlayAgain: ShowPlayAgainProp["setShowPlayAgain"];
  time: TimeProp["time"];
  setTime: TimeProp["setTime"];
  characterList: CharacterListProp["characterList"];
  setCharacterList: CharacterListProp["setCharacterList"];
  gameStarted: GameStartedProp["gameStarted"];
  setGameStarted: GameStartedProp["setGameStarted"];
  johnnyBravoFound: JohnnyBravoFoundProp["johnnyBravoFound"];
  setJohnnyBravoFound: JohnnyBravoFoundProp["setJohnnyBravoFound"];
  scoobyDooFound: ScoobyDooFoundProp["scoobyDooFound"];
  setScoobyDooFound: ScoobyDooFoundProp["setScoobyDooFound"];
  plankFound: PlankFoundProp["plankFound"];
  setPlankFound: PlankFoundProp["setPlankFound"];
}

const Scoreboard = (props: Props) => {
  const [scorePosition, setScorePosition] = useState(1);
  const [scoreboardSorted, setScoreboardSorted] = useState(false);
  const { scoreboard, setScoreboard } = props;
  const { showScoreboard, setShowScoreboard } = props;
  const { showGameover, setShowGameover } = props;
  const { showPlayAgain, setShowPlayAgain } = props;
  const { time, setTime } = props;
  const { characterList, setCharacterList } = props;
  const { gameStarted, setGameStarted } = props;
  const { johnnyBravoFound, setJohnnyBravoFound } = props;
  const { scoobyDooFound, setScoobyDooFound } = props;
  const { plankFound, setPlankFound } = props;

  const scoresCollection = collection(db, "scores");

  // If the scoreboard is already populated, ignore.
  // If the scoreboard is empty, fetch the scores.
  useEffect(() => {
    if (scoreboard.length !== 0) return;
    const getScores = async () => {
      try {
        console.log("Before getScores read. In Scoreboard");
        const data = await getDocs(scoresCollection);
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          time: doc.data().time,
        }));
        filteredData.sort((a, b) => {
          return a.time - b.time;
        });
        setScoreboard(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getScores();
  }, []);

  const handleMapScoreboard = () => {
    return (
      <div className="grid max-h-[50vh] w-full overflow-y-scroll pt-4 text-6xl">
        {scoreboard.map((score) => (
          <div className="grid grid-cols-[0.3fr,1.3fr,0.6fr] text-4xl" key={score.id}>
            <div>{scoreboard.indexOf(score) + 1}.</div>
            <div>{score.name}</div>
            <div className="">{score.time}s</div>
          </div>
        ))}
      </div>
    );
  };

  const resetCharacterList = () => {
    const characterListCopy = [...characterList];
    characterListCopy.forEach((item) => (item.found = false));
    setCharacterList(characterListCopy);
    setJohnnyBravoFound(false);
    setScoobyDooFound(false);
    setPlankFound(false);
  };

  const handlePlayAgainClick = () => {
    setShowScoreboard(false);
    setShowPlayAgain(false);
    resetCharacterList();
    setTime(0);
    setGameStarted(true);
  };

  const handleShowScoreboard = () => {
    if (showPlayAgain)
      return (
        <div className="flex justify-around pt-10">
          <button
            className="h-[75px] w-[40%]  justify-self-center rounded-lg bg-black text-2xl text-white hover:opacity-90"
            onClick={() => {
              handlePlayAgainClick();
            }}
          >
            Play Again
          </button>
          <button
            className="h-[75px] w-[40%]  justify-self-center rounded-lg bg-black text-2xl text-white hover:opacity-90"
            onClick={() => {
              setShowScoreboard(false);
              setTime(0);
            }}
          >
            Close Scoreboard
          </button>
        </div>
      );
    else
      return (
        <div className="grid w-full items-center pt-10">
          <button
            className="h-[75px] w-[50%]  justify-self-center rounded-lg bg-black text-2xl text-white hover:opacity-90"
            onClick={() => {
              setShowScoreboard(false);
            }}
          >
            Close Scoreboard
          </button>
        </div>
      );
  };

  return (
    <div>
      <div className="grid max-h-[75vh] w-[650px] grid-rows-[75px,2fr] rounded-2xl bg-white p-12">
        <div className="grid grid-cols-[0.3fr,1.3fr,0.6fr] text-6xl">
          <div>#</div>
          <div>Name</div>
          <div className="">Time</div>
        </div>
        <div className="h-[1px] w-full bg-black"></div>
        {handleMapScoreboard()}
        {handleShowScoreboard()}
      </div>
    </div>
  );
};

export default Scoreboard;
