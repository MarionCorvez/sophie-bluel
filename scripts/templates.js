/**
 * @summary Fonction qui génère tous les projets
 */

export function createWorksWrapper(works) {

  for (let i = 0; i < works.length; i++) {
      // Récupération de chaque item du tableau works
      const article = works[i];
      // Récupération de l'élément du DOM qui accueillera les projets
      const sectionWorks = document.querySelector(".gallery");
      // Création d'une balise dédiée à un projet
      const containerElement = document.createElement("figure");
      // Création d'un ID qui reprend l'ID de la catégorie
      containerElement.id = article.categoryId;
      // Création de l'élément img 
      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
      imageElement.setAttribute("alt", article.title);
      // Création de l'élément figcaption
      const titleElement = document.createElement("figcaption");
      titleElement.innerText = article.title;
      // On rattache la balise figure à la section des projets
      sectionWorks.appendChild(containerElement);
      // On rattache l'image à containerElement (la balise figure)
      containerElement.appendChild(imageElement);
      // Association du titre du projet à containerElement
      containerElement.appendChild(titleElement);
   }
}


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