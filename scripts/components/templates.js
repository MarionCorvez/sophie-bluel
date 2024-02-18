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
    modalFigure.classList.add("modal-delete__figure");
    modalFigure.dataset.id = work.id;
    const modalImage = document.createElement("img");
    modalImage.src = work.imageUrl;
    modalImage.setAttribute("alt", work.title);
    modalImage.classList.add("modal-delete__image");
    const modalTrashWrapper = document.createElement("span");
    modalTrashWrapper.classList.add("modal-delete__icon");
    modalTrashWrapper.id = work.id;
    modalTrashWrapper.setAttribute("alt", "Icône pour supprimer un projet");
    const modalTrashIcon = document.createElement("img");
    modalTrashIcon.src = "assets/icons/trash.svg";
    modalTrashIcon.classList.add("modal-delete__trash");
    modalSection.appendChild(modalFigure);
    modalFigure.appendChild(modalImage);
    modalFigure.appendChild(modalTrashWrapper);
    modalTrashWrapper.appendChild(modalTrashIcon);
    
    function deleteWork() {
      const id = modalTrashWrapper.id;
      const modalDelete = document.querySelector(".modal-delete");
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("modal-add__message");
      modalDelete.appendChild(errorMessage);
      fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        }
      })
      .then(response => {
        if (response.ok) {
          if (modalFigure.dataset.id = id) {
            modalFigure.remove();
          }
          errorMessage.style.display = "block";
          errorMessage.classList.add("modal-add__message--ok");
          errorMessage.innerText = "Le projet a bien été supprimé.";
          fetchWorks();
        } else {
          errorMessage.style.display = "block";
          errorMessage.classList.remove("modal-add__message--ok");
          errorMessage.classList.add("modal-add__message--error");
          errorMessage.innerText = "Une erreur s'est produite. Merci d'essayer à nouveau ou de contacter l'administration du site.";
        }
      })
    }

    modalTrashWrapper.addEventListener("click", () => {
      const result = confirm("Souhaitez-vous supprimer ce projet ?");
      if (result == true) {
        deleteWork();
      }
    })

  });
} 

async function fetchWorks() {
  let works = [];
  works = await fetch(`http://localhost:5678/api/works/`).then(works => works.json());
  createWorksWrapper(works); // Premier affichage des projets
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