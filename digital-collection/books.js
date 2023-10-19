document.addEventListener("DOMContentLoaded", function () {
    fetch("books.json")
    .then(response => response.json())
    .then(data => {
        const books = data.books;

        const productSlider = document.querySelector(".product .product-slider");
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        books.forEach((book) => {
            const box = document.createElement("div");
            box.className = "box";
            box.id = book.type;
            box.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                ${book.type === "Audio-Book" ? `<img src="${book.icon}" class="lock-icon" alt="Audio Book" style="width: 50px; height: 50px;">` : ''}
                <h3>${book.title}</h3>
                <div class="price">${book.price}</div>
                <div class="description">
                    <span>${book.description}</span>
                </div>
                <a href="#${book.id}" class="btn">Download</a>
            `;
            wrapper.appendChild(box);

            box.addEventListener("click", function () {
                const bookDetailsUrl = `book_details.html?id=${book.id}`;
                window.location.href = bookDetailsUrl;
            });
        });

        productSlider.appendChild(wrapper);
    })
    .catch(error => console.error("Error loading book data:", error));

    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    const categorySection = document.getElementById("categorySection");
    const toggleButton = document.getElementById("toggleCategorySection");
    let isCategorySectionVisible = false;
    let currentSearchQuery = "";

    categorySection.style.transform = "translateX(-95%)";

    toggleButton.addEventListener("click", function () {
        if (isCategorySectionVisible) {
            categorySection.style.transform = "translateX(-95%)";
        } else {
            categorySection.style.transform = "translateX(0)";
        }

        isCategorySectionVisible = !isCategorySectionVisible;
    });

    searchInput.addEventListener("input", function () {
        const searchQuery = searchInput.value.toLowerCase().trim();

        if (searchQuery !== currentSearchQuery) {
            currentSearchQuery = searchQuery; 

            const bookTitles = document.querySelectorAll(".box h3");

            searchResults.innerHTML = "";

            if (searchQuery === "") {
                searchResults.style.display = "none";
            } else {
                bookTitles.forEach(function (title, index) {
                    const titleText = title.textContent.toLowerCase();
                    if (titleText.includes(searchQuery)) {
                        const resultItem = document.createElement("a");
                        resultItem.href = "#"; 
                        resultItem.textContent = title.textContent;
                        resultItem.addEventListener("click", function (event) {
                            event.preventDefault();
                            scrollToBook(index);
                        });
                        searchResults.appendChild(resultItem);
                    }
                });

                if (searchResults.children.length === 0) {
                    const noResults = document.createElement("div");
                    noResults.textContent = "No results found";
                    searchResults.appendChild(noResults);
                }

                searchResults.style.display = "block";
            }
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target !== searchInput && event.target !== searchResults) {
            searchResults.style.display = "none";
        }
    });

    function scrollToBook(index) {
        const books = document.querySelectorAll(".box");
        if (index >= 0 && index < books.length) {
            books[index].scrollIntoView({ behavior: "smooth" });
        }
    }
});