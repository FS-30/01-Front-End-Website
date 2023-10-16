document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const registerButton = document.querySelector(".submit-button");

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

    registerButton.addEventListener("click", function () {
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
    
        Toast.fire({
            icon: 'success',
            title: 'Registration Successful'
        });
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