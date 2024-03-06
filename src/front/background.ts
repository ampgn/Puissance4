import background1 from "../assets/background1.jpg"
import background2 from "../assets/background2.jpg"
import background3 from "../assets/background3.jpg"

// Liste d'images de fond
const backgroundImages = [
  background1,
  background2,
  background3
];

let currentIndex = 0; // Index actuel de l'image de fond

// Fonction pour mettre à jour le style CSS avec l'image de fond suivante
export function setNextBackgroundImage() {
  currentIndex = (currentIndex + 1) % backgroundImages.length; // Passage à l'image de fond suivante en bouclant

  const nextBackgroundImage = backgroundImages[currentIndex];
  document.documentElement.style.setProperty("--random-background-image", `url(${nextBackgroundImage})`);
}

// Appel de la fonction pour démarrer le carrousel
export function startBackgroundCarousel(interval: number) {
  setNextBackgroundImage(); // Définir la première image de fond immédiatement

  // Démarrez l'intervalle pour changer l'image de fond à intervalles réguliers
  setInterval(setNextBackgroundImage, interval);
}
