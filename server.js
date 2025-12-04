const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware a JSON-hez
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static fájlok kiszolgálása
app.use(express.static(path.join(__dirname, "public"))); // ide kerüljön index.html, style.css, script.js

// Mini tudásbázis
const helpers = [
  {
    key: ["random"],
    text: `// Random szám 1 és 100 között
const num = Math.floor(Math.random() * 100) + 1;
console.log(num);`
  },
  {
    key: ["array", "tömb rendezés"],
    text: `// Tömb rendezése növekvő sorrendben
const arr = [5, 2, 9, 1];
arr.sort((a, b) => a - b);
console.log(arr);`
  },
  {
    key: ["fetch", "api", "adat lekérés"],
    text: `// Fetch API példa
fetch("https://api.example.com/data")
  .then(res => res.json())
  .then(data => console.log(data));`
  },
  {
    key: ["dom", "elem kiválasztása"],
    text: `// DOM elem kiválasztása és módosítása
document.getElementById("box").innerText = "Hello JS!";`
  }
];

// POST endpoint a tippekhez
app.post("/get-code", (req, res) => {
  const { question } = req.body;
  if (!question) return res.json({ code: "Írj be valamit!" });

  const q = question.toLowerCase().trim();
  let response = "Sajnos nem találtam rá mintát, próbáld másképp megfogalmazni!";

  for (let h of helpers) {
    if (h.key.some(k => q.includes(k))) {
      response = h.text;
      break;
    }
  }

  res.json({ code: response });
});

// Szerver indítása
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
