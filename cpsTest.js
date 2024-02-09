let count = 0;
let timeLeft = 6000; // Durée du test en millisecondes (6 secondes)
let isCounting = false;

const cpsTestButton = document.getElementById('cpsTestButton');
const clickCountDisplay = document.getElementById('clickCount');
const timeLeftDisplay = document.getElementById('timeLeft'); // Élément pour afficher le temps restant
const scoreModal = document.getElementById('scoreModal');
const scoreText = document.getElementById('scoreText');
const closeButton = document.querySelector('.close-button');

function handleTest() {
    if (!isCounting) {
        isCounting = true;
        count = 0;
        timeLeft = 6000; // Réinitialise le temps pour le nouveau test
        cpsTestButton.innerText = 'Continuez à cliquer!';
        clickCountDisplay.innerText = count;

        let interval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft -= 100; // Décompte toutes les 100 millisecondes
                let seconds = Math.floor(timeLeft / 1000); // Calcule les secondes restantes
                let milliseconds = Math.floor((timeLeft % 1000) / 100); // Calcule les millisecondes restantes
                timeLeftDisplay.innerText = `${seconds}.${milliseconds} secondes`; // Affiche le temps restant avec les millisecondes
            } else {
                clearInterval(interval);
                cpsTestButton.disabled = true;
                const cpsAverage = count / 6;
                scoreText.innerText = `Nombre total de clics : ${count}, Moyenne de CPS : ${cpsAverage.toFixed(2)}`;
                scoreModal.style.display = "block";
                isCounting = false;
            }
        }, 100); // Met à jour le temps toutes les 100 millisecondes
    } else {
        count++;
        clickCountDisplay.innerText = count;
    }
}

cpsTestButton.addEventListener('click', handleTest);

closeButton.onclick = function() {
    scoreModal.style.display = "none";
    cpsTestButton.disabled = false;
    cpsTestButton.innerText = 'Cliquez-moi !';
    clickCountDisplay.innerText = '0';
    timeLeftDisplay.innerText = '6.0 secondes'; // Réinitialise l'affichage du temps pour le prochain test
};
