import { Card } from '../models/Card';
/**
 * Serviço para gerenciar operações relacionadas ao baralho
 */
export declare class DeckService {
    /**
     * Cria um novo baralho completo
     * @returns Um array com todas as 52 cartas
     */
    static createDeck(): Card[];
    /**
     * Embaralha um array de cartas usando o algoritmo Fisher-Yates
     * @param deck O baralho a ser embaralhado
     * @returns O baralho embaralhado
     */
    static shuffleDeck(deck: Card[]): Card[];
    /**
     * Retira uma carta do topo do baralho
     * @param deck O baralho
     * @param faceUp Se a carta será virada para cima (true) ou para baixo (false)
     * @returns Um objeto com a carta retirada e o baralho atualizado
     */
    static drawCard(deck: Card[], faceUp?: boolean): {
        card: Card;
        updatedDeck: Card[];
    };
    /**
     * Retorna o número de cartas no baralho
     * @param deck O baralho
     * @returns O número de cartas
     */
    static getCardCount(deck: Card[]): number;
    /**
     * Vira todas as cartas de uma mão para cima
     * @param cards A mão de cartas
     * @returns A mão com todas as cartas viradas para cima
     */
    static revealHand(cards: Card[]): Card[];
}
