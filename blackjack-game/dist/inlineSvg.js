// filepath: c:\Users\j_vgo\Downloads\projs\blackjack-game\src\inlineSvg.js
/**
 * Script para incorporar SVGs diretamente no HTML
 * Esta é uma solução alternativa para garantir que SVGs serão exibidos
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando incorporação de SVGs inline');
      // SVG de blackjack - versão simplificada sem texto lateral
    const blackjackSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
      <!-- Fundo verde escuro -->
      <rect width="300" height="200" fill="#004d40" />
      
      <!-- Padrão de mesa de cassino -->
      <rect width="300" height="200" fill="#006b55" rx="10" ry="10" />
      <path d="M0,0 L300,200 M300,0 L0,200" stroke="#005a46" stroke-width="2" stroke-opacity="0.3" />
      
      <!-- Moedas de apostas - centralizadas -->
      <g transform="translate(0, 15)">
        <circle cx="150" cy="150" r="25" fill="#e56b6f" />
        <circle cx="150" cy="150" r="20" fill="#e56b6f" stroke="#ffffff" stroke-width="2" stroke-dasharray="2,2" />
        <text x="150" y="155" font-family="Arial" font-size="14" fill="white" text-anchor="middle" font-weight="bold">100</text>
        
        <!-- Moeda 2 - mais próxima ao centro -->
        <circle cx="195" cy="160" r="20" fill="#b56576" />
        <circle cx="195" cy="160" r="16" fill="#b56576" stroke="#ffffff" stroke-width="2" stroke-dasharray="2,2" />
        <text x="195" y="165" font-family="Arial" font-size="12" fill="white" text-anchor="middle" font-weight="bold">50</text>
      </g>
      
      <!-- Cartas - mais centralizadas -->
      <g transform="translate(130, 50) rotate(-5)">
        <rect width="60" height="90" rx="5" ry="5" fill="#ffffff" stroke="#000000" stroke-width="1" />
        <text x="30" y="30" font-family="Arial" font-size="24" fill="#b22222" font-weight="bold" text-anchor="middle">A</text>
        <text x="30" y="55" font-family="Arial" font-size="24" fill="#b22222" font-weight="bold" text-anchor="middle">♥</text>
      </g>
      
      <g transform="translate(170, 55) rotate(5)">
        <rect width="60" height="90" rx="5" ry="5" fill="#ffffff" stroke="#000000" stroke-width="1" />
        <text x="30" y="30" font-family="Arial" font-size="24" fill="#000000" font-weight="bold" text-anchor="middle">K</text>
        <text x="30" y="55" font-family="Arial" font-size="24" fill="#000000" font-weight="bold" text-anchor="middle">♠</text>
      </g>
      
      <!-- Número 21 centralizado no topo -->
      <text x="150" y="35" font-family="Arial" font-size="36" fill="#ffd166" text-anchor="middle" font-weight="bold">21</text>
    </svg>`;
    
    // SVG de "em breve"
    const comingSoonSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
      <!-- Fundo escuro -->
      <rect width="300" height="200" fill="#2d6a4f" />
      
      <!-- Padrão de fundo -->
      <rect width="300" height="200" fill="#2d6a4f" rx="10" ry="10" />
      <path d="M0,0 L300,200 M300,0 L0,200" stroke="#1e5c41" stroke-width="2" stroke-opacity="0.3" />
      
      <!-- Contorno de interrogação grande -->
      <text x="150" y="120" font-family="Arial" font-size="120" fill="none" stroke="#ffffff" stroke-width="3" 
            stroke-opacity="0.3" text-anchor="middle" font-weight="bold">?</text>
      
      <!-- Cartas de baralho com pontos de interrogação -->
      <g transform="translate(70, 60) rotate(-15)">
        <rect width="50" height="70" rx="5" ry="5" fill="#f5f5f5" stroke="#000000" stroke-width="1" />
        <text x="25" y="45" font-family="Arial" font-size="30" font-weight="bold" fill="#6d6875" text-anchor="middle">?</text>
      </g>
      
      <!-- Carta 2 -->
      <g transform="translate(180, 70) rotate(15)">
        <rect width="50" height="70" rx="5" ry="5" fill="#f5f5f5" stroke="#000000" stroke-width="1" />
        <text x="25" y="45" font-family="Arial" font-size="30" font-weight="bold" fill="#6d6875" text-anchor="middle">?</text>
      </g>
    </svg>`;
    
    // Encontra os contêineres
    const blackjackContainer = document.getElementById('blackjack-thumbnail');
    const comingSoonContainer = document.getElementById('coming-soon-thumbnail');
      // Função para incorporar SVG
    function injectSvg(container, svgContent, alt) {
        if (!container) return;
        
        // Criar um div para conter o SVG
        const svgContainer = document.createElement('div');
        svgContainer.className = 'svg-container';
        svgContainer.innerHTML = svgContent;
        svgContainer.setAttribute('aria-label', alt);        
        
        // Aplicar estilos otimizados para centralização em dispositivos móveis
        svgContainer.style.width = '80%';
        svgContainer.style.height = '80%';
        svgContainer.style.position = 'absolute';
        svgContainer.style.top = '50%';
        svgContainer.style.left = '50%';
        svgContainer.style.transform = 'translate(-50%, -50%)';
        svgContainer.style.zIndex = '1';
        svgContainer.style.display = 'flex';
        svgContainer.style.alignItems = 'center';
        svgContainer.style.justifyContent = 'center';
        
        // Detecta se é dispositivo móvel para aplicar ajustes específicos
        if (window.innerWidth <= 768) {
            // Ajustes específicos para dispositivos móveis
            svgContainer.style.width = '70%';
            svgContainer.style.height = '70%';
            
            // Remover texto não centralizado nos SVGs em dispositivos móveis
            setTimeout(() => {
                const texts = svgContainer.querySelectorAll('text:not([text-anchor="middle"])');
                texts.forEach(text => {
                    text.style.display = 'none';
                });
            }, 10);
        }
          // Insere no wrapper se existir
        const imageWrapper = container.querySelector('.image-wrapper');
        if (imageWrapper) {
            // Limpa qualquer SVG existente
            const existingSvgs = imageWrapper.querySelectorAll('.svg-container');
            existingSvgs.forEach(svg => svg.remove());
            
            imageWrapper.appendChild(svgContainer);
        } else {
            // Fallback - insere antes da overlay
            const overlay = container.querySelector('.game-overlay');
            if (overlay) {
                container.insertBefore(svgContainer, overlay);
            } else {
                container.appendChild(svgContainer);
            }
        }
        
        console.log(`SVG incorporado para: ${alt}`);
    }
    
    // Aguarda um pouco para ver se as imagens carregam normalmente
    setTimeout(function() {
        // Verifica se as imagens originais estão visíveis
        const blackjackImg = blackjackContainer?.querySelector('img');
        const comingSoonImg = comingSoonContainer?.querySelector('img');
        
        // Se a imagem tiver erro ou não estiver visível, injetamos o SVG
        if (blackjackContainer && (!blackjackImg || blackjackImg.classList.contains('error'))) {
            injectSvg(blackjackContainer, blackjackSvg, 'Blackjack');
        }
        
        if (comingSoonContainer && (!comingSoonImg || comingSoonImg.classList.contains('error'))) {
            injectSvg(comingSoonContainer, comingSoonSvg, 'Em Breve');
        }
    }, 1500); // Aguarda 1.5 segundos antes de injetar SVGs
});
