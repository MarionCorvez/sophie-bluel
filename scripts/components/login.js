/**
 * @summary Gestion du formulaire de connexion
 */

const loginForm = document.getElementById("login-form__wrapper"); // Récupération du formulaire

function logIn() {

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // On empêche le comportement par défaut
    let loginEmail = document.getElementById("loginEmail").value; // Récupération de l'email
    let loginPassword = document.getElementById("loginPassword").value; // Récupération du mot de passe
    let user = []; // Création d'un tableau vide pour accueillir les données

    user = fetch("http://localhost:5678/api/users/login", { // Envoi d'une requête en POST avec les données de connexion
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.token) { // Si la réponse contient un token
        sessionStorage.setItem("token", data.token); // On le stocke dans la session
        window.open( // On redirige l'utilisateur connecté vers la page d'accueil
          "../index.html",
          "_self"
        );
        let navLabel = document.getElementById("login__label");
        navLabel.innerText = "logout"; // On modifie le libellé du menu  
      } else { // Sinon, on affiche un message d'erreur
        const message = document.createElement("p");
        message.classList.add("message--error");
        loginForm.appendChild(message);
        message.innerText = "Erreur dans l'identifiant ou le mot de passe";        
      }
    })
  })
}

logIn();


/**
 * @summary Vérification de la structure de l'email
 */

function checkEmail(balise) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (emailRegExp.test(balise.value)) {
    balise.classList.remove("error");
  } else {
    balise.classList.add("error");
  }
}

loginEmail.addEventListener("change", () => {
  checkEmail(loginEmail);
})