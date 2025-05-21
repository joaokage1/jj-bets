// filepath: c:\Users\j_vgo\Downloads\projs\blackjack-game\src\preloadSvg.js
/**
 * Script para pré-carregar imagens SVG e melhorar a compatibilidade
 */
function preloadSvgs() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Preload SVGs: Iniciando pré-carregamento de imagens SVG');
        
        const svgUrls = [
            'assets/blackjack-thumbnail.svg',
            'assets/coming-soon.svg'
        ];
        
        // Pré-carrega as imagens
        svgUrls.forEach(url => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Falha ao carregar SVG: ${url}`);
                    }
                    return response.text();
                })
                .then(svgText => {
                    // Se o SVG carregou, verificamos sua validade
                    if (!svgText.includes('<svg')) {
                        throw new Error(`SVG inválido: ${url}`);
                    }
                    
                    console.log(`SVG carregado com sucesso: ${url}`);
                      // Atualiza a src das imagens correspondentes para inline SVG
                    const svgImages = document.querySelectorAll(`img[src="${url}"]`);
                    svgImages.forEach(img => {
                        // Independentemente de erro, tentaremos usar o SVG carregado diretamente
                        // Converter para URL de dados pode melhorar a compatibilidade
                        const svgBlob = new Blob([svgText], {type: 'image/svg+xml'});
                        const dataUrl = URL.createObjectURL(svgBlob);
                        
                        console.log(`Substituindo imagem ${url} por versão inline`);
                        
                        // Criar nova imagem para evitar problemas de cache
                        const newImg = new Image();
                        newImg.onload = function() {
                            // Quando a nova imagem carregar, substituímos a antiga
                            img.src = dataUrl;
                            img.classList.remove('error');
                            
                            // Mostra a imagem
                            img.style.opacity = '1';
                            img.style.visibility = 'visible';
                            
                            // Remove a classe de fallback do contêiner
                            const container = img.closest('.game-thumbnail');
                            if (container) {
                                if (container.id === 'blackjack-thumbnail') {
                                    container.classList.remove('fallback-blackjack');
                                } else if (container.id === 'coming-soon-thumbnail') {
                                    container.classList.remove('fallback-coming-soon');
                                }
                                
                                const overlay = container.querySelector('.game-overlay');
                                if (overlay) {
                                    overlay.classList.remove('fallback-active');
                                }
                            }
                        };
                        
                        // Inicia o carregamento da nova imagem
                        newImg.src = dataUrl;
                    });
                })
                .catch(error => {
                    console.error(error.message);
                });
        });
    });
}

// Executa imediatamente
preloadSvgs();

// Exporta para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { preloadSvgs };
}
