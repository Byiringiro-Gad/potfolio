document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle?.querySelector("i");
    const languageSelect = document.getElementById("language-select");
    const roleText = document.getElementById("role-text");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const visitCount = document.getElementById("visit-count");
    const featuredCount = document.getElementById("featured-count");
    const projectsGrid = document.getElementById("projects-grid");
    const githubSummary = document.getElementById("github-summary");
    const cfVisualStats = document.getElementById("cf-visual-stats");
    const cfSummary = document.getElementById("cf-summary");
    const heroStage = document.querySelector(".hero-stage");
    const photoModal = document.getElementById("photo-modal");
    const photoModalImage = document.getElementById("photo-modal-image");
    const photoCaption = document.getElementById("photo-caption");
    const photoClose = document.getElementById("photo-close");
    const contactForm = document.getElementById("portfolio-form");
    const contactStatus = document.getElementById("contact-status");

    const defaultText = {};
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        defaultText[node.dataset.i18n] = node.textContent;
    });

    const defaultPlaceholder = {};
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        defaultPlaceholder[node.dataset.i18nPlaceholder] = node.placeholder;
    });

    const englishDynamic = {
        projectStack: "Stack",
        projectUpdated: "Updated",
        projectStars: "Stars",
        projectRepository: "Repository",
        projectLive: "Live site",
        githubReviewed: "public repositories found",
        githubFeatured: "featured projects",
        githubUnavailable: "GitHub data unavailable right now",
        codeforcesUnavailable: "Graph unavailable right now",
        codeforcesFallback: "Profile remains available on Codeforces",
        codeforcesUnrated: "Unrated",
        ratingLabel: "Rating",
        maxLabel: "Max",
        contactOpening: "Your email app is opening...",
        contactSuccess: "Message received! Thank you for reaching out.",
        contactError: "Something went wrong. Please try again or email directly.",
        projectPortfolioTitle: "Personal Portfolio",
        projectPortfolioType: "Web experience",
        projectPortfolioSummary: "A responsive portfolio site presenting projects, credentials, and contact information with clear structure and motion.",
        projectLeetcodeTitle: "LeetCode Connect",
        projectLeetcodeType: "Algorithm archive",
        projectLeetcodeSummary: "A public Python archive of algorithm solutions showing consistency across trees, linked lists, recursion, and backtracking.",
        projectSqlTitle: "Pharmacy Sales Analytics",
        projectSqlType: "SQL case study",
        projectSqlSummary: "An Oracle SQL analytics case study applying joins, ranking, lag, running totals, and moving averages to business reporting.",
        projectOracleTitle: "Oracle PDB Management",
        projectOracleType: "Database system",
        projectOracleSummary: "Exploration of Oracle Pluggable Databases, including creation, management, and basic administrative workflows.",
        projectDbTitle: "Database Management Info",
        projectDbType: "Information system",
        projectDbSummary: "A collection of research and practical implementations for managing database information systems effectively.",
        projectRpTitle: "Gad New RP",
        projectRpType: "Technical resource",
        projectRpSummary: "A repository focused on specific technical patterns and resource planning research.",
        projectWebTitle: "Intro to Web Dev",
        projectWebType: "Learning path",
        projectWebSummary: "Foundational web development projects covering HTML, CSS, and early JavaScript learning.",
    };

    const fr = {
        projectOracleTitle: "Gestion Oracle PDB",
        projectOracleType: "Systeme de base de donnees",
        projectOracleSummary: "Exploration des bases de donnees Oracle Pluggables, y compris la creation, la gestion et les flux administratifs de base.",
        projectDbTitle: "Info de Gestion de Base de Donnees",
        projectDbType: "Systeme d'information",
        projectDbSummary: "Une collection de recherches et de mises en oeuvre pratiques pour gerer efficacement les systemes d'information de base de donnees.",
    };
    const rw = {
        projectOracleTitle: "Imicungire ya Oracle PDB",
        projectOracleType: "Sisitemu ya database",
        projectOracleSummary: "Gushakashaka amakuru kuri Oracle Pluggable Databases, harimo kuyaremye, kuyacunga, n'uburyo bw'ibanze bwo kuyobora.",
        projectDbTitle: "Database Management Info",
        projectDbType: "Sisitemu y'amakuru",
        projectDbSummary: "Icyegeranyo cy'ubushakashatsi n'uburyo bufatika bwo gucunga sisitemu z'amakuru ya database mu buryo bunoze.",
    };
    const translations = { fr, rw };

    const typingRoles = {
        en: ["Software Engineer", "A2SV G7 Student", "Problem Solver", "Lifelong Learner"],
        fr: ["Ingenieur logiciel", "Etudiant A2SV G7", "Resolveur de problemes", "Apprenant permanent"],
        rw: ["Inzobere muri software", "Umunyeshuri wa A2SV G7", "Ukemura ibibazo", "Uhora wiga"]
    };

    const projectCatalog = {
        potfolio: {
            title: "projectPortfolioTitle",
            type: "projectPortfolioType",
            summary: "projectPortfolioSummary",
            icon: "fa-wand-magic-sparkles",
            accent: "linear-gradient(90deg,#7bf0cb,#1fbf95)",
            tags: ["HTML", "CSS", "JavaScript", "GSAP"]
        },
        leetcodeconnect: {
            title: "projectLeetcodeTitle",
            type: "projectLeetcodeType",
            summary: "projectLeetcodeSummary",
            icon: "fa-diagram-project",
            accent: "linear-gradient(90deg,#ffbd73,#ff8c66)",
            tags: ["Python", "Algorithms", "Problem solving"]
        },
        plsq_window_functions: {
            title: "projectSqlTitle",
            type: "projectSqlType",
            summary: "projectSqlSummary",
            icon: "fa-chart-line",
            accent: "linear-gradient(90deg,#6bb6ff,#7bf0cb)",
            tags: ["Oracle SQL", "Window functions", "Analytics"]
        },
        oracle_pdb: {
            title: "projectOracleTitle",
            type: "projectOracleType",
            summary: "projectOracleSummary",
            icon: "fa-database",
            accent: "linear-gradient(90deg,#7bf0cb,#6bb6ff)",
            tags: ["Oracle", "PDB", "Administration"]
        },
        "Database-Management-Information": {
            title: "projectDbTitle",
            type: "projectDbType",
            summary: "projectDbSummary",
            icon: "fa-server",
            accent: "linear-gradient(90deg,#ff8c66,#ffbd73)",
            tags: ["Database", "SQL", "Management"]
        }
    };

    let currentLanguage = localStorage.getItem("portfolio-language") || "en";
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;
    let cachedRepos = [];

    function tr(key) {
        return translations[currentLanguage]?.[key] || defaultText[key] || defaultPlaceholder[key] || englishDynamic[key] || key;
    }

    function applyLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem("portfolio-language", lang);
        document.documentElement.lang = lang === "rw" ? "rw" : lang;
        if (languageSelect) languageSelect.value = lang;

        document.querySelectorAll("[data-i18n]").forEach((node) => {
            node.textContent = translations[lang]?.[node.dataset.i18n] || defaultText[node.dataset.i18n];
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
            node.placeholder = translations[lang]?.[node.dataset.i18nPlaceholder] || defaultPlaceholder[node.dataset.i18nPlaceholder];
        });

        roleIndex = 0;
        charIndex = 0;
        isDeleting = false;
        clearTimeout(typingTimeout);
        typeRoles();

        if (cachedRepos.length) renderRepositories(cachedRepos);
        loadCodeforcesStats();
    }

    function typeRoles() {
        const roles = typingRoles[currentLanguage] || typingRoles.en;
        const currentRole = roles[roleIndex];
        roleText.textContent = isDeleting ? currentRole.substring(0, charIndex - 1) : currentRole.substring(0, charIndex + 1);
        charIndex += isDeleting ? -1 : 1;
        let speed = isDeleting ? 45 : 90;
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            speed = 1400;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 360;
        }
        typingTimeout = setTimeout(typeRoles, speed);
    }

    function setupTheme() {
        const savedTheme = localStorage.getItem("portfolio-theme");
        if (savedTheme === "light") {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            themeIcon?.classList.replace("fa-moon", "fa-sun");
        }
        themeToggle?.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            body.classList.toggle("dark-mode");
            themeIcon?.classList.toggle("fa-moon");
            themeIcon?.classList.toggle("fa-sun");
            localStorage.setItem("portfolio-theme", body.classList.contains("light-mode") ? "light" : "dark");
        });
    }

    function setupNav() {
        languageSelect?.addEventListener("change", (event) => applyLanguage(event.target.value));
        menuToggle?.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
        navLinks?.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    function setupPointerGlow() {
        document.addEventListener("pointermove", (event) => {
            document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
            document.documentElement.style.setProperty("--my", `${event.clientY}px`);
        });
    }

    function animateCounter(targetValue) {
        const start = performance.now();
        const duration = 1300;
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            visitCount.textContent = Math.floor(targetValue * eased).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    async function updateVisitCounter() {
        const namespace = "byiringiro-gad-portfolio";
        const key = window.location.hostname ? `${window.location.hostname}-visits` : "local-preview-visits";
        try {
            const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
            const data = await response.json();
            if (typeof data.value === "number") return animateCounter(data.value);
        } catch {}
        const localValue = Number(localStorage.getItem("portfolio-local-visits") || "0") + 1;
        localStorage.setItem("portfolio-local-visits", String(localValue));
        animateCounter(localValue);
    }

    function createProjectCard(repo, meta) {
        const article = document.createElement("article");
        article.className = "project-card reveal";
        article.style.setProperty("--tone", meta.accent);
        article.innerHTML = `
            <div class="project-top"><div class="project-type"><i class="fas ${meta.icon}"></i><span>${tr(meta.type)}</span></div></div>
            <h3>${tr(meta.title)}</h3>
            <p>${tr(meta.summary)}</p>
            <div class="project-meta">
                <div><span class="metric-label">${tr("projectStack")}</span><strong>${repo.language || meta.tags[0]}</strong></div>
                <div><span class="metric-label">${tr("projectUpdated")}</span><strong>${new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</strong></div>
                <div><span class="metric-label">${tr("projectStars")}</span><strong>${repo.stargazers_count}</strong></div>
            </div>
            <div class="tag-row">${meta.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            <div class="project-actions">
                <a href="${repo.html_url}" target="_blank" rel="noreferrer">${tr("projectRepository")}</a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noreferrer">${tr("projectLive")}</a>` : ""}
            </div>
        `;
        return article;
    }

    function setupProjectTilt() {
        document.querySelectorAll(".project-card").forEach((card) => {
            card.addEventListener("mousemove", (event) => {
                if (window.matchMedia("(max-width: 760px)").matches) return;
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateX = ((y / rect.height) - 0.5) * -8;
                const rotateY = ((x / rect.width) - 0.5) * 10;
                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            card.addEventListener("mouseleave", () => { card.style.transform = ""; });
        });
    }

    function setupHeroStage() {
        if (!heroStage) return;

        const resetStage = () => {
            heroStage.style.setProperty("--hrx", "0deg");
            heroStage.style.setProperty("--hry", "0deg");
        };

        resetStage();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        heroStage.addEventListener("pointermove", (event) => {
            if (window.matchMedia("(max-width: 760px)").matches) return;
            const rect = heroStage.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 14;
            const rotateX = ((y / rect.height) - 0.5) * -12;

            heroStage.style.setProperty("--hrx", `${rotateX}deg`);
            heroStage.style.setProperty("--hry", `${rotateY}deg`);
        });

        heroStage.addEventListener("pointerleave", resetStage);
        heroStage.addEventListener("pointercancel", resetStage);
    }

    function renderRepositories(repos) {
        cachedRepos = repos;
        projectsGrid.innerHTML = "";
        const featuredRepos = Object.keys(projectCatalog).map((name) => repos.find((repo) => repo.name === name)).filter(Boolean);
        featuredRepos.forEach((repo) => projectsGrid.appendChild(createProjectCard(repo, projectCatalog[repo.name])));
        featuredCount.textContent = String(featuredRepos.length);
        githubSummary.innerHTML = `<span class="signal-pill">${featuredRepos.length} ${tr("githubFeatured")}</span>`;
        observeReveals();
        setupProjectTilt();
    }

    function renderFallbackRepositories() {
        renderRepositories([
            { name: "potfolio", html_url: "https://github.com/Byiringiro-Gad/potfolio", homepage: "https://byiringiro-gad.github.io/potfolio/", language: "HTML", updated_at: new Date().toISOString(), stargazers_count: 0 },
            { name: "leetcodeconnect", html_url: "https://github.com/Byiringiro-Gad/leetcodeconnect", homepage: "", language: "Python", updated_at: new Date().toISOString(), stargazers_count: 0 },
            { name: "plsq_window_functions", html_url: "https://github.com/Byiringiro-Gad/plsq_window_functions", homepage: "", language: "SQL", updated_at: new Date().toISOString(), stargazers_count: 0 },
            { name: "oracle_pdb", html_url: "https://github.com/Byiringiro-Gad/oracle_pdb", homepage: "", language: "", updated_at: new Date().toISOString(), stargazers_count: 0 },
            { name: "Database-Management-Information", html_url: "https://github.com/Byiringiro-Gad/Database-Management-Information", homepage: "", language: "", updated_at: new Date().toISOString(), stargazers_count: 0 },
            { name: "gad-new-rp", html_url: "https://github.com/Byiringiro-Gad/gad-new-rp", homepage: "", language: "", updated_at: new Date().toISOString(), stargazers_count: 0 },
            { name: "intro-to-web-development", html_url: "https://github.com/Byiringiro-Gad/intro-to-web-development", homepage: "", language: "", updated_at: new Date().toISOString(), stargazers_count: 0 }
        ]);
        githubSummary.innerHTML = `<span class="signal-pill">${tr("githubUnavailable")}</span>`;
    }

    async function loadRepositories() {
        try {
            const response = await fetch("https://api.github.com/users/Byiringiro-Gad/repos?sort=updated&per_page=100");
            if (!response.ok) throw new Error("GitHub request failed");
            renderRepositories(await response.json());
        } catch {
            renderFallbackRepositories();
        }
    }

    async function loadCodeforcesStats() {
        try {
            const response = await fetch("https://codeforces.com/api/user.info?handles=gadcoder");
            const data = await response.json();
            if (data.status !== "OK") throw new Error("Codeforces request failed");
            const user = data.result[0];
            cfVisualStats.innerHTML = `<img src="https://cf-graph-gen.vercel.app/graph?handle=gadcoder&theme=dark" alt="Codeforces rating graph">`;
            cfSummary.innerHTML = `<span class="signal-pill">${user.rank || tr("codeforcesUnrated")}</span><span class="signal-pill">${tr("ratingLabel")}: ${user.rating || "N/A"}</span><span class="signal-pill">${tr("maxLabel")}: ${user.maxRating || "N/A"}</span>`;
        } catch {
            cfVisualStats.innerHTML = `<div class="signal-pill">${tr("codeforcesUnavailable")}</div>`;
            cfSummary.innerHTML = `<span class="signal-pill">${tr("codeforcesFallback")}</span>`;
        }
    }

    function openPhoto(source, alt, caption = "") {
        photoModalImage.src = source;
        photoModalImage.alt = alt;
        photoCaption.textContent = caption || alt;
        photoModal.classList.add("is-open");
        photoModal.setAttribute("aria-hidden", "false");
    }

    function closePhoto() {
        photoModal.classList.remove("is-open");
        photoModal.setAttribute("aria-hidden", "true");
    }

    function setupPhotos() {
        [document.getElementById("photo-trigger"), document.getElementById("nav-photo-trigger"), ...document.querySelectorAll(".gallery-photo")].forEach((trigger) => {
            if (!trigger) return;
            trigger.addEventListener("click", () => openPhoto(
                trigger.dataset.photoSrc || trigger.querySelector("img")?.src || "gad.jpg",
                trigger.querySelector("img")?.alt || trigger.getAttribute("aria-label") || trigger.dataset.photoCaption || "Photo",
                trigger.dataset.photoCaption || trigger.querySelector("img")?.alt || trigger.getAttribute("aria-label") || "Photo"
            ));
        });
        photoClose?.addEventListener("click", closePhoto);
        photoModal?.addEventListener("click", (event) => { if (event.target === photoModal) closePhoto(); });
        document.addEventListener("keydown", (event) => { if (event.key === "Escape") closePhoto(); });
    }

    function handleContactForm() {
    const form = document.getElementById("portfolio-form");
    const submitBtn = document.getElementById("submit-btn");
    const status = document.getElementById("contact-status");

    if (!form) return;

    emailjs.init("aZOv-L2J5XrKxirBM"); // IMPORTANT

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        try {
            await emailjs.send(
                "service_vl53akj",
                "template_d0fse2s",
                params
            );

            status.textContent = "Thank you for contacting me.\nYour message has been received, I will get back to you soon!";
            status.style.display = "block";

            form.reset();
        } catch (err) {
            status.textContent = "Failed to send message.";
            status.style.display = "block";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i><span>Send Message</span>`;
        }
    });
}

    function observeReveals() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });
        document.querySelectorAll(".reveal:not(.is-visible)").forEach((node) => observer.observe(node));
    }

    function setupGsap() {
        if (!window.gsap) return;
        if (window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
        window.gsap.from(".hero-copy > *, .hero-visual", { opacity: 0, y: 22, duration: 0.8, stagger: 0.08, ease: "power3.out" });
        window.gsap.to(".ambient-a", { x: 30, y: -18, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
        window.gsap.to(".ambient-b", { x: -26, y: 24, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    Object.assign(fr, {
        contactSuccess: "Message reçu ! Merci de nous avoir contactés.",
        contactError: "Une erreur est survenue. Veuillez réessayer.",
        navWorks: "Travaux", navProjects: "Projets", navSkills: "Competences", navCoding: "Signaux", navContact: "Contact",
        heroIntro: "Etudiant en genie logiciel construisant des interfaces plus soignees et une base technique plus forte.", eyebrow: "Etudiant en genie logiciel",
        heroSummary: "Je construis des logiciels utiles, j'ameliore ma resolution de problemes par les algorithmes, et je continue de progresser grace a A2SV et a l'universite.",
        downloadResume: "Telecharger le CV", visitGithub: "Voir GitHub", contactCta: "Me contacter", visitLabel: "Visites du portfolio", featuredLabel: "Projets phares", archiveLabel: "Archive de problemes",
        locationLabel: "Base", locationValue: "Kigali, Rwanda", badgeTitle: "Focus actuel", badgeBody: "Finition front-end, algorithmes et analyse SQL",
        panelKicker: "Profil d'ingenierie", panelTitle: "Sens du produit. Intensite de formation. Preuves publiques.", panelSummary: "Je construis avec exigence visuelle, je pratique les algorithmes avec regularite et je montre ma progression a travers un travail public.",
        workEyebrow: "Ce que je fais", workTitle: "Travaux", workBody: "Je suis etudiant en genie logiciel et j'aime apprendre de nouvelles choses ainsi que resoudre de vrais problemes grace a la technologie. Je fais actuellement partie de la Generation 7 de A2SV, ou je me forme intensivement en structures de donnees, algorithmes et conception de systemes pour creer des solutions numeriques a fort impact.",
        workCard1Title: "Front-end oriente produit", workCard1Body: "Je fais attention a la qualite d'interface, a la hierarchie, a l'accessibilite, a la reactivite, et aux details qui donnent une impression de produit fini.",
        workCard2Title: "Regularite algorithmique", workCard2Body: "Je construis une profondeur de resolution de problemes grace a une pratique disciplinee des structures de donnees, de la recursion, des arbres, du backtracking et du raisonnement de concours.",
        workCard3Title: "Logique data et base de donnees", workCard3Body: "Je renforce mes bases en SQL, analyse, workflows Oracle, jointures, classement et reporting avec fonctions fenetre.",
        projectsEyebrow: "Travail selectionne", projectsTitle: "Projets", projectsCta: "Voir tout sur GitHub", projectsIntro: "Ces projets mettent en avant un travail concret en developpement web, algorithmes et SQL.",
        skillsEyebrow: "Capacites", skillsTitle: "Competences", skillsLead: "Voici les outils et domaines que j'utilise le plus pendant que je continue de progresser.", skillCoreTitle: "Competences techniques principales", skillPlatformTitle: "Pratique et plateformes", skillLanguageTitle: "Langues",
        leetcodeCopy: "Pratique des algorithmes et resolution de problemes de style concours.", githubCopy: "Code, depots et projets d'apprentissage continu.", linkedinCopy: "Profil professionnel, reseau et progression academique.", langEnglish: "Anglais - Bon niveau", langFrench: "Francais - Niveau professionnel", langKinyarwanda: "Kinyarwanda - Langue maternelle",
        codingEyebrow: "Signaux d'execution", codingTitle: "Programmation et regularite", codingLead: "Cette section met en avant la pratique, la regularite et l'activite publique en programmation.", leetcodeCardTitle: "Archive algorithmique et rigueur quotidienne", leetcodeSignal: "47+ solutions suivies dans l'archive publique", codeforcesCardTitle: "Signal de programmation competitive", githubCardTitle: "Vue d'ensemble de la presence publique", viewProfile: "Voir le profil", loading: "Chargement du graphique",
        awardsEyebrow: "Reconnaissance", awardsTitle: "Distinctions et prix", awardsLead: "Ces certificats mettent en avant des etapes d'apprentissage et de progression technique.", awardEfTitle: "Certificat de fin d'etudes EF", awardEfBody: "Certificat attestant l'apprentissage de l'anglais et la fin du programme.", awardCiscoTitle: "Certificat Cisco", awardCiscoBody: "Certificat de formation technique et reseau de Cisco.", awardIsocTitle: "Certificat Internet Society", awardIsocBody: "Reconnaissance de l'Internet Society mettant en valeur mon engagement dans l'apprentissage du numerique, la communaute Internet et le developpement digital.", openCertificate: "Ouvrir le certificat",
        spotlightEyebrow: "Credential phare", spotlightTitle: "Reconnaissance Internet Society", spotlightBody: "Ce certificat reflete ma participation a une communaute internationale d'apprentissage autour d'Internet et du developpement numerique.",
        journeyEyebrow: "Chronologie", journeyTitle: "Parcours professionnel", journeyLead: "Une chronologie breve de mon parcours academique et de ma progression technique.", journey1: "Preparation d'une licence en genie logiciel a l'Universite Adventiste d'Afrique Centrale (AUCA), avec de bons resultats academiques et une progression technique continue.", journey2: "Formation comme etudiant A2SV Generation 7 avec un fort accent sur les structures de donnees, les algorithmes et la conception de systemes pour des logiciels evolutifs.", journey3: "Diplome des Ecoles de Science de Musanze (MCB).",
        philosophyEyebrow: "Style de travail", philosophyTitle: "Clarte, constance et progression visible.", philosophyBody: "J'accorde de la valeur a une pensee claire, une execution reguliere et une amelioration continue dans ma facon d'apprendre et de construire.",
        docsEyebrow: "Support", docsTitle: "Documents", docsLead: "Les documents et certificats importants sont disponibles ici pour une consultation rapide.", viewTranscript: "Voir le releve", viewCisco: "Voir le certificat Cisco", viewEf: "Voir le certificat EF", resumeHint: "Le meilleur point de depart pour les recruteurs et collaborateurs.", transcriptHint: "Parcours academique et historique des cours.", ciscoHint: "Credential technique en reseau.", efHint: "Etape importante en apprentissage des langues.",
        galleryEyebrow: "Couche visuelle", galleryTitle: "Galerie photo", galleryBody: "Quelques photos personnelles qui donnent du contexte a la personne derriere le travail.",
        socialEyebrow: "Presence en ligne", socialTitle: "Sur le web", socialLead: "Ces profils apportent un contexte supplementaire sur mon travail, ma pratique et mon parcours professionnel.", socialGithub: "Depots, parcours d'apprentissage et travail public selectionne.", socialLeetcode: "Regularite dans la resolution de problemes algorithmiques.", socialLinkedin: "Identite professionnelle et progression academique.", socialEmail: "Communication directe pour le travail et la collaboration.",
        contactEyebrow: "Prendre contact", contactTitle: "Me contacter", contactLead: "Utilisez ce formulaire pour commencer directement un message par email.", contactPanelTitle: "Ouvert aux stages, a la collaboration et aux conversations serieuses sur l'ingenierie.", contactPanelBody: "Si vous recrutez, evaluez de jeunes ingenieurs, ou souhaitez travailler ensemble, l'email et les liens directs sont fournis ici.", formName: "Nom", formEmail: "Email", formMessage: "Message", formSubmit: "Envoyer le message", formNamePlaceholder: "Votre nom", formEmailPlaceholder: "Votre email", formMessagePlaceholder: "Ecrivez votre message...",
        footerCopy: "Copyright 2026 BYIRINGIRO Gad. Tous droits reserves.", projectStack: "Stack", projectUpdated: "Mis a jour", projectStars: "Etoiles", projectRepository: "Depot", projectLive: "Site en ligne",
        githubLoading: "Chargement des donnees GitHub...", githubReviewed: "depots publics trouves", githubFeatured: "projets mis en avant", githubUnavailable: "Les donnees GitHub sont indisponibles pour le moment", codeforcesUnavailable: "Graphique indisponible pour le moment", codeforcesFallback: "Le profil reste disponible sur Codeforces", codeforcesUnrated: "Non classe", ratingLabel: "Score", maxLabel: "Maximum", contactOpening: "Votre application email est en cours d'ouverture...",
        projectPortfolioTitle: "Portfolio personnel", projectPortfolioType: "Experience web", projectPortfolioSummary: "Un site portfolio responsive presentant projets, certificats et contact avec une structure claire et du mouvement.",
        projectLeetcodeTitle: "LeetCode Connect", projectLeetcodeType: "Archive algorithmique", projectLeetcodeSummary: "Une archive Python publique de solutions algorithmiques montrant de la regularite sur les arbres, listes, recursion et backtracking.",
        projectSqlTitle: "Analyse des ventes en pharmacie", projectSqlType: "Etude de cas SQL", projectSqlSummary: "Une etude analytique Oracle SQL utilisant jointures, classement, lag, totaux cumules et moyennes mobiles pour du reporting metier."
    });
    Object.assign(rw, {
        navWorks: "Ibikorwa", navProjects: "Imishinga", navSkills: "Ubumenyi", navCoding: "Ibimenyetso", navContact: "Twandikire",
        heroIntro: "Umunyeshuri wa software engineering uri kubaka interfaces zisukuye n'ubumenyi bwa tekiniki burushijeho gukomera.", eyebrow: "Umunyeshuri wa Software Engineering",
        heroSummary: "Nkora software ifite akamaro, nkongera ubushobozi bwo gukemura ibibazo nkoresheje algorithms, kandi nkomeza gukura binyuze muri A2SV na kaminuza.",
        downloadResume: "Kuramo CV", visitGithub: "Reba GitHub", contactCta: "Tuvugane", visitLabel: "Abasuye portfolio", featuredLabel: "Imishinga yatoranyijwe", archiveLabel: "Archive y'ibibazo", locationLabel: "Aherereye", locationValue: "Kigali, Rwanda",
        badgeTitle: "Ibyo ndi kwitaho ubu", badgeBody: "Front-end nziza, algorithms, na SQL analytics", panelKicker: "Umwirondoro wa engineering", panelTitle: "Product eye. Training ikomeye. Ibimenyetso rusange.", panelSummary: "Nkora nita ku buryo ibintu bigaragara, nkitoza algorithms mu buryo buhoraho, kandi nkerekana iterambere ryanjye binyuze mu mirimo rusange.",
        workEyebrow: "Ibyo nkora", workTitle: "Ibikorwa", workBody: "Ndi umunyeshuri wa software engineering ukunda kwiga ibintu bishya no gukemura ibibazo nyabyo hifashishijwe ikoranabuhanga. Ubu ndi muri A2SV Generation 7 aho ndimo guhugurwa cyane muri data structures, algorithms, na system design kugira ngo nubake ibisubizo bifitiye abantu akamaro.",
        workCard1Title: "Front-end ifite intego y'igicuruzwa", workCard1Body: "Nita ku bwiza bw'interface, ku buryo bw'ibice, accessibility, responsiveness, n'uduce duto dutuma software yumva yararangiye neza.",
        workCard2Title: "Gukomera muri algorithms", workCard2Body: "Nubaka ubujyakuzimu mu gukemura ibibazo binyuze mu myitozo ihoraho ya data structures, recursion, trees, backtracking, n'ubwenge bwo mu marushanwa.",
        workCard3Title: "Imyumvire ya data na database", workCard3Body: "Ndi kubaka umusingi ukomeye muri SQL, analytics, Oracle workflows, joins, ranking, na reporting ikoresha window functions.",
        projectsEyebrow: "Imirimo yatoranyijwe", projectsTitle: "Imishinga", projectsCta: "Reba byose kuri GitHub", projectsIntro: "Iyi mishinga yerekana ibikorwa bifatika muri web development, algorithms, na SQL.",
        skillsEyebrow: "Ubushobozi", skillsTitle: "Ubumenyi", skillsLead: "Ibi ni tools n'ibice nkoresha cyane nkiri gukomeza gutera imbere.", skillCoreTitle: "Ubumenyi bw'ibanze bwa tekiniki", skillPlatformTitle: "Aho niga kandi nkorera imyitozo", skillLanguageTitle: "Indimi",
        leetcodeCopy: "Imyitozo ya algorithms n'ibibazo byo mu marushanwa.", githubCopy: "Code, repositories, n'imishinga yo gukomeza kwiga.", linkedinCopy: "Umwirondoro w'akazi, network, n'iterambere mu masomo.", langEnglish: "Icyongereza - Nzi neza", langFrench: "Igifaransa - Nzi kugikoresha mu kazi", langKinyarwanda: "Ikinyarwanda - Ururimi kavukire",
        codingEyebrow: "Ibimenyetso by'ikorwa", codingTitle: "Coding n'ubudakemwa", codingLead: "Iki gice cyerekana imyitozo, guhoraho, n'ibikorwa bya coding biri ku mugaragaro.", leetcodeCardTitle: "Archive ya algorithms n'ubukana bwa buri munsi", leetcodeSignal: "47+ ibisubizo bikurikiranwa muri archive rusange", codeforcesCardTitle: "Ikimenyetso cya competitive programming", githubCardTitle: "Incamake y'ibikora rusange", viewProfile: "Reba profile", loading: "Turi kuzana graph",
        awardsEyebrow: "Icyubahiro", awardsTitle: "Ibihembo n'icyubahiro", awardsLead: "Izi mpamyabumenyi zigaragaza intambwe mu myigire no gukura kwa tekiniki.", awardEfTitle: "Impamyabumenyi ya EF", awardEfBody: "Impamyabumenyi yerekana ko narangije gahunda yo kwiga icyongereza.", awardCiscoTitle: "Impamyabumenyi ya Cisco", awardCiscoBody: "Impamyabumenyi y'amahugurwa ya Cisco mu bya networking na tekiniki.", awardIsocTitle: "Impamyabumenyi ya Internet Society", awardIsocBody: "Icyemezo cya Internet Society kigaragaza uruhare rwanjye mu myigire y'ikoranabuhanga, umuganda wa Internet, n'iterambere rya digitali.", openCertificate: "Fungura impamyabumenyi",
        spotlightEyebrow: "Credential y'ingenzi", spotlightTitle: "Icyemezo cya Internet Society", spotlightBody: "Iki cyemezo kigaragaza uruhare rwanjye mu muryango mpuzamahanga wiga ibijyanye na internet n'iterambere rya digitali.",
        journeyEyebrow: "Timeline", journeyTitle: "Urugendo rw'umwuga", journeyLead: "Incamake ngufi y'amateka yanjye mu masomo no gukura kwa tekiniki.", journey1: "Ndimo kwiga Bachelor mu bya Software Engineering muri Kaminuza y'Abadiventiste yo muri Africa yo hagati (AUCA), nkomeza gutsinda neza no kwagura ubumenyi bwa tekiniki.", journey2: "Ndimo guhugurwa muri A2SV Generation 7 nshyize imbaraga cyane muri data structures, algorithms, na system design kugira ngo nkore software ishobora kwaguka neza.", journey3: "Narangije amashuri yisumbuye muri Ecoles de Science de Musanze (MCB).",
        philosophyEyebrow: "Uko nkora", philosophyTitle: "Gusobanuka, guhoraho, no gukura kugaragara.", philosophyBody: "Naha agaciro gutekereza neza, gukora mu buryo buhoraho, no gukomeza kwiteza imbere mu buryo niga kandi nubaka.",
        docsEyebrow: "Inyandiko zunganira", docsTitle: "Inyandiko", docsLead: "Inyandiko n'impamyabumenyi z'ingenzi ziraboneka hano kugira ngo zisuzumwe vuba.", viewTranscript: "Reba transcript", viewCisco: "Reba impamyabumenyi ya Cisco", viewEf: "Reba impamyabumenyi ya EF", resumeHint: "Aho recruiters n'abafatanyabikorwa bahera neza.", transcriptHint: "Record y'amasomo n'amateka ya coursework.", ciscoHint: "Credential ya tekiniki ya networking.", efHint: "Intambwe ikomeye mu myigire y'indimi.",
        galleryEyebrow: "Icyiciro cy'amashusho", galleryTitle: "Ububiko bw'amafoto", galleryBody: "Amafoto make y'umuntu ku giti cye atanga ishusho y'uri inyuma y'aka kazi.",
        socialEyebrow: "Aho mboneka", socialTitle: "Ku mbuga", socialLead: "Izi profiles zitanga andi makuru ku kazi kanjye, imyitozo, n'amavu n'amavuko y'umwuga.", socialGithub: "Repositories, urugendo rwo kwiga, n'imirimo rusange yatoranyijwe.", socialLeetcode: "Guhoraho mu gukemura ibibazo bya algorithms.", socialLinkedin: "Umwirondoro w'akazi n'iterambere mu masomo.", socialEmail: "Kuvugana byoroshye ku kazi no ku bufatanye.",
        contactEyebrow: "Tuvugane", contactTitle: "Twandikire", contactLead: "Koresha iyi form utangize email message ako kanya.", contactPanelTitle: "Niteguye stages, collaboration, n'ibiganiro bikomeye ku engineering.", contactPanelBody: "Niba uri guha akazi, usuzuma emerging engineers, cyangwa ushaka ko dukorana, email n'andi mahuriro byatanzwe hano.", formName: "Izina", formEmail: "Email", formMessage: "Ubutumwa", formSubmit: "Ohereza ubutumwa", formNamePlaceholder: "Andika izina", formEmailPlaceholder: "Andika email", formMessagePlaceholder: "Andika ubutumwa...",
        footerCopy: "Copyright 2026 BYIRINGIRO Gad. Uburenganzira bwose burabitswe.", projectStack: "Stack", projectUpdated: "Byavuguruwe", projectStars: "Inyenyeri", projectRepository: "Ububiko", projectLive: "Site iri online",
        githubLoading: "Turimo kuzana amakuru ya GitHub...", githubReviewed: "repositories rusange zabonetse", githubFeatured: "imishinga yatoranyijwe", githubUnavailable: "Amakuru ya GitHub ntabashije kuboneka ubu", codeforcesUnavailable: "Graph ntabwo yabashije kuboneka ubu", codeforcesFallback: "Profile iracyaboneka kuri Codeforces", codeforcesUnrated: "Nta rating", ratingLabel: "Rating", maxLabel: "Max", contactOpening: "Email app yawe iri gufunguka...",
        projectPortfolioTitle: "Portfolio yanjye", projectPortfolioType: "Web experience", projectPortfolioSummary: "Urubuga rwa portfolio rujyanye na mobile rwerekana imishinga, impamyabumenyi, n'uburyo bwo kundikira mu buryo busobanutse kandi bufite motion nziza.",
        projectLeetcodeTitle: "LeetCode Connect", projectLeetcodeType: "Archive ya algorithms", projectLeetcodeSummary: "Archive ya Python rusange y'ibisubizo bya algorithms yerekana guhoraho mu trees, linked lists, recursion, na backtracking.",
        projectSqlTitle: "Pharmacy Sales Analytics", projectSqlType: "SQL case study", projectSqlSummary: "Case study ya Oracle SQL analytics ikoresha joins, ranking, lag, running totals, na moving averages muri business reporting.",
        projectOracleTitle: "Imicungire ya Oracle PDB", projectOracleType: "Sisitemu ya database", projectOracleSummary: "Gushakashaka amakuru kuri Oracle Pluggable Databases, harimo kuyaremye, kuyacunga, n'uburyo bw'ibanze bwo kuyobora.",
        projectDbTitle: "Database Management Info", projectDbType: "Sisitemu y'amakuru", projectDbSummary: "Icyegeranyo cy'ubushakashatsi n'uburyo bufatika bwo gucunga sisitemu z'amakuru ya database mu buryo bunoze.",
        projectRpTitle: "Gad New RP", projectRpType: "Ressource technique", projectRpSummary: "Urubuga rwibanda kuri pattern zimwe na zimwe za tekiniki n'ubushakashatsi bwo gupanga imikoreshereze y'umutungo.",
        projectWebTitle: "Intro to Web Dev", projectWebType: "Learning path", projectWebSummary: "Imishinga y'ibanze ya web development ikubiyemo HTML, CSS, n'imyigire ya mbere ya JavaScript."
    });

    applyLanguage(currentLanguage);
    setupTheme();
    setupNav();
    setupPointerGlow();
    updateVisitCounter();
    loadRepositories();
    loadCodeforcesStats();
    setupHeroStage();
    setupPhotos();
    handleContactForm();
    observeReveals();
    setupGsap();
});