document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Production Loader FadeOut Execution
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 500);
    });
    // Fallback if load event already fired
    if (document.readyState === "complete") {
        loader.style.opacity = "0";
        loader.style.display = "none";
    }

    // 2. Mobile Responsive Hamburgers Configuration
    const hamburger = document.querySelector(".hamburger");
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-link");

    const toggleMenu = () => {
        hamburger.classList.toggle("active");
        navLinksContainer.classList.toggle("active");
    };

    hamburger.addEventListener("click", toggleMenu);
    navLinks.forEach(link => link.addEventListener("click", () => {
        if(hamburger.classList.contains("active")) toggleMenu();
    }));

    // 3. Dark/Light State Optimization
    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);
    });
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // 1. Check for saved theme preference, otherwise check system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-theme');
    }

    // 2. Listen for clicks on the toggle button
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // 3. Save the current choice to localStorage
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});
    // 4. Reactive Skill Progression Animation Trigger
    const skillBars = document.querySelectorAll(".progress-line span");
    const skillsSection = document.getElementById("skills");

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const parent = bar.parentElement;
            const percentage = parent.getAttribute("data-percent");
            bar.style.width = percentage;
        });
    };

    // Intersection Observer for Skill Section
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    if(skillsSection) skillsObserver.observe(skillsSection);

    // 5. Dynamic Active Viewport Tracking on Navigation Links
    const sections = document.querySelectorAll(".section");
    
    const trackingActiveNav = () => {
        let scrollAxisY = window.scrollY;
        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute("id");

            if(scrollAxisY >= offset && scrollAxisY < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if(link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };
    window.addEventListener("scroll", trackingActiveNav);

    // 6. Scroll-To-Top Node Display Logic
    const topButton = document.getElementById("scrollToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Production Loader FadeOut Execution
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 500);
    });
    if (document.readyState === "complete") {
        loader.style.opacity = "0";
        loader.style.display = "none";
    }

    // 2. Navigation Morphing Indicator Integration
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-link");
    
    // Inject indicator line programmatically into the nav-links wrapper
    const indicator = document.createElement('div');
    indicator.classList.add('nav-indicator');
    navLinksContainer.appendChild(indicator);

    function layoutIndicator(activeLink) {
        if (!activeLink || window.innerWidth <= 768) return;
        
        // Calculate dimensions relative to parent container
        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = navLinksContainer.getBoundingClientRect();
        
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.left = `${linkRect.left - containerRect.left}px`;
    }

    // 3. Section Reveal Observer (Fade/Scale Morph)
    const sections = document.querySelectorAll(".section");
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                
                // Tie section viewport collision to active header indicator
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                        layoutIndicator(link);
                    }
                });
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of section is visible

    sections.forEach(sec => sectionObserver.observe(sec));

    // Handle recalculation if user resizes browser window
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-link.active');
        layoutIndicator(currentActive);
    });

    // 4. Mobile Responsive Hamburgers Configuration
    const hamburger = document.querySelector(".hamburger");

    const toggleMenu = () => {
        hamburger.classList.toggle("active");
        navLinksContainer.classList.toggle("active");
    };

    hamburger.addEventListener("click", toggleMenu);
    navLinks.forEach(link => link.addEventListener("click", (e) => {
        if(hamburger.classList.contains("active")) toggleMenu();
        
        // Manual override for indicator line on click
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        layoutIndicator(link);
    }));

    // 5. Dark/Light State Optimization
    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);
    });

    // 6. Reactive Skill Progression Animation Trigger
    const skillBars = document.querySelectorAll(".progress-line span");
    const skillsSection = document.getElementById("skills");

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const parent = bar.parentElement;
            const percentage = parent.getAttribute("data-percent");
            bar.style.width = percentage;
        });
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    if(skillsSection) skillsObserver.observe(skillsSection);

    // 7. Scroll-To-Top Node Display Logic
    const topButton = document.getElementById("scrollToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
