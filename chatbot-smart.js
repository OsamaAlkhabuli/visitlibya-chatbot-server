
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("div");
  toggleBtn.innerHTML = "💬";
  toggleBtn.id = "chat-toggle";
  document.body.appendChild(toggleBtn);

  const chatBox = document.createElement("div");
  chatBox.id = "chat-box";
  chatBox.innerHTML = `
    <div id="chat-header">روبوت Visit Libya 🤖 <span id="chat-close">×</span></div>
    <div id="chat-messages"></div>
    <input type="text" id="chat-input" placeholder="اسألني عن السياحة في ليبيا..." />
  `;
  document.body.appendChild(chatBox);

  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  document.getElementById("chat-toggle").onclick = () => chatBox.classList.toggle("open");
  document.getElementById("chat-close").onclick = () => chatBox.classList.remove("open");

  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const question = this.value.trim();
      if (!question) return;

      addMessage("user", question);
      this.value = "";
      fetchAnswer(question);
    }
  });

  function fetchAnswer(question) {
    fetch("https://bot-visitlibya.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    })
      .then(res => res.json())
      .then(data => {
        addMessage("bot", data.answer || "❌ لم أتمكن من الرد حالياً.");
      })
      .catch(() => {
        addMessage("bot", "⚠️ حدث خطأ في الاتصال بالخادم.");
      });
  }

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
