const startButtom = document.getElementById("start-button");
const settingsButton = document.getElementById("settings-button");
const blur = document.getElementById("blur");
const popup = document.getElementById("popup");
const inputHours = document.getElementById("input-hours");
const inputMinutes = document.getElementById("input-minutes");
const inputSeconds = document.getElementById("input-seconds");
const popupCloser = document.getElementById("popup-closer");
const form = document.getElementById("form");
const timeContainer = document.getElementById("time");

var defaultTimeValue = 3600;
var isWork = false;
var intervalId;

settingsButton.onclick = () => {
    openPopup();
}
popupCloser.onclick = () => {
    closePopup();
}
blur.onclick = () => {
    closePopup();
}

const openPopup = () => {
    blur.className = "blur";
    popup.className = "popup";
    displayPopupTime(defaultTimeValue)
}
const closePopup = () => {
    blur.className = "none";
    popup.className = "none";
    displayMainTime(defaultTimeValue);
}

const displayPopupTime = (time) => {
    let temp = time
    inputHours.value = Math.floor(temp / 3600)
    temp = temp % 3600
    inputMinutes.value =  Math.floor(temp / 60)
    temp = temp % 60;
    inputSeconds.value = temp;

    inputHours.maxValue = 60;
}
const displayMainTime = (time) => {
    let hours = Math.floor(time / 3600)
    let minutes =  Math.floor((time % 3600) / 60)
    let seconds = time % 3600 % 60;
    timeContainer.innerHTML = `${hours > 0 ? `${hours}:` : ""}${minutes > 9 ? `${minutes}` : `0${minutes}`}:${seconds > 9 ? `${seconds}` : `0${seconds}`}`
}
inputHours.onchange = () => {
    if (inputHours.value > 99) {
        inputHours.value = 99;
    } else if (inputHours.value < 0) {
        inputHours.value = 0;
    }
}
inputHours.onclick = () => {
    inputHours.value = "";
}
inputMinutes.onchange = () => {
    if (inputMinutes.value > 59) {
        inputMinutes.value = 59;
    } else if (inputMinutes.value < 0) {
        inputMinutes.value = 0;
    }
}
inputMinutes.onclick = () => {
    inputMinutes.value = "";
}
inputSeconds.onchange = () => {
    if (inputSeconds.value > 59) {
        inputSeconds.value = 59;
    } else if (inputSeconds.value < 0) {
        inputSeconds.value = 0;
    }
}
inputSeconds.onclick = () => {
    inputSeconds.value = "";
}


form.onsubmit = (e) => {
    e.preventDefault();

    defaultTimeValue = inputHours.value * 3600 + inputMinutes.value * 60 + inputSeconds.value * 1;
    localStorage.setItem("time", `${defaultTimeValue}`);

    closePopup();
}

startButtom.onclick = () => {
    startButtom.disabled = true;
    setTimeout(() => {startButtom.disabled = false;}, 100);

    if (isWork) {
        stopTimer()
    } else {
        startTimer();
    }
}

const startTimer = () => {
    isWork = true;
    startButtom.innerText = "Стоп";
    settingsButton.disabled = true;
    var tempTime = defaultTimeValue - 1;
    displayMainTime(tempTime);
    intervalId = setInterval(() => {
        tempTime--;
        displayMainTime(tempTime);
        if (tempTime < 1) {
            setTimeout(() => {
                 alert("Время вышло!");
                 stopTimer();
            }, 100);
        }
    }, 1000)
}
const stopTimer = () => {
    isWork = false;
    startButtom.innerText = "Старт";
    settingsButton.disabled = false;
    clearInterval(intervalId);
    displayMainTime(defaultTimeValue);
}

const init = () => {
    const time = localStorage.getItem("time");
    if (time) {
        defaultTimeValue = time;
        displayMainTime(defaultTimeValue)
    }
}
init();