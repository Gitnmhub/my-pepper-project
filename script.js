document.getElementById('setReminderBtn').addEventListener('click', setReminder);

function setReminder() {
    const user = document.getElementById('userSelect').value;
    const medicine = document.getElementById('medicineSelect').value;
    const time = document.getElementById('timeInput').value;
    const reminderDisplay = document.getElementById('reminderDisplay');

    if (!time) {
        reminderDisplay.textContent = '请设置一个有效的提醒时间！';
        return;
    }

    // 将用户选择的时间转换为今天的某个时刻
    const reminderTime = new Date();
    const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    reminderTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    let timeDiff = reminderTime.getTime() - now.getTime();

    if (timeDiff < 0) {
        reminderDisplay.textContent = '提醒时间已经过去，请选择一个未来的时间。';
        return;
    }

    reminderDisplay.textContent = `${user}，你将在 ${time} 被提醒吃${medicine}药。`;

    // 开始倒计时
    const countdown = setInterval(() => {
        timeDiff -= 1000; // 每次减少1000毫秒
        const totalSeconds = Math.floor(timeDiff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // 更新倒计时显示
        reminderDisplay.textContent = `提醒：${user}需在 ${hours}小时${minutes}分钟${seconds}秒 后吃${medicine}药`;

        if (timeDiff <= 0) {
            clearInterval(countdown);
            reminderDisplay.textContent = `${user}，是时候吃${medicine}药了！`;
        }
    }, 1000);
}
