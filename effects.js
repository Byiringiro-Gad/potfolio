// ADVANCED INTERACTIVE EFFECTS - ARCHITECT PRO
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MAGIC FLUID BACKGROUND CANVAS
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = 150;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < maxDistance) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        let numberOfParticles = (canvas.width * canvas.height) / 8000;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    initCanvas();
    createParticles();
    animate();
    window.addEventListener('resize', () => {
        initCanvas();
        createParticles();
    });

    // 2. REFINED CUSTOM CURSOR SYSTEM
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'custom-cursor';
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });
    });

    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-cat, .glass');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            gsap.to(follower, { scale: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.8)', duration: 0.3 });
        });
        target.addEventListener('mouseleave', () => {
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.6)', duration: 0.3 });
        });
    });

    // 3. GSAP SCROLL REVEALS
    gsap.registerPlugin(ScrollTrigger);

    // Section Titles Reveal
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Project Cards Reveal - Faster staggering
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    });

    // Skill Category Reveal
    gsap.from('.skill-cat', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Smooth reveal for all glass elements
    gsap.utils.toArray('.glass').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
            },
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power2.out'
        });
    });
});
