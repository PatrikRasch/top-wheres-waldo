// import { Auth } from "./components/auth";
// import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"; // Gets the documents from the follections in Firestore Database
// import { ref, uploadBytes } from "firebase/storage";
// import "./assets/main.css";

import React, { useState, useRef, CSSProperties } from "react";

import cartoonNetwork from "./images/cartoon-network1.jpg";

// Component imports
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
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
      const imageX = imageRect.left; // Distance from left edge of viewport to left edge of rectangle
      const imageY = imageRect.top; // Distance from top edge of viewport to top edge of rectangle

      const clickX = e.clientX - imageX; // Left of image is now 0
      const clickY = e.clientY - imageY; // Top of images is now 0
      setXCoordTarget(clickX);
      setYCoordTarget(clickY);
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

  //   const getMovieList = async () => {
  //     // READ THE DATA FROM OUR DB
  //     try {
  //       const data = await getDocs(movieCollectionRef);
  //       const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //       setMovieList(filteredData);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //     // SET THE MOVIE LIST TO BE EQUAL TO OUR DATA
  //   };

  //   useEffect(() => {
  //     alert("loop?");
  //     getMovieList();
  //   }, []);

  const handleInitialGameStarted = () => {
    if (initialGameStarted) {
      return <></>;
    } else {
      return (
        <div className="grid justify-center gap-2">
          <div className="h-8 text-lg">Click to see the characters you are to find</div>
          <button
            className="h-[75px] w-[200px] justify-self-center rounded-lg bg-red-600 text-2xl text-white hover:opacity-80"
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

  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto]">
      <div className="sm:h-[15vh]">
        <Header
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          time={time}
          setTime={setTime}
        />
      </div>
      {/* {handleInitialGameStarted()} */}
      <div
        className={` ${showScoreboard || showGameover ? "pointer-events-none " : ""}
        } grid h-[75vh] items-center overflow-x-scroll`}
      >
        <img
          ref={imageRef} // useRef for the image
          src={cartoonNetwork}
          alt=""
          className="h-full w-max cursor-pointer justify-self-center"
          onClick={(e) => {
            imageClicked(e);
            dropdownLeft(e);
          }}
        />
      </div>
      <div className="screen-w grid items-center justify-center bg-white  sm:h-[10vh]">
        <Footer />
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
          />
        </div>
      </div>
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
        />
      </div>
      <div
        className={` ${
          showScoreboard ? "" : "pointer-events-none opacity-0"
        } absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%]`}
      >
        <Scoreboard
          showGameover={showGameover}
          setShowGameover={setShowGameover}
          showScoreboard={showScoreboard}
          setShowScoreboard={setShowScoreboard}
          scoreboard={scoreboard}
          setScoreboard={setScoreboard}
        />
      </div>
      <div
        className={`${
          showScoreboard || showGameover ? "opacity-25" : "pointer-events-none opacity-0"
        } absolute z-0 h-screen w-screen bg-black`}
      ></div>
    </div>
  );
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

// import { useEffect, useState } from "react";
// import { Auth } from "./components/auth";
// import { db, auth, storage } from "./config/firebase";
// import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"; // Gets the documents from the follections in Firestore Database
// import { ref, uploadBytes } from "firebase/storage";

// function App() {
//   const [movieList, setMovieList] = useState([]);

//   // New Movie States
//   const [newMovieTitle, setNewMovieTitle] = useState("");
//   const [newRelaseDate, setNewReleaseDate] = useState(0);
//   const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

//   // Update Title State
//   const [updatedTitle, setUpdatedTitle] = useState("");

//   // File Upload State
//   const [fileUpload, setFileUpload] = useState(null);

//   const movieCollectionRef = collection(db, "movies");

//   const getMovieList = async () => {
//     // READ THE DATA FROM OUR DB
//     try {
//       const data = await getDocs(movieCollectionRef);
//       const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setMovieList(filteredData);
//     } catch (err) {
//       console.error(err);
//     }
//     // SET THE MOVIE LIST TO BE EQUAL TO OUR DATA
//   };

//   useEffect(() => {
//     alert("loop?");
//     getMovieList();
//   }, []);

//   // Submits new movie to the Firebase collection "Movies"
//   // Submitted content must be in the form that is expected by the Firebase doc
//   const onSubmitMovie = async () => {
//     try {
//       await addDoc(movieCollectionRef, {
//         title: newMovieTitle,
//         releaseDate: newRelaseDate,
//         receivedAnOscar: isNewMovieOscar,
//         userId: auth?.currentUser?.uid,
//       });
//       getMovieList();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteMovie = async (id) => {
//     const movieDoc = doc(db, "movies", id);
//     await deleteDoc(movieDoc);
//   };

//   const updateMovieTitle = async (id) => {
//     const movieDoc = doc(db, "movies", id);
//     await updateDoc(movieDoc, { title: updatedTitle });
//   };

//   const uploadFile = async () => {
//     if (!fileUpload) return;
//     const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
//     try {
//       await uploadBytes(filesFolderRef, fileUpload);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   return (
//     <div className="App">
//       <Auth />

//       <div>
//         <input placeholder="Movie Title" onChange={(e) => setNewMovieTitle(e.target.value)} />
//         <input
//           placeholder="Release Date"
//           type="number"
//           onChange={(e) => setNewReleaseDate(Number(e.target.value))}
//         />
//         <input
//           type="checkbox"
//           checked={isNewMovieOscar}
//           onChange={(e) => setIsNewMovieOscar(e.target.checked)}
//         />
//         <label>Received an oscar</label>
//         <button onClick={onSubmitMovie}>Submit Movie</button>
//       </div>

//       <div>
//         {movieList.map((movie) => (
//           <div key={movie.id}>
//             <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
//             <p>Date: {movie.releaseDate}</p>

//             <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
//             <input placeholder="New title" onChange={(e) => setUpdatedTitle(e.target.value)} />
//             <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
//           </div>
//         ))}
//         <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
//         <button onClick={uploadFile}>Upload File</button>
//       </div>
//     </div>
//   );
// }
// export default App;
