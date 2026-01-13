// Dados de Sensibilidade dos Famosos (Amostra extraída)
const sensiData = {
  "Nobru": {
    "Balanceada": {"Geral": "107", "Red Dot": "125", "Mira 2x": "100", "Mira 4x": "106", "AWM / Sniper": "114", "Olhadinha": "125"},
    "Mais capa": {"Geral": "107", "Red Dot": "125", "Mira 2x": "100", "Mira 4x": "106", "AWM / Sniper": "114", "Olhadinha": "125"},
    "Mais controle": {"Geral": "197", "Red Dot": "199", "Mira 2x": "200", "Mira 4x": "180", "AWM / Sniper": "167", "Olhadinha": "194"},
    "Muito rápida": {"Geral": "197", "Red Dot": "199", "Mira 2x": "200", "Mira 4x": "180", "AWM / Sniper": "167", "Olhadinha": "194"}
  },
  "Fantasma": {
    "Balanceada": {"Geral": "197", "Red Dot": "199", "Mira 2x": "200", "Mira 4x": "180", "AWM / Sniper": "167", "Olhadinha": "194"},
    "Mais capa": {"Geral": "112", "Red Dot": "106", "Mira 2x": "125", "Mira 4x": "114", "AWM / Sniper": "103", "Olhadinha": "123"},
    "Mais controle": {"Geral": "112", "Red Dot": "106", "Mira 2x": "125", "Mira 4x": "114", "AWM / Sniper": "103", "Olhadinha": "123"},
    "Muito rápida": {"Geral": "112", "Red Dot": "106", "Mira 2x": "125", "Mira 4x": "114", "AWM / Sniper": "103", "Olhadinha": "123"}
  }
};

// Função para gerar sensibilidade aleatória baseada em estilo
function generateRandomSensi(estilo) {
  const base = estilo === "Muito rápida" ? 180 : estilo === "Mais controle" ? 100 : 150;
  const range = 20;
  return {
    "Geral": Math.floor(base + Math.random() * range),
    "Red Dot": Math.floor(base + Math.random() * range),
    "Mira 2x": Math.floor(base + Math.random() * range),
    "Mira 4x": Math.floor(base + Math.random() * range),
    "AWM / Sniper": Math.floor(80 + Math.random() * 40),
    "Olhadinha": Math.floor(base + Math.random() * range)
  };
}

// Função para gerar DPI
function generateDPI(marca, objetivo) {
  const base = objetivo === "Mais rápido" ? 500 : objetivo === "Mais controle" ? 400 : 450;
  return {
    "Principal": base + Math.floor(Math.random() * 50),
    "Controle": base - 40 + Math.floor(Math.random() * 20),
    "Rápido": base + 40 + Math.floor(Math.random() * 20)
  };
}

// Função para gerar Ciclos
function generateCiclos(modelo, pref) {
  const base = pref === "Rápido" ? 100 : pref === "Controle" ? 40 : 70;
  return Math.floor(base + Math.random() * 30);
}

document.addEventListener('DOMContentLoaded', function() {
  const contentArea = document.querySelector('.content');
  const originalContent = contentArea.innerHTML;

  // Gerenciar cliques nos cards da Home
  function attachHomeListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href').substring(1);
        renderPage(href);
      });
    });
  }

  attachHomeListeners();

  // Sistema de Roteamento Simples
  function renderPage(page) {
    window.scrollTo(0, 0);
    switch(page) {
      case 'sensi-famosos':
        renderSensiFamosos();
        break;
      case 'gerar-sensi':
        renderSensiAleatoria();
        break;
      case 'sensi-arma':
        renderSensiArma();
        break;
      case 'dpi-android':
        renderDPI();
        break;
      case 'ciclos-iphone':
        renderCiclos();
        break;
      case 'sensi-arma':
        renderSensiArma();
        break;
      case 'favoritos':
        renderFavoritos();
        break;
      default:
        contentArea.innerHTML = originalContent;
        attachHomeListeners();
    }
  }

  // Renderizar Gerar Sensi Aleatória
  function renderSensiAleatoria() {
    contentArea.innerHTML = `
      <div class="page-header">
        <button class="back-btn">←</button>
        <div>
          <h2 class="page-title">Gerar Sensi</h2>
          <p class="page-subtitle">Sensibilidade aleatória otimizada</p>
        </div>
      </div>

      <div class="input-group">
        <label>O que você quer priorizar?</label>
        <div class="style-options">
          ${["Balanceada", "Mais capa", "Mais controle", "Muito rápida"].map(s => `<button class="style-btn ${s === 'Balanceada' ? 'active' : ''}">${s}</button>`).join('')}
        </div>
      </div>

      <button class="main-action-btn" id="btn-gerar-aleatoria">🎲 Gerar Sensi Aleatória</button>
      <div id="result-area"></div>
    `;
    setupPageEvents('gerar-sensi');
  }

  // Renderizar Sensi dos Famosos
  function renderSensiFamosos() {
    contentArea.innerHTML = `
      <div class="page-header">
        <button class="back-btn">←</button>
        <div>
          <h2 class="page-title">Sensi dos Famosos</h2>
          <p class="page-subtitle">Configurações inspiradas nos pros</p>
        </div>
      </div>
      
      <div class="input-group">
        <label>Qual famoso?</label>
        <input type="text" id="famoso-input" placeholder="Digite o nome do pro player...">
        <div class="suggestions">
          ${["Nobru", "Fantasma", "Two9", "Marechal", "Freitas", "Bak"].map(f => `<button class="chip">${f}</button>`).join('')}
        </div>
      </div>

      <div class="input-group">
        <label>O que você quer priorizar?</label>
        <div class="style-options">
          ${["Balanceada", "Mais capa", "Mais controle", "Muito rápida"].map(s => `<button class="style-btn ${s === 'Balanceada' ? 'active' : ''}">${s}</button>`).join('')}
        </div>
      </div>

      <button class="main-action-btn" id="btn-gerar-famoso">✨ Gerar Sensi</button>
      <div id="result-area"></div>
    `;

    setupPageEvents('sensi-famosos');
  }

  // Renderizar DPI
  function renderDPI() {
    contentArea.innerHTML = `
      <div class="page-header">
        <button class="back-btn">←</button>
        <div>
          <h2 class="page-title">DPI (Android)</h2>
          <p class="page-subtitle">Ajuste de DPI do sistema</p>
        </div>
      </div>
      
      <div class="warning-banner">
        ⚠️ DPI é ajuste do sistema e costuma existir apenas no Android. Use com cuidado.
      </div>

      <div class="input-group">
        <label>Marca do aparelho:</label>
        <div class="suggestions">
          ${["Xiaomi", "Motorola", "Samsung", "Asus", "Geral"].map(m => `<button class="chip">${m}</button>`).join('')}
        </div>
      </div>

      <div class="input-group">
        <label>Objetivo:</label>
        <div class="style-options">
          ${["Mais controle", "Balanceado", "Mais rápido"].map(o => `<button class="style-btn ${o === 'Balanceado' ? 'active' : ''}">${o}</button>`).join('')}
        </div>
      </div>

      <button class="main-action-btn" id="btn-gerar-dpi">📱 Gerar DPI</button>
      <div id="result-area"></div>
    `;
    setupPageEvents('dpi');
  }

  // Renderizar Sensibilidade por Arma
  function renderSensiArma() {
    contentArea.innerHTML = `
      <div class="page-header">
        <button class="back-btn">←</button>
        <div>
          <h2 class="page-title">Sensi por Arma</h2>
          <p class="page-subtitle">Configuração focada na sua arma</p>
        </div>
      </div>

      <div class="input-group">
        <label>Qual arma você quer?</label>
        <input type="text" id="arma-input" placeholder="Digite o nome da arma...">
        <div class="suggestions">
          ${["XM8", "UMP", "Desert", "MP40", "Carapina", "12 Nova"].map(a => `<button class="chip">${a}</button>`).join('')}
        </div>
      </div>

      <div class="input-group">
        <label>Estilo:</label>
        <div class="style-options">
          ${["Controle", "Balanceado", "Rápido"].map(s => `<button class="style-btn ${s === 'Balanceado' ? 'active' : ''}">${s}</button>`).join('')}
        </div>
      </div>

      <button class="main-action-btn" id="btn-gerar-arma">🎯 Gerar Sensi da Arma</button>
      <div id="result-area"></div>
    `;
    setupPageEvents('sensi-arma');
  }

  // Renderizar Favoritos
  function renderFavoritos() {
    contentArea.innerHTML = `
      <div class="page-header">
        <button class="back-btn">←</button>
        <div>
          <h2 class="page-title">Favoritos</h2>
          <p class="page-subtitle">Suas configurações salvas</p>
        </div>
      </div>
      
      <div class="empty-state">
        <div style="font-size: 4rem; margin-bottom: 20px;">⭐</div>
        <p style="color: #71717a;">Você ainda não salvou nenhuma sensibilidade.</p>
        <button class="main-action-btn" style="margin-top: 20px;" onclick="location.reload()">Voltar para Home</button>
      </div>
    `;
    document.querySelector('.back-btn').onclick = () => renderPage('home');
  }

  // Renderizar Ciclos
  function renderCiclos() {
    contentArea.innerHTML = `
      <div class="page-header">
        <button class="back-btn">←</button>
        <div>
          <h2 class="page-title">Ciclos (iPhone)</h2>
          <p class="page-subtitle">Geração automática de ciclos</p>
        </div>
      </div>

      <div class="input-group">
        <label>Modelo do iPhone:</label>
        <div class="suggestions">
          ${["11", "12", "13", "14", "15"].map(m => `<button class="chip">iPhone ${m}</button>`).join('')}
        </div>
      </div>

      <button class="main-action-btn" id="btn-gerar-ciclos">🍎 Gerar Ciclos</button>
      <div id="result-area"></div>
    `;
    setupPageEvents('ciclos');
  }

  // Configurar eventos das páginas
  function setupPageEvents(type) {
    document.querySelector('.back-btn').onclick = () => renderPage('home');

    // Chips e botões de estilo
    document.querySelectorAll('.chip, .style-btn').forEach(btn => {
      btn.onclick = function() {
        const parent = this.parentElement;
        parent.querySelectorAll('.active, .chip-active').forEach(el => el.classList.remove('active', 'chip-active'));
        this.classList.add(this.classList.contains('chip') ? 'chip-active' : 'active');
        if (this.classList.contains('chip') && document.getElementById('famoso-input')) {
          document.getElementById('famoso-input').value = this.textContent;
        }
      };
    });

    // Botões de ação principal
    if (type === 'sensi-famosos') {
      document.getElementById('btn-gerar-famoso').onclick = () => {
        const famoso = document.getElementById('famoso-input').value || "Nobru";
        const estilo = document.querySelector('.style-btn.active').textContent;
        const data = (sensiData[famoso] && sensiData[famoso][estilo]) || generateRandomSensi(estilo);
        showSensiResult(famoso, estilo, data);
      };
    } else if (type === 'dpi') {
      document.getElementById('btn-gerar-dpi').onclick = () => {
        const marca = document.querySelector('.chip-active')?.textContent || "Geral";
        const obj = document.querySelector('.style-btn.active').textContent;
        const data = generateDPI(marca, obj);
        showDPIResult(data);
      };
    } else if (type === 'ciclos') {
      document.getElementById('btn-gerar-ciclos').onclick = () => {
        const modelo = document.querySelector('.chip-active')?.textContent || "iPhone 15";
        const val = generateCiclos(modelo, "Balanceado");
        showCicloResult(val, modelo);
      };
    } else if (type === 'sensi-arma') {
      document.getElementById('btn-gerar-arma').onclick = () => {
        const arma = document.getElementById('arma-input').value || "XM8";
        const estilo = document.querySelector('.style-btn.active').textContent;
        const data = generateRandomSensi(estilo);
        showSensiResult(arma, estilo, data);
      };
    } else if (type === 'gerar-sensi') {
      document.getElementById('btn-gerar-aleatoria').onclick = () => {
        const estilo = document.querySelector('.style-btn.active').textContent;
        const data = generateRandomSensi(estilo);
        showSensiResult("Aleatória", estilo, data);
      };
    }
  }

  function showSensiResult(nome, estilo, data) {
    const resArea = document.getElementById('result-area');
    resArea.innerHTML = `
      <div class="result-card">
        <h3 class="result-title">Sensi: ${nome}</h3>
        <p class="result-subtitle">Estilo: ${estilo}</p>
        <div class="sensi-grid">
          ${Object.entries(data).map(([label, val]) => `
            <div class="sensi-row">
              <span>${label}</span>
              <span class="sensi-val">${val}</span>
            </div>
          `).join('')}
        </div>
        <div class="result-actions">
          <button class="action-btn secondary">🔄 Gerar de novo</button>
          <button class="action-btn primary">📋 Copiar tudo</button>
        </div>
      </div>
    `;
  }

  function showDPIResult(data) {
    const resArea = document.getElementById('result-area');
    resArea.innerHTML = `
      <div class="result-card">
        <h3 class="result-title">DPI Sugerida</h3>
        <div class="dpi-display">
          <div class="dpi-main">
            <span class="dpi-label">Principal</span>
            <span class="dpi-big-val">${data.Principal}</span>
          </div>
          <div class="dpi-others">
            <div><span>Controle:</span> <b>${data.Controle}</b></div>
            <div><span>Rápido:</span> <b>${data.Rápido}</b></div>
          </div>
        </div>
      </div>
    `;
  }

  function showCicloResult(val, modelo) {
    const resArea = document.getElementById('result-area');
    resArea.innerHTML = `
      <div class="result-card ciclo-res">
        <div class="ciclo-icon">🍎</div>
        <h3 class="result-title">Ciclos Gerados</h3>
        <div class="ciclo-big-val">${val}</div>
        <p class="result-subtitle">${modelo}</p>
      </div>
    `;
  }

  // Efeito de partículas (mantido da versão anterior)
  createParticles();
});

function createParticles() {
  if (document.querySelector('.particles-container')) return;
  const container = document.createElement('div');
  container.className = 'particles-container';
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';
  document.body.insertBefore(container, document.body.firstChild);

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.style.cssText = `position:absolute;width:${Math.random()*4+1}px;height:${Math.random()*4+1}px;background:rgba(255,107,0,${Math.random()*0.3+0.1});border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:float ${Math.random()*10+10}s infinite ease-in-out;`;
    container.appendChild(p);
  }
}
