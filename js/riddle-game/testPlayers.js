import { getAllPlayers, savePlayers } from "./players/playerDatabase.js";
import { showLeaderboard } from "./players/playerDatabase.js";
const players = getAllPlayers();

console.log(players);


showLeaderboard();