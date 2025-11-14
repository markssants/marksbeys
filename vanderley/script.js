document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Função de rolagem suave customizada para o efeito "parallax"
    const smoothScrollTo = (targetPosition, duration) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Easing function para aceleração e desaceleração
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
        // Verifica se o link clicado é um link de âncora
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        e.preventDefault();
        const targetId = link.getAttribute('href');
        // Garante que não estamos tentando rolar para um link vazio como "#"
        if (targetId.length <= 1) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Altura do seu cabeçalho
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Usa a nova função de rolagem suave com duração de 1000ms (1 segundo)
            smoothScrollTo(offsetPosition, 1000);
        }
    };

    // Adiciona o ouvinte de clique ao corpo do documento para capturar todos os cliques de navegação
    document.body.addEventListener('click', handleSmoothScroll);

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a.nav-link');

    const activateMenuLink = () => {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));

        // Find the corresponding link (excluding the contact button)
        const activeLink = document.querySelector(`.nav-menu a.nav-link[href="#${sections[index].id}"]`);
        
        if (activeLink) {
            // Don't apply active style to the contact button
            if (!activeLink.classList.contains('btn-primary')) {
                activeLink.classList.add('active');
            }
        }
    };


    // Header background change on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }

        // Activate menu link on scroll
        activateMenuLink();
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Opcional: para a animação não repetir
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .value-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Service Card Hover Text Change
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('h3');
        const paragraph = card.querySelector('p');

        if (icon && title && card.dataset.hoverText) {
            const hoverText = card.dataset.hoverText;
            
            // Cria o elemento para o texto do hover
            const hoverTextElement = document.createElement('p');
            hoverTextElement.className = 'hover-text';
            hoverTextElement.innerHTML = hoverText;
            card.appendChild(hoverTextElement);

            card.addEventListener('mouseenter', () => {
                // Adiciona opacidade para sumir com os elementos originais
                icon.style.opacity = '0';
                title.style.opacity = '0';
                if (paragraph) paragraph.style.opacity = '0';
            });

            card.addEventListener('mouseleave', () => {
                // Remove a opacidade para mostrar os elementos originais
                icon.style.opacity = '1';
                title.style.opacity = '1';
                if (paragraph) paragraph.style.opacity = '1';
            });
        }
    });

    // Seleciona os elementos do DOM
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (modal && modalImg && galleryItems.length > 0) {
        const closeButton = modal.querySelector('.close-button');
        const prevButton = modal.querySelector('.prev-button');
        const nextButton = modal.querySelector('.next-button');
        let currentIndex;

        const openModal = (index) => {
            currentIndex = index;
            const imgSrc = galleryItems[currentIndex].querySelector('.gallery-image').src;
            modal.style.display = 'block';
            modalImg.src = imgSrc;
        };

        const closeModal = () => {
            modal.style.display = 'none';
        };

        const showPrevImage = () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            modalImg.src = galleryItems[currentIndex].querySelector('.gallery-image').src;
        };

        const showNextImage = () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            modalImg.src = galleryItems[currentIndex].querySelector('.gallery-image').src;
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openModal(index));
        });

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        prevButton.addEventListener('click', showPrevImage);
        nextButton.addEventListener('click', showNextImage);

        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'ArrowLeft') showPrevImage();
                else if (e.key === 'ArrowRight') showNextImage();
                else if (e.key === 'Escape') closeModal();
            }
            // Fecha o menu mobile com a tecla Esc
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Initial check in case the page loads on a different section
    activateMenuLink();
});
