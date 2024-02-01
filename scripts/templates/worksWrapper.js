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