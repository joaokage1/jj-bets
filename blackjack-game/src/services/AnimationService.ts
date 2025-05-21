/**
 * Serviço para gerenciar as animações e efeitos visuais do jogo
 */
export class AnimationService {
    private deckElement: HTMLElement | null = null;
    private cardCounterElement: HTMLElement | null = null;
    private dealerCardsElement: HTMLElement | null = null;
    private playerCardsElement: HTMLElement | null = null;
    private gameMessageElement: HTMLElement | null = null;
    
    /**
     * Inicializa o serviço de animação
     * @param selectors Seletores para os elementos DOM
     */
    constructor(selectors: {
        deckSelector: string,
        cardCounterSelector: string,
        dealerCardsSelector: string,
        playerCardsSelector: string,
        gameMessageSelector: string
    }) {
        document.addEventListener('DOMContentLoaded', () => {
            this.deckElement = document.querySelector(selectors.deckSelector);
            this.cardCounterElement = document.querySelector(selectors.cardCounterSelector);
            this.dealerCardsElement = document.querySelector(selectors.dealerCardsSelector);
            this.playerCardsElement = document.querySelector(selectors.playerCardsSelector);
            this.gameMessageElement = document.querySelector(selectors.gameMessageSelector);
            
            if (!this.deckElement) {
                this.createVisibleDeck();
            }
        });
    }
    
    /**
     * Cria um baralho visível na mesa
     */
    private createVisibleDeck(): void {
        // Verificar se já existe um baralho
        if (document.querySelector('.card-deck')) {
            return;
        }
        
        const gameContainer = document.querySelector('.game-container') || document.body;
        
        // Criar elementos do baralho
        this.deckElement = document.createElement('div');
        this.deckElement.className = 'card-deck';
        this.deckElement.id = 'card-deck';
        
        const deckCards = document.createElement('div');
        deckCards.className = 'deck-cards';
        
        const deckTopCard = document.createElement('div');
        deckTopCard.className = 'deck-card';
        deckTopCard.id = 'deck-top-card';
        
        deckCards.appendChild(deckTopCard);
        this.deckElement.appendChild(deckCards);
        
        // Criar contador de cartas
        this.cardCounterElement = document.createElement('div');
        this.cardCounterElement.className = 'card-counter';
        this.cardCounterElement.textContent = 'Cartas: 52';
        this.deckElement.appendChild(this.cardCounterElement);
        
        // Adicionar à página
        gameContainer.appendChild(this.deckElement);
    }
    
    /**
     * Atualiza o contador de cartas
     * @param count Número de cartas no baralho
     */
    updateCardCount(count: number): void {
        if (this.cardCounterElement) {
            this.cardCounterElement.textContent = `Cartas: ${count}`;
        }
    }
    
    /**
     * Anima o baralho (efeito de embaralhamento)
     */
    animateDeck(): void {
        if (this.deckElement) {
            this.deckElement.classList.remove('shuffling');
            void this.deckElement.offsetWidth; // Trigger reflow para reiniciar a animação
            this.deckElement.classList.add('shuffling');
        }
    }
    
    /**
     * Anima uma carta sendo retirada do baralho
     * @param cardElement Elemento da carta
     * @param targetElement Elemento onde a carta será colocada
     */
    animateCardDraw(cardElement: HTMLElement, targetElement: HTMLElement): void {
        if (!this.deckElement) return;
        
        // Obter posição do baralho
        const deckRect = this.deckElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        
        // Criar um clone da carta para animação
        const cardClone = cardElement.cloneNode(true) as HTMLElement;
        cardClone.style.position = 'fixed';
        cardClone.style.zIndex = '1000';
        cardClone.style.left = `${deckRect.left}px`;
        cardClone.style.top = `${deckRect.top}px`;
        cardClone.style.transition = 'all 0.5s ease-out';
        cardClone.style.transform = 'rotate(0deg)';
        
        // Adicionar o clone ao corpo do documento
        document.body.appendChild(cardClone);
        
        // Trigger reflow para iniciar a animação
        void cardClone.offsetWidth;
        
        // Animar para a posição final
        cardClone.style.left = `${targetRect.left}px`;
        cardClone.style.top = `${targetRect.top}px`;
        cardClone.style.transform = 'rotate(360deg)';
        
        // Remover o clone após a animação
        setTimeout(() => {
            cardClone.remove();
            
            // Adicionar classe de animação à carta original
            cardElement.classList.add('drawn');
            
            // Se a carta estiver virada para baixo, adicionar classe de carta virada
            if (cardElement.classList.contains('card-back')) {
                setTimeout(() => {
                    cardElement.classList.add('flipping');
                }, 300);
            }
        }, 500);
    }
    
    /**
     * Anima a carta do dealer sendo virada
     * @param cardElement Elemento da carta
     */
    animateCardFlip(cardElement: HTMLElement): void {
        cardElement.classList.add('flipping');
        
        // Após metade da animação, remover a classe de carta virada para baixo
        setTimeout(() => {
            cardElement.classList.remove('card-back');
        }, 300);
    }
    
    /**
     * Anima o resultado do jogo
     * @param result Resultado do jogo ('win', 'lose', 'push', 'blackjack')
     * @param targetElement Elemento a ser animado (área do jogador ou dealer)
     */
    animateGameResult(result: string, targetElement: HTMLElement): void {
        switch (result) {
            case 'win':
                targetElement.classList.add('win-animation');
                setTimeout(() => targetElement.classList.remove('win-animation'), 2000);
                break;
            case 'lose':
                targetElement.classList.add('lose-animation');
                setTimeout(() => targetElement.classList.remove('lose-animation'), 2000);
                break;
            case 'blackjack':
                targetElement.classList.add('blackjack-animation');
                setTimeout(() => targetElement.classList.remove('blackjack-animation'), 2000);
                  // Animar o texto de mensagem também
                if (this.gameMessageElement) {
                    this.gameMessageElement.classList.add('blackjack-text');
                    setTimeout(() => {
                        if (this.gameMessageElement) {
                            this.gameMessageElement.classList.remove('blackjack-text');
                        }
                    }, 2000);
                }
                break;
            case 'push':
                targetElement.classList.add('push-animation');
                setTimeout(() => targetElement.classList.remove('push-animation'), 2000);
                break;
        }
    }
}
