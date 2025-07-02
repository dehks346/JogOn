(function () {
    'use strict';

    // Set the date we're counting down to
    let countDownDate;
    try {
        countDownDate = new Date("2025-09-14T11:00:00").getTime();
        if (isNaN(countDownDate)) {
            throw new Error("Invalid date format");
        }
    } catch (error) {
        displayError("Error: Invalid countdown date");
        return;
    }

    // Get DOM elements
    const countdownElement = document.getElementById("countdown");
    if (!countdownElement) {
        console.error("Countdown element not found");
        return;
    }

    // Update the countdown every 1 second
    const interval = setInterval(function () {
        try {
            // Get current time
            const now = new Date().getTime();

            // Calculate the distance
            const distance = countDownDate - now;

            // If countdown is finished
            if (distance < 0) {
                clearInterval(interval);
                countdownElement.textContent = "EXPIRED";
                countdownElement.classList.add("expired");
                return;
            }

            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Format and display the result
            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until Jog On`;

        } catch (error) {
            clearInterval(interval);
            displayError("Error in countdown calculation");
            console.error(error);
        }
    }, 1000);

    // Error display function
    function displayError(message) {
        countdownElement.textContent = message;
        countdownElement.classList.add("error");
    }

    // Handle page visibility to optimize performance
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            clearInterval(interval);
        } else {
            // Restart interval when page becomes visible
            location.reload();
        }
    });
})();