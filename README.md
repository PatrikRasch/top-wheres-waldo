# "Where's Waldo?" A Photo Tagging React App

[View the project live by clicking here](https://patrikrasch.github.io/top-wheres-waldo/)

## A fully functional photo tagging app written in TypeScript using React and Tailwind

## Demo

![Project demo image showing the main interface of the game. Header contains scoreboard button top left, characters to find in the middle (Johnny Bravo, Scooby Doo and Plank and a timer set to 0 seconds on the right. Beneath that is the image where the characters are to be found, taking up about 80% of the screen)](./src/assets/README-images/main-page.png)

## Purpose of the Project

Practice project to further development skills in React, TypeScript and Tailwind.
The project is meant to challenge the user to find the characters as fast possible by clicking on them and selecting them. Similar to a classic game of "Where's Waldo?".

## Game Features

- Real-time character verification
- Real-time game over verification
- Secure game updates using Firebase cloud functions
- Global leaderboard without login

## Technologies

- TypeScript
- React
- Firestore
- Tailwind CSS

## Known issues

As this project is a practice project, efforts were primarily placed on ensuring the base functionality of the app.
Therefore, the end result is currently quite barebones and:

- Not mobile friendly
- Missing a more functional timer, currently only runs in pure seconds
- Works, but doesn't scale well on wide and ultrawide monitors
- Doesn't have proper form validation for name input
- Has no censorship for names
- Has an overall lacking design
