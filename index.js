const library = [];

class Book {
    constructor(title, author, pages, description, btn) {
    this.title = title;
    this.author = author;
    this.id = createId(this.title) + createId(this.author);
    this.pages = pages || "Unknown";
    this.description = description || "No description";
    this.btn = btn;
    }

    toggleReadStatus() {
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
    }
}

function addBookToLibrary(title, author, pages, description, status) {
    const statusBtn = document.createElement("button");
    statusBtn.setAttribute("id", `status-${createId(title) + createId(author)}`);
    statusBtn.setAttribute("class", "status-btn")
    pickBtnStatus(status, statusBtn);
    library.push(new Book(title, author, pages, description, statusBtn))
}

const cardContainer = document.querySelector("#cards-container");

function displayBooks(){
   return library.map(book => {
        const card = document.createElement("div");
        card.setAttribute("class", "book-card");
        const title = document.createElement("h3");
        title.setAttribute("class", "title");
        const author = document.createElement("p");
        author.setAttribute("class", "author")
        const pages = document.createElement("p");
        author.setAttribute("class", "no-of-pages");
        const description = document.createElement("p");
        description.setAttribute("class", "description");
        const removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "remove-btn");
        removeBtn.setAttribute("id", book.id)
        const btnContainer = document.createElement("div");
        btnContainer.setAttribute("class", "btn-container")
        removeBtn.textContent = `Delete`;
        title.textContent = `${book.title}`;
        author.textContent = `by ${book.author}`;
        pages.textContent = `${book.pages} pages`;
        description.textContent = `${book.description}`
        const statusBtn = book.btn;
        btnContainer.appendChild(statusBtn);
        btnContainer.appendChild(removeBtn);
        const cardContent = [title, author, pages, description, btnContainer];
        const cardAppend = cardContent.forEach(content =>  {
            card.appendChild(content);
        })
        cardContainer.appendChild(card);
        removeBtn.addEventListener("click", removeBookConfirmation);
        statusBtn.addEventListener("click", toggleReadBtn);
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
const duplicateMsg = document.querySelector("#duplicate-msg");
const confirmationDialog = document.querySelector("#confirmation");
const confirmationMsg = document.querySelector("#confirmation-msg");
const confirmationYes = document.querySelector("#confirmation-yes");
const confirmationCancel = document.querySelector("#confirmation-cancel");
const allInputs = [titleInput, authorInput, pagesInput, descriptionInput];

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    clearInputs();
    dialog.close();
    return;
} )


addBookBtn.addEventListener("click", event => {
    event.preventDefault();
    if(titleInput.validity.valueMissing) {
        titleInput.setCustomValidity("Title of the book is required");
        titleInput.reportValidity();
        return;
    }
    if(authorInput.validity.valueMissing) {
        authorInput.setCustomValidity("Author's name is required")
        authorInput.reportValidity();
        return;
    }
    if(checkDuplicate(createId((titleInput.value + authorInput.value)))) {
        duplicateMsg.textContent = "This book already exist!";
        return;
    }
    dialog.close();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const description = descriptionInput.value;
    const status = document.querySelector("input[name='status']:checked").value;
    addBookToLibrary(title, author, pages, description, status);
    cardContainer.textContent = "";
    displayBooks();
    clearInputs();
})

function clearInputs() {
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = "";
    }
    duplicateMsg.textContent = "";
}

function toggleReadBtn(event) {
    const target = event.target.id;
    library.forEach(book => {
        if(target === book.btn.id) {
            book.toggleReadStatus();
        }
    })
    cardContainer.textContent = "";
    displayBooks();
}

let eventConfirmationId = null;

function removeBookConfirmation(event) {
    library.forEach(book => {
        if(event.target.id === book.id) {
            let title = book.title;
            let author = book.author;
            confirmationMsg.textContent = `Are you sure you want to remove ${title} by ${author} from the library?`
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
        color: "#FFE66D",
    },
    {
        text: "Read",
        color: "#FF6B6B",
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

function checkDuplicate(item) {
    const ids = library.map(book => book.id);
    const duplicate = ids.includes(item);
    return duplicate;
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, `The Hobbit is set within Tolkien's Middle-earth and follows the quest of home-loving Bilbo Baggins, the titular hobbit, to win a share of the treasure guarded by a dragon named Smaug. Bilbo's journey takes him from his light-hearted, rural surroundings into more sinister territory.`, "Read");
addBookToLibrary("Harry Potter and the Chamber of Secrets", "J.K Rowling", 251, `The story follows Harry's second year at Hogwarts School of Witchcraft and Wizardry, where the Heir of Salazar Slytherin opens the Chamber of Secrets, unleashing a monster that petrifies the school's students.` ,"To be Read");
addBookToLibrary("A Tale of Two Cities", "Charles Dickens", 300, `The novel tells the story of the French Doctor Manette, his 18-year-long imprisonment in the Bastille in Paris, and his release to live in London with his daughter Lucie whom he had never met. The story is set against the conditions that led up to the French Revolution and the Reign of Terror.`,"Reading");

displayBooks();