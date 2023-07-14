// import { Auth } from "./components/auth";
// import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"; // Gets the documents from the follections in Firestore Database
// import { ref, uploadBytes } from "firebase/storage";
// import "./assets/main.css";

import React, { useState, useRef, CSSProperties } from "react";

import cartoonNetwork from "./images/cartoon-network1.jpg";
import targetJohnnyBravo from "./images/cartoon-network-characters/johnny-bravo1.png";
import targetScoobyDoo from "./images/cartoon-network-characters/scooby-doo1.png";
import targetPlank from "./images/cartoon-network-characters/plank1.png";

// Component imports
import Header from "./components/header/Header";
import DropdownMenu from "./components/content/DropdownMenu";
import Scoreboard from "./components/Scoreboard";
import Gameover from "./components/Gameover";

// Interface imports
import { TimeProp } from "./interfaces";
import { ScoreboardProp } from "./interfaces";
import { ShowScoreboardProp } from "./interfaces";
import { ShowGameoverProp } from "./interfaces";
import { GameStartedProp } from "./interfaces";
import { InitialGameStartedProp } from "./interfaces";
import { JohnnyBravoFoundProp } from "./interfaces";
import { ScoobyDooFoundProp } from "./interfaces";
import { PlankFoundProp } from "./interfaces";
import { Target } from "./interfaces";

//3 Need a way to check if Firebase is being read to avoid overrunning daily usage limit

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownLeft, setShowDropdownLeft] = useState(false);
  const [xCoord, setXCoord] = useState(Number);
  const [yCoord, setYCoord] = useState(Number);
  const [xCoordTarget, setXCoordTarget] = useState(Number);
  const [yCoordTarget, setYCoordTarget] = useState(Number);
  const [showGameover, setShowGameover] = useState(false);
  const [nameToBeSubmitted, setNameToBeSubmitted] = useState("");
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [initialGameStarted, setInitialGameStarted] = useState(false);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [johnnyBravoFound, setJohnnyBravoFound] = useState(false);
  const [scoobyDooFound, setScoobyDooFound] = useState(false);
  const [plankFound, setPlankFound] = useState(false);

  // Decides if scoreboard visible on screen.
  const [showScoreboard, setShowScoreboard] = useState(false);
  // Sets found to true when character is found
  const [characterList, setCharacterList] = useState<
    { id: string; title: string; found: boolean }[]
  >([]);
  // Scoreboard for all the players
  const [scoreboard, setScoreboard] = useState<{ id: string; name: string; time: number }[]>([]);

  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const coordinates = {
    xCoordTarget: xCoordTarget,
    yCoordTarget: yCoordTarget,
  };

  const imageClicked = (e: React.MouseEvent) => {
    if (!showDropdown) setShowDropdown(true);
    if (imageRef.current) {
      setXCoord(e.clientX);
      setYCoord(e.clientY);
      const imageRect = imageRef.current.getBoundingClientRect(); // Grabs the bounds of the image
      const leftViewportToImage = imageRect.left; // Distance from left edge of viewport to left edge of rectangle
      const topViewportToImage = imageRect.top; // Distance from top edge of viewport to top edge of rectangle
      const leftZero = e.clientX - leftViewportToImage; // Left of image is now 0
      const topZero = e.clientY - topViewportToImage; // Top of images is now 0
      const imageWidth = imageRect.width; // Non-natural width of image
      const imageHeight = imageRect.height; // Non-natural height of image
      // Ratios. Above 1 when image is sized above natural size
      const ratioX = imageWidth / imageRef.current.naturalWidth; // X-ratio of image compared to natural width
      const ratioY = imageHeight / imageRef.current.naturalHeight; // Y-ratio of image comapred to natural height
      const adjustedX = Math.round(leftZero / ratioX);
      const adjustedY = Math.round(topZero / ratioY);
      setXCoordTarget(adjustedX);
      setYCoordTarget(adjustedY);
    }
  };

  const dropdownLeft = (e: any) => {
    if (e.clientX > window.innerWidth * 0.8) {
      setShowDropdownLeft(true);
    } else setShowDropdownLeft(false);
  };

  const dropdownMenuStyle: CSSProperties = {
    left: xCoord,
    top: yCoord,
  };
  const dropdownMenuStyleLeft: CSSProperties = {
    left: xCoord - (dropdownMenuRef.current?.clientWidth || 0),
    top: yCoord,
  };

  const handleShowGameover = () => {
    if (showGameover)
      return (
        <div>
          <div
            className={` ${
              showGameover ? "" : "pointer-events-none opacity-0"
            } absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%]`}
          >
            <Gameover
              showGameover={showGameover}
              setShowGameover={setShowGameover}
              showScoreboard={showScoreboard}
              setShowScoreboard={setShowScoreboard}
              characterList={characterList}
              setCharacterList={setCharacterList}
              scoreboard={scoreboard}
              setScoreboard={setScoreboard}
              time={time}
              setTime={setTime}
              showPlayAgain={showPlayAgain}
              setShowPlayAgain={setShowPlayAgain}
            />
          </div>
        </div>
      );
  };

  const handleShowScoreboard = () => {
    if (showScoreboard) {
      return (
        <div
          className={` ${
            showScoreboard ? "" : "pointer-events-none opacity-0"
          } absolute left-[50%] top-[50%] z-30 translate-x-[-50%] translate-y-[-50%]`}
        >
          <Scoreboard
            showGameover={showGameover}
            setShowGameover={setShowGameover}
            showScoreboard={showScoreboard}
            setShowScoreboard={setShowScoreboard}
            scoreboard={scoreboard}
            setScoreboard={setScoreboard}
            showPlayAgain={showPlayAgain}
            setShowPlayAgain={setShowPlayAgain}
            time={time}
            setTime={setTime}
            characterList={characterList}
            setCharacterList={setCharacterList}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            johnnyBravoFound={johnnyBravoFound}
            setJohnnyBravoFound={setJohnnyBravoFound}
            scoobyDooFound={scoobyDooFound}
            setScoobyDooFound={setScoobyDooFound}
            plankFound={plankFound}
            setPlankFound={setPlankFound}
          />
        </div>
      );
    }
  };

  const handleShowPlayAgain = () => {
    if (showPlayAgain) {
      return (
        <>
          <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50"></div>
          <div
            className={`absolute left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%]`}
          >
            <button
              className="h-[75px] w-[200px] justify-self-center rounded-lg bg-white text-2xl text-black hover:bg-gray-100"
              onClick={() => {
                setShowPlayAgain(false);
                const characterListCopy = [...characterList];
                characterListCopy.forEach((item) => (item.found = false));
                setCharacterList(characterListCopy);
                setGameStarted(true);
                setJohnnyBravoFound(false);
                setScoobyDooFound(false);
                setPlankFound(false);
              }}
            >
              Play Again
            </button>
          </div>
        </>
      );
    }
  };

  const handleInitialGameStarted = () => {
    if (initialGameStarted) {
      return (
        <div className="grid h-screen grid-rows-[auto,1fr] ">
          <div className="min-h-[200px] sm:h-[15vh]">
            <Header
              gameStarted={gameStarted}
              setGameStarted={setGameStarted}
              time={time}
              setTime={setTime}
              showScoreboard={showScoreboard}
              setShowScoreboard={setShowScoreboard}
            />
          </div>
          <div
            className={` ${showScoreboard || showGameover ? "pointer-events-none " : ""}
        } grid h-[85vh] items-start overflow-x-scroll`}
          >
            <div className="relative flex h-full max-h-[85vh] w-max cursor-pointer justify-center xl:h-min xl:w-[100vw]">
              <img
                ref={imageRef} // useRef for the image
                src={cartoonNetwork}
                alt=""
                className="xl:w-{imageWidth} h-full max-h-min w-max cursor-pointer bg-red-200 object-contain"
                onClick={(e) => {
                  imageClicked(e);
                  dropdownLeft(e);
                }}
              />
              {handleShowPlayAgain()}
            </div>
          </div>
          <div
            style={showDropdownLeft ? dropdownMenuStyleLeft : dropdownMenuStyle}
            className={`${showDropdown ? "opacity-100" : "pointer-events-none opacity-0"} absolute`}
          >
            <div ref={dropdownMenuRef}>
              <DropdownMenu
                closeDropdown={closeDropdown}
                coordinates={coordinates}
                showGameover={showGameover}
                setShowGameover={setShowGameover}
                showScoreboard={showScoreboard}
                setShowScoreboard={setShowScoreboard}
                characterList={characterList}
                setCharacterList={setCharacterList}
                gameStarted={gameStarted}
                setGameStarted={setGameStarted}
                johnnyBravoFound={johnnyBravoFound}
                setJohnnyBravoFound={setJohnnyBravoFound}
                scoobyDooFound={scoobyDooFound}
                setScoobyDooFound={setScoobyDooFound}
                plankFound={plankFound}
                setPlankFound={setPlankFound}
              />
            </div>
          </div>
          {handleShowGameover()}
          {handleShowScoreboard()}
          <div
            className={`${
              showScoreboard || showGameover ? "opacity-25" : "pointer-events-none opacity-0"
            } absolute z-0 h-screen w-screen bg-black`}
          ></div>
        </div>
      );
    } else {
      return (
        <div className="absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center gap-4 rounded-xl bg-gray-200 p-12 text-2xl shadow-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8">You are to find these three characters</div>
            <div className="grid grid-cols-3 justify-items-center overflow-hidden">
              <img src={targetJohnnyBravo} alt="" className="h-40 p-3 transition hover:scale-105" />
              <img src={targetScoobyDoo} alt="" className="h-40 p-3 transition hover:scale-105" />
              <img src={targetPlank} alt="" className="h-40 p-3 transition hover:scale-105" />
            </div>
          </div>
          <div className="">When you click start, a timer will start.</div>
          <div className="">Find them as fast as you can!</div>
          <button
            className="h-[75px] w-[200px] justify-self-center rounded-lg bg-black text-2xl text-white hover:opacity-80"
            onClick={() => {
              setGameStarted(true);
              setInitialGameStarted(true);
            }}
          >
            Start Game
          </button>
        </div>
      );
    }
  };

  return <div>{handleInitialGameStarted()}</div>;
}
export default App;

//6 -----------------------------------------------------------
//6 -----------------------------------------------------------
//1 Planned structure of the app:
//4 Header
// Home button on the left hand side
// The three elements to find in the center
// Timer on the right hand side of the header
//5 Components needed:
//5 - Header (holds home, HeaderTargets and timer)
//5 - HeaderTargets (the characters)

//4 Content which contains the picture
// When the content is clicked, a box with a dropdown should pop up
// If character found, display "You found X"
// If !character found, display "That's not X"
//5 Components needed:
//5 - Content
//5 - DropdownMenu (comes up on click on the image)

//4 Footer
// Have a scoreboard the user can click on to see all the best times
//5 Components needed:
//5 - Footer (contains scoreboard button)

//4 End of round
// If all the three characters are found, end the game
// Ask user to fill in their name, then click submit
//5 Components needed:
//5 - GameOver
//5 - Scoreboard
//6 -----------------------------------------------------------
//6 -----------------------------------------------------------
