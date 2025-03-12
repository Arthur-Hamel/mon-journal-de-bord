document.getElementById('new-session').addEventListener('submit', function (e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const support = document.getElementById('support').value;
    const regatta = document.getElementById('regatta').checked;
    const regattaName = regatta ? document.getElementById('regatta-name').value : 'Non';
    const wind = document.getElementById('wind').value;
    const waveHeight = document.getElementById('wave-height').value;
    const observations = document.getElementById('observations').value;

    const session = { date, location, support, regatta, regattaName, wind, waveHeight, observations };

    let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    sessions.push(session);
    localStorage.setItem('sessions', JSON.stringify(sessions));

    document.getElementById('new-session').reset();
    loadSessions();
});

function addSessionToTable(session, index) {
    const table = document.getElementById('session-history').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${session.date}</td>
        <td>${session.location}</td>
        <td>${session.support}</td>
        <td>${session.regatta ? session.regattaName : 'Non'}</td>
        <td>${session.wind}</td>
        <td>${session.waveHeight}</td>
        <td>${session.observations}</td>
        <td>
            <button onclick="editSession(${index})">Modifier</button>
            <button onclick="deleteSession(${index})">Supprimer</button>
        </td>
    `;
}

function loadSessions() {
    const table = document.getElementById('session-history').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Vider avant de charger
    const sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    sessions.forEach((session, index) => {
        addSessionToTable(session, index);
    });
}

function deleteSession(index) {
    let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    sessions.splice(index, 1);
    localStorage.setItem('sessions', JSON.stringify(sessions));
    loadSessions();
}

function editSession(index) {
    let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    const session = sessions[index];
    document.getElementById('date').value = session.date;
    document.getElementById('location').value = session.location;
    document.getElementById('support').value = session.support;
    document.getElementById('regatta').checked = session.regatta;
    document.getElementById('regatta-name').value = session.regattaName;
    document.getElementById('wind').value = session.wind;
    document.getElementById('wave-height').value = session.waveHeight;
    document.getElementById('observations').value = session.observations;
}

function generateWindOptions() {
    const windSelect = document.getElementById('wind');
    windSelect.innerHTML = ''; // Vider avant de générer
    for (let i = 1; i <= 50; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} kn`;
        windSelect.appendChild(option);
    }
}

// Charger au démarrage
document.addEventListener('DOMContentLoaded', () => {
    generateWindOptions();
    loadSessions();
});