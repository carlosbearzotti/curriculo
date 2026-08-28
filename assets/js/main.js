import { desafios } from "./desafios.js";
import { projetos } from "./projetos.js";

const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");
const toggle = document.querySelector("#sw-checkbox");
const projectsSection = document.querySelector("#projects .wrapper");
const about = document.querySelector("#about");
const projects = document.querySelector("#projects");
const knowledge = document.querySelector("#knowledge");
const contact = document.querySelector("#contact");

window.addEventListener("load", () => {
  projetos(projectsSection);

  projectsSection.addEventListener("click", (e) => {
    if (e.target.closest("#desafioBtn")) {
      desafios(projectsSection);
    }
    if (e.target.closest("#backToProjectsBtn")) {
      projetos(projectsSection);
    }
  });
});

window.addEventListener("scroll", onScroll);
onScroll();

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active");

  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open");
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded");
    });
  });
}

closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close");
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded");
    });
  });
}

ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(
  `#home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledge header,
  #knowledge .card,
  #contact,
  #contact header`
);

// Carregar e sincronizar tema salvo
const savedTheme = localStorage.getItem("cv-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  if (toggle) toggle.checked = true;
}

toggle.addEventListener("change", () => {
  const isLight = document.body.classList.toggle("light-mode");
  localStorage.setItem("cv-theme", isLight ? "light" : "dark");
});

// Lógica de cópia com pop-up para a seção de contato
function setupCopyButton(btnId, popupId, textToCopy) {
  const btn = document.getElementById(btnId);
  const popup = document.getElementById(popupId);
  let timeout;

  if (btn && popup) {
    btn.addEventListener("click", async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          textArea.remove();
        }

        popup.classList.add("show");
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          popup.classList.remove("show");
        }, 2000);
      } catch (err) {
        console.error("Falha ao copiar:", err);
      }
    });
  }
}

setupCopyButton("btnCopyMainEmail", "copyMainEmailPopup", "bearzotti.ce@gmail.com");
setupCopyButton("btnCopyMainPhone", "copyMainPhonePopup", "+55 19 97422-6880");