let NombreMin = 1;
let NombreMax = 10;
let NombresTentatives = 3;
let mystere;
let times;
let timerinterval;
const difficultySelect = document.getElementById("difficulty");
const userGuess = document.getElementById("userGuess");
const submitGuess = document.getElementById("submitGuess");
const resultat = document.getElementById("resultat");
const indices = document.getElementById("indices");
const tentatives = document.getElementById("tentatives");
const rejouer = document.getElementById("rejouer");
const temps = document.getElementById("temps")
const buttonDifficulty = document.getElementById("valider");

//fonction décompte de temps
//si le temps est écoulé, la fonction fin de partie est appelé
function decompte() {
    clearInterval(timerinterval)
    timerinterval = setInterval(() => {
        if (times > 0) {
            times--;
            temps.textContent = `Il vous reste : ${times}`;
        } else {
            finDePartie()
            clearInterval(interval);
            temps.textContent = "Le temps est écoulé Jedi"
        }
    }, 1000);
}


//fonction qui va générer le nombre mystère
function misterynumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//fonction qui va permettre a l utilisateur de sélectionner la difficulté
//on génère notre nombre mystère
//on met à jour le nombre de tentatives restantes par rapport à la difficulté.
function difficulty() {
    let choix = parseInt(difficultySelect.value);
    if (choix === 1) {
        NombresTentatives = 3;
        NombreMin = 1;
        NombreMax = 10;
        times = 20;
    } else if (choix === 2) {
        NombresTentatives = 2;
        NombreMin = 1;
        NombreMax = 50;
        times = 15;
    } else if (choix === 3) {
        NombresTentatives = 1;
        NombreMin = 1;
        NombreMax = 100;
        times = 10;
    }
    userGuess.style.display = "block";
    submitGuess.style.display = "block";
    buttonDifficulty.disabled = true;
    mystere = misterynumber(NombreMin, NombreMax);
    tentatives.textContent = `Tentatives restantes : ${NombresTentatives}`;
    decompte();
}

//fonction qui va vérifier le nombre de l'utilisateur
//On impose à l'utilisateur de taper un chiffre compris dans la plage définis par la difficulté
function checkGuess() {
    const guess = parseInt(userGuess.value);
    if (isNaN(guess) || guess < NombreMin || guess > NombreMax) {
        resultat.textContent = `Saisissez un nombre compris entre ${NombreMin} et ${NombreMax}`;
        return;
    }

    if (guess === mystere) {
        resultat.textContent = "Félicitation Jedi, la force est puissante en vous !!";
        indices.textContent = "";
        finDePartie();
    } else {
        NombresTentatives--;
        tentatives.textContent = `Tentatives restantes : ${NombresTentatives}`;
        indices.textContent = guess < mystere ? "Trop bas tu-es !!" : "Trop haut tu-es !!";

        if (NombresTentatives === 0) {
            resultat.textContent = `Hmm... Perdu, tu-as. 
            Humilité, tu montres. 
            Une nouvelle chance, tu auras. 
            Prêt, es-tu ? Concentration, il faudra !
            Le nombre mystère était ${mystere}`;
            finDePartie();
        }
    }
}

//fonction pour terminer la partie
//On désactive le champ de saisi et le bouton 'Utiliser la force'
//On fait apparaître le bouton rejouer
function finDePartie() {
    submitGuess.disabled = true;
    userGuess.disabled = true;
    buttonDifficulty.disabled = true;
    rejouer.style.display = "block";
    clearInterval(timerinterval);
}

//fonction pour redémarrer le jeu
//On réactive le champ de saisi et le bouton associer
//On réinitialise les paramètres de base du jeu (nombre d'essaie ... )
function resetGame() {
    submitGuess.disabled = false;
    userGuess.disabled = false;
    userGuess.value = "";
    rejouer.style.display = "none";
    userGuess.style.display = "none";
    submitGuess.style.display = "none";
    resultat.textContent = "";
    indices.textContent = "";
    tentatives.textContent = "--";
    difficultySelect.disabled = false;
    buttonDifficulty.disabled = false;
    buttonDifficulty = false;
    clearInterval(timerinterval);
}

//Appel de la fonction difficulty valider quand on appuie sur le bouton "confirme ton choix"
document.getElementById("valider").addEventListener("click", () => {
    difficulty();
    difficultySelect.disabled = true;
});

//Appel de la fonction CheckGuess quand on appuie sur le bouton "Utiliser la force"
submitGuess.addEventListener("click", () => {
    checkGuess();
    const clickSound = new Audio('sound/starwars.mp3');
    clickSound.play();
});

//Appel de la fonction restGame quand on appuie sur le bouton "Relèvera tu un nouveau défis ?"
rejouer.addEventListener("click", resetGame);

//Cela empêche l'utilisateur décrire des lettres ou des signes
document.querySelector('#userGuess').addEventListener('keydown', function (e) {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
    }
});

