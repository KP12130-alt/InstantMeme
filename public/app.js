document.getElementById('memeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const textInput = document.getElementById('memeText');
    const templateSelect = document.getElementById('memeTemplate');
    const imageContainer = document.getElementById('imageContainer');
    const shareButton = document.getElementById('shareButton');
    const submitButton = document.querySelector('#memeForm button[type="submit"]');

    const text = textInput.value;
    const template = templateSelect.value;

    submitButton.textContent = 'Generálás... ⏳';
    submitButton.disabled = true;
    imageContainer.innerHTML = ''; // Előző kép törlése
    shareButton.style.display = 'none';

    try {
        const response = await fetch('/generate-meme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, template }),
        });

        const data = await response.json();

        if (response.ok) {
            // Siker: Hozzuk létre és tegyük be a képet
            const img = document.createElement('img');
            img.src = data.imageUrl;
            img.alt = 'Generált mém';
            img.style.maxWidth = '100%';
            
            // Hozzáadjuk a vízjelet (Monetizáció)
            // Itt kellene hozzáadni a watermarkot (pl. CSS-sel a div-re, vagy a szerver oldalon)
            
            imageContainer.appendChild(img);
            
            // Megosztás gomb aktiválása (Fun Faktor)
            shareButton.style.display = 'block';
            shareButton.onclick = () => {
                // Egyszerű megosztás szimuláció (pl. link másolása)
                alert(`Kész! Megoszthatod ezt a linket: ${window.location.origin}${data.imageUrl}`);
            };

        } else {
            // Hiba történt
            imageContainer.innerHTML = `<p style="color: red;">Hiba a generálásban: ${data.error}</p>`;
        }

    } catch (error) {
        imageContainer.innerHTML = `<p style="color: red;">Hálózati hiba: ${error.message}</p>`;
    } finally {
        submitButton.textContent = 'Memézd meg!';
        submitButton.disabled = false;
    }
});
