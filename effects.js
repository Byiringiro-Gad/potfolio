document.addEventListener("DOMContentLoaded", () => {

    // ── Element refs ─────────────────────────────────────────────
    const body            = document.body;
    const roleText        = document.getElementById("role-text");
    const visitCount      = document.getElementById("visit-count");
    const featuredCount   = document.getElementById("featured-count");
    const projectsGrid    = document.getElementById("projects-grid");
    const githubSummary   = document.getElementById("github-summary");
    const cfVisualStats   = document.getElementById("cf-visual-stats");
    const cfSummary       = document.getElementById("cf-summary");
    const photoModal      = document.getElementById("photo-modal");
    const photoModalImage = document.getElementById("photo-modal-image");
    const photoCaption    = document.getElementById("photo-caption");
    const photoClose      = document.getElementById("photo-close");

    // Theme toggles (desktop + mobile)
    const themeToggles = [
        document.getElementById("theme-toggle"),
        document.getElementById("theme-toggle-mobile")
    ].filter(Boolean);

    // Language selects (desktop + mobile)
    const langSelects = [
        document.getElementById("language-select"),
        document.getElementById("language-select-mobile")
    ].filter(Boolean);

    // Mobile menu
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav  = document.getElementById("mobile-nav");

    // ── i18n defaults ─────────────────────────────────────────────
    const defaultText = {};
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        defaultText[node.dataset.i18n] = node.textContent;
    });

    const defaultPlaceholder = {};
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        defaultPlaceholder[node.dataset.i18nPlaceholder] = node.placeholder;
    });

    // ── English dynamic strings ───────────────────────────────────
    const englishDynamic = {
        navAbout:    "About",
        navProjects: "Projects",
        navSkills:   "Skills",
        navCoding:   "Coding",
        navJourney:  "Journey",
        navContact:  "Contact",

        heroSummary: "I build full-stack software, deliver real products like e-commerce platforms and ordering systems, sharpen algorithms through A2SV, and keep growing every day.",

        aboutP1: "I'm a software engineering student at AUCA and an A2SV Generation 7 trainee based in Kigali, Rwanda. I build full-stack applications that solve real problems — from an AI-powered supermarket platform to a queue management system for local markets.",
        aboutP2: "My training at A2SV focuses intensively on data structures, algorithms, and system design. Outside of training I build and ship things, keep a consistent LeetCode practice, and push myself to grow every day.",
        aboutP3: "When I'm not coding I'm thinking about how software can create real impact for people in Africa and beyond.",

        visitLabel:    "Portfolio visits",
        featuredLabel: "Featured projects",
        archiveLabel:  "LeetCode solved",
        locationLabel: "Location",
        locationValue: "Kigali, Rwanda",

        downloadResume: "Download Resume",
        visitGithub:    "GitHub",

        projectStack:      "Stack",
        projectUpdated:    "Updated",
        projectStars:      "Stars",
        projectRepository: "Repository",
        projectLive:       "Live site",

        githubFeatured:        "featured projects",
        githubUnavailable:     "GitHub data unavailable",
        codeforcesUnavailable: "Graph unavailable",
        codeforcesFallback:    "Profile available on Codeforces",
        codeforcesUnrated:     "Unrated",
        ratingLabel:           "Rating",
        maxLabel:              "Max",

        projectsCta: "View all on GitHub",

        skillCoreTitle:     "Languages & Frameworks",
        skillCoreTitle2:    "Tools & Concepts",
        skillLanguageTitle: "Languages",
        skillPlatformTitle: "Platforms",
        langEnglish:        "English — Proficient",
        langFrench:         "French — Working proficiency",
        langKinyarwanda:    "Kinyarwanda — Native",
        leetcodeCopy:       "Algorithm practice & contest-style solving.",
        githubCopy:         "Code, repositories, and public work.",
        linkedinCopy:       "Professional profile and network.",

        leetcodeCardTitle:    "Algorithm archive and daily sharpness",
        codeforcesCardTitle:  "Competitive programming signal",
        githubCardTitle:      "Public footprint overview",
        leetcodeSignal:       "47+ tracked solutions",
        githubLoading:        "Loading...",
        viewProfile:          "View Profile",
        loading:              "Loading",

        journey2: "Intensive training in data structures, algorithms, and system design for scalable software.",
        journey1: "Pursuing a degree at Adventist University of Central Africa with strong academic performance.",
        journey3: "Graduated from Ecoles de Science de Musanze (MCB).",

        awardsTitle:    "Honors & Certificates",
        awardEfTitle:   "EF Graduation",
        awardCiscoTitle:"Cisco Certificate",
        spotlightTitle: "Internet Society",

        galleryTitle: "Gallery",

        contactPanelTitle: "Open to internships, collaboration, and serious engineering conversations.",
        contactPanelBody:  "If you're hiring, reviewing emerging engineers, or interested in working together — let's connect.",
        formName:              "Name",
        formEmail:             "Email",
        formMessage:           "Message",
        formSubmit:            "Send Message",
        formNamePlaceholder:   "Your name",
        formEmailPlaceholder:  "Your email",
        formMessagePlaceholder:"Write your message...",

        footerCopy: "© 2026 BYIRINGIRO Gad. All rights reserved.",

        viewTranscript: "Transcript",

        // Projects
        projectPortfolioTitle:   "Personal Portfolio",
        projectPortfolioType:    "Web experience",
        projectPortfolioSummary: "A responsive portfolio site with multi-language support, GSAP animations, and contact form integration.",

        projectSimbaTitle:   "Simba Supermarket 2.0",
        projectSimbaType:    "Full-stack e-commerce",
        projectSimbaSummary: "Rwanda's modern online supermarket built for the A2SV contest. AI-powered search (Groq LLaMA), 700+ products, MoMo payments, branch dashboard, staff portal, Google OAuth, full EN/FR/RW translation.",

        projectNgamiaTitle:   "Ngamia Ordering System",
        projectNgamiaType:    "Full-stack web app",
        projectNgamiaSummary: "An ordering and queue management system for marketplace environments — customer app, admin dashboard, real-time order tracking, inventory management, queue numbers, and SMS notifications.",

        projectLeetcodeTitle:   "LeetCode Connect",
        projectLeetcodeType:    "Algorithm archive",
        projectLeetcodeSummary: "A public Python archive of algorithm solutions showing consistency across trees, linked lists, recursion, and backtracking.",
    };

    // ── French translations ───────────────────────────────────────
    const fr = {
        navAbout: "A propos", navProjects: "Projets", navSkills: "Competences",
        navCoding: "Coding", navJourney: "Parcours", navContact: "Contact",

        heroSummary: "Je construis des logiciels full-stack, je livre de vrais produits comme des plateformes e-commerce et des systemes de commande, j'affine les algorithmes via A2SV, et je progresse chaque jour.",

        aboutP1: "Je suis etudiant en genie logiciel a l'AUCA et stagiaire A2SV Generation 7 base a Kigali, Rwanda. Je construis des applications full-stack qui resolvent de vrais problemes.",
        aboutP2: "Ma formation chez A2SV se concentre sur les structures de donnees, les algorithmes et la conception de systemes. En dehors de la formation, je construis et livre des projets concrets.",
        aboutP3: "Quand je ne code pas, je reflechis a la facon dont le logiciel peut creer un impact reel pour les gens en Afrique et au-dela.",

        visitLabel: "Visites du portfolio", featuredLabel: "Projets phares",
        archiveLabel: "LeetCode resolu", locationLabel: "Base", locationValue: "Kigali, Rwanda",
        downloadResume: "Telecharger le CV", visitGithub: "GitHub",
        projectsCta: "Voir tout sur GitHub",

        skillCoreTitle: "Langages et frameworks", skillCoreTitle2: "Outils et concepts",
        skillLanguageTitle: "Langues", skillPlatformTitle: "Plateformes",
        langEnglish: "Anglais — Bon niveau", langFrench: "Francais — Niveau professionnel",
        langKinyarwanda: "Kinyarwanda — Langue maternelle",
        leetcodeCopy: "Pratique des algorithmes et resolution de problemes.",
        githubCopy: "Code, depots et projets publics.",
        linkedinCopy: "Profil professionnel et reseau.",

        leetcodeCardTitle: "Archive algorithmique et rigueur quotidienne",
        codeforcesCardTitle: "Signal de programmation competitive",
        githubCardTitle: "Vue d'ensemble de la presence publique",
        leetcodeSignal: "47+ solutions suivies", githubLoading: "Chargement...",
        viewProfile: "Voir le profil", loading: "Chargement",

        journey2: "Formation intensive en structures de donnees, algorithmes et conception de systemes.",
        journey1: "Licence en genie logiciel a l'AUCA avec de bons resultats academiques.",
        journey3: "Diplome des Ecoles de Science de Musanze (MCB).",

        awardsTitle: "Distinctions et certificats",
        awardEfTitle: "Diplome EF", awardCiscoTitle: "Certificat Cisco",
        spotlightTitle: "Internet Society", galleryTitle: "Galerie",

        contactPanelTitle: "Ouvert aux stages, a la collaboration et aux conversations serieuses sur l'ingenierie.",
        contactPanelBody: "Si vous recrutez, evaluez de jeunes ingenieurs, ou souhaitez travailler ensemble, contactez-moi.",
        formName: "Nom", formEmail: "Email", formMessage: "Message",
        formSubmit: "Envoyer le message",
        formNamePlaceholder: "Votre nom", formEmailPlaceholder: "Votre email",
        formMessagePlaceholder: "Ecrivez votre message...",
        footerCopy: "© 2026 BYIRINGIRO Gad. Tous droits reserves.",
        viewTranscript: "Releve de notes",

        projectPortfolioTitle: "Portfolio personnel", projectPortfolioType: "Experience web",
        projectPortfolioSummary: "Un site portfolio responsive avec support multilingue, animations GSAP, et formulaire de contact.",
        projectSimbaTitle: "Simba Supermarche 2.0", projectSimbaType: "E-commerce full-stack",
        projectSimbaSummary: "Supermarche en ligne moderne du Rwanda construit pour le concours A2SV. Recherche IA (Groq LLaMA), 700+ produits, paiements MoMo, dashboard de succursale, portail personnel, Google OAuth, traduction EN/FR/RW.",
        projectNgamiaTitle: "Systeme de Commande Ngamia", projectNgamiaType: "Application web full-stack",
        projectNgamiaSummary: "Systeme de commande et de gestion de files d'attente — application client, tableau de bord admin, suivi en temps reel, gestion des stocks, numeros de file et notifications SMS.",
        projectLeetcodeTitle: "LeetCode Connect", projectLeetcodeType: "Archive algorithmique",
        projectLeetcodeSummary: "Archive Python publique de solutions algorithmiques montrant la regularite sur les arbres, listes, recursion et backtracking.",

        githubFeatured: "projets mis en avant", githubUnavailable: "Donnees GitHub indisponibles",
        codeforcesUnavailable: "Graphique indisponible", codeforcesFallback: "Profil disponible sur Codeforces",
        codeforcesUnrated: "Non classe", ratingLabel: "Score", maxLabel: "Maximum",
        projectStack: "Stack", projectUpdated: "Mis a jour", projectStars: "Etoiles",
        projectRepository: "Depot", projectLive: "Site en ligne",
    };

    // ── Kinyarwanda translations ──────────────────────────────────
    const rw = {
        navAbout: "Ibyanjye", navProjects: "Imishinga", navSkills: "Ubumenyi",
        navCoding: "Coding", navJourney: "Urugendo", navContact: "Twandikire",

        heroSummary: "Nkora software ikoze byuzuye, nohereza ibicuruzwa nyabyo nka platform za e-commerce na sisitemu zo gutumiza, nkomerezaho algorithms mu A2SV, kandi nkomeza kwiteza imbere buri munsi.",

        aboutP1: "Ndi umunyeshuri wa software engineering muri AUCA kandi ndi umunyeshuri wa A2SV Generation 7 uri i Kigali, Rwanda. Nkora porogaramu zikoze byuzuye (full-stack) zikemura ibibazo nyabyo.",
        aboutP2: "Amahugurwa yanjye muri A2SV yibanda cyane ku data structures, algorithms, na system design. Hanze y'amahugurwa, nkora no gutanga imishinga ifatika.",
        aboutP3: "Igihe ntagira code, ntekereza uburyo software ishobora gutanga akamaro nyako ku bantu bo muri Afrika no hirya.",

        visitLabel: "Abasuye portfolio", featuredLabel: "Imishinga yatoranyijwe",
        archiveLabel: "LeetCode yakemutse", locationLabel: "Aherereye", locationValue: "Kigali, Rwanda",
        downloadResume: "Kuramo CV", visitGithub: "GitHub",
        projectsCta: "Reba byose kuri GitHub",

        skillCoreTitle: "Indimi n'amashingiro", skillCoreTitle2: "Ibikoresho n'imyumvire",
        skillLanguageTitle: "Indimi", skillPlatformTitle: "Aho nkorera",
        langEnglish: "Icyongereza — Nzi neza", langFrench: "Igifaransa — Nzi kugikoresha",
        langKinyarwanda: "Ikinyarwanda — Ururimi kavukire",
        leetcodeCopy: "Imyitozo ya algorithms n'ibibazo.",
        githubCopy: "Code, repositories, n'imirimo rusange.",
        linkedinCopy: "Umwirondoro w'akazi na network.",

        leetcodeCardTitle: "Archive ya algorithms n'ubukana bwa buri munsi",
        codeforcesCardTitle: "Ikimenyetso cya competitive programming",
        githubCardTitle: "Incamake y'ibikora rusange",
        leetcodeSignal: "47+ ibisubizo bikurikiranwa",
        githubLoading: "Turimo gutegereza...", viewProfile: "Reba profile", loading: "Turitegereza",

        journey2: "Amahugurwa akomeye muri data structures, algorithms, na system design.",
        journey1: "Kwiga Bachelor muri AUCA nkomeza gutsinda neza.",
        journey3: "Narangije amashuri muri Ecoles de Science de Musanze (MCB).",

        awardsTitle: "Ibihembo n'impamyabumenyi",
        awardEfTitle: "Impamyabumenyi ya EF", awardCiscoTitle: "Impamyabumenyi ya Cisco",
        spotlightTitle: "Internet Society", galleryTitle: "Ububiko bw'amafoto",

        contactPanelTitle: "Niteguye stages, collaboration, n'ibiganiro bikomeye ku engineering.",
        contactPanelBody: "Niba uri guha akazi, usuzuma emerging engineers, cyangwa ushaka ko dukorana — twandikire.",
        formName: "Izina", formEmail: "Email", formMessage: "Ubutumwa",
        formSubmit: "Ohereza ubutumwa",
        formNamePlaceholder: "Andika izina", formEmailPlaceholder: "Andika email",
        formMessagePlaceholder: "Andika ubutumwa...",
        footerCopy: "© 2026 BYIRINGIRO Gad. Uburenganzira bwose burabitswe.",
        viewTranscript: "Reba transcript",

        projectPortfolioTitle: "Portfolio yanjye", projectPortfolioType: "Web experience",
        projectPortfolioSummary: "Urubuga rwa portfolio rujyanye na mobile rufite ibisobanuro mu ndimi 3, animations, na contact form.",
        projectSimbaTitle: "Simba Supermarket 2.0", projectSimbaType: "E-commerce ikoze byuzuye",
        projectSimbaSummary: "Supermarket yo mu Rwanda igezweho yubatswe ku marushanwa ya A2SV. AI (Groq LLaMA), ibicuruzwa 700+, MoMo, dashboard y'amashami, portal y'abakozi, Google OAuth, EN/FR/RW.",
        projectNgamiaTitle: "Sisitemu yo Gutumiza Ngamia", projectNgamiaType: "Porogaramu ya web ikoze byuzuye",
        projectNgamiaSummary: "Sisitemu yo gutumiza no kuyobora imirongo — porogaramu y'abakiriya, dashboard y'ubuyobozi, gukurikirana mu gihe nyacyo, imicungire y'ububiko, nimero z'imirongo, SMS.",
        projectLeetcodeTitle: "LeetCode Connect", projectLeetcodeType: "Archive ya algorithms",
        projectLeetcodeSummary: "Archive ya Python rusange yerekana guhoraho mu trees, linked lists, recursion, na backtracking.",

        githubFeatured: "imishinga yatoranyijwe", githubUnavailable: "Amakuru ya GitHub ntabashije kuboneka",
        codeforcesUnavailable: "Graph ntabwo yabashije kuboneka", codeforcesFallback: "Profile iracyaboneka kuri Codeforces",
        codeforcesUnrated: "Nta rating", ratingLabel: "Rating", maxLabel: "Max",
        projectStack: "Stack", projectUpdated: "Byavuguruwe", projectStars: "Inyenyeri",
        projectRepository: "Ububiko", projectLive: "Site iri online",
    };

    const translations = { fr, rw };

    // ── Project catalog ───────────────────────────────────────────
    const projectCatalog = {
        "simba-2": {
            title: "projectSimbaTitle",
            type:  "projectSimbaType",
            summary: "projectSimbaSummary",
            icon: "fa-cart-shopping",
            tone: "#f97316",
            tags: ["Next.js 14", "TypeScript", "PostgreSQL", "Groq AI", "Zustand", "Vercel"]
        },
        ngamia: {
            title: "projectNgamiaTitle",
            type:  "projectNgamiaType",
            summary: "projectNgamiaSummary",
            icon: "fa-shop",
            tone: "#64ffda",
            tags: ["Node.js", "Express", "React", "MariaDB", "Tailwind CSS"]
        },
        potfolio: {
            title: "projectPortfolioTitle",
            type:  "projectPortfolioType",
            summary: "projectPortfolioSummary",
            icon: "fa-wand-magic-sparkles",
            tone: "#818cf8",
            tags: ["HTML", "CSS", "JavaScript", "GSAP", "i18n"]
        },
        leetcodeconnect: {
            title: "projectLeetcodeTitle",
            type:  "projectLeetcodeType",
            summary: "projectLeetcodeSummary",
            icon: "fa-diagram-project",
            tone: "#facc15",
            tags: ["Python", "Algorithms", "Data Structures"]
        }
    };

    // ── State ─────────────────────────────────────────────────────
    let currentLang = localStorage.getItem("portfolio-lang") || "en";
    let roleIndex   = 0;
    let charIndex   = 0;
    let isDeleting  = false;
    let typingTimer;
    let cachedRepos = [];

    // ── Translate helper ──────────────────────────────────────────
    function tr(key) {
        return translations[currentLang]?.[key]
            ?? defaultText[key]
            ?? defaultPlaceholder[key]
            ?? englishDynamic[key]
            ?? key;
    }

    // ── Apply language ────────────────────────────────────────────
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("portfolio-lang", lang);
        document.documentElement.lang = lang;

        // Sync all selects
        langSelects.forEach(s => { if (s) s.value = lang; });

        // Static i18n nodes
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            el.textContent = translations[lang]?.[el.dataset.i18n] ?? defaultText[el.dataset.i18n];
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            el.placeholder = translations[lang]?.[el.dataset.i18nPlaceholder] ?? defaultPlaceholder[el.dataset.i18nPlaceholder];
        });

        // Re-render projects with new language
        if (cachedRepos.length) renderRepositories(cachedRepos);

        // Restart typing
        roleIndex  = 0;
        charIndex  = 0;
        isDeleting = false;
        clearTimeout(typingTimer);
        typeRole();

        loadCodeforcesStats();
    }

    // ── Typing animation ──────────────────────────────────────────
    const roles = {
        en: ["Software Engineer", "A2SV G7 Student", "Problem Solver", "Lifelong Learner"],
        fr: ["Ingenieur logiciel", "Etudiant A2SV G7", "Resolveur de problemes", "Apprenant permanent"],
        rw: ["Inzobere muri software", "Umunyeshuri wa A2SV G7", "Ukemura ibibazo", "Uhora wiga"]
    };

    function typeRole() {
        if (!roleText) return;
        const list    = roles[currentLang] || roles.en;
        const current = list[roleIndex];
        roleText.textContent = isDeleting
            ? current.substring(0, charIndex - 1)
            : current.substring(0, charIndex + 1);
        charIndex += isDeleting ? -1 : 1;

        let speed = isDeleting ? 45 : 90;
        if (!isDeleting && charIndex === current.length) { isDeleting = true; speed = 1600; }
        else if (isDeleting && charIndex === 0)          { isDeleting = false; roleIndex = (roleIndex + 1) % list.length; speed = 400; }

        typingTimer = setTimeout(typeRole, speed);
    }

    // ── Theme ─────────────────────────────────────────────────────
    function setupTheme() {
        const saved = localStorage.getItem("portfolio-theme");
        if (saved === "light") {
            body.classList.add("light");
            themeToggles.forEach(b => {
                b?.querySelector("i")?.classList.replace("fa-moon", "fa-sun");
            });
        }
        themeToggles.forEach(btn => {
            btn?.addEventListener("click", () => {
                body.classList.toggle("light");
                const isLight = body.classList.contains("light");
                localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
                themeToggles.forEach(b => {
                    const icon = b?.querySelector("i");
                    if (icon) {
                        icon.classList.toggle("fa-moon", !isLight);
                        icon.classList.toggle("fa-sun",  isLight);
                    }
                });
            });
        });
    }

    // ── Mobile menu ───────────────────────────────────────────────
    function setupMobileMenu() {
        menuToggle?.addEventListener("click", () => {
            const open = mobileNav?.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(open));
            mobileNav?.setAttribute("aria-hidden", String(!open));
        });
        mobileNav?.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", () => {
                mobileNav.classList.remove("is-open");
                menuToggle?.setAttribute("aria-expanded", "false");
                mobileNav.setAttribute("aria-hidden", "true");
            });
        });
    }

    // ── Active nav on scroll ──────────────────────────────────────
    function setupScrollSpy() {
        const sections = document.querySelectorAll(".content-section[id]");
        const navItems = document.querySelectorAll(".nav-item[data-section]");
        if (!sections.length || !navItems.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navItems.forEach(n => n.classList.remove("active"));
                    const active = document.querySelector(`.nav-item[data-section="${entry.target.id}"]`);
                    active?.classList.add("active");
                }
            });
        }, { rootMargin: "-40% 0px -55% 0px" });

        sections.forEach(s => observer.observe(s));
    }

    // ── Visit counter ─────────────────────────────────────────────
    function animateCount(target) {
        if (!visitCount) return;
        const start    = performance.now();
        const duration = 1200;
        (function step(now) {
            const p = Math.min((now - start) / duration, 1);
            visitCount.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
            if (p < 1) requestAnimationFrame(step);
        })(performance.now());
    }

    async function updateVisitCounter() {
        const ns  = "byiringiro-gad-portfolio";
        const key = window.location.hostname || "local";
        try {
            const res  = await fetch(`https://api.countapi.xyz/hit/${ns}/${key}`);
            const data = await res.json();
            if (typeof data.value === "number") { animateCount(data.value); return; }
        } catch {}
        const local = Number(localStorage.getItem("pv-local") || 0) + 1;
        localStorage.setItem("pv-local", String(local));
        animateCount(local);
    }

    // ── Project card builder ──────────────────────────────────────
    function buildCard(repo, meta) {
        const el = document.createElement("article");
        el.className = "project-card reveal";
        el.style.setProperty("--tone", meta.tone);

        const updated = new Date(repo.updated_at).toLocaleDateString("en-US", {
            month: "short", year: "numeric"
        });

        el.innerHTML = `
            <div class="project-top">
                <div class="project-type">
                    <i class="fas ${meta.icon}"></i>
                    <span>${tr(meta.type)}</span>
                </div>
            </div>
            <h3>${tr(meta.title)}</h3>
            <p>${tr(meta.summary)}</p>
            <div class="project-meta">
                <div>
                    <span class="metric-label">${tr("projectStack")}</span>
                    <strong>${repo.language || meta.tags[0]}</strong>
                </div>
                <div>
                    <span class="metric-label">${tr("projectUpdated")}</span>
                    <strong>${updated}</strong>
                </div>
                <div>
                    <span class="metric-label">${tr("projectStars")}</span>
                    <strong>${repo.stargazers_count}</strong>
                </div>
            </div>
            <div class="tag-row">
                ${meta.tags.map(t => `<span>${t}</span>`).join("")}
            </div>
            <div class="project-actions">
                <a href="${repo.html_url}" target="_blank" rel="noreferrer">
                    <i class="fab fa-github"></i> ${tr("projectRepository")}
                </a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noreferrer">
                    <i class="fas fa-arrow-up-right-from-square"></i> ${tr("projectLive")}
                </a>` : ""}
            </div>
        `;
        return el;
    }

    // ── Render repositories ───────────────────────────────────────
    function renderRepositories(repos) {
        cachedRepos = repos;
        if (!projectsGrid) return;
        projectsGrid.innerHTML = "";

        const featured = Object.keys(projectCatalog)
            .map(name => repos.find(r => r.name === name))
            .filter(Boolean);

        featured.forEach(repo => {
            projectsGrid.appendChild(buildCard(repo, projectCatalog[repo.name]));
        });

        if (featuredCount) featuredCount.textContent = String(featured.length);
        if (githubSummary) githubSummary.innerHTML =
            `<span class="pill">${featured.length} ${tr("githubFeatured")}</span>`;

        observeReveals();
    }

    function renderFallback() {
        renderRepositories([
            { name: "simba-2",       html_url: "https://github.com/Byiringiro-Gad/simba-2",       homepage: "https://simba2gad.vercel.app",             language: "TypeScript", updated_at: new Date().toISOString(), stargazers_count: 0 },
            { name: "ngamia",        html_url: "https://github.com/Byiringiro-Gad/ngamia",        homepage: "https://ngamia.vercel.app",                language: "JavaScript", updated_at: new Date().toISOString(), stargazers_count: 0 },
            { name: "potfolio",      html_url: "https://github.com/Byiringiro-Gad/potfolio", homepage: "https://byiringiro-gad.github.io/potfolio/", language: "HTML",       updated_at: new Date().toISOString(), stargazers_count: 0 },
            { name: "leetcodeconnect", html_url: "https://github.com/Byiringiro-Gad/leetcodeconnect", homepage: "",                                         language: "Python",     updated_at: new Date().toISOString(), stargazers_count: 0 },
        ]);
        if (githubSummary) githubSummary.innerHTML =
            `<span class="pill">${tr("githubUnavailable")}</span>`;
    }
    async function loadRepositories() {
        try {
            const res = await fetch("https://api.github.com/users/Byiringiro-Gad/repos?sort=updated&per_page=100");
            if (!res.ok) throw new Error("failed");
            renderRepositories(await res.json());
        } catch {
            renderFallback();
        }
    }

    // ── Codeforces ────────────────────────────────────────────────
    async function loadCodeforcesStats() {
        if (!cfVisualStats) return;
        try {
            const res  = await fetch("https://codeforces.com/api/user.info?handles=gadcoder");
            const data = await res.json();
            if (data.status !== "OK") throw new Error("cf failed");
            const u = data.result[0];
            cfVisualStats.innerHTML = `<img src="https://cf-graph-gen.vercel.app/graph?handle=gadcoder&theme=dark" alt="Codeforces graph">`;
            if (cfSummary) cfSummary.innerHTML = `
                <span class="pill">${u.rank || tr("codeforcesUnrated")}</span>
                <span class="pill">${tr("ratingLabel")}: ${u.rating || "N/A"}</span>
                <span class="pill">${tr("maxLabel")}: ${u.maxRating || "N/A"}</span>`;
        } catch {
            cfVisualStats.innerHTML = `<span class="pill">${tr("codeforcesUnavailable")}</span>`;
            if (cfSummary) cfSummary.innerHTML = `<span class="pill">${tr("codeforcesFallback")}</span>`;
        }
    }

    // ── Photo modal ───────────────────────────────────────────────
    function openPhoto(src, caption) {
        if (!photoModal) return;
        photoModalImage.src        = src;
        photoModalImage.alt        = caption;
        photoCaption.textContent   = caption;
        photoModal.classList.add("is-open");
        photoModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closePhoto() {
        photoModal?.classList.remove("is-open");
        photoModal?.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function setupPhotos() {
        // All elements that can trigger the photo modal
        document.querySelectorAll("[data-photo-src]").forEach(el => {
            el.addEventListener("click", () => {
                openPhoto(
                    el.dataset.photoSrc,
                    el.dataset.photoCaption || el.getAttribute("aria-label") || "Photo"
                );
            });
        });
        photoClose?.addEventListener("click", closePhoto);
        photoModal?.addEventListener("click", e => { if (e.target === photoModal) closePhoto(); });
        document.addEventListener("keydown", e => { if (e.key === "Escape") closePhoto(); });
    }

    // ── Contact form ──────────────────────────────────────────────
    function setupContactForm() {
        const form      = document.getElementById("portfolio-form");
        const submitBtn = document.getElementById("submit-btn");
        const status    = document.getElementById("contact-status");
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

            try {
                await emailjs.send("service_vl53akj", "template_d0fse2s", {
                    name:    document.getElementById("name").value,
                    email:   document.getElementById("email").value,
                    message: document.getElementById("message").value
                });
                status.textContent   = "Message received! I will get back to you soon.";
                status.style.display = "block";
                form.reset();
            } catch {
                status.textContent   = "Failed to send. Please email me directly.";
                status.style.display = "block";
            } finally {
                submitBtn.disabled  = false;
                submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i><span>${tr("formSubmit")}</span>`;
            }
        });
    }

    // ── Reveal on scroll ──────────────────────────────────────────
    function observeReveals() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => observer.observe(el));
    }

    // ── Language selects ──────────────────────────────────────────
    function setupLanguage() {
        langSelects.forEach(sel => {
            sel?.addEventListener("change", e => applyLanguage(e.target.value));
        });
    }

    // ── Init ──────────────────────────────────────────────────────
    setupTheme();
    setupLanguage();
    setupMobileMenu();
    setupScrollSpy();
    setupPhotos();
    setupContactForm();
    observeReveals();
    applyLanguage(currentLang);
    updateVisitCounter();
    loadRepositories();
    loadCodeforcesStats();
    setupCustomCursor();
    setupProjectPreview();
    setupAvatarTilt();
});

// ── Custom cursor ─────────────────────────────────────────────
function setupCustomCursor() {
    // Only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-cursor");
    document.body.style.cursor = "none";

    const dot  = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mx = -100, my = -100;   // real mouse position
    let rx = -100, ry = -100;   // ring lagged position

    // Move dot instantly
    document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + "px";
        dot.style.top  = my + "px";
    });

    // Ring follows with lerp
    function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + "px";
        ring.style.top  = ry + "px";
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Grow ring on hoverable elements
    const hoverTargets = "a, button, .project-card, .gallery-photo, .award-chip, .platform-card, .tag-cloud span, .avatar-wrap";
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(hoverTargets)) ring.classList.add("hovering");
    });
    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(hoverTargets)) ring.classList.remove("hovering");
    });

    // Hide when leaving window
    document.addEventListener("mouseleave", () => { dot.style.opacity = "0"; ring.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { dot.style.opacity = "1"; ring.style.opacity = ""; });
}

// ── Project image preview (Dennis hover feature) ──────────────
function setupProjectPreview() {
    const preview = document.getElementById("project-preview");
    if (!preview) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Map repo names to preview images / icons
    const previewMap = {
        "simba-2":        { img: null, icon: "fa-cart-shopping",     color: "#f97316" },
        "ngamia":         { img: null, icon: "fa-shop",              color: "#64ffda" },
        "potfolio":       { img: null, icon: "fa-wand-magic-sparkles",color: "#818cf8" },
        "leetcodeconnect":{ img: null, icon: "fa-diagram-project",   color: "#facc15" },
    };

    let moveHandler = null;

    // Attach to project cards after they render
    function attachPreviews() {
        document.querySelectorAll(".project-card").forEach(card => {
            // Determine which project this card is
            const repoName = Object.keys(previewMap).find(name =>
                card.querySelector("h3")?.textContent.toLowerCase().includes(
                    name === "simba-2" ? "simba" :
                    name === "potfolio" ? "portfolio" :
                    name === "leetcodeconnect" ? "leetcode" :
                    name
                )
            );
            const meta = previewMap[repoName] || { icon: "fa-code", color: "#64ffda" };

            card.addEventListener("mouseenter", () => {
                // Build preview content
                if (meta.img) {
                    preview.innerHTML = `<img src="${meta.img}" alt="preview">`;
                } else {
                    preview.innerHTML = `<div class="project-preview-icon" style="color:${meta.color}"><i class="fas ${meta.icon}"></i></div>`;
                }
                preview.classList.add("visible");

                moveHandler = (e) => {
                    // Offset so preview doesn't sit under cursor
                    const x = e.clientX + 20;
                    const y = e.clientY - 80;
                    // Keep within viewport
                    const maxX = window.innerWidth  - 240;
                    const maxY = window.innerHeight - 160;
                    preview.style.left = Math.min(x, maxX) + "px";
                    preview.style.top  = Math.max(10, Math.min(y, maxY)) + "px";
                };
                document.addEventListener("mousemove", moveHandler);
            });

            card.addEventListener("mouseleave", () => {
                preview.classList.remove("visible");
                if (moveHandler) {
                    document.removeEventListener("mousemove", moveHandler);
                    moveHandler = null;
                }
            });
        });
    }

    // Run immediately and also after projects load (JS-injected cards)
    attachPreviews();
    const gridObserver = new MutationObserver(attachPreviews);
    const grid = document.getElementById("projects-grid");
    if (grid) gridObserver.observe(grid, { childList: true });
}

// ── Avatar 3D tilt ────────────────────────────────────────────
function setupAvatarTilt() {
    const wrap = document.querySelector(".avatar-wrap");
    if (!wrap) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    wrap.addEventListener("mousemove", (e) => {
        const r    = wrap.getBoundingClientRect();
        const x    = (e.clientX - r.left) / r.width  - 0.5;
        const y    = (e.clientY - r.top)  / r.height - 0.5;
        wrap.style.transform = `perspective(300px) rotateY(${x * 20}deg) rotateX(${y * -20}deg) scale(1.06)`;
    });
    wrap.addEventListener("mouseleave", () => {
        wrap.style.transform = "";
    });
}