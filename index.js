const library = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    library.push(new Book(title, author, pages))
}

const cardContainer = document.querySelector("#cards-container");

function displayBooks(){
   return library.map(book => {
        const card = document.createElement("div");
        card.setAttribute("class", "book-card");
        const title = document.createElement("h4");
        title.setAttribute("class"," title");
        const author = document.createElement("p");
        author.setAttribute("class", "author")
        const pages = document.createElement("p");
        author.setAttribute("class", "no-of-pages")
        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `No of pages: ${book.pages}`;
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        cardContainer.appendChild(card);
    })
}


addBookToLibrary("Book", "Abhi", 5);
addBookToLibrary("Book2", "Abhishek", 15);
addBookToLibrary("Book3", "Abhish", 25);
console.log(library)

displayBooks();

const newBookBtn = document.querySelector("#new-book");
const dialog = document.querySelector("#add-book-form");
const addBookBtn = document.querySelector("#add-book")
const closeDialogBtn = document.querySelector("#close-dialog")
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#no-of-pages");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeDialogBtn.addEventListener("click", () => {
    dialog.close()
} )

addBookBtn.addEventListener("click", event => {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    addBookToLibrary(title, author, pages);
    cardContainer.textContent = "";
    displayBooks();
})