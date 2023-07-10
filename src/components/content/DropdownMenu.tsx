import React, { useState, useEffect } from "react";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./../../config/firebase.config";
import targetJohnnyBravo from "./../../images/cartoon-network-characters/johnny-bravo1.png";
import targetScoobyDoo from "./../../images/cartoon-network-characters/scooby-doo1.png";
import targetPlank from "./../../images/cartoon-network-characters/plank1.png";

import { ShowScoreboardProp } from "../../interfaces";
import { ShowGameoverProp } from "../../interfaces";
import { GameStartedProp } from "../../interfaces";
import { CharacterListProp } from "../../interfaces";
import { Target } from "../../interfaces";
import { Coordinates } from "../../interfaces";

interface Props {
  closeDropdown: () => void;
  coordinates: Coordinates;
  showGameover: ShowGameoverProp["showGameover"];
  setShowGameover: ShowGameoverProp["setShowGameover"];
  showScoreboard: ShowScoreboardProp["showScoreboard"];
  setShowScoreboard: ShowScoreboardProp["setShowScoreboard"];
  gameStarted: GameStartedProp["gameStarted"];
  setGameStarted: GameStartedProp["setGameStarted"];
  characterList: CharacterListProp["characterList"];
  setCharacterList: CharacterListProp["setCharacterList"];
}

const DropdownMenu = (props: Props) => {
  const [wrongSelection, setWrongSelection] = useState(false);
  const [johnnyBravoFound, setJohnnyBravoFound] = useState(false);
  const [scoobyDooFound, setScoobyDooFound] = useState(false);
  const [plankFound, setPlankFound] = useState(false);
  const { showScoreboard, setShowScoreboard } = props;
  const { showGameover, setShowGameover } = props;
  const { gameStarted, setGameStarted } = props;
  const { characterList, setCharacterList } = props;

  const charactersCollectionRef = collection(db, "characters");

  const getCharacterList = async () => {
    try {
      const data = await getDocs(charactersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        found: doc.data().found,
      }));
      setCharacterList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const scoresCollection = collection(db, "scores");

  const getScores = async () => {
    try {
      const data = await getDocs(scoresCollection);
      const filteredData = data.docs.map((doc) => ({
        name: doc.data().name,
        time: doc.data().time,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCharacterList();
    getScores();
  }, []);

  useEffect(() => {
    // Ensure characterList has items before running
    if (characterList.length > 0) {
      // Check if every element is found
      if (
        characterList.every((element) => {
          return element.found === true;
        })
      ) {
        setGameStarted(false);
        setShowGameover(true);
        handleCloseDropdown();
      }
    }
  }, [characterList]);

  const updateCharacterFound = (title: string) => {
    const element = characterList.find((item) => item.title === title);
    if (element) {
      const characterIndex = characterList.indexOf(element);
      const characterListCopy = [...characterList];
      characterListCopy[characterIndex] = { ...characterListCopy[characterIndex], found: true };
      setCharacterList(characterListCopy);
    }
  };

  const handleCloseDropdown = () => {
    props.closeDropdown();
  };
  const xCoordTarget = props.coordinates.xCoordTarget;
  const yCoordTarget = props.coordinates.yCoordTarget;

  const targetFound = (target: Target, title: string) => {
    if (
      xCoordTarget < target.xMax &&
      xCoordTarget > target.xMin &&
      yCoordTarget < target.yMax &&
      yCoordTarget > target.yMin
    ) {
      if (title === "Johnny Bravo") setJohnnyBravoFound(true);
      if (title === "Scooby-Doo") setScoobyDooFound(true);
      if (title === "Plank") setPlankFound(true);
      updateCharacterFound(title);
    } else {
      setWrongSelection(true);
      setTimeout(() => {
        setWrongSelection(false);
      }, 300);
    }
  };

  const johnnyBravoCoords = {
    xMin: 318,
    xMax: 645,
    yMax: 504,
    yMin: 216,
  };
  const scoobyDooCoords = {
    xMin: 1618,
    xMax: 1784,
    yMax: 600,
    yMin: 303,
  };
  const plankCoords = {
    xMin: 0,
    xMax: 79,
    yMax: 190,
    yMin: 81,
  };

  return (
    <div
      className={`${
        wrongSelection ? "-all animate-miss-shake" : ""
      }  text-md rounded-xl bg-white p-2 shadow-xl xl:p-3 xl:text-xl 2xl:p-4 2xl:text-2xl`}
    >
      <div>
        <div
          className="flex h-16 cursor-pointer items-center justify-evenly gap-4 rounded-t-xl p-2 hover:bg-gray-200 xl:h-[90px] 2xl:h-[120px] 2xl:p-3 "
          onClick={() => {
            targetFound(johnnyBravoCoords, "Johnny Bravo");
          }}
        >
          <img src={targetJohnnyBravo} alt="" className="h-full w-auto" />
          <div className={`${johnnyBravoFound ? "line-through" : ""}`}>Johnny Bravo</div>
        </div>
      </div>

      <div className="h-px bg-gray-900"></div>
      <div
        className="flex h-16 cursor-pointer items-center justify-evenly gap-4 p-2 hover:bg-gray-200 xl:h-[90px] 2xl:h-[120px] 2xl:p-3"
        onClick={() => targetFound(scoobyDooCoords, "Scooby-Doo")}
      >
        <img src={targetScoobyDoo} alt="" className="h-full w-auto" />
        <div className={`${scoobyDooFound ? "line-through" : ""}`}>Scooby-Doo</div>
      </div>
      <div className="h-px bg-gray-900"></div>
      <div
        className="flex h-16 cursor-pointer items-center justify-start gap-6 p-2 hover:bg-gray-200 xl:h-[90px] 2xl:h-[120px] 2xl:p-3"
        onClick={() => targetFound(plankCoords, "Plank")}
      >
        <img src={targetPlank} alt="" className="h-full w-auto" />
        <div className={`${plankFound ? "line-through" : ""}`}>Plank</div>
      </div>
      <div className="h-px bg-gray-900"></div>
      <button
        className="w-full cursor-pointer gap-6 justify-self-center rounded-b-xl p-3 font-bold hover:bg-gray-500 hover:text-white"
        onClick={() => {
          handleCloseDropdown();
        }}
      >
        Close
      </button>
    </div>
  );
};

export default DropdownMenu;

// const [updateId, setUpdateId] = useState(String);

// const updateCharacterFoundBackend = async () => {
//   console.log(characterList);
//   characterList.forEach((element) => {
//     if (element.found === true) {
//       const id = element.id;
//       setUpdateId(id);
//     }
//   });
//   if (updateId) {
//     console.log(updateId);
//     const characterDoc = doc(db, "characters", updateId);
//     console.log(characterDoc);
//     await updateDoc(characterDoc, { found: true });
//     //6 lots of problems here xD
//   }
// };

// try {
//   const data = await getDocs(charactersCollectionRef);
//   // Take data and its docs. Map the data from each doc
//   const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//   const lol = doc(db, "characters");
//   console.log(lol);
//   // const characterDoc = doc(db, "characters");
// } catch (err) {
//   console.error(err);
// }

//   const updateMovieTitle = async (id) => {
//     const movieDoc = doc(db, "movies", id);
//     await updateDoc(movieDoc, { title: updatedTitle });
//   };

// const updateCharacterFound = async (characterNum: number) => {
// const characterDoc = doc(db, "characters", characterNum);
// await updateDoc(characterDoc, { johnnyBravo: true });
// };

// useEffect(() => {
// alert("characterList updated! useEffect");
// }, [characterList]);
