const docDisplay = document.getElementById('doc-display');
const dossierSelect = document.getElementById('dossier-select');
const chapitreSelect = document.getElementById('chapitre-select');

const dossiers = {
    'chapitres_traduits1': [
        'Chapitres_1-5.docx',
        'Chapitres_6-10.docx',
        'Chapitres_11-15.docx',
        'Chapitres_16-20.docx',
        'Chapitres_21-25.docx',
        'Chapitres_26-30.docx',
        'Chapitres_31-35.docx',
        'Chapitres_36-40.docx',
        'Chapitres_41-45.docx',
        'Chapitres_46-50.docx',
        'Chapitres_51-55.docx',
        'Chapitres_56-60.docx',
        'Chapitres_61-65.docx'
    ],
    'chapitres_traduits2': [
        'Chapitres_1-5.docx',
        'Chapitres_6-10.docx',
        'Chapitres_11-15.docx',
        'Chapitres_16-20.docx',
        'Chapitres_21-25.docx',
        'Chapitres_26-30.docx',
        'Chapitres_31-35.docx',
        'Chapitres_36-40.docx',
        'Chapitres_41-45.docx',
        'Chapitres_46-50.docx',
        'Chapitres_51-55.docx',
        'Chapitres_56-60.docx',
        'Chapitres_61-65.docx',
        'Chapitres_66-70.docx',
        'Chapitres_71-75.docx',
        'Chapitres_76-80.docx',
        'Chapitres_81-85.docx',
        'Chapitres_86-90.docx',
        'Chapitres_91-95.docx',
        'Chapitres_96-100.docx'
    ],
    'chapitres_traduits 3': [
        'Chapitres_1-5.docx',
        'Chapitres_6-10.docx',
        'Chapitres_11-15.docx',
        'Chapitres_16-20.docx',
        'Chapitres_21-25.docx',
        'Chapitres_26-30.docx',
        'Chapitres_31-35.docx',
        'Chapitres_36-40.docx',
        'Chapitres_41-45.docx',
        'Chapitres_46-50.docx',
        'Chapitres_51-55.docx',
        'Chapitres_56-60.docx',
        'Chapitres_61-65.docx',
        'Chapitres_66-70.docx',
        'Chapitres_71-75.docx',
        'Chapitres_76-80.docx',
        'Chapitres_81-85.docx',
        'Chapitres_86-90.docx',
        'Chapitres_91-95.docx',
        'Chapitres_96-100.docx'
    ],
    'chapitres_traduits4': [
        'Chapitres_1-5.docx',
        'Chapitres_6-10.docx',
        'Chapitres_11-15.docx',
        'Chapitres_16-20.docx',
        'Chapitres_21-25.docx',
        'Chapitres_26-30.docx',
        'Chapitres_31-35.docx',
        'Chapitres_36-40.docx',
        'Chapitres_41-45.docx',
        'Chapitres_46-50.docx',
        'Chapitres_51-55.docx',
        'Chapitres_56-60.docx',
        'Chapitres_61-65.docx',
        'Chapitres_66-70.docx',
        'Chapitres_71-75.docx',
        'Chapitres_76-80.docx',
        'Chapitres_81-85.docx',
        'Chapitres_86-90.docx',
        'Chapitres_91-95.docx',
        'Chapitres_96-100.docx'
    ]
};

function remplirChapitres() {
    chapitreSelect.innerHTML = '<option value="">-- Choisis un chapitre --</option>';
    const dossier = dossierSelect.value;
    if (dossier && dossiers[dossier]) {
        dossiers[dossier].forEach(fichier => {
            const option = document.createElement('option');
            option.value = `docs/${dossier}/${fichier}`;
            option.textContent = fichier.replace('Chapitres_', 'Chapitres ').replace('.docx', '');
            chapitreSelect.appendChild(option);
        });
    }
}

dossierSelect.addEventListener('change', remplirChapitres);

function chargerChapitre() {
    const fichier = chapitreSelect.value;

    if (fichier === '') {
        alert("Sélectionne d'abord un chapitre !");
        return;
    }

    fetch(fichier)
        .then(response => {
            if (!response.ok) throw new Error('Erreur lors du chargement du document');
            return response.arrayBuffer();
        })
        .then(arrayBuffer => mammoth.convertToHtml({ arrayBuffer }))
        .then(result => {
            docDisplay.innerHTML = result.value;
        })
        .catch(err => {
            docDisplay.innerHTML = `<p style="color:red;">${err}</p>`;
        });
}
