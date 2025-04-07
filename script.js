document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const scrollDownBtn = document.querySelector('.scroll-down');
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Menú móvil toggle
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('show');
        });
    });
    
    // Navbar fijo al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Animación de elementos al hacer scroll
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('show');
            }
        });
        
        // Actualizar enlace activo según la sección visible
        updateActiveNavLink();
    });
    
    // Scroll hacia abajo al hacer clic en el botón
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const firstSection = document.querySelector('#nosotros');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Actualizar enlace activo en el navbar según la sección visible
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section, header');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Inicializar animaciones
    setTimeout(() => {
        document.querySelectorAll('.card, .section-title, .section-description').forEach(element => {
            element.classList.add('animated', 'fadeInUp');
        });
    }, 300);
    
    // Validación de formulario
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el formulario
            // Por ahora solo mostraremos un mensaje de éxito simulado
            
            const formData = new FormData(contactForm);
            let formIsValid = true;
            
            // Validación básica
            formData.forEach((value, key) => {
                if (value.trim() === '' && key !== 'tel') {
                    formIsValid = false;
                }
            });
            
            if (formIsValid) {
                // Simulación de envío
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                
                setTimeout(() => {
                    // Crear un mensaje de éxito
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                    successMessage.style.cssText = `
                        background-color: var(--success-color);
                        color: white;
                        padding: 1rem;
                        border-radius: 6px;
                        margin-top: 1rem;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 500;
                    `;
                    successMessage.querySelector('i').style.marginRight = '0.5rem';
                    
                    contactForm.appendChild(successMessage);
                    contactForm.reset();
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    // Eliminar el mensaje después de 5 segundos
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 0.5s ease';
                        
                        setTimeout(() => {
                            contactForm.removeChild(successMessage);
                        }, 500);
                    }, 5000);
                }, 1500);
            } else {
                alert('Por favor completa todos los campos obligatorios.');
            }
        });
    }
    
    // Inicializar animación de fade-in para elementos visibles inicialmente
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.classList.add('show');
        }
    });

    // Suavizar desplazamiento para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de parallax para el hero
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
        }
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() !== '') {
                // Simulación de suscripción
                const submitBtn = this.querySelector('button');
                const originalIcon = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    // Crear mensaje de confirmación
                    const confirmationMsg = document.createElement('p');
                    confirmationMsg.textContent = '¡Gracias por suscribirte!';
                    confirmationMsg.style.cssText = `
                        color: var(--light-color);
                        font-weight: 500;
                        margin-top: 0.75rem;
                    `;
                    
                    newsletterForm.parentNode.appendChild(confirmationMsg);
                    newsletterForm.reset();
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalIcon;
                }, 1000);
            }
        });
    }
});