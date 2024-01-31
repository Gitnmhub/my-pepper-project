document.getElementById('addUserMedicineBtn').addEventListener('click', addUserMedicineInput);
document.getElementById('setReminderBtn').addEventListener('click', setReminder);

function addUserMedicineInput() {
    const container = document.getElementById('usersMedicinesContainer');
    const userMedicineDiv = document.createElement('div');
    userMedicineDiv.classList.add('user-medicine-input');
    userMedicineDiv.innerHTML = `
        <input type="text" placeholder="User Name">
        <input type="text" placeholder="Medicine Name">
        <input type="time" placeholder="Reminder Time">
    `;
    container.appendChild(userMedicineDiv);
}

function setReminder() {
    const container = document.getElementById('usersMedicinesContainer');
    const remindersList = document.getElementById('remindersList');

    Array.from(container.children).forEach((div, index) => {
        const userName = div.children[0].value;
        const medicineName = div.children[1].value;
        const reminderTime = div.children[2].value;

        if (userName && medicineName && reminderTime) {
            const reminderEntry = document.createElement('div');
            reminderEntry.classList.add('reminder-entry');
            const reminderInfo = document.createElement('span');
            reminderInfo.textContent = `${userName} needs to take medicine ${medicineName} at ${reminderTime}`;
            const countdown = document.createElement('span');
            countdown.textContent = 'Countdown: Calculating...';
            reminderEntry.appendChild(reminderInfo);
            reminderEntry.appendChild(countdown);
            remindersList.appendChild(reminderEntry);

            // 为每个用户设置倒计时
            const reminderDateTime = new Date();
            const [hours, minutes] = reminderTime.split(':').map(Number);
            reminderDateTime.setHours(hours, minutes, 0, 0);
            const interval = setInterval(() => {
                const now = new Date();
                const timeDiff = reminderDateTime - now;
                if (timeDiff > 0) {
                    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
                    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
                    countdown.textContent = `Countdown: ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
                } else {
                    countdown.textContent = 'Time to take medicine!';
                    clearInterval(interval);
                }
            }, 1000);

            // 清空当前用户的输入以便添加下一个用户
            div.children[0].value = '';
            div.children[1].value = '';
            div.children[2].value = '';
        }
    });
}

// Clock Update Function
function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondHand = document.getElementById('secondHand');
    const minuteHand = document.getElementById('minuteHand');
    const hourHand = document.getElementById('hourHand');
    const digitalClock = document.getElementById('digitalClock');

    const secondsFraction = seconds / 60;
    const minutesFraction = (secondsFraction + minutes) / 60;
    const hoursFraction = (minutesFraction + hours % 12) / 12;

    const secondsRotation = secondsFraction * 360;
    const minutesRotation = minutesFraction * 360;
    const hoursRotation = hoursFraction * 360;

    secondHand.style.transform = `rotate(${secondsRotation}deg)`;
    minuteHand.style.transform = `rotate(${minutesRotation}deg)`;
    hourHand.style.transform = `rotate(${hoursRotation}deg)`;

    digitalClock.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateClock, 1000);
updateClock();
