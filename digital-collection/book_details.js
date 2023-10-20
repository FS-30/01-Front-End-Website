document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id");

    if (bookId) {
        fetch("books.json")
            .then(response => response.json())
            .then(data => {
                const book = data.books.find(book => book.id === bookId);

                if (book) {
                    document.getElementById("book-title").textContent = book.title;
                    document.getElementById("book-author").textContent = `Author: ${book.author}`;
                    document.getElementById("book-price").textContent = `Price: ${book.price}`;
                    document.getElementById("book.contents").textContent = book.contents;
                    document.getElementById("book-image").src = book.image;

                    const bookType = book.type;
                    const speakButton = document.getElementById("speak-button");

                    if (bookType === "Audio-Book") {
                        const bookDescription = document.getElementById("book.contents");
                        speakButton.style.display = "block";

                        const speechSynthesis = window.speechSynthesis;

                        speakButton.addEventListener("click", function () {
                            if (speechSynthesis.speaking) {
                                speechSynthesis.cancel();
                                speakButton.innerHTML = `<box-icon name='user-voice' color='#ffffff'></box-icon>Read Description`;
                            } else {
                                const descriptionText = bookDescription.textContent;

                                if (descriptionText) {
                                    const speechUtterance = new SpeechSynthesisUtterance(descriptionText);
                                    speechSynthesis.speak(speechUtterance);
                                    speakButton.innerHTML = `<box-icon name='user-voice' color='#ffffff'></box-icon>Stop Reading`;
                                }
                            }
                        });
                    } else {
                        speakButton.style.display = "none";
                    }
                } else {
                    document.getElementById("book-details").textContent = "Book not found.";
                }
            })
            .catch(error => console.error("Error loading book data:", error));
    } else {
        document.getElementById("book-details").textContent = "Invalid book ID.";
    }
});