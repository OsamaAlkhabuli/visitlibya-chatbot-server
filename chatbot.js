
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("div");
  toggleBtn.innerHTML = "💬";
  toggleBtn.id = "chat-toggle";
  document.body.appendChild(toggleBtn);

  const chatBox = document.createElement("div");
  chatBox.id = "chat-box";
  chatBox.innerHTML = `
    <div id="chat-header">🤖 روبوت Visit Libya <span id="chat-close">×</span></div>
    <div id="chat-messages"></div>
    <input type="text" id="chat-input" placeholder="اسألني عن السياحة في ليبيا..." />
  `;
  document.body.appendChild(chatBox);

  toggleBtn.onclick = () => chatBox.classList.toggle("open");
  document.getElementById("chat-close").onclick = () => chatBox.classList.remove("open");

  let knowledge = {};

  fetch("https://raw.githubusercontent.com/OsamaAlkhabuli/visit-libya-map/data/visitlibya_textual_content_updated.json")
    .then(res => res.json())
    .then(data => knowledge = data);

  document.getElementById("chat-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const question = this.value.trim();
      if (!question) return;
      addMessage("user", question);
      this.value = "";
      respondTo(question);
    }
  });

  function respondTo(question) {
    const q = question.toLowerCase();
    let found = false;

    for (const key in knowledge) {
      const section = knowledge[key];
      if (typeof section === "object") {
        if (section.description && q.includes(key)) {
          addMessage("bot", section.description);
          found = true;
          break;
        } else if (Array.isArray(section)) {
          addMessage("bot", `📦 يحتوي قسم ${key} على ${section.length} عنصرًا`);
          found = true;
          break;
        } else {
          for (const subKey in section) {
            if (q.includes(subKey) || question.includes(subKey)) {
              addMessage("bot", section[subKey].description || `🔎 معلومات عن ${subKey}`);
              found = true;
              break;
            }
          }
        }
      }
    }

    if (!found) {
      addMessage("bot", "❓ لم أفهم سؤالك. حاول كلمات مثل: طرابلس، الشواطئ، الواحات، غدامس، الفنادق.");
    }
  }

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerText = text;
    document.getElementById("chat-messages").appendChild(msg);
    document.getElementById("chat-messages").scrollTop = 9999;
  }
});
