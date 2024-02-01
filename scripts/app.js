/**
 * @summary Import des fonctions depuis les autres fichiers
 */

import { api } from './api/api.js';
import { createWorksWrapper } from './templates/worksWrapper.js';
import { createCategoriesWrapper } from './templates/categoriesWrapper.js';


/**
 * @summary Récupération des "works" depuis l'API du projet
 */

// Récupération des projets eventuellement stockés dans le localStorage
let works = window.localStorage.getItem('works');

async function fetchWorks() {
    // A la première exécution, le localStorage est vide et retourne null
    if (works === null) {
        // Récupération des projets depuis l'API avec la syntaxe then
        const works = await fetch(api + "works").then(works => works.json());
        // Transformation des projets en JSON
        const valueWorks = JSON.stringify(works);
        // Stockage des informations dans le localStorage
        window.localStorage.setItem("works", valueWorks);
    } else {
        // Désérialisation de la chaîne de caractères obtenue pour reconstruire le contenu du JSON en mémoire
        works = JSON.parse(works);
    }
}

// Appel de la fonction fetchWorks
fetchWorks();

// Premier affichage des projets
createWorksWrapper(works);


/**
 * @summary Récupération des "categories" depuis l'API du projet
 */

// Récupération des catégories eventuellement stockés dans le localStorage
let categories = window.localStorage.getItem('categories');

async function fetchCategories() {
    // A la première exécution, le localStorage est vide et retourne null
    if (categories === null) {
        // Récupération des projets depuis une API en ligne
        const categories = await fetch(api + "categories").then(categories => categories.json());
        // Transformation des projets en JSON
        const valueCategories = JSON.stringify(categories);
        // Stockage des informations dans le localStorage
        window.localStorage.setItem("categories", valueCategories);
    } else {
        // Désérialisation de la chaîne de caractères obtenue pour reconstruire le contenu du JSON en mémoire
        categories = JSON.parse(categories);
    }
}

// Appel de la fonction fetchCategories
fetchCategories();

// Premier affichage des catégories
createCategoriesWrapper(categories);


/**
 * @summary Fonction qui filtre les catégories
 */

function filterCategories() {

    // Sélection de tous les boutons
    const filters = document.querySelectorAll(".filter");
    
    // Ajout d'un EventListener sur chaque bouton
    filters.forEach(filter => {

        // Au clic sur un filtre :
        filter.addEventListener("click", () => {
            
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

filterCategories();