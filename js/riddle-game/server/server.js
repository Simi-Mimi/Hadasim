import express from "express";
import riddlesRouter from "./routes/riddles.js";
import playersRouter from "./routes/players.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/riddles", riddlesRouter);
app.use("/api/players", playersRouter);




// בדיקה שהשרת עובד
app.get("/", (req, res) => {
  res.send("Riddle Game Server is running!");
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

