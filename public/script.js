const output = document.getElementById("output");
const btn = document.getElementById("generateBtn");

btn.addEventListener("click", () => {
  const q = document.getElementById("question").value.toLowerCase().trim();

  if (!q) {
    showOutput("Írj be valamit!");
    return;
  }

  let response = "Sajnos nem találtam rá mintát, próbáld másképp megfogalmazni!";

  // 🔥 mini tudásbázis
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

  // keresés
  for (let h of helpers) {
    if (h.key.some(k => q.includes(k))) {
      response = h.text;
      break;
    }
  }

  showOutput(response);
});

function showOutput(text) {
  output.classList.remove("hidden");
  output.textContent = text;
}
