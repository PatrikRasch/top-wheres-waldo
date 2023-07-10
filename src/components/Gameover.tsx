import React, { useState } from "react";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./../config/firebase.config";
import { v4 as uuidv4 } from "uuid";

import { TimeProp } from "../interfaces";
import { ScoreboardProp } from "../interfaces";
import { ShowScoreboardProp } from "../interfaces";
import { ShowGameoverProp } from "../interfaces";
import { CharacterListProp } from "../interfaces";

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
}

const Gameover = (props: Props) => {
  const [nameToSubmit, setNameToSubmit] = useState("");
  const scoresCollectionRef = collection(db, "scores");
  const { time, setTime } = props;
  const { scoreboard, setScoreboard } = props;
  const { showScoreboard, setShowScoreboard } = props;
  const { showGameover, setShowGameover } = props;
  const { characterList, setCharacterList } = props;

  const onSubmitScore = async (newName: string, newTime: number) => {
    try {
      await addDoc(scoresCollectionRef, {
        name: newName,
        time: newTime,
      });
      setScoreboard([...scoreboard, { id: uuidv4(), name: newName, time: newTime }]);
      sortScores();
    } catch (err) {
      console.error(err);
    }
  };

  const sortScores = () => {
    const scoreboardCopy = [...scoreboard];
    scoreboardCopy.sort((a, b) => {
      return a.time - b.time;
    });
    setScoreboard(scoreboardCopy);
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
        className="h-[75px] w-[50%] justify-self-center rounded-lg bg-black text-2xl text-white hover:opacity-80"
        onClick={() => {
          if (nameToSubmit.length === 0) return;
          onSubmitScore(nameToSubmit, time);
          setShowScoreboard(true);
          setShowGameover(false);
          setNameToSubmit("");
        }}
      >
        Submit score
      </button>
    </div>
  );
};

export default Gameover;
