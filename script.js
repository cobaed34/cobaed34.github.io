document.addEventListener('DOMContentLoaded', function() {
    
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const scrollDownBtn = document.querySelector('.scroll-down');
    const fadeElements = document.querySelectorAll('.fade-in');
    
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
    
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('show');
        });
    });
    

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
       
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('show');
            }
        });
        
   
        updateActiveNavLink();
    });
    
    
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const firstSection = document.querySelector('#nosotros');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    
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
    
   
    setTimeout(() => {
        document.querySelectorAll('.card, .section-title, .section-description').forEach(element => {
            element.classList.add('animated', 'fadeInUp');
        });
    }, 300);
    
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            
            const formData = new FormData(contactForm);
            let formIsValid = true;
            
            
            formData.forEach((value, key) => {
                if (value.trim() === '' && key !== 'tel') {
                    formIsValid = false;
                }
            });
            
            if (formIsValid) {
               
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                
                setTimeout(() => {
                 
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
    

    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.classList.add('show');
        }
    });

    
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
    
    
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
        }
    });

   
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() !== '') {
              
                const submitBtn = this.querySelector('button');
                const originalIcon = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    
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

    
    const modalInscripcion = document.getElementById('modal-inscripcion-visible');
    const btnAbrirModal = document.getElementById('abrir-modal-inscripcion');
    const cerrarModal = document.querySelectorAll('.close-modal, .close-modal-btn');
    
    
    if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', function(e) {
            e.preventDefault();
            modalInscripcion.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        });
    }
    
 
    cerrarModal.forEach(element => {
        element.addEventListener('click', function() {
            modalInscripcion.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        });
    });
    
    
    window.addEventListener('click', function(event) {
        if (event.target == modalInscripcion) {
            modalInscripcion.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});