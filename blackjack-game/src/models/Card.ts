// Modelo para representar uma carta de baralho
export interface Card {
    value: string;
    suit: string;
    faceUp?: boolean;
}

// Constantes para os valores e naipes das cartas
export const SUITS: string[] = ['♠', '♥', '♦', '♣'];
export const VALUES: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/**
 * Calcula o valor numérico de uma carta para o jogo de Blackjack
 * @param card A carta para calcular o valor
 * @returns O valor numérico da carta
 */
export function getCardValue(card: Card, currentTotal: number = 0): number {
    if (card.value === 'A') {
        return 1;
    } else if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    } else {
        return parseInt(card.value);
    }
}

/**
 * Calcula a melhor pontuação possível para uma mão de cartas
 * @param cards Array de cartas na mão
 * @returns A pontuação total da mão
 */
export function calculateHandValue(cards: Card[]): number {
    let total = 0;

    // Primeiro, contar cartas sem Ás
    for (const card of cards) {
        if (card.value === 'A') {
            total += 1;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            total += 10;
        } else {
            total += parseInt(card.value);
        }
    }

    return total;
}
