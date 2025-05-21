/**
 * Componente para renderizar o baralho visível na mesa
 */
export declare class DeckComponent {
    private element;
    private counterElement;
    private cardCount;
    /**
     * @param containerId ID do contêiner onde o baralho será renderizado
     */
    constructor(containerId?: string);
    /**
     * Cria o elemento do baralho e o adiciona ao DOM
     * @param containerId ID do contêiner onde o baralho será renderizado
     */
    private createDeck;
    /**
     * Retorna o elemento DOM do baralho
     */
    getElement(): HTMLElement;
    /**
     * Atualiza o contador de cartas
     * @param count Número de cartas no baralho
     */
    updateCardCount(count: number): void;
    /**
     * Anima o embaralhamento do baralho
     */
    shuffle(): void;
    /**
     * Anima uma carta sendo comprada do baralho
     * @param targetElement Elemento para onde a carta vai
     * @param onComplete Callback a ser chamado quando a animação terminar
     */
    animateCardDraw(targetElement: HTMLElement, onComplete?: () => void): void;
    /**
     * Reseta o contador de cartas
     * @param count Número de cartas (padrão: 52)
     */
    resetCardCount(count?: number): void;
}
