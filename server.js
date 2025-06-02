
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

let memory = {};
const memoryPath = "./memory.json";

// تحميل البيانات من memory.json
if (fs.existsSync(memoryPath)) {
  memory = JSON.parse(fs.readFileSync(memoryPath, "utf8"));
}

app.post("/ask", (req, res) => {
  const question = req.body.question?.trim();
  if (!question) return res.json({ answer: "يرجى كتابة سؤال واضح." });

  const key = Object.keys(memory).find(k => question.includes(k));
  const answer = key ? memory[key] : null;

  if (!answer) {
    memory[question] = null;
    fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2));
    return res.json({ answer: "🤖 لا أملك إجابة الآن، لكنني سأتعلمها لاحقًا." });
  }

  res.json({ answer });
});

app.listen(PORT, () => {
  console.log("✅ Visit Libya Bot server running on port", PORT);
});
