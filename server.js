
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const memory = JSON.parse(fs.readFileSync("memory.json", "utf-8"));
app.post("/ask", (req, res) => {
  const q = req.body.question.trim().toLowerCase();
  if (memory[q]) {
    res.json({ answer: memory[q] });
  } else {
    memory[q] = null;
    fs.writeFileSync("memory.json", JSON.stringify(memory, null, 2));
    res.json({ answer: "🤔 لا أملك إجابة الآن، لكني سأتعلّمها لاحقًا!" });
  }
});
app.get("/memory.json", (req, res) => {
  res.json(memory);
});
app.listen(10000, () => console.log("Visit Libya Bot يعمل على المنفذ 10000"));
