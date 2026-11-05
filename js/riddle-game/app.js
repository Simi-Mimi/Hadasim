import readline from "readline-sync";
import AllRiddles from "./riddles/AllRiddles.js";
import { Riddle } from "./classes/Riddle.js";
import { Player } from "./classes/Player.js";

console.log("hello!!!");
const playerName = readline.question("What is your name? ");
const player = new Player(playerName);
console.log(`Hello, ${playerName}!`);
let level = readline.question(
    "Choose difficulty: easy / medium / hard: "
  );
  
  level = level.toLowerCase().trim();

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
