/**
 * @summary Ouverture et fermeture de la modale
 */

export function manageModal() {

  const modal = document.querySelector(".modal");
  const openModal = document.querySelector(".modal--open");
  const closeModal = document.querySelector(".modal__nav--close");

  openModal.addEventListener("click", () => {
    modal.showModal();
  })

  closeModal.addEventListener("click", () => {
    modal.close();
  })

  // @Adam Argyle : l'action "close" a lieu en fonction de la cible du clic 
  const lightDismiss = ({target:dialog}) => {
    if (dialog.nodeName === "DIALOG")
      dialog.close("dismiss");
  }
  modal.addEventListener("click", lightDismiss);
}


/**
 * @summary Gestion du passage d'une page de la modale à l'autre
 */

export function navigateModal() {

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
    })
    page1Items.forEach(page1Item => { // Le contenu de la page 1 est masqué
      page1Item.style.display = "none";
    })  
  })

  buttonBack.addEventListener("click", () => {
    modalHeading.textContent = "Galerie photo"; // Le titre est modifié
    buttonBack.style.display = "none";
    page1Items.forEach(page1Item => { // Le contenu de la page 1 est affiché
      page1Item.style.display = "block";
    })
    page2Items.forEach(page2Item => { // Le contenu de la page 2 est masqué
      page2Item.style.display = "none";
    })
  })
}