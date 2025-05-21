import { GameController } from './controllers/GameController';

/**
 * Ponto de entrada da aplicação Blackjack
 * Inicializa o controlador principal do jogo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar o controlador do jogo após carregar o DOM
    try {
        const gameController = new GameController();
        console.log('Game controller initialized successfully');
        
        // Verificar se os elementos críticos existem
        const checkElements = ['#player-cards', '#dealer-cards', '#new-game-btn', '.chip'];
        checkElements.forEach(selector => {
            if (!document.querySelector(selector)) {
                console.error(`Element not found: ${selector}`);
            }
        });
    } catch (error) {
        console.error('Error initializing game controller:', error);
    }
    
    // Detectar orientação em dispositivos móveis
    handleOrientationWarning();
});

/**
 * Configura detecção de orientação para dispositivos móveis
 * Exibe um aviso quando o dispositivo está em modo retrato
 */
function handleOrientationWarning(): void {
    const orientationMessage = document.querySelector('.orientation-message');
    
    if (!orientationMessage) return; // Se não encontrou o elemento, sai da função
    
    // Verificar orientação inicial
    checkOrientation();
    
    // Configurar detector de mudança de orientação
    window.addEventListener('resize', checkOrientation);
    
    // Verificar orientação em dispositivos móveis
    function checkOrientation(): void {
        // Somente para dispositivos móveis
        if (window.innerWidth < 768) {
            if (window.innerWidth < window.innerHeight) {
                // Modo retrato
                (orientationMessage as HTMLElement).classList.add('visible');
            } else {
                // Modo paisagem
                (orientationMessage as HTMLElement).classList.remove('visible');
            }
        } else {
            // Desktop ou tablet grande - esconder mensagem
            (orientationMessage as HTMLElement).classList.remove('visible');
        }
    }
}
