// 1. Année du pied de page
const annee = document.getElementById("annee");
if (annee) annee.textContent = new Date().getFullYear();

// 2. Menu sur mobile : le bouton ouvre et ferme le menu
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    menu.classList.toggle("ouvert");
  });

  // Le menu se ferme quand on clique sur un lien
  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") menu.classList.remove("ouvert");
  });
}

// 3. Navigation active : le lien de la section affichée est mis en évidence
const liensMenu = document.querySelectorAll('.menu a[href^="#"]');
const sections = [];

liensMenu.forEach((lien) => {
  const section = document.querySelector(lien.getAttribute("href"));
  if (section) sections.push(section);
});

function marquerLienActif() {
  // La section active est la dernière dont le haut a dépassé le haut de l'écran
  let active = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 120) active = section;
  });

  // En bas de page, la dernière section (Contact) est active
  const basDePage = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
  if (basDePage) active = sections[sections.length - 1];

  liensMenu.forEach((lien) => {
    if (lien.getAttribute("href") === "#" + active.id) {
      lien.setAttribute("aria-current", "true");
    } else {
      lien.removeAttribute("aria-current");
    }
  });
}

if (sections.length > 0) {
  window.addEventListener("scroll", marquerLienActif);
  marquerLienActif();
}

// 4. Bouton « copier » de l'adresse e-mail
const boutonCopier = document.getElementById("copier-email");
const email = document.getElementById("email");

if (boutonCopier && email && navigator.clipboard) {
  boutonCopier.addEventListener("click", () => {
    navigator.clipboard.writeText(email.textContent).then(() => {
      boutonCopier.textContent = "copié";
      setTimeout(() => { boutonCopier.textContent = "copier"; }, 2000);
    });
  });
}
