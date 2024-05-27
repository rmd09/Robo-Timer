const startButtom = document.getElementById("start-button");
const settingsButton = document.getElementById("settings-button");

startButtom.onclick = () => {
    startButtom.disabled = true;
    setTimeout(() => {startButtom.disabled = false;}, 1000);
}
settingsButton.onclick = () => {
    settingsButton.disabled = true;
    setTimeout(() => {settingsButton.disabled = false;}, 1000);
}