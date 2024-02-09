// Initialise le compteur de clics à 0
let count = 0;
// Définit la durée totale du test en millisecondes (6000 ms = 6 s)
let timeLeft = 6000;
// Un indicateur pour savoir si le test est en cours (false signifie "non")
let isCounting = false;

// Sélectionne les éléments du document HTML pour les manipuler avec JavaScript
const cpsTestButton = document.getElementById('cpsTestButton'); // Le bouton pour démarrer le test
const clickCountDisplay = document.getElementById('clickCount'); // L'endroit où le nombre de clics sera affiché
const timeLeftDisplay = document.getElementById('timeLeft'); // L'endroit où le temps restant sera affiché
const scoreModal = document.getElementById('scoreModal'); // La fenêtre modale qui affiche le score final
const scoreText = document.getElementById('scoreText'); // L'endroit dans la modale où le score est affiché
const closeButton = document.querySelector('.close-button'); // Le bouton pour fermer la fenêtre modale

// Définit ce qui se passe lorsque l'utilisateur clique sur le bouton pour démarrer ou pendant le test
function handleTest() {
    if (!isCounting) { // Vérifie si le test n'est pas déjà en cours
        isCounting = true; // Indique que le test commence
        count = 0; // Réinitialise le nombre de clics pour un nouveau test
        timeLeft = 6000; // Réinitialise le temps à 6 secondes pour le nouveau test
        cpsTestButton.innerText = 'Continuez à cliquer!'; // Modifie le texte du bouton
        clickCountDisplay.innerText = count; // Affiche le nombre initial de clics (0)

        // Commence à décompter le temps toutes les 100 millisecondes
        let interval = setInterval(() => {
            if (timeLeft > 0) { // Si il reste du temps
                timeLeft -= 100; // Réduit le temps restant de 100 ms
                // Calcule les secondes et millisecondes restantes et les affiche
                let seconds = Math.floor(timeLeft / 1000);
                let milliseconds = Math.floor((timeLeft % 1000) / 100);
                timeLeftDisplay.innerText = `${seconds}.${milliseconds} secondes`;
            } else { // Lorsque le temps est écoulé
                clearInterval(interval); // Arrête le décompte
                cpsTestButton.disabled = true; // Désactive le bouton pour éviter des clics supplémentaires
                // Calcule et affiche le score final dans la fenêtre modale
                const cpsAverage = count / 6;
                scoreText.innerText = `Nombre total de clics : ${count}, Moyenne de CPS : ${cpsAverage.toFixed(2)}`;
                scoreModal.style.display = "block"; // Affiche la fenêtre modale avec le score
                isCounting = false; // Indique que le test est terminé
            }
        }, 100);
    } else { // Si le test est déjà en cours
        count++; // Incrémente le compteur de clics à chaque clic
        clickCountDisplay.innerText = count; // Met à jour l'affichage du nombre de clics
    }
}

// Ajoute un gestionnaire d'événement sur le bouton pour démarrer le test ou compter les clics
cpsTestButton.addEventListener('click', handleTest);

// Définit l'action de fermeture de la fenêtre modale au clic sur la croix
closeButton.onclick = function() {
    scoreModal.style.display = "none"; // Cache la fenêtre modale
    cpsTestButton.disabled = false; // Réactive le bouton pour permettre de recommencer
    cpsTestButton.innerText = 'Cliquez-moi !'; // Réinitialise le texte du bouton
    clickCountDisplay.innerText = '0'; // Réinitialise l'affichage du nombre de clics
    timeLeftDisplay.innerText = '6.0 secondes'; // Réinitialise l'affichage du temps pour le prochain test
};

// Empêche la fermeture de la fenêtre modale en cliquant en dehors (supprimé selon la demande)
window.onclick = function(event) {
    // Fonctionnalité retirée pour répondre à la demande spécifique
};
