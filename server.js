import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

app.post('/ask', (req, res) => {
  const question = req.body.question?.toLowerCase() || '';
  const memoryPath = path.join(__dirname, 'memory.json');

  try {
    const data = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
    const matchedKey = Object.keys(data).find(key => question.includes(key));
    const answer = matchedKey ? data[matchedKey] : '🤖 آسف، لم أجد إجابة الآن، لكني سأتعلمها لاحقًا!';
    res.json({ answer });
  } catch (error) {
    console.error('Error reading memory.json:', error);
    res.status(500).json({ answer: 'حدث خطأ في الخادم 😢' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Visit Libya Bot (smart version) running on port ${PORT}`);
});
