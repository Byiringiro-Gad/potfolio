// THE ARCHITECT V2 - INTERACTIVE ENGINE
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. NEURAL NETWORK BACKGROUND (Innovation)
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const connectionDistance = 150;

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = 1.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(16, 185, 129, 0.5)';
            ctx.fill();
        }
    }

    function createNetwork() {
        particles = [];
        const count = (canvas.width * canvas.height) / 15000;
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function animateNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(16, 185, 129, ${1 - dist / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateNetwork);
    }

    initCanvas();
    createNetwork();
    animateNetwork();
    window.addEventListener('resize', () => { initCanvas(); createNetwork(); });

    // 2. MAGNETIC CURSOR SYSTEM
    const cursor = document.getElementById('cursor');
    const glow = document.getElementById('cursor-glow');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.2 });
    });

    const hoverables = document.querySelectorAll('a, button, .project-card, .tag-vibrant');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(glow, { scale: 2, backgroundColor: 'rgba(16, 185, 129, 0.1)', duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(glow, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
        });
    });

    // 3. GSAP SCROLL REVEALS
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out'
    });

    gsap.from('.hero-visual', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
    });

    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 70%'
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });

    // Innovation: Dynamic 3D tilt for cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(card, {
                rotateY: x * 0.05,
                rotateX: -y * 0.05,
                duration: 0.5
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5 });
        });
    });
});
