
let chatData = {};
let memoryData = {};
let language = "ar";

const loadJSON = async () => {
  const urls = ["visitlibya_textual_content_updated.json", "الائواء_السياحي.json"];
  for (let url of urls) {
    const res = await fetch(url);
    const json = await res.json();
    Object.assign(chatData, json);
  }
};

const getResponse = (question) => {
  const q = question.trim().toLowerCase();
  const keys = Object.keys(chatData);
  for (let key of keys) {
    if (q.includes(key.toLowerCase())) return chatData[key];
  }
  return language === "ar"
    ? "لم أجد إجابة، لكني سأتعلمها قريبًا 🤖"
    : "I don't have an answer yet, but I will learn it soon 🤖";
};

const addMessage = (msg, sender) => {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = sender;
  div.textContent = msg;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
};

const sendMessage = () => {
  const input = document.getElementById("chatInput");
  const question = input.value.trim();
  if (!question) return;
  language = /[a-zA-Z]/.test(question) ? "en" : "ar";
  addMessage(question, "user");
  const answer = getResponse(question);
  setTimeout(() => addMessage(answer, "bot"), 500);
  input.value = "";
};

window.onload = async () => {
  await loadJSON();
  document.getElementById("chatInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("chatToggle").addEventListener("click", () => {
    document.getElementById("chatContainer").classList.toggle("open");
  });
};
