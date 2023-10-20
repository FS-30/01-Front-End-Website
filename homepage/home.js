document.addEventListener("DOMContentLoaded", function () {
    const submitProofButton = document.getElementById('submitProof');
    submitProofButton.disabled = true;

    const proofUploadInput = document.getElementById('proofUpload');
    const preview = document.getElementById('preview');

    proofUploadInput.addEventListener('change', function () {
        const file = proofUploadInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="img-bank" style="max-width: 100px;">`;
            };

            reader.readAsDataURL(file);
            submitProofButton.disabled = false;
        } else {
            preview.innerHTML = '';
            submitProofButton.disabled = true;
        }
    });

    submitProofButton.addEventListener('click', function () {
        setTimeout(function () {
            window.location.href = 'index.html#success';
        }, 3000);
    });

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const userGreeting = document.getElementById('user-greeting');
        userGreeting.textContent = 'Hello, ' + userData.username;
        userGreeting.style.display = 'block';
        
        const logoutButton = document.getElementById('logout-button');
        logoutButton.style.display = 'block';
    } else {
        const logoutButton = document.getElementById('logout-button');
        logoutButton.style.display = 'none';
    }

    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('userData');

        window.location.href = 'login.html';
    });
});
