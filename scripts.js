

// Main library array with two demo books, one an instance and one a literal

let demobook = new Book("Three Body Problem", "Cixin Lui", "300", true)
let demobook2 = new Book("Lies and the Lying Liars", "Al Frankin", "240", true)
let myLibrary = [demobook, demobook2]; 

// Book constructor

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = true;
    }

// prototype method additions to Book constructor

Book.prototype.info = function () {
    return `${this.title} by ${this.author}`;
}

Book.prototype.readstatustoggle = function () {
    console.log(this.read);
    this.read = !this.read;
}

Book.prototype.removeBookFromLibrary = function () {
    console.log(this.libIndex)
    myLibrary.splice(this.libIndex, this.libIndex + 1);
    console.log("book removed");
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
        console.log(this)
        let listitem = document.createElement("li");
        listitem.setAttribute("class", "bookListItem")
        switch (this[key]) {
            case true:
                listitem.textContent = "Read it!";
                break;
            case false: 
                listitem.textContent = "Need to read!";
                break;
            default:
                listitem.textContent = `${key}: ${this[key]}`;
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

function submitBookForm (e) {
    let tf = document.getElementById("title").value;
    let af = document.getElementById("author").value;
    let pf = document.getElementById("pages").value;
    let rf = document.getElementById("readstatus").value;
    addBookToLibrary(tf, af, pf, rf);
}

// take an individual book object and append it to the library div 

const libraryDisplay = document.getElementById("libDisplay")

function displayBookInLibrary (book, indexInLibrary) {
    book.createCard();
    book.libIndex = indexInLibrary;
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

