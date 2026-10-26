const annee = document.getElementById("annee");
if (annee) annee.textContent = new Date().getFullYear();

const boutonTheme = document.getElementById("theme");

if (boutonTheme) {
  boutonTheme.addEventListener("click", () => {
    const html = document.documentElement;
    const nouveau = html.getAttribute("data-theme") === "light" ? "dark" : "light";

    html.setAttribute("data-theme", nouveau);
    try { localStorage.setItem("theme", nouveau); } catch (e) { }
  });
}

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    const ouvert = menu.classList.toggle("ouvert");
    burger.setAttribute("aria-expanded", String(ouvert));
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menu.classList.remove("ouvert");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}

const liensMenu = document.querySelectorAll('.menu a[href^="#"]');
const sections = [];

liensMenu.forEach((lien) => {
  const section = document.querySelector(lien.getAttribute("href"));
  if (section) sections.push(section);
});

function marquerLienActif() {
  let active = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 140) active = section;
  });

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
