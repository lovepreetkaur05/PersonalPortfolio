document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. Mobile Menu Toggle */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    /* 2. Background Abstract Shapes using Anime.js */
    const canvas = document.getElementById('bg-canvas');
    const colors = ['#00e5ff', '#7d5aff', '#0c0f1a'];
    
    // Generate background shapes
    for(let i = 0; i < 15; i++) {
        let shape = document.createElement('div');
        shape.classList.add('bg-shape');
        
        let size = Math.random() * 300 + 50;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.background = colors[Math.floor(Math.random() * colors.length)];
        shape.style.top = `${Math.random() * 100}vh`;
        shape.style.left = `${Math.random() * 100}vw`;
        
        canvas.appendChild(shape);
    }
    
    // Animate background shapes
    anime({
        targets: '.bg-shape',
        translateX: function() { return anime.random(-200, 200) },
        translateY: function() { return anime.random(-200, 200) },
        scale: function() { return anime.random(0.5, 1.5) },
        easing: 'easeInOutQuad',
        duration: function() { return anime.random(5000, 10000) },
        direction: 'alternate',
        loop: true
    });

    /* 3. Hero Section Entrance Animation */
    anime({
        targets: '.hero-content .hidden-element',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(200, {start: 300}),
        easing: 'easeOutExpo',
        duration: 1500
    });

    anime({
        targets: '.hero-visual',
        scale: [0.8, 1],
        opacity: [0, 1],
        delay: 1000,
        easing: 'easeOutElastic(1, .8)',
        duration: 2000
    });

    /* 4. Intersection Observer for Scroll Animations */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate Section Titles
                if(entry.target.classList.contains('section-title')) {
                    anime({
                        targets: entry.target,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        easing: 'easeOutQuad',
                        duration: 800
                    });
                }
                
                // Animate Progress Bars
                if(entry.target.classList.contains('skills')) {
                    const bars = entry.target.querySelectorAll('.progress');
                    bars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        anime({
                            targets: bar,
                            width: [0, width],
                            easing: 'easeOutExpo',
                            duration: 1500,
                            delay: anime.stagger(100)
                        });
                    });
                }
                
                // Project Cards
                if(entry.target.classList.contains('projects-grid') || entry.target.classList.contains('certificates-grid')) {
                    anime({
                        targets: entry.target.children,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(150),
                        easing: 'easeOutQuad',
                        duration: 1000
                    });
                }
                
                // Timeline Items
                if(entry.target.classList.contains('timeline')) {
                    anime({
                        targets: '.timeline-item',
                        translateX: [-30, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(200),
                        easing: 'easeOutQuad',
                        duration: 800
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    document.querySelectorAll('.section-title').forEach(el => {
        el.style.opacity = '0'; // Hide initially
        animateOnScroll.observe(el);
    });
    
    const skillsSection = document.querySelector('.skills');
    if(skillsSection) animateOnScroll.observe(skillsSection);
    
    document.querySelectorAll('.projects-grid, .certificates-grid, .timeline').forEach(el => {
        Array.from(el.children).forEach(child => child.style.opacity = '0'); // Hide children initially
        animateOnScroll.observe(el);
    });

    /* Smooth Scrolling for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu if open
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
