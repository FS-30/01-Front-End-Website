document.addEventListener("DOMContentLoaded", function () {
    
    const loggedInUsernameElement = document.getElementById('loggedInUsername');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const logoutButton = document.getElementById('logoutButton');
    const subscribeButton = document.getElementById('subscribe');
    const loggedInSection = document.getElementById('loggedInSection');
    const loggedInUsername = localStorage.getItem('loggedInUsername');

    if (loggedInUsername) {
        loggedInUsernameElement.textContent = "Welcome, " + loggedInUsername + "!";
        loggedInSection.style.display = 'block';
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'block';
        subscribeButton.style.pointerEvents = 'auto';
        subscribeButton.style.opacity = 1;
    } else {
        loggedInSection.style.display = 'none';
        loginButton.style.display = 'block';
        registerButton.style.display = 'block';
        logoutButton.style.display = 'none';
        subscribeButton.style.pointerEvents = 'none';
        subscribeButton.style.opacity = 0.5;
    }

    logoutButton.addEventListener('click', function (event) {
        swal({
            title: "Please Login Again",
            icon: "warning",
            button: "OK",
        }).then(() => {
            localStorage.clear();

            window.location.href = '../auth/login.html';
        });

        document.body.setAttribute('aria-hidden', 'true');

        event.preventDefault();
    });
});