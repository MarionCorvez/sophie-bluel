let navLabel = document.getElementById("login__label");


/**
 * @summary Modification de l'interface en fonction de l'état de connexion
 */

export function isLoggedIn() {

  let editorItems = document.querySelectorAll(".editor-mode"); 
  let visitorItems = document.querySelectorAll(".visitor-mode");
  if (sessionStorage.getItem("token")) { // Si l'utilisateur est connecté
      navLabel.textContent = "logout"; // Le menu propose un lien de déconnexion
      editorItems.forEach(editorItem => { // Le contenu permettant l'édition est affiché
          editorItem.style.display = "block";
      });
      visitorItems.forEach(visitorItem => { // Le contenu pour les visiteurs seuls est masqué
          visitorItem.style.display = "none";
      });
  };
};


/**
 * @summary Fonction qui supprime le token au clic sur le lien "login / logout"
 */

export function logOut() {
  navLabel.addEventListener("click", () => {
      sessionStorage.removeItem("token");
  })
};