const inputField = document.getElementById('inputField');
const output = document.getElementById('output');
let commandHistory = [];
let historyIndex = -1;

// Aladdin Antworten
const aladdinResponses = {
    help: `
╔════════════════════════════════════════════╗
║         📜 VERFÜGBARE BEFEHLE 📜           ║
╠════════════════════════════════════════════╣
║ help       - Zeigt diese Hilfenachricht    ║
║ wish       - Äußere einen Wunsch!          ║
║ magic      - Aladdin zeigt Magie!          ║
║ whoami     - Wer bist du?                  ║
║ time       - Aktuelle Zeit                 ║
║ clear      - Terminal leeren               ║
║ exit       - Terminal beenden              ║
║ status     - Status des Dschinn            ║
╚════════════════════════════════════════════╝
    `,
    wish: `
🧞 Der Dschinn spricht:
"Ah, ein Wunsch! Sprich deinen Namen und deinen 
tiefsten Wunsch aus, und ich werde es versuchen!
(Schreib: 'wunsch [dein_name] [dein_wunsch]')"
    `,
    magic: `
✨ ✨ ✨ ALADDIN ZAUBERT ✨ ✨ ✨

🌟 Magie wird gewirkt...
╭─────────────────────────────╮
│  ✨ Fünk! ✨ Zisch! ✨       │
│  Der Dschinn tanzt herum!   │
│  🧞‍♂️ Whirrrrrr!               │
│  Die Magie sprüht funken!   │
│  Poof! 💨 Es ist getan!     │
╰─────────────────────────────╯

🌈 Regenbogeneffekt auf dem Bildschirm!
⚡ Die Magie ist erfolgreich! ⚡
    `,
    whoami: `
🧞 Der Dschinn sagt:
"Ich bin der mächtige Dschinn Aladdin!
 Ich habe zehntausend Jahre in einer Lampe
 gelebt und bin nun hier, um dir zu dienen!
 Mit meiner Magie kann ich alles möglich machen!"
    `,
    time: `
⏰ Aktuelle Zeit: ${new Date().toLocaleString('de-DE')}
Der Dschinn sagt: "Die Zeit vergeht schnell!"
    `,
    status: `
🧞 STATUS DES DSCHINN
╔═══════════════════════════════════╗
║ Name: Aladdin                     ║
║ Level: 9000 ∞                     ║
║ Mana: ∞∞∞ (Unendlich)            ║
║ Laune: Sehr fröhlich 😄           ║
║ Wünsche erfüllt: Viele!          ║
║ Magiepunkte: MAX ⚡⚡⚡          ║
╚═══════════════════════════════════╝
    `,
    clear: null, // Spezialbehandlung
    exit: null   // Spezialbehandlung
};

// Event Listener für Enter-Taste
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        executeCommand();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateHistory('down');
    }
});

function executeCommand() {
    const command = inputField.value.trim().toLowerCase();
    
    if (!command) return;
    
    // Befehl zur Historie hinzufügen
    commandHistory.push(command);
    historyIndex = commandHistory.length;
    
    // Befehl anzeigen
    addLine(`<span class="prompt">C:\\Aladdin></span> <span class="command-input">${inputField.value}</span>`);
    inputField.value = '';
    
    // Befehl verarbeiten
    if (command === 'clear') {
        output.innerHTML = '';
    } else if (command === 'exit') {
        addLine(`<span class="success-message">👋 Der Dschinn sagt: "Auf Wiedersehen, mein Freund!"</span>`);
        inputField.disabled = true;
        setTimeout(() => {
            addLine(`<span style="color: #ff6b6b;">Terminal wird beendet...</span>`);
        }, 1000);
    } else if (command.startsWith('wunsch ')) {
        // Wunsch erfüllen
        const wunsch = command.substring(7);
        addLine(`<span class="command-output">🧞 Der Dschinn schließt die Augen...</span>`);
        addLine(`<span class="magic-animation" style="color: #ff00ff;">✨ Zauberstab erhebt sich... ✨</span>`);
        addLine(`<span class="success-message">✓ Dein Wunsch "${wunsch}" wurde erfüllt! 🎉</span>`);
    } else if (aladdinResponses[command] !== undefined) {
        // Bekannter Befehl
        const response = aladdinResponses[command];
        if (response) {
            addLine(`<span class="command-output">${response}</span>`);
        }
    } else {
        // Unbekannter Befehl
        addLine(`<span class="error-message">❌ Unbekannter Befehl: '${inputField.value}'</span>`);
        addLine(`<span class="error-message">Schreib 'help' für verfügbare Befehle!</span>`);
    }
    
    // Zum Ende scrollen
    output.scrollTop = output.scrollHeight;
}

function addLine(content) {
    const line = document.createElement('div');
    line.className = 'command-line';
    line.innerHTML = content;
    output.appendChild(line);
}

function navigateHistory(direction) {
    if (direction === 'up' && historyIndex > 0) {
        historyIndex--;
        inputField.value = commandHistory[historyIndex];
    } else if (direction === 'down' && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputField.value = commandHistory[historyIndex];
    } else if (direction === 'down' && historyIndex === commandHistory.length - 1) {
        historyIndex = commandHistory.length;
        inputField.value = '';
    }
}

// Focus auf Input beim Start
inputField.focus();

// Button-Funktionalität
document.querySelector('.btn-minimize').addEventListener('click', () => {
    alert('Minimieren - nur Demo 😄');
});

document.querySelector('.btn-maximize').addEventListener('click', () => {
    document.querySelector('.terminal-container').style.maxWidth = '100%';
    document.querySelector('.terminal-container').style.height = '100vh';
});

document.querySelector('.btn-close').addEventListener('click', () => {
    if (confirm('Möchtest du das Terminal wirklich schließen?')) {
        document.querySelector('.terminal-container').style.opacity = '0';
        document.querySelector('.terminal-container').style.transform = 'scale(0.8)';
        setTimeout(() => {
            alert('🧞 Der Dschinn verabschiedet sich!');
        }, 300);
    }
});
