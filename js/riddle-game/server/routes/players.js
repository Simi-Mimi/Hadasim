import express from "express";
import fs from "fs/promises";

const router = express.Router();

const DB_PATH = "./server/db/players.txt";

// GET - קבלת כל השחקנים
router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    const players = JSON.parse(data);

    res.json(players);
  } catch (error) {
    res.status(500).json({
      message: "Error reading players",
      error: error.message,
    });
  }
});

// POST - הוספת שחקן חדש
router.post("/", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    const players = JSON.parse(data);

    const { name, lowestTime } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const newPlayer = {
      id: players.length + 1,
      name,
      lowestTime: lowestTime ?? null,
    };

    players.push(newPlayer);

    await fs.writeFile(DB_PATH, JSON.stringify(players, null, 2));

    res.status(201).json({
      message: "Player created successfully",
      player: newPlayer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating player",
      error: error.message,
    });
  }
});

// PUT - עדכון שחקן
router.put("/:id", async (req, res) => {
  try {
    console.log("PUT request received");
    console.log("Player ID:", req.params.id);
    console.log("Body:", req.body);
    const data = await fs.readFile(DB_PATH, "utf8");
    const players = JSON.parse(data);
    const id = Number(req.params.id);
    const playerIndex = players.findIndex((r) => r.id === id);
    if (playerIndex === -1) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    const updatedPlayer = {
      ...players[playerIndex],
      ...req.body,
      id: id,
    };
    players[playerIndex] = updatedPlayer;
    await fs.writeFile(DB_PATH, JSON.stringify(players, null, 2));

    res.json({
      message: "Player updated successfully",
      player: updatedPlayer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating player",
      error: error.message,
    });
  }
});

export default router;
