/**
 * Falk Thore Gebhardt - Modern Landing Page
 * Main JavaScript for interactivity and Frankfurt skyline animation
 */

class FrankfurtSkyline {
    constructor() {
        this.canvas = document.getElementById('skyline-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.buildings = this.generateBuildings();
        this.stars = this.generateStars();
        this.rayAngle = 0;
        this.raySpeed = 0.00018;

        this.resize();
        this.bindEvents();
        this.animate();
    }

    generateBuildings() {
        return [
            { x: 0.05, width: 0.04, height: 0.25, color: '#1a4d85' },
            { x: 0.12, width: 0.06, height: 0.40, color: '#0f2847' },
            { x: 0.20, width: 0.05, height: 0.30, color: '#153a66' },
            { x: 0.28, width: 0.08, height: 0.50, color: '#0a1628' },
            { x: 0.38, width: 0.07, height: 0.45, color: '#1a4d85' },
            { x: 0.48, width: 0.10, height: 0.70, color: '#0f2847' },
            { x: 0.60, width: 0.06, height: 0.55, color: '#153a66' },
            { x: 0.68, width: 0.09, height: 0.60, color: '#0a1628' },
            { x: 0.79, width: 0.05, height: 0.40, color: '#1a4d85' },
            { x: 0.86, width: 0.07, height: 0.45, color: '#0f2847' }
        ];
    }

    generateStars() {
        const stars = [];
        for (let i = 0; i < 80; i++) {
            stars.push({
                x: Math.random(),
                y: Math.random() * 0.25,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.7 + 0.3,
                twinkle: Math.random() * Math.PI * 2
            });
        }
        return stars;
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
    }

    drawBuildings() {
        const ctx = this.ctx;
        const height = this.height;

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#030406');
        gradient.addColorStop(0.55, '#07090e');
        gradient.addColorStop(1, '#0b1220');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, height);

        this.buildings.forEach(building => {
            const hue = Math.sin(building.x * 10) * 8 + 220;
            const saturation = 28 + Math.sin(building.x * 5) * 8;
            const lightness = 9 + Math.sin(building.x * 3) * 3;
            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

            ctx.fillRect(
                building.x * this.width,
                height - building.height * height,
                building.width * this.width,
                building.height * height
            );

            const windowWidth = 0.004 * this.width;
            const windowHeight = 0.008 * height;
            const windowSpacing = 0.012 * this.width;

            for (let y = height - building.height * height + windowHeight;
                 y < height - 0.05 * height;
                 y += windowSpacing) {
                for (let x = building.x * this.width + windowWidth;
                     x < (building.x + building.width) * this.width - windowWidth;
                     x += windowSpacing * 1.2) {
                    if (Math.random() > 0.4) {
                        ctx.fillStyle = `rgba(212, 175, 55, ${Math.random() * 0.22 + 0.12})`;
                        ctx.fillRect(x, y, windowWidth, windowHeight);
                    }
                }
            }
        });
    }

    drawStars() {
        const ctx = this.ctx;
        const height = this.height;

        this.stars.forEach(star => {
            const twinkle = Math.sin(star.twinkle + Date.now() * 0.001) * 0.3 + 0.7;
            ctx.globalAlpha = star.opacity * twinkle;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(
                star.x * this.width,
                star.y * height,
                star.size,
                0,
                Math.PI * 2
            );
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }

    drawRay() {
        const ctx = this.ctx;
        const centerX = this.width * 0.5;
        const centerY = this.height * 0.5;
        const maxRadius = Math.max(this.width, this.height) * 1.2;

        for (let i = 0; i < 3; i++) {
            const colors = ['#d4af37', '#b91c8c', '#3d4f66'];
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, maxRadius
            );
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.4, 'transparent');
            gradient.addColorStop(0.5, colors[i] + '30');
            gradient.addColorStop(0.6, colors[i] + '10');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width, this.height);
        }

        for (let i = 0; i < 30; i++) {
            const distance = (Math.sin(Date.now() * 0.001 + i) * 0.5 + 0.5) * maxRadius * 0.7;
            const particleAngle = this.rayAngle + (Math.sin(Date.now() * 0.0005 + i) * 0.2);
            const x = centerX + Math.cos(particleAngle) * distance;
            const y = centerY + Math.sin(particleAngle) * distance;
            const size = (Math.sin(Date.now() * 0.002 + i) * 0.5 + 0.5) * 2;
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = ['#d4af37', '#b91c8c', '#8a6a16'][i % 3];
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        this.rayAngle += this.raySpeed;
    }

    animate() {
        this.drawBuildings();
        this.drawStars();
        this.drawRay();
        requestAnimationFrame(() => this.animate());
    }
}

class Navigation {
    constructor() {
        this.navbar = document.getElementById('main-nav');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navLinkItems = document.querySelectorAll('.nav-link');
        this.backToTop = document.getElementById('back-to-top');
        this.bindEvents();
    }

    bindEvents() {
        if (this.navToggle && this.navLinks) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        document.addEventListener('click', (e) => {
            if (this.navLinks && !this.navLinks.contains(e.target) &&
                !this.navToggle.contains(e.target) &&
                this.navLinks.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMobileMenu() {
        if (this.navToggle && this.navLinks) {
            this.navToggle.classList.toggle('active');
            this.navLinks.classList.toggle('active');
            document.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : '';
        }
    }

    closeMobileMenu() {
        if (this.navToggle && this.navLinks) {
            this.navToggle.classList.remove('active');
            this.navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) this.navbar.classList.add('scrolled');
        else this.navbar.classList.remove('scrolled');
        if (this.backToTop && scrollY > window.innerHeight) this.backToTop.classList.add('visible');
        else if (this.backToTop) this.backToTop.classList.remove('visible');
    }
}

class BackToTop {
    constructor() {
        this.backToTop = document.getElementById('back-to-top');
        if (this.backToTop) {
            this.backToTop.addEventListener('click', () => this.scrollToTop());
        }
    }
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FrankfurtSkyline();
    new Navigation();
    new BackToTop();
});
