const translations = {
    en: {
        "page-title": "Portfolio — Cloé Delage",
        "nav-home": "Home",
        "nav-projects": "My projects",
        "nav-contact": "Contact",
        "back-button": "← Back",
        "hero-role": "Multimedia student",
        "hero-degree": "Digital media and internet",
        "hero-badge": "Web design & digital creation",
        "hero-tags": "UX/UI <i></i> Graphic design <i></i> Web design",
        "about-title": "About me",
        "about-copy": "Hello! I'm Cloé Delage, currently in my third year of a <b class=\"accent-green\">multimedia degree</b>, with a passion for <b>UX/UI design</b> and <b>web design</b>. My goal? To combine <b class=\"accent-yellow\">aesthetics</b> and <b class=\"accent-yellow\">functionality</b> to create intuitive, accessible, user-centered interfaces. What motivates me every day is solving problems through design. I believe a great interface is only successful when it is <b>easy</b> to use. <b class=\"accent-yellow\">Curious</b>, <b class=\"accent-yellow\">creative</b>, and always keeping up with the latest web trends, I use my skills to <b class=\"accent-green\">bring to life</b> meaningful and engaging digital projects. Enjoy exploring my portfolio!",
        "education-title": "Education",
        "education-current": "2024 — present",
        "education-degree": "University Bachelor of Technology in Multimedia",
        "education-focus": "Communication, UX/UI design, graphic design and motion",
        "education-bac": "General Baccalaureate",
        "education-specialties": "Engineering sciences and mathematics",
        "skills-title": "My skills",
        "fields-title": "Areas of expertise",
        "field-ux-title": "UX / UI",
        "field-ux-copy": "Wireframes, prototyping and user flows.",
        "field-graphic-title": "Graphic design",
        "field-graphic-copy": "Logos, brand guidelines and design systems.",
        "field-communication-title": "Communication",
        "field-communication-copy": "Communication plans and client relations.",
        "field-project-title": "Project management",
        "field-project-copy": "Multimedia project tracking (Trello, Monday).",
        "field-audiovisual-title": "Audiovisual",
        "field-audiovisual-copy": "Video editing and animation (After Effects, Premiere Pro).",
        "marquee-projects": "MY PROJECTS",
        "marquee-work": "PORTFOLIO",
        "projects-title": "My projects",
        "projects-all": "All projects →",
        "tag-graphic": "Graphic design",
        "tag-mobile-app": "Mobile app",
        "card-game-title": "Card game",
        "card-game-copy": "Design of a card game.",
        "card-ac-title": "Animal Crossing website",
        "card-ac-copy": "A website inspired by the Animal Crossing game.",
        "card-museum-title": "Limoges Museum of Fine Arts",
        "card-museum-copy": "App research and prototyping.",
        "card-mycrew-title": "MyCrew — Sports meet-up app",
        "card-mycrew-copy": "A networking app for athletes.",
        "card-olio-label": "View the Olio d’Olivia page",
        "card-olio-title": "Olio d’Olivia",
        "card-olio-copy": "One-page website for an olive oil brand.",
        "card-food-title": "Eat better, waste less",
        "card-food-copy": "A website exploring facts about sustainable food.",
        "footer-navigation": "Navigation",
        "footer-contact": "Contact",
        "footer-copy": "© 2026 Cloé Delage — All rights reserved",
        "olio-title": "Olio d'Olivia",
        "alt-card-game": "Card game illustration",
        "alt-animal-crossing": "Animal Crossing website",
        "alt-museum": "Limoges Museum of Fine Arts",
        "alt-mycrew": "MyCrew sports meet-up app",
        "alt-olio": "Olio d’Olivia one-page website",
        "alt-food": "Eat better, waste less website",
        "alt-skills": "Illustrated skills: WordPress, Figma, Photoshop, Illustrator, After Effects, InDesign and web development",
        "olio-year": "Year",
        "olio-category": "Category",
        "olio-category-copy": "UI design,<br>Prototyping",
        "alt-olio-site": "Olio d’Olivia website on desktop and mobile",
        "olio-tools": "Tools",
        "olio-copy-one": "For this project, we imagined “L'échoppe de l'île”, a peer-to-peer marketplace inspired by Leboncoin and Vinted, designed around the world of Animal Crossing: New Horizons. We first analysed the game (its soft, natural colour palette, typography, and characters such as Tom Nook and Isabelle) to identify its strengths and limitations.",
        "olio-copy-two": "We then developed the communication strategy: reviewing existing campaigns (collaborations with Doom and Gémo, social media, boat advertising, celebrity partnerships and an installation in a London aquarium); creating 3D models of in-game objects (cherries, an axe, a net, a gyroid, a bed and an apple); designing the site's UI/UX (home, shop, product details, account, payment and confirmation); creating Instagram posts and stories; and building an interactive mini-game banner where players catch bells with a net while avoiding bees.",
        "alt-olio-gallery-one": "Mobile mockups and Our Harvest page",
        "alt-olio-gallery-two": "Home page, AOC video and footer",
        "alt-olio-gallery-three": "Our Products and Our Story pages",
        "alt-olio-gallery-four": "Website displayed on desktop and laptop",
        "alt-moodboard": "Moodboard: bottle, olive trees and green colour palette"
    }
};

const languageKey = "portfolio-language";
const languageSwitch = document.querySelector(".switch");
const menuToggle = document.querySelector("#menu-toggle");
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const originalText = new Map();
const originalAttributes = new Map();

function setLanguage(language) {
    const selectedLanguage = language === "en" ? "en" : "fr";
    const isEnglish = selectedLanguage === "en";

    document.documentElement.lang = selectedLanguage;
    document.body.classList.toggle("lang-en", isEnglish);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const translation = translations.en[element.dataset.i18n];
        if (!originalText.has(element)) {
            const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
            originalText.set(element, element.hasAttribute("data-i18n-html")
                ? { mode: "html", value: element.innerHTML }
                : textNode
                    ? { mode: "node", node: textNode, value: textNode.nodeValue }
                    : { mode: "text", value: element.textContent });
        }

        const original = originalText.get(element);
        if (!isEnglish) {
            if (original.mode === "html") element.innerHTML = original.value;
            else if (original.mode === "node") original.node.nodeValue = original.value;
            else element.textContent = original.value;
            return;
        }
        if (translation === undefined) return;

        if (original.mode === "html") element.innerHTML = translation;
        else if (original.mode === "node") {
            original.node.nodeValue = `${translation}${original.value.trim() ? " " : ""}`;
        } else element.textContent = translation;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const translation = translations.en[element.dataset.i18nAlt];
        if (!originalAttributes.has(element)) originalAttributes.set(element, { alt: element.alt });
        if (isEnglish && translation) element.alt = translation;
        else if (!isEnglish) element.alt = originalAttributes.get(element).alt;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        const translation = translations.en[element.dataset.i18nAria];
        if (!originalAttributes.has(element)) originalAttributes.set(element, { aria: element.getAttribute("aria-label") });
        if (isEnglish && translation) element.setAttribute("aria-label", translation);
        else if (!isEnglish) {
            const original = originalAttributes.get(element).aria;
            if (original === null) element.removeAttribute("aria-label");
            else element.setAttribute("aria-label", original);
        }
    });

    if (languageSwitch) {
        languageSwitch.setAttribute("aria-pressed", String(isEnglish));
        languageSwitch.setAttribute("aria-label", isEnglish ? "Switch to French" : "Switch to English");
    }

    if (menuToggle && burger) {
        burger.setAttribute("aria-expanded", String(menuToggle.checked));
    }
}

const savedLanguage = localStorage.getItem(languageKey) === "en" ? "en" : "fr";
setLanguage(savedLanguage);

languageSwitch?.addEventListener("click", () => {
    const nextLanguage = document.documentElement.lang === "en" ? "fr" : "en";
    localStorage.setItem(languageKey, nextLanguage);
    setLanguage(nextLanguage);
});

menuToggle?.addEventListener("change", () => {
    burger?.setAttribute("aria-expanded", String(menuToggle.checked));
});

document.querySelectorAll("[data-history-back]").forEach((link) => {
    link.addEventListener("click", (event) => {
        if (window.history.length <= 1) return;

        event.preventDefault();
        window.history.back();
    });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.getElementById(link.getAttribute("href").slice(1));
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (menuToggle) menuToggle.checked = false;
        burger?.setAttribute("aria-expanded", "false");
    });
});
