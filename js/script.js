// === Variáveis ===
const btnAddNewNote = document.querySelector(".notes-add-new");
const modalAdd = document.querySelector(".modal-container-add");
const btnCloseModalAdd = document.querySelector(".close-add");
const inputAddNewNote = document.querySelector(".input-add-new-note");
const textAreaAddNewNote = document.querySelector(".textarea-add-new-note");
const buttonAddNote = document.querySelector(".button-add-note");
const noteContainer = document.querySelector(".note-container");
const modalEdit = document.querySelector(".modal-container-edit");
const inputEditNote = document.querySelector(".input-edit-note");
const textareaEditNote = document.querySelector(".textarea-edit-note");
const buttonEditNote = document.querySelector(".button-edit-note");
const btnCloseEdit = document.querySelector(".close-edit");

const date = new Date();
const dia = date.getDate();
const mes = date.getMonth() + 1;
const ano = date.getFullYear();

// === Eventos ===
btnAddNewNote.addEventListener("click", openModalAdd);
btnCloseModalAdd.addEventListener("click", closeModalAdd);
buttonAddNote.addEventListener("click", addNote);

// === Funções ===
// Abrir modal de adicionar note
function openModalAdd() {
  modalAdd.classList.add("active");
}
// fechar modal de adicionar note
function closeModalAdd() {
  modalAdd.classList.remove("active");
  inputAddNewNote.value = "";
  textAreaAddNewNote.value = "";
}
// Adicionar note
function addNote() {
  if (!inputAddNewNote.value ) {
    inputAddNewNote.classList.add("error");
    setTimeout(() => {
      inputAddNewNote.classList.remove("error");
    }, 2000);
  } else if (!textAreaAddNewNote.value) {
    textAreaAddNewNote.classList.add("error");
    setTimeout(() => {
      textAreaAddNewNote.classList.remove("error");
    }, 2000);
  } else {
    const note = `
      <div class="note">
              <h3>${inputAddNewNote.value}</h3>
              <p>${textAreaAddNewNote.value}</p>
              <div class="note-date">
                  <p>${dia}/${mes}/${ano}</p>
                  <i class="fa-solid fa-ellipsis"></i>
              </div>
  
              <div class="note-menu">
                  <div class="note-menu-icon edit">
                      <i class="fa-solid fa-pen"></i><p>Edit</p>
                  </div>
                  <div class="note-menu-icon delete">
                      <i class="fa-solid fa-trash"></i><p>Delete</p>
                  </div>
              </div>
      `;

    noteContainer.innerHTML += note;

    closeModalAdd();
  }
}

window.document.addEventListener("click", function (e) {
  // Abrir menu do note
  if (e.target.classList.contains("fa-ellipsis")) {
    e.target.parentElement.nextElementSibling.classList.toggle("active");
    e.target.parentElement.nextElementSibling.classList.add("editing-menu");
  }
  // Apagar note
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
  // Editar note
  if (e.target.classList.contains("edit")) {
    modalEdit.classList.add("active");
    e.target.parentElement.parentElement.classList.add("editing");
    const editing = document.querySelector(".editing");
    const editingMenu = document.querySelector(".editing-menu");
    inputEditNote.value = editing.firstElementChild.textContent;
    textareaEditNote.value = editing.firstElementChild.nextElementSibling.textContent;
    editingMenu.classList.remove("editing-menu");
    editingMenu.classList.remove("active");
  }
  // Salvar editar note
  if (e.target.classList.contains("button-edit-note")) {
    const editing = document.querySelector(".editing");
    editing.firstElementChild.textContent = inputEditNote.value;
    editing.firstElementChild.nextElementSibling.textContent = textareaEditNote.value;
    modalEdit.classList.remove("active");
    editing.classList.remove("editing");
  }
  // Fechar editar note
  if (e.target.classList.contains("close-edit")) {
    const editing = document.querySelector(".editing");
    modalEdit.classList.remove("active");
    editing.classList.remove("editing");
  }
});
