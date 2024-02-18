/**
 * @summary Import des fonctions depuis les autres fichiers
 */

import { isLoggedIn, logOut } from './components/usermode.js';
import { createWorksWrapper, createCategoriesWrapper } from './components/templates.js';
import { 
  manageModal, navigateModal, modalForm, fileInput, fileTitle, 
  fileCategory, validateButton, errorMessage, resetPhoto } 
  from './components/modal.js';


/**
 * @summary Déclaration des principales variables
 */

const api = "http://localhost:5678/api/"; // URL de l'API
let works = []; // Création d'un tableau vide pour accueillir les données
let categories = [];


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
  createCategoriesWrapper(categories); // Création des catégories
  filterCategories(); // Appel de la fonction qui filtre les projets par catégorie
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


manageModal(); // Gestion de l'ouverture et de la fermeture de la modale
navigateModal(); // Gestion de la navigation dans la modale


/**
 * @summary Envoi d'un nouveau projet
 */

function sendNewWork() {

  validateButton.addEventListener("click", (event) => {

    const formData = new FormData(); // Construction d'un objet FormData [MDN]
    formData.append("image", fileInput.files[0]);
    formData.append("title", fileTitle.value);
    formData.append("category", fileCategory.value);

    fetch(api + "works", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token"),      
      },
      body: formData
    })
    .then(response => {
      if (response.ok) {
        errorMessage.classList.remove("modal-add__message--error");
        errorMessage.classList.add("modal-add__message--ok");
        errorMessage.innerText = "Le nouveau projet a bien été ajouté.";
        fetchWorks();
      } else {
        errorMessage.classList.remove("modal-add__message--ok");
        errorMessage.classList.add("modal-add__message--error");
        errorMessage.innerText = "Une erreur s'est produite. Merci d'essayer à nouveau ou de contacter l'administration du site.";
      }
    })
    resetPhoto(); // Le placeholder d'upload est réaffiché
    modalForm.reset(); // Le formulaire est vidé
  })
}

sendNewWork();



/**
 * @summary Suppression d'un projet de la galerie
 */

/* const trashIcons = document.querySelectorAll("modal-delete__trash");
trashIcons.forEach(trashIcon =>  {
  trashIcon.addEventListener("click", () => {
    const id = trashIcon.id;
    console.log(trashIcon.id);
    deleteWork();
  })
})

function deleteWork() {
  
  fetch(api + `works/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
    }
  })
  .then(response => {
    if (response.ok) {
      console.log("ok");
      const deletedFigure = document.querySelector(('[data-id="id"]'));
      console.log(deletedFigure);
      const deletedItem = document.getElementById(id);
      if (deletedItem) {
        deletedItem.parentNode.removeChild(deletedItem); // Suppression de l'élément parent "figure"
      }
      errorMessage.style.display = "block";
      errorMessage.classList.add("modal-add__message--ok");
      errorMessage.innerText = "Le projet a bien été supprimé.";
      fetchWorks();
    } else {
    console.log("nok");
      errorMessage.classList.remove("modal-add__message--ok");
      errorMessage.classList.add("modal-add__message--error");
      errorMessage.innerText = "Une erreur s'est produite. Merci d'essayer à nouveau ou de contacter l'administration du site.";
    }
  })
}

deleteWork(); */




/**
 * Delete works from the API
 */
/* function deleteWorksData(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/Json",
      authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  }).then((response) => {
    if (response.status === 200) {
      // To delete the element from the dom
      const deletedElement = document.getElementById(id);
      if (deletedElement) {
        deletedElement.parentNode.removeChild(deletedElement);
      }

      // Updating the modal
      displayModalDeleteWorks();
      displayWorksModal();
      // Update the main gallery
      displayWorks();
    }
  });
} */
