import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./../config/firebase.config";
import { v4 as uuidv4 } from "uuid";

import { TimeProp } from "../interfaces";
import { ScoreboardProp } from "../interfaces";
import { ShowScoreboardProp } from "../interfaces";
import { ShowGameoverProp } from "../interfaces";
import { CharacterListProp } from "../interfaces";
import { ShowPlayAgainProp } from "../interfaces";

interface Props {
  showGameover: ShowGameoverProp["showGameover"];
  setShowGameover: ShowGameoverProp["setShowGameover"];
  characterList: CharacterListProp["characterList"];
  setCharacterList: CharacterListProp["setCharacterList"];
  time: TimeProp["time"];
  setTime: TimeProp["setTime"];
  scoreboard: ScoreboardProp["scoreboard"];
  setScoreboard: ScoreboardProp["setScoreboard"];
  showScoreboard: ShowScoreboardProp["showScoreboard"];
  setShowScoreboard: ShowScoreboardProp["setShowScoreboard"];
  showPlayAgain: ShowPlayAgainProp["showPlayAgain"];
  setShowPlayAgain: ShowPlayAgainProp["setShowPlayAgain"];
}

const Gameover = (props: Props) => {
  const [nameToSubmit, setNameToSubmit] = useState("");
  const { time, setTime } = props;
  const { scoreboard, setScoreboard } = props;
  const { showScoreboard, setShowScoreboard } = props;
  const { showGameover, setShowGameover } = props;
  const { characterList, setCharacterList } = props;
  const { showPlayAgain, setShowPlayAgain } = props;

  const scoresCollection = collection(db, "scores");

  const onSubmitScoreBackend = async (newName: string, newTime: number) => {
    try {
      console.log("Before onSubmitScoreBackend. In Gameover");
      await addDoc(scoresCollection, {
        name: newName,
        time: newTime,
      });
      console.log("After onSubmitScoreBackend. In Gameover");
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitScoreFrontend = (newName: string, newTime: number) => {
    const newScore = { id: uuidv4(), name: newName, time: newTime };
    setScoreboard([...scoreboard, newScore]);
    const sortedScoreboard = [...scoreboard];
    sortedScoreboard.sort((a, b) => {
      return a.time - b.time;
    });
    setScoreboard(sortedScoreboard);
  };

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

  const handleOnSubmitScore = async (newName: string, newTime: number) => {
    onSubmitScoreBackend(newName, newTime);
    onSubmitScoreFrontend(newName, newTime);
    getScores();
  };

  return (
    <div className="grid h-[500px] w-[650px] grid-rows-[5fr,3fr,5fr,5fr] items-center justify-center justify-items-center rounded-2xl bg-white p-12">
      <div className="flex flex-col items-center gap-3">
        <div className="text-5xl">YOU FOUND THEM ALL</div>
        <div>(I know the game is short lmao whatever it's for practice)</div>
      </div>
      <div className="text-3xl">Your Time: {time} seconds</div>
      <div className="justify-center gap-4 text-3xl">
        <div>Add your name to the leaderboard</div>
        <div className="h-full w-full rounded-lg border-4 border-black">
          <input
            type="text"
            className="h-[70px] w-full text-center focus:outline-none"
            onChange={(e) => {
              setNameToSubmit(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        disabled={nameToSubmit.length === 0}
        className="h-[75px] w-[50%] justify-self-center rounded-lg bg-black text-2xl text-white hover:opacity-80"
        onClick={() => {
          handleOnSubmitScore(nameToSubmit, time);
          setShowScoreboard(true);
          setShowGameover(false);
          setNameToSubmit("");
          setShowPlayAgain(true);
        }}
      >
        Submit score
      </button>
    </div>
  );
};

export default Gameover;
