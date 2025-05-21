/**
 * Serviço para gerenciar as animações e efeitos visuais do jogo
 */
export declare class AnimationService {
    private deckElement;
    private cardCounterElement;
    private dealerCardsElement;
    private playerCardsElement;
    private gameMessageElement;
    /**
     * Inicializa o serviço de animação
     * @param selectors Seletores para os elementos DOM
     */
    constructor(selectors: {
        deckSelector: string;
        cardCounterSelector: string;
        dealerCardsSelector: string;
        playerCardsSelector: string;
        gameMessageSelector: string;
    });
    /**
     * Cria um baralho visível na mesa
     */
    private createVisibleDeck;
    /**
     * Atualiza o contador de cartas
     * @param count Número de cartas no baralho
     */
    updateCardCount(count: number): void;
    /**
     * Anima o baralho (efeito de embaralhamento)
     */
    animateDeck(): void;
    /**
     * Anima uma carta sendo retirada do baralho
     * @param cardElement Elemento da carta
     * @param targetElement Elemento onde a carta será colocada
     */
    animateCardDraw(cardElement: HTMLElement, targetElement: HTMLElement): void;
    /**
     * Anima a carta do dealer sendo virada
     * @param cardElement Elemento da carta
     */
    animateCardFlip(cardElement: HTMLElement): void;
    /**
     * Anima o resultado do jogo
     * @param result Resultado do jogo ('win', 'lose', 'push', 'blackjack')
     * @param targetElement Elemento a ser animado (área do jogador ou dealer)
     */
    animateGameResult(result: string, targetElement: HTMLElement): void;
}
