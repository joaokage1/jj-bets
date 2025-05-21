import { GameState, GameConfig } from '../models/Game';
/**
 * Serviço para gerenciar o estado e a lógica do jogo de Blackjack
 */
export declare class GameService {
    private gameState;
    private config;
    private onStateUpdate;
    /**
     * @param config Configurações do jogo
     * @param onStateUpdate Callback para notificar mudanças no estado
     */
    constructor(config: GameConfig, onStateUpdate?: (state: GameState) => void);
    /**
     * Obtém o estado atual do jogo
     * @returns Estado atual do jogo
     */
    getState(): GameState;
    /**
     * Salva o estado atual no localStorage
     */
    saveGameState(): void;
    /**
     * Carrega o estado salvo do localStorage
     */
    private loadGameState;
    /**
     * Inicia um novo jogo
     */
    startNewGame(): void;
    /**
     * Distribui as cartas iniciais para o jogador e o dealer
     */
    private dealInitialCards;
    /**
     * Atualiza as pontuações do jogador e do dealer
     */
    private updateScores;
    /**
     * Verifica se há um blackjack inicial
     */
    private checkForBlackjack;
    /**
     * Permite ao jogador pedir uma carta adicional
     */
    hit(): void;
    /**
     * Jogador decide parar e passar a vez para o dealer
     */
    stand(): void;
    /**
     * Dealer joga sua vez (compra cartas até ter pelo menos 17 pontos)
     */
    private dealerPlay;
    /**
     * Finaliza o jogo e determina o resultado
     */
    private finalizeGame;
    /**
     * Processa o resultado do jogo (pagamentos/perdas)
     * @param result O resultado do jogo
     */
    private processGameResult;
    /**
     * Adiciona uma aposta
     * @param amount Valor da aposta
     */
    placeBet(amount: number): void;
    /**
     * Limpa a aposta atual e devolve o valor ao saldo
     */
    clearBet(): void;
    /**
     * Inicia a contagem regressiva quando o jogador fica sem saldo
     */
    private startCountdown;
    /**
     * Adiciona saldo quando a contagem regressiva termina
     */
    private reloadBalance;
    /**
     * Notifica sobre mudanças no estado
     */
    private notifyStateUpdate;
}
