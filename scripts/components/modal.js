/**
 * @summary Ouverture et fermeture de la modale
 */

export function manageModal() {

  const modal = document.querySelector(".modal");
  const openModal = document.querySelector(".modal--open");
  const closeModal = document.querySelector(".modal__nav--close");

  openModal.addEventListener("click", () => {
    modal.showModal();
  })

  closeModal.addEventListener("click", () => {
    modal.close();
  })

  // @Adam Argyle : l'action "close" a lieu en fonction de la target du clic 
  const lightDismiss = ({target:dialog}) => {
    if (dialog.nodeName === 'DIALOG')
      dialog.close('dismiss')
  }
  modal.addEventListener("click", lightDismiss);
}


/**
 * @summary Gestion du passage d'une page de la modale à l'autre
 */

export function navigateModal() {

  let page1Items = document.querySelectorAll(".modal__page--1"); 
  let page2Items = document.querySelectorAll(".modal__page--2");
  let modalHeading = document.querySelector(".modal__heading");
  const buttonBack = document.querySelector(".modal__nav--back");
  const buttonAddProject = document.getElementById("add-project");

  buttonAddProject.addEventListener("click", () => {
    buttonBack.style.display = "block";
    modalHeading.textContent = "Ajout photo"; // Le titre est modifié
    page2Items.forEach(page2Item => { // Le contenu de la page 2 est affiché
      page2Item.style.display = "block";
    })
    page1Items.forEach(page1Item => { // Le contenu de la page 1 est masqué
      page1Item.style.display = "none";
    })  
  })

  buttonBack.addEventListener("click", () => {
    modalHeading.textContent = "Galerie photo"; // Le titre est modifié
    buttonBack.style.display = "none";
    page1Items.forEach(page1Item => { // Le contenu de la page 1 est affiché
      page1Item.style.display = "block";
    })
    page2Items.forEach(page2Item => { // Le contenu de la page 2 est masqué
      page2Item.style.display = "none";
    })
  })

}


/**
 * @summary Gestion de l'upload d'une photo
 */

// Variables
export const modalForm = document.querySelector(".modal-add__form");
export const labelWrapper = document.querySelector(".photo-label");
export const fileInput = document.getElementById("photo-file");
export const fileTitle = document.getElementById("photo-title");
export const fileCategory = document.querySelector("#photo-category");
export const validateButton = document.getElementById("save-project");
export const errorMessage = document.querySelector(".modal-add__message");

// Event listeners
fileInput.addEventListener("change", function () {
  const fileUploaded = document.createElement("img");
  fileUploaded.classList.add("photo-label--uploaded");
  labelWrapper.appendChild(fileUploaded);
  // Comment limiter l'affichage et la création d'URL à un seul fichier ?
  fileUploaded.src = window.URL.createObjectURL(this.files[0]); // URL du fichier ajouté
  const filePlaceholder = document.querySelector(".photo-upload__placeholder");
  const fileButton = document.querySelector(".photo-label__button");
  const fileDetails = document.querySelector(".photo-upload__details");
  filePlaceholder.style.display = "none";
  fileButton.style.display = "none";
  fileDetails.style.display = "none";
  validateProject();
})

fileTitle.addEventListener("change", function () {
  validateProject();
})

let fileCategoryValue = "Sélectionner une catégorie";
fileCategory.addEventListener("change", (event) => {
  fileCategoryValue = event.target.value;
  validateProject();
})


/**
 * @summary Vérification des champs avant l'ajout d'un projet
 */

export function validateProject() {
  if (fileInput.files.length == 0 || fileTitle.value == "" || fileCategoryValue == "Sélectionner une catégorie") {
    errorMessage.style.display = "block";
    errorMessage.innerText = "Merci de remplir tous les champs.";
    errorMessage.classList.add("modal-add__message--error");
    validateButton.disabled = true;
  } else {
    errorMessage.innerText = "";
    validateButton.removeAttribute("disabled");
    errorMessage.classList.remove("modal-add__message--error");
    errorMessage.classList.add("modal-add__message--ok");
    errorMessage.innerText = "Tous les champs ont bien été remplis.";
  }
}