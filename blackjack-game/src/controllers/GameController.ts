import { GameService } from '../services/GameService';
import { AnimationService } from '../services/AnimationService';
import { UIController } from './UIController';
import { defaultGameConfig } from '../models/Game';

/**
 * Controlador principal que inicializa e coordena todos os componentes do jogo
 */
export class GameController {
    // Adicionando inicializadores para evitar erro TS2564
    private gameService: GameService = {} as GameService;
    private animationService: AnimationService = {} as AnimationService;
    private uiController: UIController = {} as UIController;
    
    /**
     * Inicializa o controlador do jogo
     */
    constructor() {
        console.log('GameController: Initializing...');
        
        try {
            // 1. Inicializar o controlador da UI primeiro
            this.initializeUIController();
            
            // Resto do constructor permanece o mesmo
            // Este padrão split-initialization permite que o TypeScript
            // entenda que as propriedades estão sendo inicializadas
        } catch (error) {
            console.error('Error in GameController constructor:', error);
        }
    }

    /**
     * Inicializa o UI Controller
     */
    private initializeUIController(): void {
        this.uiController = new UIController({
            dealerCardsSelector: '#dealer-cards',
            playerCardsSelector: '#player-cards',
            dealerScoreSelector: '#dealer-score',
            playerScoreSelector: '#player-score',
            messageSelector: '#message',
            balanceSelector: '#balance',
            currentBetSelector: '#current-bet',
            betChipsSelector: '#bet-chips-container',
            newGameBtnSelector: '#new-game-btn',
            hitBtnSelector: '#hit-btn',
            standBtnSelector: '#stand-btn',
            clearBetBtnSelector: '#clear-bet-btn',
            chipsSelector: '.chip',
            countdownSelector: '#countdown',
            reloadScreenSelector: '#reload-screen'
        });
        
        console.log('GameController: UI Controller initialized');
            
        // 2. Inicializar serviço de animação
        this.animationService = new AnimationService({
            deckSelector: '#card-deck',
            cardCounterSelector: '.card-counter',
            dealerCardsSelector: '#dealer-cards',
            playerCardsSelector: '#player-cards',
            gameMessageSelector: '#message'
        });
        
        console.log('GameController: Animation Service initialized');
        
        // 3. Inicializar serviço de jogo por último
        this.gameService = new GameService(
            defaultGameConfig,
            this.handleStateUpdate.bind(this)
        );
        
        console.log('GameController: Game Service initialized');
        
        // Configurar os event listeners imediatamente
        this.setupEventListeners();
        console.log('GameController: Event listeners set up');
        
        // Atualizar a interface com o estado inicial
        const initialState = this.gameService.getState();
        if (initialState) {
            this.handleStateUpdate(initialState);
            console.log('GameController: Initial state update processed');
        }
    }
    
    /**
     * Configura os ouvintes de eventos para interação do usuário
     */
    private setupEventListeners(): void {
        // Botões de controle
        this.uiController.onNewGameClick(() => {
            console.log('New Game button clicked');
            this.gameService.startNewGame();
            // Animar o baralho
            this.animationService.animateDeck();
        });
        
        this.uiController.onHitClick(() => {
            console.log('Hit button clicked');
            this.gameService.hit();
        });
        
        this.uiController.onStandClick(() => {
            console.log('Stand button clicked');
            this.gameService.stand();
        });
        
        this.uiController.onClearBetClick(() => {
            console.log('Clear bet button clicked');
            this.gameService.clearBet();
        });
        
        // Chips de aposta
        this.uiController.onChipClick((value) => {
            console.log(`Chip clicked with value: ${value}`);
            this.gameService.placeBet(value);
        });
        
        // Adicionar listerner para o botão de regras do jogo
        const rulesBtn = document.getElementById('rules-btn');
        const rulesModal = document.getElementById('rules-modal');
        const closeBtn = document.querySelector('.close-btn');
        
        if (rulesBtn && rulesModal) {
            rulesBtn.addEventListener('click', () => {
                console.log('Rules button clicked');
                rulesModal.style.display = 'flex';
            });
        }
        
        if (closeBtn && rulesModal) {
            closeBtn.addEventListener('click', () => {
                rulesModal.style.display = 'none';
            });
        }
    }
    
    /**
     * Manipula atualizações no estado do jogo
     * @param state Novo estado do jogo
     */
    private handleStateUpdate(state: any): void {
        try {
            console.log('GameController: Handling state update');
            
            // Verificar se a UI foi inicializada
            if (!this.uiController) {
                console.error('UI Controller not initialized during state update');
                return;
            }
            
            // Atualizar a interface
            this.uiController.updateUI(state);
            
            // Renderizar cartas
            if (state.playerHand && state.dealerHand) {
                this.uiController.renderCards(state.playerHand, state.dealerHand);
            }
            
            // Renderizar fichas da aposta
            this.uiController.renderBetChips(state.currentBet);
            
            // Atualizar contador de cartas no baralho
            if (this.animationService && state.deck) {
                this.animationService.updateCardCount(state.deck.length);
            }
        } catch (error) {
            console.error('Error in handleStateUpdate:', error);
        }
    }
}
