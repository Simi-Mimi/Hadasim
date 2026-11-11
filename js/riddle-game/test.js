// import { createRiddle, readRiddles } from "./riddles/riddleDatabase.js";
import readline from "readline-sync";
import {
    createRiddle,
    readRiddles,
    updateRiddle
} from "./riddles/riddleDatabase.js";

console.log("1. Read all riddles");
console.log("2. Create a new riddle");
console.log("3. Update an existing riddle");

const choice = readline.question("Choose: ");

if (choice === "1") {
    readRiddles();
}
else if (choice === "2") {
    createRiddle();
}
else if (choice === "3") {
    updateRiddle();
}
