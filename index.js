const library = [];

function Book(title, author, pages, description, btn) {
    this.title = title;
    this.id = createId(this.title);
    this.author = author || "Not specified";
    this.pages = pages || "Not specified";
    this.description = description || `${this.title}, by ${this.author} with ${this.pages} pages.`;
    this.btn = btn;
}

Book.prototype.toggleReadStatus = function() {
    this.btn.addEventListener("click", () => {
        switch(this.btn.textContent) {
            case "To be Read":
                switchBtn(this.btn, 1);
            break;
            case "Reading":
                switchBtn(this.btn, 2);
            break;
            case "Read":
                switchBtn(this.btn, 0);
            break;
        }
    })
}

function addBookToLibrary(title, author, pages, status, description) {
    const statusBtn = document.createElement("button");
    statusBtn.setAttribute("id", `status-${createId(title)}`);
    pickBtnStatus(status, statusBtn);
    library.push(new Book(title, author, pages, description, statusBtn))
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
        removeBtn.textContent = "Delete";
        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `No of pages: ${book.pages} pages`;
        const statusBtn = book.btn;
        const cardContent = [title, author, pages, description, statusBtn, removeBtn];
        const cardAppend = cardContent.forEach(content =>  {
            card.appendChild(content);
        })
        cardContainer.appendChild(card);
        removeBtn.addEventListener("click", removeBookConfirmation)
        book.toggleReadStatus();
    })
}

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
    return;
} )


addBookBtn.addEventListener("click", event => {
    if(!titleInput.value) {
        return;
    }
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const description = descriptionInput.value;
    const status = document.querySelector("input[name='status']:checked").value;
    addBookToLibrary(title, author, pages, status, description);
    cardContainer.textContent = "";
    displayBooks();
    console.log(library);
})

let eventConfirmationId = null;

function removeBookConfirmation(event) {
    library.forEach(book => {
        if(event.target.id === book.id) {
            let title = book.title;
            confirmationMsg.textContent = `Are you sure you want to remove ${title} from the library?`
            eventConfirmationId = event.target.id;
        }
    })
    confirmationDialog.showModal();
}

confirmationCancel.addEventListener("click", () => {
    eventConfirmationId = null;
})

confirmationYes.addEventListener("click", function(){
    library.forEach(book => {
        if(eventConfirmationId === book.id) {
            let index = library.indexOf(book);
            library.splice(index, 1)
        }
    })
    console.log(library);
    cardContainer.textContent = "";
    displayBooks();
})

function createId(item) {
    const newItem = item.toLowerCase().
                    split(" ").
                    join("-");
    return newItem;
}

function switchBtn(item, number) {
    const statuses = [{
        text: "To be Read",
        color: "#32CD32",
    },
    {
        text: "Reading",
        color: "#FE691E",
    },
    {
        text: "Read",
        color: "#FF474D",
    }];
    item.textContent = statuses[number].text;
    item.style.backgroundColor = statuses[number].color;
}

function pickBtnStatus(item, button) {
    switch(item) {
        case "To be Read":
            switchBtn(button, 0);
        break;
        case "Reading":
            switchBtn(button, 1);
        break;
        case "Read":
            switchBtn(button, 2);
        break;
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Read");
addBookToLibrary("Harry Potter and the Chamber of Secrets", "J.K Rowling", 251, "To be Read");
addBookToLibrary("A Tale of Two Cities", "Charles Dickens", 300, "Reading");

displayBooks();