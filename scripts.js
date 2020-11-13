
let demobook = new Book("Three Body Problem", "Cixin Lui", "300", true)
let myLibrary = [demobook]; 

// Book constructor

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = true;
    }

// prototype method additions

Book.prototype.info = function () {
    return `${this.title} by ${this.author}`
}

Book.prototype.readstatus = function () {
        if (this.read) {
            return "has been read";
        }
        else {
            return "not yet read";
        }
}

// add a single instance of a book to the library 

function addBookToLibrary(title, author, pages, read) {
    let newbook = new Book(title, author, pages, read);
    myLibrary.push(newbook);
}


// fetches the submitBook button and runs submitBookForm when it is clicked. 

const submitButton = document.getElementById("submitBook");
submitButton.addEventListener("click", submitBookForm);

function submitBookForm (e) {
    let tf = document.getElementById("title").value;
    let af = document.getElementById("author").value;
    let pf = document.getElementById("pages").value;
    let rf = document.getElementById("readstatus").value;
    addBookToLibrary(tf, af, pf, rf);
    console.table(myLibrary);
}



