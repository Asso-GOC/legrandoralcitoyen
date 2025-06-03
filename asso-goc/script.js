/*******************************************************************************
***********              Récupération des informations               ***********
*******************************************************************************/
const pages = document.querySelectorAll('.form-page');
const progressBar = document.getElementById('progress-bar');
const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.prev-button');
let currentPage = 0;


// Fonction qui met à jour la barre de progression
function updateProgressBar() {
  if (progressBar) {
      const progress = ((currentPage + 1) / pages.length) * 100;
      progressBar.style.width = `${progress}%`;
  } else {
      console.error("L'élément #progress-bar est introuvable dans le DOM.");
  }
}


// Fonction qui affiche la page correspondante
function showPage(pageIndex) {
  pages.forEach((page, index) => {
      page.classList.toggle('active', index === pageIndex);
  });
  updateProgressBar();
}


// Fonction qui valide un champ spécifique
function validateField(field) {
  if (field.hasAttribute('required') && !field.value.trim()) {
      field.classList.add('error');
      alert(`Le champ "${field.name || field.id}" est obligatoire.`);
      return false;
  } else if (field.hasAttribute('pattern')) {
      let pattern = new RegExp(field.getAttribute('pattern'));
      if (!pattern.test(field.value)) {
          field.classList.add('error');
          alert(`Le champ "${field.name || field.id}" n'est pas dans le format attendu.`);
          return false;
      }
  }
  field.classList.remove('error');
  return true;
}



// Fonction qui valide tous les champs requis de la page actuelle
function validatePage(pageIndex) {
  const fields = pages[pageIndex].querySelectorAll('input, select, textarea');
  let isValid = true;

  fields.forEach(field => {
      if (!validateField(field)) {
          isValid = false;
      }
  });

  return isValid;
}


// Fonction de confirmation avant soumission du formulaire
function showConfirmation(name) {
  let confirmation = confirm("Êtes-vous sûr de vouloir soumettre ces informations ?");
  if (!confirmation) {
      event.preventDefault();
  }
}



/*******************************************************************************
***********      Ajout d'action après le chargement de la page       ***********
*******************************************************************************/

document.addEventListener("DOMContentLoaded", () => {

  // Chargement de l'événement pour chaque bouton et affichage de la page
  if (nextButtons && prevButtons && progressBar) {
      nextButtons.forEach(button => {
          button.addEventListener('click', () => {
              if (validatePage(currentPage)) { 
                  if (currentPage < pages.length - 1) {
                      currentPage++;
                      showPage(currentPage);
                  }
              }
          });
      });

      prevButtons.forEach(button => {
          button.addEventListener('click', () => {
              if (currentPage > 0) {
                  currentPage--;
                  showPage(currentPage);
              }
          });
      });

      showPage(currentPage);
  }
});



/*******************************************************************************
***********      PHOTOS GALERIE PAGE D'ACCUEIL                      ***********
*******************************************************************************/
if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
  console.log("Script chargé et exécuté sur la page d'accueil!");

  // Galerie photos
  let currentIndex = 0;
  const images = document.querySelectorAll('.gallery-images');  
  const totalImages = images.length;

  console.log("Script chargé et exécuté!");

  // Fonction pour changer l'image (pour la navigation gauche/droite)
  function changeImage(direction) {
      currentIndex += direction;
      console.log("Changement d'image, index actuel :", currentIndex); 

      if (currentIndex < 0) {
          currentIndex = totalImages - 1;
      } else if (currentIndex >= totalImages) {
          currentIndex = 0; 
      }

    const gallery = document.querySelector('.gallery');
    gallery.style.transform = `translateX(-${currentIndex * 100}%)`;

    console.log("Galerie déplacée, transformation appliquée.");
  }

  // Ajouter la fonctionnalité lightbox (image en grand)
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-images');
  const closeLightbox = document.getElementById('close-lightbox');
  const image = document.querySelectorAll('.gallery-image');
  const prevLightbox = document.getElementById('prev-lightbox');
  const nextLightbox = document.getElementById('next-lightbox');
  let lightboxIndex = 0;


  // Ouvrir la lightbox quand une image de la galerie est cliquée
  image.forEach(image => {
      image.addEventListener('click', function() {
          const imageSrc = image.getAttribute('src');
          console.log("Image source: ", imageSrc); 
          lightboxImage.src = imageSrc;
          lightbox.style.display = 'flex';
          lightboxIndex = index; 
      });
  });

  // Fermer la lightbox lorsqu'on clique sur le bouton de fermeture
  closeLightbox.addEventListener('click', function() {
      lightbox.style.display = 'none';
  });

  // Fermer la lightbox en cliquant en dehors de l'image
  lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
          lightbox.style.display = 'none'; 
      }
  });

  function showLightboxImage(index) {
    lightboxImage.src = image[index].getAttribute('src');
}

prevLightbox.addEventListener('click', function () {
    lightboxIndex = (lightboxIndex - 1 + image.length) % image.length;
    showLightboxImage(lightboxIndex);
});

nextLightbox.addEventListener('click', function () {
    lightboxIndex = (lightboxIndex + 1) % image.length;
    showLightboxImage(lightboxIndex);
});

  document.getElementById('leftArrow').addEventListener('click', function() {
      console.log("Flèche gauche cliquée!");
      changeImage(-1); 
  });

  document.getElementById('rightArrow').addEventListener('click', function() {
      console.log("Flèche droite cliquée!");
      changeImage(1); 
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        } else if (e.key === 'ArrowLeft') {
            prevLightbox.click();
        } else if (e.key === 'ArrowRight') {
            nextLightbox.click();
        }
    }
});


}







/*******************************************************************************
***********      BOUTON BACK TO TOP                     ***********
*******************************************************************************/
//REMONTER EN HAUT PAGE
const btn = document.getElementById("btnTop");

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.style.display = "block"; 
    } else {
        btn.style.display = "none"; 
    }
}





/*******************************************************************************
***********      BARRE DE RECHERCHE                      ***********
*******************************************************************************/
//BARRE DE RECHERCHE
document.querySelector('.search-toggle').addEventListener('click', function() {
    document.querySelector('.search-container').classList.toggle('active');
});

//Barre de recherche
/*var searchInput = document.querySelector('input[type="search"]');
var content = document.body; // Sélection des éléments

// Fonction principale de recherche
function find() {
  var searchTerm = searchInput.value.trim().toLowerCase();

  removeHighlights();

  if (searchTerm === "") return;

  var regex = new RegExp(`\\b(${searchTerm})\\b`, 'gi');

  // Parcourir et surligner le texte dans toute la page
  highlightText(content, regex);
}

// Fonction pour réinitialiser les surlignages
function removeHighlights() {
  var highlights = document.querySelectorAll('.highlight');
  highlights.forEach(function (highlight) {
    highlight.replaceWith(highlight.textContent);
  });
}

// Fonction pour surligner les mots correspondant à la recherche
function highlightText(node, regex) {
  if (node.nodeType === Node.TEXT_NODE) {
    var text = node.textContent;

    if (regex.test(text)) {
      var temp = text.replace(regex, '<span class="highlight">$1</span>');
      var newNode = document.createElement('span');
      newNode.innerHTML = temp;

      while (newNode.firstChild) {
        node.parentNode.insertBefore(newNode.firstChild, node);
      }
      node.remove(); // Supprimer le nœud texte original
    }
  } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
    node.childNodes.forEach(function (child) {
      highlightText(child, regex); // Appliquer récursivement
    });
  }
}

searchInput.addEventListener('input', find);*/

// Fonction pour envoyer la requête de recherche et afficher les résultats
function searchEvents() {
  const query = document.getElementById('searchBar').value;
  const statut_event = document.getElementById('statutFilter').value;

  fetch(`search.php?query=${encodeURIComponent(query)}&statut_event=${encodeURIComponent(statut_event)}`)
      .then(response => response.json())
      .then(data => {
          const resultsContainer = document.getElementById('results'); 
          resultsContainer.innerHTML = '';

          if (data.length > 0) {
              data.forEach(event => {
                  const eventElement = document.createElement('div');
                  eventElement.classList.add('event-card');
                  eventElement.innerHTML = `
                      <h3>${event.titre_event}</h3>
                      <p>${event.descript_event}</p>
                      <p><strong>Date:</strong> ${event.date_event}</p>
                      <p><strong>Lieu:</strong> ${event.lieu}</p>
                      <p><strong>Statut:</strong> ${event.statut}</p>
                      <img src="${event.fichier_event}" alt="${event.titre_event}" class="event-image">
                  `;
                  resultsContainer.appendChild(eventElement);
              });
          } else {
              resultsContainer.innerHTML = '<p>Aucun événement trouvé.</p>';
          }
      })
      .catch(error => console.error('Erreur de recherche :', error));
}






/*******************************************************************************
***********      ZOOM ET DEZOOM                      ***********
*******************************************************************************/
//ZOOM
//Zommer la taille du texte
let currentScale = 1;
const minScale = 0.5; 
const maxScale = 2; 

const bodyElement = document.querySelector('body'); 

function changeZoom(action) {
    if (action === 'increase' && currentScale < maxScale) {
        currentScale += 0.1; 
    } else if (action === 'decrease' && currentScale > minScale) {
        currentScale -= 0.1; 
    }

    // Applique l'échelle (zoom) à l'ensemble du document
    bodyElement.style.transform = `scale(${currentScale})`;
    bodyElement.style.transformOrigin = 'top left';

    bodyElement.style.width = `${100 / currentScale}%`;
    bodyElement.style.height = `${100 / currentScale}%`;
}







/*******************************************************************************
***********      AFFFICHER SOMMAIRE                     ***********
*******************************************************************************/
// Vérifier si la page est index.html ou concours.html
let pageActuelle = window.location.pathname.split('/').pop(); 

if (pageActuelle === 'index.html' || pageActuelle === 'concours.html') {
  console.log("Script chargé pour sommaire");

  //AFFICHAGE SOMMAIRE 
  // Récupérer les éléments nécessaires
  const menuAccueil = document.getElementById('menuAccueil');
  const sommaire = document.getElementById('sommaire');
  const closeSommaire = document.getElementById('closeSommaire');

  menuAccueil.addEventListener('click', function(event) {
    event.preventDefault(); 
    sommaire.style.display = 'block'; 
  });

  closeSommaire.addEventListener('click', function() {
    sommaire.style.display = 'none'; 
  });
}


  




/*******************************************************************************
***********     CHANGER MODE SOMBRE                      ***********
*******************************************************************************/
console.log("Chargement du script sur cette page");

if (localStorage.getItem('modeSombre') === 'true') {
  document.body.classList.add('sombre');
  document.getElementById('modeToggle').textContent = '☀️'; 
} else {
  document.body.classList.remove('sombre');
  document.getElementById('modeToggle').textContent = '☾'; 
}

document.getElementById('modeToggle').addEventListener('click', function() {
  document.body.classList.toggle('sombre');

  if (document.body.classList.contains('sombre')) {
    localStorage.setItem('modeSombre', 'true');
    document.getElementById('modeToggle').textContent = '☀️'; 
  } else {
    localStorage.setItem('modeSombre', 'false');
    document.getElementById('modeToggle').textContent = '☾'; 
  }
});






/*******************************************************************************
***********     MENU BURGER                      ***********
*******************************************************************************/
//MENU BURGER
const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');

burger.addEventListener('click', () => {
    burgerMenu.classList.toggle('show'); 
});







/*******************************************************************************
***********     MISE À JOUR AUTOMATIQUE DATE SITE                    ***********
*******************************************************************************/
document.addEventListener("DOMContentLoaded", function () {
  let dateElement = document.getElementById("date-mise-a-jour");
  
  console.log(dateElement); 
  
  if (dateElement) { 
    let dateActuelle = new Date();
    let options = { year: 'numeric', month: 'long' };
    let dateFormatee = dateActuelle.toLocaleDateString('fr-FR', options);

    dateElement.textContent = dateFormatee;
  } else {
    console.error("L'élément avec l'ID 'date-mise-a-jour' n'a pas été trouvé.");
  }
});




