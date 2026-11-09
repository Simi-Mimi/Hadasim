import express from "express";
const router = express.Router();

let users = [{ id: 1, name: "Alice" }];

router.get("/greet", (req, res) => {
  res.json(users);
});

router.post("/greet", (req, res) => {
  const newUser = { id: Date.now(), name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.get("/greet/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

router.put("/greet/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    user.name = req.body.name;
  res.json(users);
});

router.delete("/greet/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
  res.json(users);
});
export default router;
