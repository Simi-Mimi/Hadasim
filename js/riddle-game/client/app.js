import readline from "readline-sync";
import { Riddle } from "../classes/Riddle.js";
import { Player } from "../classes/Player.js";

// כל קוד המשחק נמצא בתוך הפונקציה
async function startGame() {
  console.log("hello!!!");
  //שם
  const playerName = readline.question("What is your name? ");
  const responsePlayers = await fetch("http://localhost:3000/api/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: playerName,
      lowestTime: null,
    }),
  });

  // const playerData = await responsePlayers.json();

  // if (!responsePlayers.ok) {
  //   console.log(playerData);
  //     throw new Error(playerData.message);
  // }

  const result = await responsePlayers.json();

  if (!responsePlayers.ok) {
    throw new Error(result.message);
  }
  const playerData = result.player;
  console.log("Player data:", playerData);
  console.log("Player ID:", playerData.id);
  const player = new Player(playerName);
  console.log(`Hello, ${playerName}!`);
  //רמה
  let level = readline.question("Choose difficulty: easy / medium / hard: ");
  // level = level.toLowerCase().trim();

  const response = await fetch("http://localhost:3000/api/riddles");
  if (!response.ok) {
    throw new Error("Failed to get riddles");
  }
  const AllRiddles = await response.json();

  const filteredRiddles = AllRiddles.filter(
    (riddle) => riddle.difficulty === level
  );

  function withTiming(func, player) {
    return function () {
      const start = Date.now();
      func();
      const end = Date.now();
      player.recordTime(start, end);
    };
  }

  for (const riddleData of filteredRiddles) {
    const riddle = new Riddle(riddleData);
    const timedAsk = withTiming(() => riddle.ask(), player);
    timedAsk();
  }

  player.showStats();

  if (player.times.length > 0) {
    const currentTime = player.getTotalTime();

    console.log(`Your time: ${currentTime} seconds`);

    const response = await fetch(
      `http://localhost:3000/api/players/${playerData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lowestTime: currentTime,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update player time");
    }
  }
}
async function viewLeaderboard() {
  const response = await fetch("http://localhost:3000/api/players");

  if (!response.ok) {
    throw new Error("Failed to get players");
  }

  const players = await response.json();

  const leaderboard = players
    .filter((player) => player.lowestTime !== null)
    .sort((a, b) => a.lowestTime - b.lowestTime);

  console.log("\n🏆 Leaderboard:");

  if (leaderboard.length === 0) {
    console.log("No players have recorded a time yet.");
    return;
  }
  leaderboard.forEach((player, index) => {
    console.log(`${index + 1}. ${player.name} - ${player.lowestTime} seconds`);
  });
}

// התפריט הראשי נמצא מחוץ לפונקציה
console.log("1. Start Game");
console.log("2. View Leaderboard");

const choice = readline.question("Choose an option: ");

if (choice === "1") {
  startGame();
} else if (choice === "2") {
  viewLeaderboard();
} else {
  console.log("Invalid choice");
}
