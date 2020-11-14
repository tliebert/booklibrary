
let demobook = new Book("Three Body Problem", "Cixin Lui", "300", true)
let demobook2 =
            {
                title: "Lies and the Lying Liars", 
                author: "Al Frankin",
                pages: "240",
                read: true
            }
let myLibrary = [demobook, demobook2]; 

// Book constructor

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = true;
    }

// prototype method additions

Book.prototype.info = function () {
    return `${this.title} by ${this.author}`;
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
    console.table(myLibrary);
}

// take an individual book object and append it to the library div 

const libraryDisplay = document.getElementById("libDisplay")

function displayBookInLibrary (object) {
    console.log(object)
    let bookcard = document.createElement("div");
    let bookinfo = document.createElement("ul");
    bookcard.classList.add("singleBookCard");
    for (let key in object) {
        let listitem = document.createElement("li");
        switch (object[key]) {
            case true:
                listitem.textContent = "Read it!";
                break;
            case false: 
                listitem.textContent = "Need to read!";
                break;
            default:
                listitem.textContent = `${key}: ${object[key]}`;
            }
        bookinfo.appendChild(listitem);
        }
    bookcard.appendChild(bookinfo)
    libraryDisplay.appendChild(bookcard);
    }

// iterate over each book object in the library array and display on page 

myLibrary.forEach(displayBookInLibrary);


