const library = [];
let counter = 1;

function Book(title, author, pages, status, description,) {
    this.id = `b${counter++}`;
    this.title = title;
    this.author = author || "Not specified";
    this.pages = pages || "Not specified";
    this.status = status;
    this.description = description || `${this.title}, by ${this.author} with ${this.pages} pages.`;
}

Book.prototype.toggleReadStatus = function() {

}

function addBookToLibrary(title, author, pages, description) {
    library.push(new Book(title, author, pages, description))
}

const cardContainer = document.querySelector("#cards-container");

function displayBooks(){
   return library.map(book => {
        const card = document.createElement("div");
        card.setAttribute("class", "book-card");
        const title = document.createElement("h4");
        title.setAttribute("class", "title");
        const author = document.createElement("p");
        author.setAttribute("class", "author")
        const pages = document.createElement("p");
        author.setAttribute("class", "no-of-pages");
        const description = document.createElement("p");
        description.setAttribute("class", "description");
        description.textContent = `Description: ${book.description}`
        const removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "remove-btn");
        removeBtn.setAttribute("id", book.id)
        removeBtn.textContent = "-";
        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `No of pages: ${book.pages} pages`;
        const cardContent = [title, author, pages, description, removeBtn];
        const cardAppend = cardContent.forEach(content =>  {
            card.appendChild(content);
        })
        cardContainer.appendChild(card);
        removeBtn.addEventListener("click", removeBook)
    })
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
addBookToLibrary("Harry Potter and the Chamber of Secrets", "J.K Rowling", 251);
addBookToLibrary("A Tale of Two Cities", "Charles Dickens", 300);


displayBooks();

const newBookBtn = document.querySelector("#new-book");
const dialog = document.querySelector("#add-book-form");
const addBookBtn = document.querySelector("#add-book")
const closeDialogBtn = document.querySelector("#close-dialog")
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#no-of-pages");
const descriptionInput = document.querySelector("#description");
const confirmationDialog = document.querySelector("#confirmation");
const confirmationMsg = document.querySelector("#confirmation-msg");
const confirmationYes = document.querySelector("#confirmation-yes");
const confirmationCancel = document.querySelector("#confirmation-cancel");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeDialogBtn.addEventListener("click", () => {
    dialog.close()
} )

addBookBtn.addEventListener("click", event => {
    if(!titleInput.value) {
        return;
    }
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const description = descriptionInput.value;
    addBookToLibrary(title, author, pages, description);
    cardContainer.textContent = "";
    displayBooks();
    console.log(library);
})


function removeBook(event) {
    library.forEach(book => {
        if(event.target.getAttribute("id") === book.id) {
            let title = book.title;
            confirmationMsg.textContent = `Are you sure you want to remove ${title} from the library?`
        }
    })
    confirmationDialog.showModal();
    confirmationCancel.addEventListener("click", () => {
       event = null;
    })
    confirmationYes.addEventListener("click", function(){
        library.forEach(book => {
            if(event.target.getAttribute("id") === book.id) {
                let index = library.indexOf(book);
                library.splice(index, 1)
            }
        })
        console.log(library);
        cardContainer.textContent = "";
        displayBooks();
    })
}