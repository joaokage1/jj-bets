import { Card } from '../models/Card';
/**
 * Componente para renderizar uma carta de baralho
 */
export declare class CardComponent {
    private element;
    /**
     * @param card Dados da carta
     * @param animated Se a carta deve ser animada
     */
    constructor(card: Card, animated?: boolean);
    /**
     * Retorna o elemento DOM da carta
     */
    getElement(): HTMLElement;
    /**
     * Cria o elemento DOM da carta
     * @param card Dados da carta
     * @returns Elemento DOM da carta
     */
    private createCardElement;
    /**
     * Vira a carta (de face para baixo para face para cima)
     */
    flip(): void;
    /**
     * Anima a carta (por exemplo, ao ganhar)
     * @param animationType Tipo de animação ('win', 'lose', 'blackjack')
     */
    animate(animationType: string): void;
}
