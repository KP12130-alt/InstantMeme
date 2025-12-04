const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware a JSON adatok feldolgozásához
app.use(bodyParser.json());

// Statikus fájlok kiszolgálása a 'public' mappából (itt lesz a HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// --- 🖼️ Képgeneráló Végpont (A MAGE DOLOG ITT TÖRTÉNIK) ---
app.post('/generate-meme', async (req, res) => {
    // 1. Kérés adatai
    const { text, template } = req.body;

    if (!text || !template) {
        return res.status(400).send({ error: 'Hiányzó szöveg vagy sablon.' });
    }

    console.log(`Mém generálása... Szöveg: "${text}", Sablon: ${template}`);

    // --- AZ IGAZI KÉP GENERÁLÁS LOGIKA IDE JÖN ---
    // (A legegyszerűbb, ha itt használsz egy könyvtárat, pl. 'sharp' vagy 'canvas' a szöveg ráhelyezéséhez)
    
    // Példa szimuláció, amíg nincs valódi képkezelés:
    try {
        // Kép generálása... (pl. "sharp" könyvtárral)
        // A kód itt lefut... és létrehoz egy 'meme.png' fájlt a 'generated' mappában

        // Tegyük fel, hogy a sikeres generálás után a kép elérhető
        const imageUrl = `/generated/meme-${Date.now()}.png`; // Elméleti elérési út
        
        // Visszaküldjük az elérési utat a front-endnek
        res.status(200).send({ imageUrl: imageUrl });

    } catch (error) {
        console.error('Hiba a mém generálásakor:', error);
        res.status(500).send({ error: 'Nem sikerült generálni a képet.' });
    }
});

// Szerver indítása
app.listen(port, () => {
    console.log(`Server fut: http://localhost:${port}`);
});

// A képkezeléshez installáld a szükséges csomagokat:
// npm install express body-parser
// npm install sharp (vagy canvas, ha képkezelést akarsz)
