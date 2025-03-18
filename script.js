// Importer Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDu5frrsg2pVdpKW7loG_DfYicEw3Qw9AM",
    authDomain: "ilca-performance.firebaseapp.com",
    projectId: "ilca-performance",
    storageBucket: "ilca-performance.firebasestorage.app",
    messagingSenderId: "972275072584",
    appId: "1:972275072584:web:e0f20293eca3ef301ee27d",
    measurementId: "G-0QR12D7FMR"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ajouter une nouvelle session
document.getElementById('new-session').addEventListener('submit', async function (e) {
    e.preventDefault();

    const session = {
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        support: document.getElementById('support').value,
        regatta: document.getElementById('regatta').checked,
        regattaName: document.getElementById('regatta').checked ? document.getElementById('regatta-name').value : 'Non',
        wind: document.getElementById('wind').value,
        waveHeight: document.getElementById('wave-height').value,
        observations: document.getElementById('observations').value
    };

    try {
        await addDoc(collection(db, "sessions"), session);
        alert('Session enregistrée dans Firestore!');
        loadSessions();
    } catch (error) {
        console.error("Erreur lors de l'ajout de la session : ", error);
    }

    document.getElementById('new-session').reset();
});

// Charger les sessions
async function loadSessions() {
    const table = document.getElementById('session-history').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Vider la table avant de charger

    try {
        const querySnapshot = await getDocs(collection(db, "sessions"));
        querySnapshot.forEach((doc) => {
            const session = doc.data();
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td>${session.date}</td>
                <td>${session.location}</td>
                <td>${session.support}</td>
                <td>${session.regatta ? session.regattaName : 'Non'}</td>
                <td>${session.wind}</td>
                <td>${session.waveHeight}</td>
                <td>${session.observations}</td>
            `;
        });
    } catch (error) {
        console.error("Erreur lors du chargement des sessions : ", error);
    }
}

// Générer les options de vent
function generateWindOptions() {
    const windSelect = document.getElementById('wind');
    for (let i = 1; i <= 50; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} kn`;
        windSelect.appendChild(option);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    generateWindOptions();
    loadSessions();
});
