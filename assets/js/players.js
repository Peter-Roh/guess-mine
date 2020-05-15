import { 
    disableCanvas, 
    enableCanvas, 
    hideControls, 
    showControls, 
    resetCanvas
    } from "./paint";
import { disableChat, enableChat } from "./chat";

const board  = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const jsTime = document.getElementById("jsTime");

const clearCSS = () => {
    if(notifs.innerText == "" && jsTime.innerText == "") {
        notifs.style.display = 'none';
        jsTime.style.display = 'none';
    } else {
        notifs.style.display = 'inline';
        jsTime.style.display = 'inline';
    }
};

const showCSS = () => {
        notifs.style.display = 'inline';
        jsTime.style.display = 'inline';
};

const addPlayers = (players) => {
    board.innerHTML = "";
    players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
    });
};

const setNotifs = (text) => {
    notifs.innerText = "";
    notifs.innerText = text;
    clearCSS();
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
    setNotifs("Guess!");
    jsTime.innerText = "";
    disableCanvas();
    hideControls();
    enableChat();
    showCSS();
};

export const handleLeaderNotif = ({ word }) => {
    enableCanvas();
    showControls();
    disableChat();
    notifs.innerText = `You are the leader, paint: ${word}`;
};

export const handleGameEnded = () => {
    setNotifs("Game ended.");
    jsTime.innerText = "";
    disableCanvas();
    hideControls();
    resetCanvas();
};

export const handleGameStarting = () => {
    setNotifs("Game will start soon...");
    jsTime.innerText = "";
};

export const handleTimer = (text) => {
    jsTime.innerText = "";
    if(text < 10) {
        jsTime.innerText = "00 : 0" + text;
    } else {
        jsTime.innerText = "00 : " + text;
    }
}
