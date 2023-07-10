import React, { useState, useEffect } from "react";

import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./../config/firebase.config";

import { ScoreboardProp } from "../interfaces";
import { ShowScoreboardProp } from "../interfaces";
import { ShowGameoverProp } from "../interfaces";

interface Props {
  showGameover: ShowGameoverProp["showGameover"];
  setShowGameover: ShowGameoverProp["setShowGameover"];
  scoreboard: ScoreboardProp["scoreboard"];
  setScoreboard: ScoreboardProp["setScoreboard"];
  showScoreboard: ShowScoreboardProp["showScoreboard"];
  setShowScoreboard: ShowScoreboardProp["setShowScoreboard"];
}

const Scoreboard = (props: Props) => {
  const [scorePosition, setScorePosition] = useState(1);
  const { scoreboard, setScoreboard } = props;
  const { showScoreboard, setShowScoreboard } = props;
  const { showGameover, setShowGameover } = props;

  const scoresCollection = collection(db, "scores");

  const getScores = async () => {
    try {
      const data = await getDocs(scoresCollection);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        time: doc.data().time,
      }));
      setScoreboard(filteredData);
      if (scoreboard.length > 0) {
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getScores();
    console.log("loop");
  }, []);

  return (
    <div>
      <div className="max-h-[75vh] w-[650px] rounded-2xl bg-white p-12">
        <div className="grid grid-cols-[0.3fr,1fr,1fr] text-6xl">
          <div>#</div>
          <div>Name</div>
          <div className="">Time</div>
        </div>
        <div className="h-[1px] w-full bg-black"></div>

        <div className="grid max-h-[50vh] w-full overflow-y-scroll pt-4 text-6xl">
          {scoreboard.map((score) => (
            <div className="grid grid-cols-[0.3fr,1fr,1fr] text-4xl" key={score.id}>
              <div>{scoreboard.indexOf(score) + 1}</div>
              <div>{score.name}</div>
              <div className="">{score.time}s</div>
            </div>
          ))}
        </div>
        <div className="grid w-full items-center pt-10">
          <button
            className="h-[75px] w-[50%]  justify-self-center rounded-lg bg-black text-2xl text-white hover:opacity-80"
            onClick={() => {
              setShowScoreboard(false);
            }}
          >
            Close Scoreboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
