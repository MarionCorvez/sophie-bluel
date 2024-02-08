/**
 * @summary Import des fonctions depuis les autres fichiers
 */

import { createWorksWrapper, createCategoriesWrapper } from './templates.js';
import { isLoggedIn, logOut } from './usermode.js';

/**
 * @summary Déclaration des principales variables
 */

const api = "http://localhost:5678/api/"; // URL de l'API
let works = []; // Création d'un tableau vide pour accueillir les données
let categories = [];


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



// Modification de l'interface en fonction de l'état de connexion
isLoggedIn();

// Fonction qui supprime le token au clic sur le lien "login / logout"
logOut();


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

// !! Ne fonctionne pas !!
// Ferme la modale au clic
// Test sans l'attribut disabled
const saveProject = document.getElementById("save-project"); // Récupération du CTA
saveProject.addEventListener("submit", (event) => {
  event.preventDefault(); // On empêche le comportement par défaut
});