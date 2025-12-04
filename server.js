const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const helpers = [
  { key: ["random"], text: `const num = Math.floor(Math.random()*100)+1;\nconsole.log(num);` },
  { key: ["array", "tömb rendezés"], text: `const arr=[5,2,9,1]; arr.sort((a,b)=>a-b); console.log(arr);` },
  { key: ["fetch"], text: `fetch("https://api.example.com/data").then(r=>r.json()).then(d=>console.log(d));` },
  { key: ["dom"], text: `document.getElementById("box").innerText="Hello JS!";` }
];

app.post("/get-code", (req, res) => {
  const { question } = req.body;
  if (!question) return res.json({ code: "Írj be valamit!" });

  const q = question.toLowerCase();
  let response = "Sajnos nem találtam rá mintát!";

  for (let h of helpers) {
    if (h.key.some(k => q.includes(k))) { response = h.text; break; }
  }

  res.json({ code: response });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
