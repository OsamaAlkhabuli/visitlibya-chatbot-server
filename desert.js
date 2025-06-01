
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://raw.githubusercontent.com/OsamaAlkhabuli/visit-libya-map/data/visitlibya_textual_content_updated.json")
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(data => {
      const section = data["desert"];
      const container = document.getElementById("desert-container");
      if (!section) {
        container.innerHTML = "<p>❌ لم يتم العثور على البيانات.</p>";
        return;
      }

      if (typeof section === "object" && !Array.isArray(section)) {
        const div = document.createElement("div");
        div.style.background = "#fff";
        div.style.border = "1px solid #ccc";
        div.style.padding = "15px";
        div.style.marginBottom = "10px";
        div.style.borderRadius = "6px";
        div.innerHTML = section.description
          ? `<p>${section.description}</p>`
          : `<pre>${JSON.stringify(section, null, 2)}</pre>`;
        container.appendChild(div);
      } else if (Array.isArray(section)) {
        section.forEach(item => {
          const div = document.createElement("div");
          div.style.background = "#fff";
          div.style.border = "1px solid #ccc";
          div.style.padding = "15px";
          div.style.marginBottom = "10px";
          div.style.borderRadius = "6px";
          div.innerHTML = `<pre>${JSON.stringify(item, null, 2)}</pre>`;
          container.appendChild(div);
        });
      }
    })
    .catch(error => {
      document.getElementById("desert-container").innerHTML = `<p>❌ خطأ أثناء تحميل البيانات: ${error.message}</p>`;
    });
});
