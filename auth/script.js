document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const registerButton = document.querySelector(".submit-button");
    const loginButton = document.querySelector(".login-button");

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
            icon: 'colored-toast',
            title: 'colored-toast',
            htmlContainer: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });

    const mockApiUrl = "https://652d7923f9afa8ef4b277f1f.mockapi.io/eduliterate/users";

    async function registerUser(username, email, password) {
        const response = await fetch(mockApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to register user.');
        }
    }

    registerButton.addEventListener("click", async function () {
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!isValidUsername(username)) {
            Toast.fire({
                icon: 'error',
                title: 'Username must be at least 4 characters long.'
            });
            return false;
        }

        if (!isValidEmail(email)) {
            Toast.fire({
                icon: 'error',
                title: 'Please enter a valid email address.'
            });
            return false;
        }

        if (!isValidPassword(password)) {
            Toast.fire({
                icon: 'error',
                title: 'Password must be at least 6 characters long.'
            });
            return false;
        }

        if (!isValidConfirmPassword(password, confirmPassword)) {
            Toast.fire({
                icon: 'error',
                title: 'Passwords do not match.'
            });
            return false;
        }

        try {
            await registerUser(username, email, password);
            saveUserDataToLocalStorage(username, email, password);
            Toast.fire({
                icon: 'success',
                title: 'Registration Successful'
            });

            setTimeout(function () {
                window.location.href = 'login.html';
            }, 1500);

        } catch (error) {
            console.error('Registration failed:', error.message);
            Toast.fire({
                icon: 'error',
                title: 'Registration failed. Please try again.'
            });
        }
    });

    function saveUserDataToLocalStorage(username, email, password) {
        const userData = {
            username,
            email,
            password
        };

        localStorage.setItem('userData', JSON.stringify(userData));
    }

    loginButton.addEventListener("click", function () {
        const username = usernameInput.value;
        const password = passwordInput.value;

        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.username === username && userData.password === password) {
            Toast.fire({
                icon: 'success',
                title: 'Login Successful',
                timer: 1500, 
                showConfirmButton: false 
            }).then(() => {
                window.location.href = '../homepage/index.html';
            });
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Invalid Credentials. Please Try Again.'
            });
        }
    });

    function isValidUsername(username) {
        return username.length >= 4;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email.match(emailRegex);
    }

    function isValidPassword(password) {
        return password.length >= 6;
    }

    function isValidConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }
});