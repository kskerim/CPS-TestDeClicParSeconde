let count = 0;
let timeLeft = 6; // Durée initiale du test en secondes
let isCounting = false;

const cpsTestButton = document.getElementById('cpsTestButton');
const clickCountDisplay = document.getElementById('clickCount');
const timeLeftDisplay = document.getElementById('timeLeft');
const blocker = document.getElementById('blocker'); // Obtiens la zone de blocage

function showResults() {
    const cpsAverage = count / 6;
    cpsTestButton.innerText = `Test terminé ! Nombre total de clics : ${count}, Moyenne de CPS : ${cpsAverage.toFixed(2)}`;
    blocker.style.display = 'block'; // Affiche la zone de blocage
    setTimeout(() => {
        blocker.style.display = 'none'; // Cache la zone de blocage après un délai
        cpsTestButton.innerText = 'Cliquez-moi !';
        clickCountDisplay.innerText = '0';
        timeLeftDisplay.innerText = '6';
        isCounting = false;
    }, 2000); // Donne 2 secondes pour lire les résultats
}

cpsTestButton.addEventListener('click', () => {
    if (!isCounting) {
        isCounting = true;
        count = 0;
        timeLeft = 6;
        clickCountDisplay.innerText = count;
        timeLeftDisplay.innerText = timeLeft;
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeLeftDisplay.innerText = timeLeft;
            } else {
                clearInterval(interval);
                showResults();
            }
        }, 1000);
    } else if (isCounting) {
        count++;
        clickCountDisplay.innerText = count;
    }
});
