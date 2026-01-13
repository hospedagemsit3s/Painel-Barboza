// Adicionar interatividade aos cards
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const cardTitle = this.querySelector('.card-title').textContent;
      
      // Simular navegação (pode ser expandido para páginas reais)
      alert(`Você clicou em: ${cardTitle}\n\nEsta é uma demonstração. Em uma versão completa, você seria redirecionado para: ${href}`);
    });
  });

  // Adicionar efeito de parallax suave no scroll
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    if (header) {
      header.style.transform = `translateY(${scrolled * 0.3}px)`;
      header.style.opacity = 1 - (scrolled / 500);
    }
  });

  // Animação de entrada dos cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Aplicar animação inicial
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Adicionar efeito de partículas no fundo (opcional)
  createParticles();
});

// Função para criar partículas decorativas no fundo
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  `;
  document.body.insertBefore(particlesContainer, document.body.firstChild);

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(255, 107, 0, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
    `;
    particlesContainer.appendChild(particle);
  }

  // Adicionar keyframes para animação
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      50% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
        opacity: 0.6;
      }
    }
  `;
  document.head.appendChild(style);
}

// Adicionar suporte para modo escuro/claro (opcional)
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
}
