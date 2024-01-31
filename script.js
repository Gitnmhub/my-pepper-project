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
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Call updateClock every second
setInterval(updateClock, 1000);

// Call once on initial load
updateClock();
