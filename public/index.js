const addBookInput = document.querySelector(".addbookInput");
const listOfBooks = document.querySelector(".listOfBooks");
const addBtn = document.querySelector(".addBtn");
const deleteBtns = document.querySelectorAll(".deleteBtn");
const searchForm = document.forms["searchBook"];
const addForm = document.forms["add-book"];

const handleAddBook = async (e) => {
  e.preventDefault();
  let titleOfTheBook = e.target.parentElement.querySelector("input");
  if (titleOfTheBook.value) {
    const bookToAdd = { title: titleOfTheBook.value };
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookToAdd),
    };
    const data = await fetch("/books", params);
    const bookAdded = await data.json();
    location.reload();
    titleOfTheBook.value = "";
  }
};

const handleDelete = async (e) => {
  e.preventDefault();
  const elementToDelete = e.target.previousSibling.textContent
    .trim()
    .replace(/[, ']+/g, "-");

  const titleOfTheBookToDelete = { title: elementToDelete };
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(titleOfTheBookToDelete),
  };

  console.log("params", params);
  const deletedRequest = await fetch(`/books/${elementToDelete}`, params);
  const deleteBook = await deletedRequest.json();
  console.log("deleteBook", deleteBook);
  location.reload();
};

// const handleSearch = (e) => {
//   e.preventDefault();
//   const term = e.target.value.toLowerCase();
//   const books = listOfBooks.querySelectorAll(".bookItem");
//   books.forEach((book) => {
//     book.textContent.toLowerCase().includes(term)
//       ? book.classList.remove("hide")
//       : book.classList.add("hide");
//   });
// };

addBtn.addEventListener("click", handleAddBook);
deleteBtns.forEach((deleteBtn) =>
  deleteBtn.addEventListener("click", handleDelete)
);
//   searchForm.addEventListener("keyup", handleSearch);
// }
