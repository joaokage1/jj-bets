import { GameState, GameResult, GameConfig, initialGameState, determineGameResult, calculatePayout } from '../models/Game';
import { Card, calculateHandValue } from '../models/Card';
import { DeckService } from './DeckService';

/**
 * Serviço para gerenciar o estado e a lógica do jogo de Blackjack
 */
export class GameService {
    private gameState: GameState;
    private config: GameConfig; // Usando config como nome da variável
    private onStateUpdate: ((state: GameState) => void) | undefined;
    
    /**
     * @param config Configurações do jogo
     * @param onStateUpdate Callback para notificar mudanças no estado
     */
    constructor(
        config: GameConfig,
        onStateUpdate?: (state: GameState) => void
    ) {
        this.config = config;
        this.onStateUpdate = onStateUpdate;
        
        // Inicializar o estado do jogo com o estado inicial
        this.gameState = { ...initialGameState };
        
        // Carregar estado salvo do localStorage após inicialização
        this.loadGameState(false);
    }
    
    /**
     * Obtém o estado atual do jogo
     * @returns Estado atual do jogo
     */
    getState(): GameState {
        return { ...this.gameState };
    }
    
    /**
     * Salva o estado atual no localStorage
     */
    saveGameState(): void {
        localStorage.setItem('blackjack_balance', this.gameState.balance.toString());
        
        if (this.gameState.countdownActive) {
            localStorage.setItem('blackjack_countdown', this.gameState.countdownTime.toString());
            
            // Calcula o tempo de expiração para o contador
            const expiryTime = new Date().getTime() + (this.gameState.countdownTime * 1000);
            localStorage.setItem('blackjack_countdown_expiry', expiryTime.toString());
        }
    }
    
    /**
     * Carrega o estado salvo do localStorage
     */
    private loadGameState(notify: boolean = true): void {
        const savedBalance = localStorage.getItem('blackjack_balance');
        const savedCountdown = localStorage.getItem('blackjack_countdown');
        const savedCountdownExpiry = localStorage.getItem('blackjack_countdown_expiry');
        
        if (savedBalance) {
            this.gameState.balance = parseInt(savedBalance);
        }
        
        if (savedCountdown && savedCountdownExpiry) {
            const expiryTime = parseInt(savedCountdownExpiry);
            const currentTime = new Date().getTime();
            
            if (expiryTime > currentTime) {
                // Continuar o contador do ponto onde parou
                this.gameState.countdownTime = Math.floor((expiryTime - currentTime) / 1000);
                this.gameState.countdownActive = true;
            } else if (savedBalance && parseInt(savedBalance) <= 0) {
                // Se o tempo expirou mas o saldo ainda é zero
                this.gameState.balance = this.config.reloadAmount;
            }
        }
        
        // Notificar somente se solicitado
        if (notify && this.onStateUpdate) {
            this.notifyStateUpdate();
        }
    }
    
    /**
     * Inicia um novo jogo
     */
    startNewGame(): void {
        // Verificar se há uma aposta mínima
        if (this.gameState.currentBet < this.config.minimumBet) {
            this.gameState.message = `Você precisa apostar pelo menos ${this.config.minimumBet} fichas para jogar.`;
            this.notifyStateUpdate();
            return;
        }
        
        // Criar e embaralhar o baralho
        this.gameState.deck = DeckService.shuffleDeck(DeckService.createDeck());
        
        // Limpar mãos anteriores
        this.gameState.playerHand = [];
        this.gameState.dealerHand = [];
        
        // Distribuir cartas iniciais
        this.dealInitialCards();
        
        // Calcular pontuações iniciais
        this.updateScores();
        
        // Verificar blackjack inicial
        this.checkForBlackjack();
        
        // Atualizar estado do jogo
        this.gameState.gameOver = false;
        this.gameState.playerStands = false;
        this.gameState.gameInProgress = true; // Definir como verdadeiro quando o jogo começa
        
        // Atualizar estado dos botões
        this.gameState.canHit = true;
        this.gameState.canStand = true;
        this.gameState.canDeal = false; // Não pode iniciar novo jogo enquanto este está em andamento
        
        this.notifyStateUpdate();
    }
    
    /**
     * Distribui as cartas iniciais para o jogador e o dealer
     */
    private dealInitialCards(): void {
        // Jogador recebe duas cartas viradas para cima
        for (let i = 0; i < 2; i++) {
            const result = DeckService.drawCard(this.gameState.deck, true);
            this.gameState.playerHand.push(result.card);
            this.gameState.deck = result.updatedDeck;
        }
        
        // Dealer recebe uma carta virada para cima e uma para baixo
        let result = DeckService.drawCard(this.gameState.deck, true);
        this.gameState.dealerHand.push(result.card);
        this.gameState.deck = result.updatedDeck;
        
        result = DeckService.drawCard(this.gameState.deck, false);
        this.gameState.dealerHand.push(result.card);
        this.gameState.deck = result.updatedDeck;
    }
    
    /**
     * Atualiza as pontuações do jogador e do dealer
     */
    private updateScores(): void {
        this.gameState.playerScore = calculateHandValue(this.gameState.playerHand);
        
        // Para o dealer, considera apenas as cartas viradas para cima
        const visibleDealerCards = this.gameState.dealerHand.filter(card => card.faceUp);
        this.gameState.dealerScore = calculateHandValue(visibleDealerCards);
    }
    
    /**
     * Verifica se há um blackjack inicial
     */
    private checkForBlackjack(): void {
        // Um blackjack é uma mão inicial com pontuação 21 (Ás + 10/J/Q/K)
        const playerHasBlackjack = this.gameState.playerScore === 21 && this.gameState.playerHand.length === 2;
        
        if (playerHasBlackjack) {
            this.gameState.hasBlackjack = true;
            
            // Revelar a carta do dealer
            this.gameState.dealerHand = DeckService.revealHand(this.gameState.dealerHand);
            this.updateScores();
            
            // Verificar se o dealer também tem blackjack (empate)
            const dealerTotal = calculateHandValue(this.gameState.dealerHand);
            const dealerHasBlackjack = dealerTotal === 21 && this.gameState.dealerHand.length === 2;
            
            if (dealerHasBlackjack) {
                this.gameState.message = 'Empate! Ambos têm Blackjack.';
                this.processGameResult(GameResult.PUSH);
            } else {
                this.gameState.message = 'Blackjack! Você ganhou 3:2.';
                this.processGameResult(GameResult.PLAYER_BLACKJACK);
            }
            
            this.gameState.gameOver = true;
        }
    }
    
    /**
     * Permite ao jogador pedir uma carta adicional
     */
    hit(): void {
        if (this.gameState.gameOver || this.gameState.playerStands) {
            return;
        }
        
        // Tirar uma carta do baralho
        const result = DeckService.drawCard(this.gameState.deck, true);
        this.gameState.playerHand.push(result.card);
        this.gameState.deck = result.updatedDeck;
        
        // Atualizar pontuação
        this.updateScores();
        
        // Verificar se o jogador estourou
        if (this.gameState.playerScore > 21) {
            this.gameState.message = 'Você estourou! Dealer vence.';
            this.processGameResult(GameResult.PLAYER_BUST);
            this.gameState.gameOver = true;
        }
        
        this.notifyStateUpdate();
    }
    
    /**
     * Jogador decide parar e passar a vez para o dealer
     */
    stand(): void {
        if (this.gameState.gameOver || this.gameState.playerStands) {
            return;
        }
        
        // Verificar se o jogador tem a pontuação mínima para parar
        if (this.gameState.playerScore < this.config.minimumStandScore) { // Corrigido: gameConfig -> config
            this.gameState.message = `Você precisa ter pelo menos ${this.config.minimumStandScore} pontos para parar.`; // Corrigido: gameConfig -> config
            this.notifyStateUpdate();
            return;
        }
        
        this.gameState.playerStands = true;
        
        // Revelar a carta oculta do dealer
        this.gameState.dealerHand = DeckService.revealHand(this.gameState.dealerHand);
        
        // Atualizar pontuação do dealer considerando todas as cartas
        this.gameState.dealerScore = calculateHandValue(this.gameState.dealerHand);
        
        // Dealer compra cartas até ter pelo menos 17 pontos
        this.dealerPlay();
        
        // Determinar o resultado do jogo
        this.finalizeGame();
        
        this.notifyStateUpdate();
    }
    
    /**
     * Dealer joga sua vez (compra cartas até ter pelo menos 17 pontos)
     */
    private dealerPlay(): void {
        while (this.gameState.dealerScore < 17) {
            const result = DeckService.drawCard(this.gameState.deck, true);
            this.gameState.dealerHand.push(result.card);
            this.gameState.deck = result.updatedDeck;
            this.gameState.dealerScore = calculateHandValue(this.gameState.dealerHand);
        }
    }
    
    /**
     * Finaliza o jogo e determina o resultado
     */
    private finalizeGame(): void {
        const result = determineGameResult(this.gameState);
        let message = '';
        
        switch (result) {
            case GameResult.DEALER_BUST:
                message = 'Dealer estourou! Você ganhou.';
                break;
            case GameResult.PLAYER_WIN:
                message = 'Você ganhou!';
                break;
            case GameResult.DEALER_WIN:
                message = 'Dealer ganhou!';
                break;
            case GameResult.PUSH:
                message = 'Empate!';
                break;
            default:
                message = 'Jogo finalizado.';
        }
        
        this.gameState.message = message;
        this.processGameResult(result);
        this.gameState.gameOver = true;
    }
    
    /**
     * Processa o resultado do jogo (pagamentos/perdas)
     * @param result O resultado do jogo
     */
    private processGameResult(result: GameResult): void {
        const payout = calculatePayout(result, this.gameState.currentBet, this.config);
        this.gameState.balance += payout;
        this.gameState.currentBet = 0;
        
        // Atualizar estado do jogo para permitir nova partida
        this.gameState.gameOver = true;
        this.gameState.gameInProgress = false; // O jogo não está mais em andamento
        this.gameState.canDeal = true; // Habilita o botão de iniciar jogo
        this.gameState.canHit = false; // Desabilita o botão de pedir carta
        this.gameState.canStand = false; // Desabilita o botão de parar

        // Salvar dados do jogo
        this.saveGameState();
        
        // Verificar se o jogador ficou sem saldo
        if (this.gameState.balance <= 0) {
            this.startCountdown();
        }
    }
    
    /**
     * Adiciona uma aposta
     * @param amount Valor da aposta
     */
    placeBet(amount: number): void {
        if (!this.gameState.gameOver) {
            return;
        }
        
        if (amount > this.gameState.balance) {
            this.gameState.message = 'Saldo insuficiente para essa aposta.';
            this.notifyStateUpdate();
            return;
        }
        
        this.gameState.currentBet += amount;
        this.gameState.balance -= amount;
        this.gameState.message = `Aposta: ${this.gameState.currentBet}`;
        
        this.notifyStateUpdate();
    }
    
    /**
     * Limpa a aposta atual e devolve o valor ao saldo
     */
    clearBet(): void {
        if (!this.gameState.gameOver) {
            return;
        }
        
        this.gameState.balance += this.gameState.currentBet;
        this.gameState.currentBet = 0;
        this.gameState.message = 'Aposta cancelada.';
        
        this.notifyStateUpdate();
    }
    
    /**
     * Inicia a contagem regressiva quando o jogador fica sem saldo
     */
    private startCountdown(): void {
        this.gameState.countdownTime = this.config.reloadTime; // Corrigido: gameConfig -> config
        this.gameState.countdownActive = true;
        this.saveGameState();
        this.notifyStateUpdate();
        
        // Iniciar o contador
        const countdownInterval = setInterval(() => {
            this.gameState.countdownTime -= 1;
            this.saveGameState();
            this.notifyStateUpdate();
            
            if (this.gameState.countdownTime <= 0) {
                clearInterval(countdownInterval);
                this.reloadBalance();
            }
        }, 1000);
    }
    
    /**
     * Adiciona saldo quando a contagem regressiva termina
     */
    private reloadBalance(): void {
        this.gameState.balance = this.config.reloadAmount; // Corrigido: gameConfig -> config
        this.gameState.countdownActive = false;
        localStorage.removeItem('blackjack_countdown');
        localStorage.removeItem('blackjack_countdown_expiry');
        this.saveGameState();
        this.notifyStateUpdate();
    }
    
    /**
     * Notifica sobre mudanças no estado
     */
    private notifyStateUpdate(): void {
        if (this.onStateUpdate) {
            this.onStateUpdate({ ...this.gameState });
        }
    }
}
