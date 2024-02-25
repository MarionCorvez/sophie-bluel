/**
 * $Déclaration des principales variables
 * $Gestion des projets et de leur suppression
 * $Gestion des catégories
 * $Gestion des messages de confirmation
 * $Gestion de l'ajout d'un nouveau projet
 * $Gestion du formulaire de contact
 */


/**
 * @summary $Déclaration des principales variables
 */

const api = "http://localhost:5678/api/"; // URL de l'API
let works = []; // Création d'un tableau vide pour accueillir les projets
let categories = []; // Création d'un tableau vide pour accueillir les catégories


/**
 * @summary $Gestion des projets et de leur suppression
 */

// Récupération des "works" depuis l'API du projet
export async function fetchWorks() {
  works = await fetch(api + "works").then(works => works.json());
  createWorksWrapper(works); // Premier affichage des projets
}

// Création des projets
function createWorksWrapper(works) {
  const portfolioSection = document.querySelector(".gallery");
  portfolioSection.innerHTML = ""; // La galerie est vidée avant sa construction
  const modalSection = document.querySelector(".modal-delete__gallery");
  modalSection.innerHTML = ""; // La modale est vidée avant sa construction

  works.map((work) => {

    // Portfolio section
    const portfolioFigure = document.createElement("figure");
    portfolioFigure.id = work.categoryId;
    portfolioFigure.dataset.id = work.id;
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
    modalFigure.id = work.id;
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
    
    // Suppression des projets
    function deleteWork() {
      const id = modalTrashWrapper.id;
      const modalDelete = document.querySelector(".modal-delete");
      modalDelete.appendChild(message);
      fetch(api + "works/" + id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        }
      })
      .then(response => {
        if (response.ok) {
          if (modalFigure.id = id) {
            console.log(modalFigure.id);
            const portfolioFigure = document.querySelector(`figure[data-id="${id}"]`);
            modalFigure.remove();
            portfolioFigure.remove();
          }
          messageOk("Le projet a bien été supprimé.");
        } else {
          messageError("Une erreur s'est produite. Merci d'essayer à nouveau ou de contacter l'administration du site.");
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


/**
 * @summary $Gestion des catégories
 */

// Récupération des "categories" depuis l'API du projet
export async function fetchCategories() {
  categories = await fetch(api + "categories").then(categories => categories.json());
  createCategoriesWrapper(categories); // Création des catégories
  filterCategories(); // Appel de la fonction qui filtre les projets par catégorie
}

// Création des catégories
function createCategoriesWrapper(categories) {
  const filtersCategories = document.querySelector(".filters");
  const defaultCategory = document.createElement("button");
  defaultCategory.innerText = "Tous";
  defaultCategory.classList.add("cta", "filters__cta", "active");
  filtersCategories.appendChild(defaultCategory);
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

// Filtration des projets par catégorie
function filterCategories() {
  const filters = document.querySelectorAll(".filters__cta"); // Sélection de tous les boutons

    filters.forEach(filter => { // Ajout d'un EventListener sur chaque bouton
      filter.addEventListener("click", () => {
        const worksWrapper = document.querySelector(".gallery");
        worksWrapper.innerHTML = "";
        filters.forEach(filter => filter.classList.remove("active"));
        filter.classList.add("active");
        let titleCategory = filter.innerText;
        let filteredWorks = works.filter(works => works.category.name === titleCategory);
        if (titleCategory === "Tous") {
          filteredWorks = works;
        }
        createWorksWrapper(filteredWorks);
      })
  })
}


/**
 * @summary $Gestion des messages de confirmation
 */

const message = document.createElement("p");

function messageOk(text) {
  message.classList.remove("message--error");
  message.classList.add("message--ok");
  message.innerText = text;
}

function messageError(text) {
  message.classList.remove("message--ok");
  message.classList.add("message--error");
  message.innerText = text;
}


/**
 * @summary $Gestion de l'ajout d'un nouveau projet
 */

// Variables
const modalForm = document.querySelector(".modal-add__form");
modalForm.appendChild(message);
const labelWrapper = document.querySelector(".photo-label");
const fileInput = document.getElementById("photo-file");
const fileTitle = document.getElementById("photo-title");
const fileCategory = document.querySelector("#photo-category");
const validateButton = document.getElementById("save-project");
const filePlaceholder = document.querySelector(".photo-upload__placeholder");
const fileButton = document.querySelector(".photo-label__button");
const fileDetails = document.querySelector(".photo-upload__details");

// Event listeners
fileInput.addEventListener("change", function () {
  if (!document.querySelector(".photo-label--uploaded")) {
    const fileUploaded = document.createElement("img");
    fileUploaded.classList.add("photo-label--uploaded");
    labelWrapper.appendChild(fileUploaded);
    fileUploaded.src = window.URL.createObjectURL(this.files[0]); // URL du fichier ajouté
    console.log("IMG is created");
  } else {
    const fileUploaded = document.querySelector(".photo-label--uploaded");
    fileUploaded.src = window.URL.createObjectURL(this.files[0]); // URL du fichier ajouté
    console.log("IMG already existed");
  }
  filePlaceholder.style.display = "none";
  fileButton.style.display = "none";
  fileDetails.style.display = "none";
  validateProject();
})

fileTitle.addEventListener("keyup", validateProject);

let fileCategoryValue = "Sélectionner une catégorie";
fileCategory.addEventListener("change", (event) => {
  fileCategoryValue = event.target.value;
  validateProject();
})

// Vérification des champs avant l'ajout d'un projet
function validateProject() {
  const file = fileInput.files[0];
  const maxFileSize = 4194304;
  if (
    fileTitle.value !== "" 
    && fileCategoryValue !== "Sélectionner une catégorie" 
    && fileInput.files.length > 0 
    && fileInput.files[0].size <= maxFileSize) {
    console.log(fileTitle.value);
    console.log(fileCategoryValue);
    console.log(fileInput.files[0].size);
    validateButton.removeAttribute("disabled");
    messageOk("Tous les champs ont bien été remplis.");
  } else if (fileInput.files.length > 0) { 
    if (file.size > maxFileSize) {
      console.log(file.size);
      validateButton.disabled = true;
      messageError("Le fichier sélectionné dépasse le poids maximum de 4mo.");
    } 
    if (file.type != "image/jpg" && file.type != "image/png" && file.type != "image/jpeg") {
      console.log(file.type);
      messageError("Le fichier sélectionné n'est pas au format jpg ou png.");
      resetPhoto();
    } 
  } else {
    validateButton.disabled = true;
    messageError("Merci de remplir tous les champs.");
  }
}

// Réinitialisation du champ d'upload de fichier
function resetPhoto() {
  const fileUploaded = document.querySelector(".photo-label--uploaded");
  fileUploaded.style.display = "none";
  filePlaceholder.style.display = "block";
  fileButton.style.display = "block";
  fileDetails.style.display = "block"; 
}

// Envoi d'un nouveau projet
async function sendNewWork() {

  validateButton.addEventListener("click", (event) => {

    // Construction d'un objet FormData
    const formData = new FormData(); 
    formData.append("image", fileInput.files[0]);
    formData.append("title", fileTitle.value);
    formData.append("category", fileCategory.value);

    // Construction d'un nouveau projet
    const modalSection = document.querySelector(".modal-delete__gallery"); 
    const newObject = document.createElement("figure");
    newObject.classList.add("modal-delete__figure");
    const newObjectImage = document.createElement("img");
    const fileUploaded = document.querySelector(".photo-label--uploaded");
    newObjectImage.src = fileUploaded.src;
    newObjectImage.classList.add("modal-delete__image");
    const modalTrashWrapper = document.createElement("span");
    modalTrashWrapper.classList.add("modal-delete__icon");
    const modalTrashIcon = document.createElement("img");
    modalTrashIcon.src = "assets/icons/trash.svg";
    modalTrashIcon.classList.add("modal-delete__trash");
    const portfolioSection = document.querySelector(".gallery");
    const newPortfolioObject = document.createElement("figure");
    const newPortfolioImage = document.createElement("img");
    newPortfolioImage.src = fileUploaded.src;
    const newPortfolioTitle = document.createElement("figcaption");
    newPortfolioTitle.innerText = fileTitle.value;
  
    fetch(api + "works", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token"),      
      },
      body: formData
    })
    .then(response => {
      if (response.ok) {
        messageOk("Le nouveau projet a bien été ajouté.");
        createWorksWrapper(works);
        modalSection.appendChild(newObject);
        newObject.appendChild(newObjectImage);
        newObject.appendChild(modalTrashWrapper);
        modalTrashWrapper.appendChild(modalTrashIcon);    
        portfolioSection.appendChild(newPortfolioObject);
        newPortfolioObject.appendChild(newPortfolioImage);
        newPortfolioObject.appendChild(newPortfolioTitle);

      } else {
        messageError("Une erreur s'est produite. Merci d'essayer à nouveau ou de contacter l'administration du site.");
      }
    })
    resetPhoto(); // Le placeholder d'upload est réaffiché
    modalForm.reset(); // Le formulaire est vidé
  })
}

sendNewWork(); // Appel de la fonction d'envoi de projet


/**
 * @summary $Gestion du formulaire de contact
 */

const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.appendChild(message);
  messageOk("Votre message a bien été envoyé.");
  contactForm.reset();  
})