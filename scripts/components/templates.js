/**
 * @summary Fonction qui génère tous les projets
 */

export function createWorksWrapper(works) {

  const portfolioSection = document.querySelector(".gallery");
  portfolioSection.innerHTML = ""; // La galerie est vidée avant sa construction
  const modalSection = document.querySelector(".modal-delete__gallery");
  modalSection.innerHTML = ""; // La modale est vidée avant sa construction

  works.map((work) => {

    // Portfolio section
    const portfolioFigure = document.createElement("figure");
    portfolioFigure.id = work.categoryId;
    const portfolioImage = document.createElement("img");
    portfolioImage.src = work.imageUrl;
    portfolioImage.setAttribute("alt", work.title);
    const portfolioFigcaption = document.createElement("figcaption");
    portfolioFigcaption.innerText = work.title;
    portfolioSection.appendChild(portfolioFigure);
    portfolioFigure.appendChild(portfolioImage);
    portfolioFigure.appendChild(portfolioFigcaption);

    // Modal section
    const modalFigure = document.createElement("figure");
    const modalImage = document.createElement("img");
    modalImage.src = work.imageUrl;
    modalImage.setAttribute("alt", work.title);
    modalImage.classList.add("modal-delete__image");
    const modalTrashWrapper = document.createElement("span");
    modalTrashWrapper.classList.add("modal-delete__icon");
    const modalTrashIcon = document.createElement("img");
    modalTrashIcon.src = "assets/icons/trash.svg";
    modalTrashIcon.classList.add("modal-delete__trash");
    modalTrashIcon.id = work.categoryId;
    modalTrashIcon.setAttribute("alt", "Icône pour supprimer un projet");
    modalSection.appendChild(modalFigure);
    modalFigure.appendChild(modalImage);
    modalFigure.appendChild(modalTrashWrapper);
    modalTrashWrapper.appendChild(modalTrashIcon);
  });
} 


/**
 * @summary Fonction qui génère toutes les catégories
 */

export function createCategoriesWrapper(categories) {

  // Filters section
  const filtersCategories = document.querySelector(".filters");
  const defaultCategory = document.createElement("button");
  defaultCategory.innerText = "Tous";
  defaultCategory.classList.add("cta", "filters__cta", "active");
  filtersCategories.appendChild(defaultCategory);

  // Modal section
  const modalCategories = document.getElementById("photo-category");

  for (let i = 0; i < categories.length; i++) {
    // Filters section
    const category = categories[i];
    const titleCategory = document.createElement("button");
    titleCategory.classList.add("cta", "filters__cta");
    titleCategory.innerText = category.name;
    titleCategory.id = category.name;
    filtersCategories.appendChild(titleCategory);

    // Modal section
    const modalCategory = document.createElement("option");
    modalCategory.classList.add("category__item");
    modalCategory.value = category.id;
    modalCategory.innerText = category.name;
    modalCategory.id = category.id;
    modalCategories.appendChild(modalCategory);
  }
}