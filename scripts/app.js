/**
 * @summary Import des éléments depuis les autres fichiers
 */

import { isLoggedIn, logOut } from './components/usermode.js';
import { fetchWorks, fetchCategories } from './components/functions.js';
import { manageModal, navigateModal } from './components/modal.js';


/**
 * @summary Appel des fonctions depuis les autres fichiers
 */

// in usermode.js
isLoggedIn(); // Modification de l'interface en fonction de l'état de connexion
logOut(); // Gestion de la déconnexion

// in functions.js
fetchWorks(); // Récupération des projets depuis l'API
fetchCategories(); // Récupération des catégories depuis l'API

// in modal.js
manageModal(); // Gestion de l'ouverture et de la fermeture de la modale
navigateModal(); // Gestion de la navigation dans la modale