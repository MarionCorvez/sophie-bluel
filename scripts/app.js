/**
 * @summary Import des fonctions depuis les autres fichiers
 */

import { createWorksWrapper, createCategoriesWrapper } from './templates.js';


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
    const filters = document.querySelectorAll(".filter"); // Sélection de tous les boutons

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