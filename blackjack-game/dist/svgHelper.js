// filepath: c:\Users\j_vgo\Downloads\projs\blackjack-game\src\svgHelper.js
/**
 * Utilitário para lidar com imagens SVG e fornecer fallbacks quando necessário
 */
function initSvgHelper() {
    document.addEventListener('DOMContentLoaded', function() {
        const svgImages = document.querySelectorAll('img[src$=".svg"]');
        
        svgImages.forEach(img => {
            // Se a imagem já carregou, verifica se houve erro
            if (img.complete) {
                handleImageLoad(img);
            } else {
                // Adiciona listeners para imagens que ainda não carregaram
                img.addEventListener('load', function() {
                    img.classList.remove('error');
                });
                
                img.addEventListener('error', function() {
                    handleImageError(img);
                });
            }
        });
    });

    /**
     * Verifica se a imagem carregou corretamente
     * @param {HTMLImageElement} img - Elemento de imagem para verificar
     */
    function handleImageLoad(img) {
        if (!img.naturalWidth) {
            handleImageError(img);
        }
    }

    /**
     * Lida com erros de carregamento de imagem
     * @param {HTMLImageElement} img - Elemento de imagem com erro
     */
    function handleImageError(img) {
        img.classList.add('error');
        
        // Tenta carregar o fallback JPG
        tryFallbackImage(img);
        
        // Se a imagem estiver dentro de um contêiner de thumbnail,
        // exibe texto descriptivo
        const thumbnail = img.closest('.game-thumbnail');
        if (thumbnail) {
            const overlay = thumbnail.querySelector('.game-overlay');
            if (overlay) {
                const gameName = overlay.getAttribute('data-game-name');
                console.log(`Fallback ativado para: ${gameName}`);
                
                // Adiciona classe para exibir o overlay com o nome do jogo
                overlay.classList.add('fallback-active');
            }
        }
    }

    /**
     * Tenta carregar uma imagem de fallback
     * @param {HTMLImageElement} img - Elemento de imagem para tentar fallback
     */
    function tryFallbackImage(img) {
        const originalSrc = img.getAttribute('data-original-src') || img.src;
        
        // Guarda a fonte original se ainda não estiver salva
        if (!img.hasAttribute('data-original-src')) {
            img.setAttribute('data-original-src', originalSrc);
        }
        
        // Tenta carregar versão JPG
        if (originalSrc.endsWith('.svg')) {
            const jpgSrc = originalSrc.replace('.svg', '.jpg');
            img.src = jpgSrc;
            
            // Registra tentativa de fallback
            console.log(`Tentando fallback: ${jpgSrc}`);
        }
    }
}

// Exporta para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initSvgHelper };
} else {
    // Executa automaticamente em navegadores
    initSvgHelper();
}
