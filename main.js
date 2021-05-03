// Asignamos los nombres de los jugadores a sus variables
let firstPlayerName;
let secondPlayerName;
let winner;

// Variable nextPlayer, de esta manera sabemos a que imagen cambiar
let nextPlayer;
let nextSign = "cross";

// Declaramos const de popUp
const popUp = document.getElementById("popUp");

// Diccionario imagenes
images = {
    "start": "./images/startImage.png",
    "circle": "images/circle.png",
    "cross": "./images/cross.png"
};

// Creamos array del juego
let arrayGame = [ 
    [ 'start', 'start', 'start' ], 
    [ 'start', 'start', 'start' ], 
    [ 'start', 'start', 'start' ]];


// Función que guarda el nombre de los jugadores en una variable
function saveNames() {
    // Asignamos el valor de input del primer jugador a un sessionStorage
    sessionStorage.firstPlayerName = document.getElementById("firstPlayer").value;
    firstPlayerName = sessionStorage.firstPlayerName;

    // Asignamos el valor de input del segundo jugador a un sessionStorage
    sessionStorage.secondPlayerName = document.getElementById("secondPlayer").value;
    secondPlayerName = sessionStorage.secondPlayerName;

    // Hacemos aparecer la segunda página
    document.getElementById("initialPage").classList.add("d-none"); 
    document.getElementById("gamePage").classList.remove("d-none");
    nextPlayer = firstPlayerName;
    changePlayerTitle();
};

// Función para cambiar el titulo con el jugador y su signo
function changePlayerTitle() {
    let spanishName = nextSign;
    if (nextSign === "cross"){
        spanishName = "cruz";
    } else {
        spanishName = "círculo";
    }
    document.getElementById("nextPlayer").innerHTML = `Le toca jugar a ${nextPlayer} con ${spanishName}`;
};

// Función para cambio de imagenes
function play(column, row){
    if (arrayGame[row][column] === "start"){
        if (nextSign === "cross"){  
            nextPlayer = secondPlayerName;
            arrayGame[row][column] = "cross";
            document.getElementById(`column_${column}-row_${row}`).src = images.cross;
            document.getElementById(`column_${column}-row_${row}`).style.backgroundColor = "white";
            checkWin(nextSign);
            nextSign = "circle";
            changePlayerTitle();
            
        } else if (nextSign === "circle") {
            nextPlayer = firstPlayerName;
            arrayGame[row][column] = "circle";
            document.getElementById(`column_${column}-row_${row}`).src = images.circle;
            document.getElementById(`column_${column}-row_${row}`).style.backgroundColor = "white";
            checkWin(nextSign);
            nextSign = "cross";
            changePlayerTitle();
        }
    } else {
        return;
    };
        
};

// Función para comprobar array si alguien ha ganado o se ha empatado
function checkWin(playerSign){
    if ( ( arrayGame[0][0] === playerSign && arrayGame[0][1] === playerSign && arrayGame[0][2] === playerSign ) || 
    ( arrayGame[1][0] === playerSign && arrayGame[1][1] === playerSign && arrayGame[1][2] === playerSign ) ||
    ( arrayGame[2][0] === playerSign && arrayGame[2][1] === playerSign && arrayGame[2][2] === playerSign ) || 
    ( arrayGame[0][0] === playerSign && arrayGame[1][0] === playerSign && arrayGame[2][0] === playerSign ) ||
    ( arrayGame[0][1] === playerSign && arrayGame[1][1] === playerSign && arrayGame[2][1] === playerSign ) ||
    ( arrayGame[0][2] === playerSign && arrayGame[1][2] === playerSign && arrayGame[2][2] === playerSign ) ||
    ( arrayGame[0][0] === playerSign && arrayGame[1][1] === playerSign && arrayGame[2][2] === playerSign ) ||
    ( arrayGame[0][2] === playerSign && arrayGame[1][1] === playerSign && arrayGame[2][0] === playerSign )){
        if ( playerSign === "cross" ){
            winner = firstPlayerName;
            nextSign = "cruces";
        } else {
            winner = secondPlayerName;
            nextSign = "círculos";
        };
        openPopUp("win");
    } else {
        //Comprobamos empate
        checkDraw();
    };
};

// Función para comprobar empate
function checkDraw(){
    let startNumber = 0;
    for ( let i = 0; i < arrayGame.length; i++ ){
        for ( let j = 0; j < arrayGame[i].length; j++ ){
            if ( arrayGame[i][j] === "start" ){
                startNumber++;
        };
    }};
    if ( startNumber === 0 ){
        openPopUp("noWin");
    };

};

// Función para abrir popUp de ganador o empate
// Finish es si ha habido win o draw
function openPopUp(finish){
    popUp.classList.remove("d-none");
    const popUpTitle = document.getElementById("popUpTitle");
    const popUpPhrase = document.getElementById("popUpPhrase");
    if ( finish === "win" ) {
        popUpTitle.innerHTML = `¡El ganador es ${winner}!`;
        popUpPhrase.innerHTML = `${winner} junto a sus ${nextSign} han vencido a todo aquél que ha osado intentar batirle`;
    } else {
        popUpTitle.innerHTML = `¡Ha habido un empate!`;
        popUpPhrase.innerHTML = `Sois tan buenos contrincantes que ninguno ha podido vencer al otro, ¡batiros en duelo de nuevo!`;
    }
};

// Función del icono que cierra el popUp
// Declaramos const del boton fuera del popUp
const playAOut = document.getElementById("playAOut");
function closePopUp(){
    popUp.classList.add("d-none");
    playAOut.classList.remove("d-none");
};

// Boton jugar de nuevo
// Declaramos const del botón
const playAIn = document.getElementById("playAIn");
playAIn.onclick = playAgain;
function playAgain() {
    popUp.classList.add("d-none");
    for ( let i = 0; i < arrayGame.length; i++ ) {
        for ( let j = 0; j < arrayGame[i].length; j++ ){
            arrayGame[i][j] = "start";
            document.getElementById(`column_${i}-row_${j}`).src = images.start;
        };
    };
    const nextPlay = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if ( nextPlay === 1 ) {
        nextPlayer = firstPlayerName;
        nextSign = "cross";
    } else {
        nextPlayer = secondPlayerName;
        nextSign = "circle";
    }
};

// function reloadWeb() {
//     window.location.reload()
// }