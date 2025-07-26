const fileInput = document.getElementById('file-input');
const docDisplay = document.getElementById('doc-display');
const chapitreSelect = document.getElementById('chapitre-select');

// Événement bouton pour ouvrir la sélection fichier
document.querySelector('.btn-select').addEventListener('click', () => {
    fileInput.click();
});

// Charger document depuis l'ordinateur local (si utilisé)
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(loadEvent) {
            mammoth.convertToHtml({arrayBuffer: loadEvent.target.result})
                .then(result => {
                    docDisplay.innerHTML = result.value;
                })
                .catch(err => {
                    docDisplay.innerHTML = `<span style="color:red;">Erreur: ${err.message}</span>`;
                });
        };

        reader.readAsArrayBuffer(file);
    } else {
        docDisplay.textContent = "Aucun document sélectionné.";
    }
});

// NOUVELLE FONCTION : Charger depuis les chapitres du serveur directement
function chargerChapitre() {
    const fichier = chapitreSelect.value;

    if (fichier === "") {
        alert("Sélectionne d'abord un chapitre !");
        return;
    }

    fetch(fichier)
        .then(response => {
            if (!response.ok) throw new Error("Erreur lors du chargement du document");
            return response.arrayBuffer();
        })
        .then(arrayBuffer => mammoth.convertToHtml({arrayBuffer: arrayBuffer}))
        .then(result => {
            docDisplay.innerHTML = result.value;
        })
        .catch(err => {
            docDisplay.innerHTML = `<p style="color:red;">${err}</p>`;
        });
}
