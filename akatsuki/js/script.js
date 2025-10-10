// Navegação Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header transparente no scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Animações de entrada
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animações aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.evento-card, .feature, .galeria-item, .ingresso-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Filtros da Galeria
const filterButtons = document.querySelectorAll('.filter-btn');
const galeriaItems = document.querySelectorAll('.galeria-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galeriaItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Modal da Galeria
const modal = document.getElementById('galeria-modal');
const modalImage = document.getElementById('modal-image');
const modalVideo = document.getElementById('modal-video');
const modalClose = document.querySelector('.modal-close');

galeriaItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const isVideo = item.getAttribute('data-category') === 'videos';
        
        if (isVideo) {
            modalImage.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = img.src; // Em um caso real, seria o src do vídeo
        } else {
            modalVideo.style.display = 'none';
            modalImage.style.display = 'block';
            modalImage.src = img.src;
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalVideo.pause();
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalVideo.pause();
    }
});

// Contador de disponibilidade dos ingressos (simulação)
function updateAvailability() {
    const availabilityBars = document.querySelectorAll('.availability-fill');
    const availabilityTexts = document.querySelectorAll('.availability-text');
    
    availabilityBars.forEach((bar, index) => {
        const currentWidth = parseInt(bar.style.width);
        if (currentWidth > 10) {
            const newWidth = Math.max(10, currentWidth - Math.random() * 2);
            bar.style.width = newWidth + '%';
            availabilityTexts[index].textContent = Math.round(newWidth) + '% disponível';
        }
    });
}

// Atualizar disponibilidade a cada 30 segundos (simulação)
setInterval(updateAvailability, 30000);

// Formulário de contato
const contactForm = document.querySelector('.contato-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular envio do formulário
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Mensagem Enviada!';
        submitBtn.style.background = '#28a745';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Botões de compra de ingressos
const ingressoBtns = document.querySelectorAll('.ingresso-btn');
ingressoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Simular redirecionamento para página de pagamento
        const originalText = btn.textContent;
        btn.textContent = 'Redirecionando...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('Em breve você será redirecionado para a página de pagamento!');
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
});

// Efeito parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Contador regressivo para próximo evento (exemplo)
function countdown() {
    const eventDate = new Date('2025-03-15T20:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Você pode adicionar um elemento de countdown no HTML e atualizar aqui
        console.log(`Próximo evento em: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
}

// Atualizar countdown a cada segundo
setInterval(countdown, 1000);

// Adicionar partículas flutuantes (efeito visual)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #CC0000;
            border-radius: 50%;
            opacity: 0.5;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// CSS para animação das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Criar partículas quando a página carregar
window.addEventListener('load', createParticles);
