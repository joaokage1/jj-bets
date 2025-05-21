import { Card } from './Card';
/**
 * Enumeração para os possíveis resultados do jogo
 */
export declare enum GameResult {
    PLAYER_WIN = "player_win",
    PLAYER_BLACKJACK = "player_blackjack",
    DEALER_WIN = "dealer_win",
    PUSH = "push",
    PLAYER_BUST = "player_bust",
    DEALER_BUST = "dealer_bust"
}
/**
 * Interface para configurações do jogo
 */
export interface GameConfig {
    minimumBet: number;
    minimumStandScore: number;
    dealerStandScore: number;
    blackjackPayout: number;
    regularWinPayout: number;
    initialBalance: number;
    reloadAmount: number;
    reloadTime: number;
}
/**
 * Interface para o estado do jogo
 */
export interface GameState {
    deck: Card[];
    playerHand: Card[];
    dealerHand: Card[];
    playerScore: number;
    dealerScore: number;
    message: string;
    balance: number;
    currentBet: number;
    gameOver: boolean;
    playerStands: boolean;
    gameResult: GameResult | null;
    canHit: boolean;
    canStand: boolean;
    canDeal: boolean;
    countdownActive: boolean;
    countdownTime: number;
    gameInProgress: boolean;
    hasBlackjack: boolean;
}
/**
 * Estado inicial do jogo
 */
export declare const initialGameState: GameState;
/**
 * Configurações padrão do jogo
 */
export declare const defaultGameConfig: GameConfig;
/**
 * Determina o resultado do jogo
 * @param state Estado atual do jogo
 * @returns O resultado do jogo
 */
export declare function determineGameResult(state: GameState): GameResult;
/**
 * Calcula o pagamento com base no resultado do jogo e na configuração
 * @param result Resultado do jogo
 * @param bet Valor da aposta
 * @param config Configurações do jogo
 * @returns O valor a ser pago ao jogador
 */
export declare function calculatePayout(result: GameResult, bet: number, config: GameConfig): number;
