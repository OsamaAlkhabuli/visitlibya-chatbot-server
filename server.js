
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const MEMORY_FILE = 'memory.json';

let memory = {};
if (fs.existsSync(MEMORY_FILE)) {
  memory = JSON.parse(fs.readFileSync(MEMORY_FILE));
} else {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify({}));
}

app.post('/ask', (req, res) => {
  const question = req.body.question?.trim().toLowerCase();

  if (!question) {
    return res.status(400).json({ answer: '❗ أدخل سؤالاً صالحًا' });
  }

  if (memory[question]) {
    return res.json({ answer: memory[question] });
  } else {
    memory[question] = null;
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
    return res.json({ answer: '🤔 لا أملك إجابة الآن، لكنني سأتعلمها لاحقًا!' });
  }
});

app.get('/', (req, res) => {
  res.send('🤖 Visit Libya Smart Chatbot Server يعمل بنجاح');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
