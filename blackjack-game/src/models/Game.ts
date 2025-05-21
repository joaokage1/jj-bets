import { Card } from './Card';

/**
 * Enumeração para os possíveis resultados do jogo
 */
export enum GameResult {
    PLAYER_WIN = 'player_win',
    PLAYER_BLACKJACK = 'player_blackjack',
    DEALER_WIN = 'dealer_win',
    PUSH = 'push',
    PLAYER_BUST = 'player_bust',
    DEALER_BUST = 'dealer_bust'
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
    hasBlackjack: boolean; // Adicionando a propriedade que faltava
}

/**
 * Estado inicial do jogo
 */
export const initialGameState: GameState = {
    deck: [],
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    message: 'Bem-vindo ao Blackjack! Clique em "Iniciar Jogo" para começar.',
    balance: 1000,
    currentBet: 0,
    gameOver: true,
    playerStands: false,
    gameResult: null,
    canHit: false,
    canStand: false,
    canDeal: true,
    countdownActive: false,
    countdownTime: 0,
    gameInProgress: false,
    hasBlackjack: false  // Inicializado como falso
};

/**
 * Configurações padrão do jogo
 */
export const defaultGameConfig: GameConfig = {
    minimumBet: 5,
    minimumStandScore: 14,
    dealerStandScore: 17,
    blackjackPayout: 1.5, // Pagamento 3:2 para blackjack
    regularWinPayout: 1,  // Pagamento 1:1 para vitória normal
    initialBalance: 1000,
    reloadAmount: 10,
    reloadTime: 60 // segundos
};

/**
 * Determina o resultado do jogo
 * @param state Estado atual do jogo
 * @returns O resultado do jogo
 */
export function determineGameResult(state: GameState): GameResult {
    // Se o jogador ultrapassou 21, ele perde
    if (state.playerScore > 21) {
        return GameResult.PLAYER_BUST;
    }
    
    // Se o dealer ultrapassou 21, o jogador ganha
    if (state.dealerScore > 21) {
        return GameResult.DEALER_BUST;
    }
    
    // Se o jogador tem blackjack, ele ganha (a menos que o dealer também tenha blackjack)
    if (state.hasBlackjack && state.playerHand.length === 2 && state.playerScore === 21) {
        if (state.dealerScore === 21 && state.dealerHand.length === 2) {
            return GameResult.PUSH; // Ambos têm blackjack = empate
        }
        return GameResult.PLAYER_BLACKJACK;
    }
    
    // Empate se as pontuações são iguais
    if (state.playerScore === state.dealerScore) {
        return GameResult.PUSH;
    }
    
    // Comparação de pontuações
    return state.playerScore > state.dealerScore 
        ? GameResult.PLAYER_WIN 
        : GameResult.DEALER_WIN;
}

/**
 * Calcula o pagamento com base no resultado do jogo e na configuração
 * @param result Resultado do jogo
 * @param bet Valor da aposta
 * @param config Configurações do jogo
 * @returns O valor a ser pago ao jogador
 */
export function calculatePayout(result: GameResult, bet: number, config: GameConfig): number {
    switch (result) {
        case GameResult.PLAYER_BLACKJACK:
            return bet + bet * config.blackjackPayout;
        case GameResult.PLAYER_WIN:
        case GameResult.DEALER_BUST:
            return bet + bet * config.regularWinPayout;
        case GameResult.PUSH:
            return bet; // Devolve a aposta
        default:
            return 0; // Perde a aposta
    }
}
