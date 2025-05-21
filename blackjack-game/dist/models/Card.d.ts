export interface Card {
    value: string;
    suit: string;
    faceUp?: boolean;
}
export declare const SUITS: string[];
export declare const VALUES: string[];
/**
 * Calcula o valor numérico de uma carta para o jogo de Blackjack
 * @param card A carta para calcular o valor
 * @returns O valor numérico da carta
 */
export declare function getCardValue(card: Card, currentTotal?: number): number;
/**
 * Calcula a melhor pontuação possível para uma mão de cartas
 * @param cards Array de cartas na mão
 * @returns A pontuação total da mão
 */
export declare function calculateHandValue(cards: Card[]): number;
