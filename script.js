// Fonction améliorée pour le menu responsive
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (!x.classList.contains("responsive")) {
        x.classList.add("responsive");
        
        // Animation pour faire apparaître les liens un par un
        const links = x.querySelectorAll("a:not(.icon)");
        links.forEach((link, index) => {
            link.style.opacity = "0";
            link.style.transform = "translateY(-10px)";
            setTimeout(() => {
                link.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                link.style.opacity = "1";
                link.style.transform = "translateY(0)";
            }, 100 * index);
        });
    } else {
        const links = x.querySelectorAll("a:not(.icon)");
        links.forEach((link) => {
            link.style.opacity = "0";
            link.style.transform = "translateY(-10px)";
        });
        
        setTimeout(() => {
            x.classList.remove("responsive");
            links.forEach(link => {
                link.style.opacity = "";
                link.style.transform = "";
            });
        }, 300);
    }
}

// Défilement fluide pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            var x = document.getElementById("myTopnav");
            if (x.classList.contains("responsive")) {
                myFunction();
            }
        }
    });
});

// Animation au défilement
document.addEventListener('DOMContentLoaded', function() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    const elementsToAnimate = [
        { selector: '.services', className: 'fade-in' },
        { selector: '.grid-item', className: 'fade-in', delay: true },
        { selector: '.engagement-section .image-container', className: 'slide-in-left' },
        { selector: '.engagement-section .text-container', className: 'slide-in-right' },
        { selector: '.stat', className: 'fade-in', delay: true },
        { selector: '.partner-card', className: 'fade-in', delay: true }
    ];
    
    function animateOnScroll() {
        elementsToAnimate.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach((element, index) => {
                if (isElementInViewport(element) && !element.classList.contains(item.className)) {
                    setTimeout(() => {
                        element.classList.add(item.className);
                    }, item.delay ? index * 150 : 0);
                }
            });
        });
    }
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Animation du logo
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.addEventListener('mouseover', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        logo.addEventListener('mouseout', function() {
            this.style.animation = '';
        });
    }

    // Gestion du menu fixe lors du défilement
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 2rem';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '1rem 2rem';
            header.style.boxShadow = 'none';
        }
    });
});
