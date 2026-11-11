import express from "express";
import fs from "fs/promises";

const router = express.Router();

const DB_PATH = "./server/db/riddles.txt";

// GET - קבלת כל החידות
router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    const riddles = JSON.parse(data);

    res.json(riddles);
  } catch (error) {
    res.status(500).json({
      message: "Error reading riddles",
      error: error.message,
    });
  }
});

// POST - הוספת חידה חדשה
router.post("/", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    const riddles = JSON.parse(data);

    const { name, taskDescription, correctAnswer, difficulty, timeLimit } =
      req.body;

    if (
      !name ||
      !taskDescription ||
      !correctAnswer ||
      !difficulty ||
      !timeLimit
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const newRiddle = {
      id: riddles.length + 1,
      name,
      taskDescription,
      correctAnswer,
      difficulty,
      timeLimit,
    };

    riddles.push(newRiddle);

    await fs.writeFile(DB_PATH, JSON.stringify(riddles, null, 2));

    res.status(201).json({
      message: "Riddle created successfully",
      riddle: newRiddle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating riddle",
      error: error.message,
    });
  }
});

// PUT - עדכון חידה
router.put("/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    const riddles = JSON.parse(data);
    const id = Number(req.params.id);
    const riddleIndex = riddles.findIndex((r) => r.id === id);
    if (riddleIndex === -1) {
      return res.status(404).json({
        message: "Riddle not found",
      });
    }

    const updatedRiddle = {
      ...riddles[riddleIndex],
      ...req.body,
      id: id,
    };
    riddles[riddleIndex] = updatedRiddle;
    await fs.writeFile(DB_PATH, JSON.stringify(riddles, null, 2));

    res.json({
      message: "Riddle updated successfully",
      riddle: updatedRiddle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating riddle",
      error: error.message,
    });
  }
});

  //DELETE- מחיקת חידה
  router.delete("/:id", async (req, res) => {
    try {
      const data = await fs.readFile(DB_PATH, "utf8");
      const riddles = JSON.parse(data);
      const id = Number(req.params.id);
      const riddleIndex = riddles.findIndex((r) => r.id === id);
      if (riddleIndex === -1) {
        return res.status(404).json({
          message: "Riddle not found",
        });
      }
      riddles.splice(riddleIndex, 1);

      await fs.writeFile(DB_PATH, JSON.stringify(riddles, null, 2));

      res.status(201).json({
        message: "Riddle deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating riddle",
        error: error.message,
      });
    }
  });


export default router;
