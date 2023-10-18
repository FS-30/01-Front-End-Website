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
