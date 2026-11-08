const express = require("express");
const app = express();
app.use(express.json());

app.get("/greet", (req, res) => {
  res.json({ msg: `hi from get endpoint  ${new Date().toISOString()}` });
});

app.get("/greet/:name", (req, res) => {
  const name = req.params.name;
  console.log(`got name: ${name}`);
  res.json({ msg: `got name: ${name}` });
});

app.get("/test", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/greet/Bob");
    const data = await response.json();
    if (data.msg === "got name: Bob") {
      res.json({ result: "ok" });
    } else {
      res.json({ result: "fail" });
    }
  } catch (error) {
    res.json({ result: "fail" });
  }
});

app.post("/action", async (req, res) => {
    const body = req.body;
  if (
    !body ||
    !body.action ||
    (body.action !== "joke" && body.action !== "cat fact")
  ) {
    return res.status(400).json({ error: "body is malformed" });
  }
  if (body.action === "joke") {
    const response = await fetch(
        "https://icanhazdadjoke.com/",
        {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }
    );
    const data = await response.json();
    return res.json({ joke: data });
  }

  if (body.action === "cat fact") {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=11",
      {
        method: "GET",
        headers: {
          "x-api-key":
            "live_rEfuK9ERDQtE6luuqq8TzWAShtwSfyqQ41nXYAguwXKUxGAbzgFhXfDJYxHuyQfG",
        },
      }
    );
    const data = await response.json();
    return res.json({ length: data.length });
  }
});

app.listen(3000, () => {
  console.log("run in port 3000");
});
