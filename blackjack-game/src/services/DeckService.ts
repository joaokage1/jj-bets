import { Card, SUITS, VALUES } from '../models/Card';

/**
 * Serviço para gerenciar operações relacionadas ao baralho
 */
export class DeckService {
    /**
     * Cria um novo baralho completo
     * @returns Um array com todas as 52 cartas
     */
    static createDeck(): Card[] {
        const newDeck: Card[] = [];
        SUITS.forEach(suit => {
            VALUES.forEach(value => {
                newDeck.push({ value, suit, faceUp: true });
            });
        });
        return newDeck;
    }

    /**
     * Embaralha um array de cartas usando o algoritmo Fisher-Yates
     * @param deck O baralho a ser embaralhado
     * @returns O baralho embaralhado
     */
    static shuffleDeck(deck: Card[]): Card[] {
        const shuffled = [...deck]; // Cria uma cópia do baralho para não modificar o original
        
        // Algoritmo de Fisher-Yates para embaralhar
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
    }

    /**
     * Retira uma carta do topo do baralho
     * @param deck O baralho
     * @param faceUp Se a carta será virada para cima (true) ou para baixo (false)
     * @returns Um objeto com a carta retirada e o baralho atualizado
     */
    static drawCard(deck: Card[], faceUp: boolean = true): { card: Card, updatedDeck: Card[] } {
        if (deck.length === 0) {
            throw new Error('O baralho está vazio');
        }
        
        // Copia o baralho para não modificar o original
        const updatedDeck = [...deck];
        
        // Remove a carta do topo e define seu estado
        const card = { ...updatedDeck.pop()!, faceUp };
        
        return { card, updatedDeck };
    }

    /**
     * Retorna o número de cartas no baralho
     * @param deck O baralho
     * @returns O número de cartas
     */
    static getCardCount(deck: Card[]): number {
        return deck.length;
    }
    
    /**
     * Vira todas as cartas de uma mão para cima
     * @param cards A mão de cartas
     * @returns A mão com todas as cartas viradas para cima
     */
    static revealHand(cards: Card[]): Card[] {
        return cards.map(card => ({ ...card, faceUp: true }));
    }
}
