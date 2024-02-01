/**
 * @summary Fonction qui génère toutes les catégories
 */

export function createCategoriesWrapper(categories) {

  // Récupération de l'élément du DOM qui accueillera les catégories
  const sectionCategories = document.querySelector(".filters");
  // Création d'un bouton "Tous"
  const defaultCategory = document.createElement("button");
  defaultCategory.innerText = "Tous";
  // Assignation d'une class "filter"
  defaultCategory.classList.add("filter", "active");
  sectionCategories.appendChild(defaultCategory);

  for (let i = 0; i < categories.length; i++) {
    // Récupération de chaque item du tableau categories
    const category = categories[i];
    // Création d'une balise dédiée à une catégorie
    const titleCategory = document.createElement("button");
    // Assignation d'une class "filter"
    titleCategory.classList.add("filter");
    titleCategory.innerText = category.name;
    titleCategory.id = category.name;
    // Association de la balise button à la liste des catégories
    sectionCategories.appendChild(titleCategory);
  }

}