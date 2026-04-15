document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const languageSelect = document.getElementById("language-select");
    const sectionJump = document.getElementById("section-jump");
    const roleText = document.getElementById("role-text");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const photoModal = document.getElementById("photo-modal");
    const photoModalImage = document.getElementById("photo-modal-image");
    const photoClose = document.getElementById("photo-close");
    const photoTriggers = [
        document.getElementById("photo-trigger"),
        ...document.querySelectorAll(".gallery-photo")
    ];
    const visitCount = document.getElementById("visit-count");
    const projectsGrid = document.getElementById("projects-grid");

    const translations = {
        en: {
            navWorks: "Works",
            navProjects: "Projects",
            navSkills: "Skills",
            navAwards: "Awards",
            navJourney: "Journey",
            navDocs: "Docs",
            jumpTo: "Jump to section",
            heroIntro: "Hello, this is Gad. Welcome to my personal website.",
            eyebrow: "Software Engineering Student",
            heroSummary: "I build practical software, sharpen problem-solving through algorithms, and keep growing through A2SV and university training.",
            visitLabel: "Portfolio visits",
            locationLabel: "Base",
            locationValue: "Kigali, Rwanda",
            workTitle: "Work",
            workBody: "I am a software engineering student who enjoys learning new things and solving real problems through technology. I am currently part of A2SV Generation 7, where I train intensively in data structures, algorithms, and system design to build high-impact digital solutions.",
            projectsTitle: "Projects",
            projectsCta: "View all on GitHub",
            projectsIntro: "Featured repositories are loaded from GitHub so this section stays current as I keep building.",
            projectsLoading: "Fetching recent public repositories from GitHub.",
            projectsError: "GitHub projects could not be loaded right now. Use the link above to view all repositories.",
            projectLive: "Open repository",
            projectStars: "Stars",
            projectUpdated: "Updated",
            skillsTitle: "Skills",
            skillCoreTitle: "Core Technical Skills",
            skillPlatformTitle: "Practice & Platforms",
            skillLanguageTitle: "Languages",
            leetcodeCopy: "Algorithm practice and contest-style problem solving.",
            githubCopy: "Code, repositories, and continuous learning projects.",
            linkedinCopy: "Professional profile, network, and academic progress.",
            langEnglish: "English - Proficient",
            langFrench: "French - Working proficiency",
            langKinyarwanda: "Kinyarwanda - Native",
            awardsTitle: "Honors & Awards",
            awardEfTitle: "EF Graduation Certificate",
            awardEfBody: "Certificate documenting English language learning and program completion.",
            awardCiscoTitle: "Cisco Certificate",
            awardCiscoBody: "Networking and technical training certificate from Cisco.",
            awardIsocTitle: "Internet Society Certificate",
            awardIsocBody: "Recognition from the Internet Society highlighting my engagement with global internet learning, community, and digital development.",
            openCertificate: "Open certificate",
            journeyTitle: "Professional Journey",
            journey1: "Pursuing a B.Sc. in Software Engineering at Adventist University of Central Africa (AUCA), with strong academic performance and continued technical growth.",
            journey2: "Training as an A2SV Generation 7 student with strong focus on data structures, algorithms, and system design for scalable software.",
            journey3: "Graduated from Ecoles de Science de Musanze (MCB).",
            docsTitle: "Documents",
            downloadResume: "Download Resume",
            viewTranscript: "View Transcript",
            viewCisco: "View Cisco Certificate",
            viewEf: "View EF Certificate",
            galleryTitle: "Photo Gallery",
            galleryBody: "Tap or click the picture to view it in full size.",
            socialTitle: "On the Web",
            hobbiesTitle: "I Love",
            hobbiesBody: "Coding, reading, football, and solving real-world problems.",
            footerCopy: "© 2026 BYIRINGIRO Gad. All rights reserved."
        },
        fr: {
            navWorks: "Travaux",
            navProjects: "Projets",
            navSkills: "Competences",
            navAwards: "Distinctions",
            navJourney: "Parcours",
            navDocs: "Documents",
            jumpTo: "Aller a une section",
            heroIntro: "Bonjour, je suis Gad. Bienvenue sur mon site personnel.",
            eyebrow: "Etudiant en genie logiciel",
            heroSummary: "Je cree des logiciels utiles, je renforce ma logique par les algorithmes, et je progresse grace a A2SV et a l'universite.",
            visitLabel: "Visites du portfolio",
            locationLabel: "Base",
            locationValue: "Kigali, Rwanda",
            workTitle: "Travaux",
            workBody: "Je suis etudiant en genie logiciel et j'aime apprendre de nouvelles choses ainsi que resoudre de vrais problemes grace a la technologie. Je fais actuellement partie de la Generation 7 de A2SV, ou je suis une formation intensive en structures de donnees, algorithmes et conception de systemes pour creer des solutions numeriques a fort impact.",
            projectsTitle: "Projets",
            projectsCta: "Voir tout sur GitHub",
            projectsIntro: "Les depots mis en avant sont charges depuis GitHub afin que cette section reste a jour pendant que je continue a construire.",
            projectsLoading: "Chargement des depots publics recents depuis GitHub.",
            projectsError: "Les projets GitHub ne peuvent pas etre charges pour le moment. Utilisez le lien ci-dessus pour voir tous les depots.",
            projectLive: "Ouvrir le depot",
            projectStars: "Etoiles",
            projectUpdated: "Mis a jour",
            skillsTitle: "Competences",
            skillCoreTitle: "Competences techniques principales",
            skillPlatformTitle: "Pratique et plateformes",
            skillLanguageTitle: "Langues",
            leetcodeCopy: "Pratique des algorithmes et resolution de problemes de style concours.",
            githubCopy: "Code, depots, et projets d'apprentissage en continu.",
            linkedinCopy: "Profil professionnel, reseau et progression academique.",
            langEnglish: "Anglais - Bon niveau",
            langFrench: "Francais - Niveau professionnel",
            langKinyarwanda: "Kinyarwanda - Langue maternelle",
            awardsTitle: "Distinctions et prix",
            awardEfTitle: "Certificat de fin d'etudes EF",
            awardEfBody: "Certificat attestant l'apprentissage de l'anglais et la fin du programme.",
            awardCiscoTitle: "Certificat Cisco",
            awardCiscoBody: "Certificat de formation technique et reseau de Cisco.",
            awardIsocTitle: "Certificat Internet Society",
            awardIsocBody: "Reconnaissance de l'Internet Society mettant en valeur mon engagement dans l'apprentissage du numerique, la communaute Internet et le developpement digital.",
            openCertificate: "Ouvrir le certificat",
            journeyTitle: "Parcours professionnel",
            journey1: "Preparation d'une licence en genie logiciel a l'Universite Adventiste d'Afrique Centrale (AUCA), avec de bons resultats academiques et une croissance technique continue.",
            journey2: "Formation en tant qu'etudiant A2SV Generation 7 avec un fort accent sur les structures de donnees, les algorithmes et la conception de systemes pour des logiciels evolutifs.",
            journey3: "Diplome des Ecoles de Science de Musanze (MCB).",
            docsTitle: "Documents",
            downloadResume: "Telecharger le CV",
            viewTranscript: "Voir le releve",
            viewCisco: "Voir le certificat Cisco",
            viewEf: "Voir le certificat EF",
            galleryTitle: "Galerie photo",
            galleryBody: "Touchez ou cliquez sur la photo pour l'afficher en taille complete.",
            socialTitle: "Sur le web",
            hobbiesTitle: "J'aime",
            hobbiesBody: "Coder, lire, le football et resoudre des problemes reels.",
            footerCopy: "© 2026 BYIRINGIRO Gad. Tous droits reserves."
        },
        rw: {
            navWorks: "Ibikorwa",
            navProjects: "Imishinga",
            navSkills: "Ubumenyi",
            navAwards: "Ibihembo",
            navJourney: "Urugendo",
            navDocs: "Inyandiko",
            jumpTo: "Jya ku gice ushaka",
            heroIntro: "Muraho, ndi Gad. Murakaza neza ku rubuga rwanjye bwite.",
            eyebrow: "Umunyeshuri wa Software Engineering",
            heroSummary: "Nkora software ifite akamaro, nkongera ubushobozi bwo gukemura ibibazo nkoresheje algorithms, kandi nkomeza gukura binyuze muri A2SV na kaminuza.",
            visitLabel: "Abasuye portfolio",
            locationLabel: "Aherereye",
            locationValue: "Kigali, Rwanda",
            workTitle: "Ibikorwa",
            workBody: "Ndi umunyeshuri wa software engineering ukunda kwiga ibintu bishya no gukemura ibibazo nyabyo hifashishijwe ikoranabuhanga. Ubu ndi muri A2SV Generation 7 aho ndimo guhugurwa cyane muri data structures, algorithms, na system design kugira ngo nubake ibisubizo bifitiye abantu akamaro.",
            projectsTitle: "Imishinga",
            projectsCta: "Reba byose kuri GitHub",
            projectsIntro: "Imishinga yatoranyijwe ivanwa kuri GitHub kugira ngo iki gice gikomeze kujyana n'ibyo nkora bishya.",
            projectsLoading: "Turimo kuzana repositories za GitHub ziheruka.",
            projectsError: "Imishinga ya GitHub ntiyabonetse ubu. Koresha link iri hejuru urebe repositories zose.",
            projectLive: "Fungura repository",
            projectStars: "Inyenyeri",
            projectUpdated: "Byavuguruwe",
            skillsTitle: "Ubumenyi",
            skillCoreTitle: "Ubumenyi bw'ibanze bwa tekiniki",
            skillPlatformTitle: "Aho niga kandi nkorera imyitozo",
            skillLanguageTitle: "Indimi",
            leetcodeCopy: "Imyitozo ya algorithms n'ibibazo byo mu marushanwa.",
            githubCopy: "Code, repositories, n'imishinga yo gukomeza kwiga.",
            linkedinCopy: "Umwirondoro w'akazi, network, n'iterambere mu masomo.",
            langEnglish: "Icyongereza - Nzi neza",
            langFrench: "Igifaransa - Nzi kugikoresha mu kazi",
            langKinyarwanda: "Ikinyarwanda - Ururimi kavukire",
            awardsTitle: "Ibihembo n'icyubahiro",
            awardEfTitle: "Impamyabumenyi ya EF",
            awardEfBody: "Impamyabumenyi yerekana ko narangije gahunda yo kwiga icyongereza.",
            awardCiscoTitle: "Impamyabumenyi ya Cisco",
            awardCiscoBody: "Impamyabumenyi y'amahugurwa ya Cisco mu bya networking na tekiniki.",
            awardIsocTitle: "Impamyabumenyi ya Internet Society",
            awardIsocBody: "Icyemezo cya Internet Society kigaragaza uruhare rwanjye mu myigire y'ikoranabuhanga, umuganda wa Internet, n'iterambere rya digitali.",
            openCertificate: "Fungura impamyabumenyi",
            journeyTitle: "Urugendo rw'umwuga",
            journey1: "Ndimo kwiga Bachelor mu bya Software Engineering muri Adventist University of Central Africa (AUCA), nkomeza gutsinda neza no kwagura ubumenyi bwa tekiniki.",
            journey2: "Ndimo guhugurwa muri A2SV Generation 7 nshyize imbaraga cyane muri data structures, algorithms, na system design kugira ngo nkore software ishobora kwaguka neza.",
            journey3: "Narangije amashuri yisumbuye muri Ecoles de Science de Musanze (MCB).",
            docsTitle: "Inyandiko",
            downloadResume: "Kuramo CV",
            viewTranscript: "Reba transcript",
            viewCisco: "Reba impamyabumenyi ya Cisco",
            viewEf: "Reba impamyabumenyi ya EF",
            galleryTitle: "Ububiko bw'amafoto",
            galleryBody: "Kanda ku ifoto uyibone mu bunini bwayo bwose.",
            socialTitle: "Ku mbuga",
            hobbiesTitle: "Nkunda",
            hobbiesBody: "Coding, gusoma, umupira w'amaguru, no gukemura ibibazo byo mu buzima busanzwe.",
            footerCopy: "© 2026 BYIRINGIRO Gad. Uburenganzira bwose burabitswe."
        }
    };

    const typingRoles = {
        en: ["Software Engineer", "A2SV G7 Student", "Problem Solver", "Lifelong Learner"],
        fr: ["Ingenieur logiciel", "Etudiant A2SV G7", "Resolveur de problemes", "Apprenant permanent"],
        rw: ["Inzobere muri software", "Umunyeshuri wa A2SV G7", "Ukemura ibibazo", "Uhora wiga"]
    };

    let currentLanguage = localStorage.getItem("portfolio-language") || "en";
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;
    let cachedRepositories = [];

    function applyLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem("portfolio-language", lang);
        document.documentElement.lang = lang === "rw" ? "rw" : lang;
        languageSelect.value = lang;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        roleIndex = 0;
        charIndex = 0;
        isDeleting = false;
        clearTimeout(typingTimeout);
        typeRoles();

        if (cachedRepositories.length) {
            renderProjects(cachedRepositories);
        }
    }

    function typeRoles() {
        const roles = typingRoles[currentLanguage];
        const currentRole = roles[roleIndex];

        roleText.textContent = isDeleting
            ? currentRole.substring(0, charIndex - 1)
            : currentRole.substring(0, charIndex + 1);

        charIndex += isDeleting ? -1 : 1;

        let speed = isDeleting ? 45 : 95;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            speed = 1700;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 420;
        }

        typingTimeout = setTimeout(typeRoles, speed);
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-mode");
        body.classList.toggle("dark-mode");
        themeIcon.classList.toggle("fa-moon");
        themeIcon.classList.toggle("fa-sun");
        localStorage.setItem("portfolio-theme", body.classList.contains("light-mode") ? "light" : "dark");
    });

    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    languageSelect.addEventListener("change", (event) => {
        applyLanguage(event.target.value);
    });

    sectionJump.addEventListener("change", (event) => {
        const targetId = event.target.value;
        if (!targetId) {
            return;
        }

        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        sectionJump.value = "";
    });

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    function openPhoto() {
        const source = this?.dataset?.photoSrc || this?.querySelector("img")?.getAttribute("src") || "gad.jpg";
        const alt = this?.querySelector("img")?.getAttribute("alt") || "BYIRINGIRO Gad full portrait";
        photoModalImage.src = source;
        photoModalImage.alt = alt;
        photoModal.classList.add("is-open");
        photoModal.setAttribute("aria-hidden", "false");
    }

    function closePhoto() {
        photoModal.classList.remove("is-open");
        photoModal.setAttribute("aria-hidden", "true");
    }

    photoTriggers.forEach((trigger) => {
        trigger.addEventListener("click", openPhoto);
    });

    photoClose.addEventListener("click", closePhoto);
    photoModal.addEventListener("click", (event) => {
        if (event.target === photoModal) {
            closePhoto();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePhoto();
        }
    });

    document.querySelectorAll(".protected-media, .protected-doc").forEach((element) => {
        element.addEventListener("contextmenu", (event) => event.preventDefault());
        element.addEventListener("dragstart", (event) => event.preventDefault());
    });

    function animateCounter(targetValue) {
        const duration = 1400;
        const startTime = performance.now();

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(targetValue * eased);
            visitCount.textContent = currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                visitCount.textContent = targetValue.toLocaleString();
            }
        }

        visitCount.textContent = "0";
        requestAnimationFrame(step);
    }

    async function updateVisitCounter() {
        const namespace = "byiringiro-gad-portfolio";
        const key = window.location.hostname ? `${window.location.hostname}-visits` : "local-preview-visits";

        try {
            const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
            const data = await response.json();
            if (typeof data.value === "number") {
                animateCounter(data.value);
                return;
            }
        } catch (error) {
            // Fallback below for local or offline previews.
        }

        const localValue = Number(localStorage.getItem("portfolio-local-visits") || "0") + 1;
        localStorage.setItem("portfolio-local-visits", String(localValue));
        animateCounter(localValue);
    }

    function renderProjects(repositories) {
        cachedRepositories = repositories;
        projectsGrid.innerHTML = "";

        repositories.forEach((repo) => {
            const card = document.createElement("article");
            card.className = "info-card";

            const updatedDate = new Date(repo.updated_at).toLocaleDateString(document.documentElement.lang || "en");
            const description = repo.description || "Repository on GitHub.";
            const projectLive = translations[currentLanguage].projectLive;
            const projectStars = translations[currentLanguage].projectStars;
            const projectUpdated = translations[currentLanguage].projectUpdated;

            const title = document.createElement("h3");
            title.className = "project-card-title";
            title.textContent = formatRepositoryName(repo.name);

            const bodyText = document.createElement("p");
            bodyText.textContent = description;

            const stars = document.createElement("p");
            const starsLabel = document.createElement("strong");
            starsLabel.textContent = `${projectStars}: `;
            stars.append(starsLabel, document.createTextNode(String(repo.stargazers_count)));

            const updated = document.createElement("p");
            const updatedLabel = document.createElement("strong");
            updatedLabel.textContent = `${projectUpdated}: `;
            updated.append(updatedLabel, document.createTextNode(updatedDate));

            const link = document.createElement("a");
            link.className = "inline-link";
            link.href = repo.html_url;
            link.target = "_blank";
            link.rel = "noreferrer";
            link.textContent = projectLive;

            card.append(title, bodyText, stars, updated, link);
            projectsGrid.appendChild(card);
        });
    }

    async function loadProjects() {
        try {
            const response = await fetch("https://api.github.com/users/Byiringiro-Gad/repos?sort=updated&per_page=6");
            if (!response.ok) {
                throw new Error("GitHub request failed");
            }

            const repositories = await response.json();
            const filtered = repositories
                .filter((repo) => !repo.fork)
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 6);

            if (!filtered.length) {
                throw new Error("No repositories available");
            }

            renderProjects(filtered);
        } catch (error) {
            projectsGrid.innerHTML = `
                <article class="info-card">
                    <h3>GitHub</h3>
                    <p>${translations[currentLanguage].projectsError}</p>
                    <a class="inline-link" href="https://github.com/Byiringiro-Gad?tab=repositories" target="_blank" rel="noreferrer">${translations[currentLanguage].projectsCta}</a>
                </article>
            `;
        }
    }

    function formatRepositoryName(name) {
        return name
            .replace(/[-_]+/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    applyLanguage(currentLanguage);
    updateVisitCounter();
    loadProjects();

    if (window.gsap) {
        gsap.from(".section, .hero-card, .hero-header", {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
    }
});
