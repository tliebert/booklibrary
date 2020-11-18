

// Main library array with two demo books, one an instance and one a literal

let demobook = new Book("The Three Body Problem", "Liu Cixin", "416", true)
let demobook2 = new Book("Anna Karenina", "Leo Tolstoy", "864", true)
let myLibrary = [demobook, demobook2]; 

// Book constructor

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read;
    }

// prototype method additions to Book constructor

Book.prototype.info = function () {
    return `${this.title} by ${this.author}`;
}

Book.prototype.readstatustoggle = function () {
    this.read = !this.read;
    makeLibrary();
}

Book.prototype.removeBookFromLibrary = function () {
    console.log(this.libIndex);
    myLibrary = myLibrary.filter(book => book.libIndex !== this.libIndex)
    makeLibrary();
}

Book.prototype.createCard = function() {
    let bookcard = document.createElement("div");
    bookcard.setAttribute("class", "bookcard");

    let bookinfo = document.createElement("ul");
    bookcard.classList.add("singleBookCard");

    let readbutton = document.createElement("button")
    readbutton.textContent = "Read it?"
    readbutton.addEventListener("click", this.readstatustoggle.bind(this));

    let deletebutton = document.createElement("button");
    deletebutton.textContent = "Remove book from library";
    deletebutton.addEventListener("click", this.removeBookFromLibrary.bind(this));

    for (let key of Object.keys(this)) {
        let listitem = document.createElement("li");
        listitem.setAttribute("class", "bookListItem")
        switch (key) {
            case "read": if (this[key]) {
                listitem.textContent = "Read it!";
            }          else {
                listitem.textContent = "Need to read!";
            }
            break; 
            case "title":
            case "author":
            case "pages":
                listitem.textContent = `${key}: ${this[key]}`;
                break;
            default: break;
        }
        bookinfo.appendChild(listitem);
    }
    bookcard.appendChild(bookinfo);
    bookcard.appendChild(readbutton);
    bookcard.appendChild(deletebutton);
    libraryDisplay.appendChild(bookcard);
}

// add a single instance of a book to the library 

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}


// fetches the submitBook button and runs submitBookForm when it is clicked. submitBookForm 
// gathers values currently in the various input fields and passes them as arguments to 
// the addBookToLibrary function.  

const submitButton = document.getElementById("submitBook");
submitButton.addEventListener("click", submitBookForm);

//Add book button that brings up the submit form 

const addBookButton = document.getElementById("showBookForm");
addBookButton.addEventListener("click", toggleForm);

const submitForm = document.getElementById("submitform");

function toggleForm() {
    submitForm.classList.toggle("showForm")
}

// take the current inputs run them through the addBookToLibrary

function submitBookForm () {
    let tf = document.getElementById("title").value;
    let af = document.getElementById("author").value;
    let pf = document.getElementById("pages").value;
    let rf = document.getElementById("readstatus").checked ? true : false;
    addBookToLibrary(tf, af, pf, rf);
    submitForm.classList.toggle("showForm");
    resetForm();
    makeLibrary();
}

function resetForm () {
    let allInputs = document.querySelectorAll("input");
    allInputs.forEach(input => input.value = "");
}

// take an individual book object and append it to the library div 

const libraryDisplay = document.getElementById("libDisplay")

function displayBookInLibrary (book, indexInLibrary) {
    book.libIndex = indexInLibrary;
    book.createCard();
    }

// iterate over the library array and add a book to the library div for each

function makeLibrary() {
    let allbookcards = document.querySelectorAll(".bookcard");
    allbookcards.forEach(node => {
        libraryDisplay.removeChild(node)
    })
    myLibrary.forEach(displayBookInLibrary);
}

makeLibrary();

