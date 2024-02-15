/**
 * @summary Import des fonctions depuis les autres fichiers
 */

import { isLoggedIn, logOut } from './usermode.js';
import { createWorksWrapper, createCategoriesWrapper } from './templates.js';


/**
 * @summary Déclaration des principales variables
 */

const api = "http://localhost:5678/api/"; // URL de l'API
let works = []; // Création d'un tableau vide pour accueillir les données
let categories = [];


/**
 * @summary Gestion de la connexion au site et de l'affichage en fonction
 */

isLoggedIn(); // Modification de l'interface en fonction de l'état de connexion
logOut(); // Suppression du token au clic sur le lien "login / logout"


/**
 * @summary Récupération des "works" depuis l'API du projet
 */

async function fetchWorks() {
  works = await fetch(api + "works").then(works => works.json());
  createWorksWrapper(works); // Premier affichage des projets
}
fetchWorks(); // Appel de la fonction fetchWorks


/**
 * @summary Récupération des "categories" depuis l'API du projet
 */

async function fetchCategories() {
    categories = await fetch(api + "categories").then(categories => categories.json());
    createCategoriesWrapper(categories);
    filterCategories(); // Appel de la fonction qui filtre les projets
}
fetchCategories(); // Appel de la fonction fetchCategories


/**
 * @summary Fonction qui filtre les projets par catégorie
 */

function filterCategories() {
  const filters = document.querySelectorAll(".filters__cta"); // Sélection de tous les boutons

    filters.forEach(filter => { // Ajout d'un EventListener sur chaque bouton

      filter.addEventListener("click", () => { // Au clic sur un filtre :
        // 1. Le contenu de la galerie de projets est effacé
        const worksWrapper = document.querySelector(".gallery");
        worksWrapper.innerHTML = "";
        // 2. La class "active" est ajoutée ou effacée
        filters.forEach(filter => filter.classList.remove("active"));
        filter.classList.add("active");
        // 3. Le titre de la catégorie sélectionnée est stocké
        let titleCategory = filter.innerText;
        // 4. Les projets dont le nom vaut celui de la catégorie sont récupérés
        let filteredWorks = works.filter(works => works.category.name === titleCategory);
        // 5. Si le nom de la catégorie vaut "tous", tous les "works" sont récupérés
        if (titleCategory === "Tous") {
          filteredWorks = works;
        }
        // 6. La galerie affiche les projets filtrés par catégorie
        createWorksWrapper(filteredWorks);
      })
  })
}


/**
 * @summary Ouverture et fermeture de la modale
 */

const modal = document.querySelector(".modal");
const openModal = document.querySelector(".modal--open");
const closeModal = document.querySelector(".modal__nav--close");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

// @https://blog.webdevsimplified.com/
modal.addEventListener("click", (e) => {
  const modalDimensions = modal.getBoundingClientRect();
  if ( // Détection du clic en dehors de la modale
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    modal.close();
  }
});


/**
 * @summary Gestion du passage d'une page de la modale à l'autre
 */

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
  });
  page1Items.forEach(page1Item => { // Le contenu de la page 1 est masqué
    page1Item.style.display = "none";
  });  
});

buttonBack.addEventListener("click", () => {
  modalHeading.textContent = "Galerie photo"; // Le titre est modifié
  buttonBack.style.display = "none";
  page1Items.forEach(page1Item => { // Le contenu de la page 1 est affiché
    page1Item.style.display = "block";
  });
  page2Items.forEach(page2Item => { // Le contenu de la page 2 est masqué
    page2Item.style.display = "none";
  });
});


/**
 * @summary Gestion de l'upload d'une photo
 */

// Variables
const modalForm = document.querySelector(".modal-add__form");
const fileUploaded = document.querySelector(".photo-upload__image");
fileUploaded.value = "default";
const fileInput = document.getElementById("photo-file");
const fileTitle = document.getElementById("photo-title");
const fileCategory = document.querySelector("#photo-category");
const validateButton = document.getElementById("save-project");
const errorMessage = document.querySelector(".modal-add__message");


// Possible de factoriser les 3 EventListeners ?
// Event listeners
fileInput.addEventListener("change", function () {
  fileUploaded.src = window.URL.createObjectURL(this.files[0]); // URL du fichier ajouté
  fileUploaded.value = "Nouvelle photo ajoutée";
  validateProject();
});

fileTitle.addEventListener("change", function () {
  validateProject();
});

let fileCategoryValue = "Sélectionner une catégorie";
fileCategory.addEventListener("change", (event) => {
  fileCategoryValue = event.target.value;
  validateProject();
});


/**
 * @summary Vérification des champs avant l'ajout d'un projet
 */

function validateProject() {
  if (fileUploaded.value == "default" || fileTitle.value == "" || fileCategoryValue == "Sélectionner une catégorie") {
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


/**
 * @summary Construction d'un objet FormData [MDN]
 */

const formData = new FormData(); // Création d'une instance
formData.append("image", fileInput.files[0]); // Ajout des champs
formData.append("title", fileTitle.value);
formData.append("category", fileCategory.value);


/**
 * @summary Validation du formulaire d'envoi de projet
 */

validateButton.addEventListener("click", (event) => {

  // Insérer ici la fonction d'envoi du projet à l'API
  console.log("add"); // Vérification à supprimer en production
  console.log(fileInput.files[0]);
  console.log(fileTitle.value);
  console.log(fileCategory.value); // Vérification des champs à envoyer à l'API

 fetch(api + "works", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),      
    },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      console.log("Travail envoyé avec succès :");
      resetForm();
    }
  })

  // Insérer ici les messages en fonction du type de réponse
  errorMessage.classList.remove("modal-add__message--error");
  errorMessage.classList.add("modal-add__message--ok");
  errorMessage.innerText = "Le nouveau projet a bien été ajouté.";

  // Si l'envoi s'est bien déroulé, on vide le formulaire
  modalForm.reset();
  fileUploaded.src = "/assets/icons/upload-photo.svg";
});


