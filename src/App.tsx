// import { useEffect, useState } from "react";
// import { Auth } from "./components/auth";
// import { db, auth, storage } from "./firebase.config";
// import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"; // Gets the documents from the follections in Firestore Database
// import { ref, uploadBytes } from "firebase/storage";
// import "./assets/main.css";

import React, { useState, useRef, CSSProperties } from "react";

import cartoonNetwork from "./images/cartoon-network1.jpg";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import DropdownMenu from "./components/content/DropdownMenu";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [xCoord, setXCoord] = useState(Number);
  const [yCoord, setYCoord] = useState(Number);
  const [xCoordTarget, setXCoordTarget] = useState(Number);
  const [yCoordTarget, setYCoordTarget] = useState(Number);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const imageClicked = (e: React.MouseEvent) => {
    // if (showDropdown) setShowDropdown(false);
    if (!showDropdown) setShowDropdown(true);
    if (imageRef.current) {
      setXCoord(e.clientX);
      setYCoord(e.clientY);
      const imageRect = imageRef.current.getBoundingClientRect(); // Grabs the bounds of the image
      const imageX = imageRect.left; // Distance from left edge of viewport to left edge of rectangle
      const imageY = imageRect.top; // Distance from top edge of viewport to top edge of rectangle

      const clickX = e.clientX - imageX; // Left of image is now 0
      const clickY = e.clientY - imageY; // Top of images is now 0
      console.log("click X: ", clickX);
      console.log("click Y: ", clickY);
      setXCoordTarget(clickX);
      setYCoordTarget(clickY);
    }
  };

  interface Target {
    xMax: number;
    xMin: number;
    yMin: number;
    yMax: number;
  }

  const targetFound = (target: Target, title: string) => {
    if (
      xCoordTarget < target.xMax &&
      xCoordTarget > target.xMin &&
      yCoordTarget < target.yMax &&
      yCoordTarget > target.yMin
    )
      alert(title + " found");
  };

  const johnnyBravoCoords = {
    xMin: "318",
    xMax: "645",
    yMax: "504",
    yMin: "216",
  };
  const scoobyDooCoords = {
    xMin: 1618,
    xMax: 1784,
    yMax: 600,
    yMin: 303,
  };
  const plankCoords = {
    xMin: "0",
    xMax: "79",
    yMax: "190",
    yMin: "81",
  };

  const dropdownMenuStyle: CSSProperties = {
    left: xCoord,
    top: yCoord,
  };

  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto]">
      <div className="h-48 ">
        <Header />
      </div>
      <div className="grid h-full items-center justify-center overflow-x-auto">
        <img
          ref={imageRef} // useRef for the image
          src={cartoonNetwork}
          alt=""
          className="h-full min-w-max cursor-pointer overflow-scroll object-contain"
          onClick={(e) => {
            imageClicked(e);
            targetFound(scoobyDooCoords, "Scooby-Doo");
          }}
        />
      </div>

      <div
        style={dropdownMenuStyle}
        className={`absolute ${showDropdown ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <DropdownMenu closeDropdown={closeDropdown} />
      </div>

      <div className="screen-w grid h-36 items-center justify-center bg-white">
        <Footer />
      </div>
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
