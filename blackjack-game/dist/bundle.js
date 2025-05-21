/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/GameController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/GameController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameController: () => (/* binding */ GameController)
/* harmony export */ });
/* harmony import */ var _services_GameService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/GameService */ "./src/services/GameService.ts");
/* harmony import */ var _services_AnimationService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/AnimationService */ "./src/services/AnimationService.ts");
/* harmony import */ var _UIController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UIController */ "./src/controllers/UIController.ts");
/* harmony import */ var _models_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/Game */ "./src/models/Game.ts");




/**
 * Controlador principal que inicializa e coordena todos os componentes do jogo
 */
class GameController {
    /**
     * Inicializa o controlador do jogo
     */
    constructor() {
        // Adicionando inicializadores para evitar erro TS2564
        this.gameService = {};
        this.animationService = {};
        this.uiController = {};
        console.log('GameController: Initializing...');
        try {
            // 1. Inicializar o controlador da UI primeiro
            this.initializeUIController();
            // Resto do constructor permanece o mesmo
            // Este padrão split-initialization permite que o TypeScript
            // entenda que as propriedades estão sendo inicializadas
        }
        catch (error) {
            console.error('Error in GameController constructor:', error);
        }
    }
    /**
     * Inicializa o UI Controller
     */
    initializeUIController() {
        this.uiController = new _UIController__WEBPACK_IMPORTED_MODULE_2__.UIController({
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
        this.animationService = new _services_AnimationService__WEBPACK_IMPORTED_MODULE_1__.AnimationService({
            deckSelector: '#card-deck',
            cardCounterSelector: '.card-counter',
            dealerCardsSelector: '#dealer-cards',
            playerCardsSelector: '#player-cards',
            gameMessageSelector: '#message'
        });
        console.log('GameController: Animation Service initialized');
        // 3. Inicializar serviço de jogo por último
        this.gameService = new _services_GameService__WEBPACK_IMPORTED_MODULE_0__.GameService(_models_Game__WEBPACK_IMPORTED_MODULE_3__.defaultGameConfig, this.handleStateUpdate.bind(this));
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
    setupEventListeners() {
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
    handleStateUpdate(state) {
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
        }
        catch (error) {
            console.error('Error in handleStateUpdate:', error);
        }
    }
}


/***/ }),

/***/ "./src/controllers/UIController.ts":
/*!*****************************************!*\
  !*** ./src/controllers/UIController.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIController: () => (/* binding */ UIController)
/* harmony export */ });
/**
 * Classe responsável por gerenciar a interface do usuário
 */
class UIController {
    /**
     * @param selectors Seletores para os elementos da interface
     */
    constructor(selectors) {
        this.selectors = selectors; // Armazenar os seletores para uso posterior
        // Inicializar os elementos imediatamente se o DOM já estiver carregado
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.initializeElements(selectors);
        }
        else {
            // Caso contrário, aguardar o carregamento do DOM
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeElements(selectors);
            });
        }
    }
    // Método para inicializar os elementos
    initializeElements(selectors) {
        this.elements = {
            dealerCards: document.querySelector(selectors.dealerCardsSelector),
            playerCards: document.querySelector(selectors.playerCardsSelector),
            dealerScore: document.querySelector(selectors.dealerScoreSelector),
            playerScore: document.querySelector(selectors.playerScoreSelector),
            message: document.querySelector(selectors.messageSelector),
            balance: document.querySelector(selectors.balanceSelector),
            currentBet: document.querySelector(selectors.currentBetSelector),
            betChips: document.querySelector(selectors.betChipsSelector),
            newGameBtn: document.querySelector(selectors.newGameBtnSelector),
            hitBtn: document.querySelector(selectors.hitBtnSelector),
            standBtn: document.querySelector(selectors.standBtnSelector),
            clearBetBtn: document.querySelector(selectors.clearBetBtnSelector),
            chips: document.querySelectorAll(selectors.chipsSelector),
            countdownElement: document.querySelector(selectors.countdownSelector),
            reloadScreen: document.querySelector(selectors.reloadScreenSelector)
        };
        this.validateElements();
        // Emitir um evento indicando que os elementos estão prontos
        document.dispatchEvent(new CustomEvent('ui-controller-ready'));
    }
    /**
     * Verifica se todos os elementos foram encontrados
     * @throws Erro se algum elemento não for encontrado
     */
    validateElements() {
        const missing = Object.entries(this.elements)
            .filter(([_, element]) => !element)
            .map(([key]) => key);
        if (missing.length > 0) {
            console.error(`Elementos não encontrados: ${missing.join(', ')}`);
        }
    }
    /**
     * Atualiza a interface com base no estado do jogo
     * @param state Estado atual do jogo
     */
    updateUI(state) {
        // Verificar se os elementos existem
        if (!this.elements)
            return;
        // Atualizar pontuações
        this.elements.dealerScore.textContent = state.dealerScore.toString();
        this.elements.playerScore.textContent = state.playerScore.toString();
        // Atualizar mensagem
        this.elements.message.textContent = state.message;
        // Atualizar saldo e aposta
        this.elements.balance.textContent = state.balance.toString();
        this.elements.currentBet.textContent = state.currentBet.toString();
        // Atualizar estado dos botões
        this.elements.hitBtn.disabled = !state.canHit || state.gameOver;
        this.elements.standBtn.disabled = !state.canStand || state.gameOver;
        this.elements.newGameBtn.disabled = !state.canDeal || state.gameInProgress;
        // Mostrar ou esconder tela de recarga
        if (state.countdownActive) {
            this.showReloadScreen(state.countdownTime);
        }
        else {
            this.hideReloadScreen();
        }
    }
    /**
     * Atualiza o estado dos botões com base no estado do jogo
     * @param state Estado atual do jogo
     */
    updateButtons(state) {
        // Botões de jogo
        this.elements.hitBtn.disabled = state.gameOver;
        this.elements.standBtn.disabled = state.gameOver;
        // Botão de nova partida
        this.elements.newGameBtn.disabled = state.currentBet < 5 || state.countdownActive;
        // Botão de limpar aposta
        this.elements.clearBetBtn.disabled = !state.gameOver || state.currentBet === 0;
        // Chips de aposta
        this.elements.chips.forEach(chip => {
            const chipValue = parseInt(chip.getAttribute('data-value') || '0');
            chip.classList.toggle('disabled', state.balance < chipValue || !state.gameOver);
        });
    }
    /**
     * Renderiza as cartas na mesa
     * @param playerCards Cartas do jogador
     * @param dealerCards Cartas do dealer
     */
    renderCards(playerCards, dealerCards) {
        this.renderHand(playerCards, this.elements.playerCards);
        this.renderHand(dealerCards, this.elements.dealerCards);
    }
    /**
     * Renderiza uma mão de cartas
     * @param hand Mão de cartas
     * @param container Elemento que receberá as cartas
     */
    renderHand(hand, container) {
        // Limpar o container
        container.innerHTML = '';
        // Adicionar cada carta
        hand.forEach(card => {
            const cardElement = this.createCardElement(card);
            container.appendChild(cardElement);
        });
    }
    /**
     * Cria um elemento para representar uma carta
     * @param card Dados da carta
     * @returns Elemento HTML da carta
     */
    createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.faceUp ? '' : 'card-back'}`;
        if (card.faceUp) {
            const isRed = card.suit === '♥' || card.suit === '♦';
            cardElement.className += isRed ? ' red' : '';
            const valueElement = document.createElement('div');
            valueElement.className = 'card-value';
            valueElement.innerHTML = `${card.value}<br>${card.suit}`;
            const centerElement = document.createElement('div');
            centerElement.className = 'card-center';
            centerElement.textContent = card.suit;
            cardElement.appendChild(valueElement);
            cardElement.appendChild(centerElement);
        }
        return cardElement;
    }
    /**
     * Renderiza as fichas da aposta atual
     * @param betAmount Valor da aposta
     */
    renderBetChips(betAmount) {
        // Limpar o container
        this.elements.betChips.innerHTML = '';
        if (betAmount > 0) {
            // Determinar quais fichas mostrar
            const chipValues = [100, 50, 25, 10, 5];
            let remainingBet = betAmount;
            chipValues.forEach(value => {
                const count = Math.floor(remainingBet / value);
                remainingBet %= value;
                if (count > 0) {
                    // Criar uma pilha para fichas do mesmo valor
                    const stackContainer = document.createElement('div');
                    stackContainer.className = 'chip-stack';
                    for (let i = 0; i < Math.min(count, 5); i++) {
                        const chipElement = document.createElement('div');
                        chipElement.className = `bet-chip chip-${value}`;
                        chipElement.textContent = value.toString();
                        stackContainer.appendChild(chipElement);
                    }
                    // Se houver mais de 5 fichas do mesmo valor, adicione um contador
                    if (count > 5) {
                        const countElement = document.createElement('div');
                        countElement.className = 'chip-count';
                        countElement.textContent = `x${count}`;
                        stackContainer.appendChild(countElement);
                    }
                    this.elements.betChips.appendChild(stackContainer);
                }
            });
        }
    }
    /**
     * Exibe a tela de recarga de saldo
     * @param seconds Tempo restante em segundos
     */
    showReloadScreen(seconds) {
        this.elements.reloadScreen.style.display = 'flex';
        this.elements.countdownElement.textContent = seconds.toString();
    }
    /**
     * Esconde a tela de recarga de saldo
     */
    hideReloadScreen() {
        this.elements.reloadScreen.style.display = 'none';
    }
    /**
     * Adiciona um ouvinte de evento para o botão de Nova Partida
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onNewGameClick(callback) {
        this.elements.newGameBtn.addEventListener('click', callback);
    }
    /**
     * Adiciona um ouvinte de evento para o botão de Pedir Carta
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onHitClick(callback) {
        this.elements.hitBtn.addEventListener('click', callback);
    }
    /**
     * Adiciona um ouvinte de evento para o botão de Parar
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onStandClick(callback) {
        this.elements.standBtn.addEventListener('click', callback);
    }
    /**
     * Adiciona um ouvinte de evento para o botão de Limpar Aposta
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onClearBetClick(callback) {
        this.elements.clearBetBtn.addEventListener('click', callback);
    }
    /**
     * Adiciona ouvintes de evento para os chips de aposta
     * @param callback Função a ser chamada quando um chip for clicado (recebe o valor como parâmetro)
     */
    onChipClick(callback) {
        try {
            // O problema é tentar usar this.elements.chipsSelector, quando o correto é usar as chips já selecionadas
            console.log(`Setting up chip click listeners on ${this.elements.chips.length} chip elements`);
            this.elements.chips.forEach(chipElement => {
                chipElement.addEventListener('click', () => {
                    const value = parseInt(chipElement.dataset.value || '0', 10);
                    console.log(`Chip clicked with value: ${value}`);
                    callback(value);
                });
            });
        }
        catch (error) {
            console.error('Error setting up chip click listeners:', error);
        }
    }
}


/***/ }),

/***/ "./src/models/Card.ts":
/*!****************************!*\
  !*** ./src/models/Card.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SUITS: () => (/* binding */ SUITS),
/* harmony export */   VALUES: () => (/* binding */ VALUES),
/* harmony export */   calculateHandValue: () => (/* binding */ calculateHandValue),
/* harmony export */   getCardValue: () => (/* binding */ getCardValue)
/* harmony export */ });
// Constantes para os valores e naipes das cartas
const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
/**
 * Calcula o valor numérico de uma carta para o jogo de Blackjack
 * @param card A carta para calcular o valor
 * @returns O valor numérico da carta
 */
function getCardValue(card, currentTotal = 0) {
    if (card.value === 'A') {
        return 1;
    }
    else if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    }
    else {
        return parseInt(card.value);
    }
}
/**
 * Calcula a melhor pontuação possível para uma mão de cartas
 * @param cards Array de cartas na mão
 * @returns A pontuação total da mão
 */
function calculateHandValue(cards) {
    let total = 0;
    // Primeiro, contar cartas sem Ás
    for (const card of cards) {
        if (card.value === 'A') {
            total += 1;
        }
        else if (['J', 'Q', 'K'].includes(card.value)) {
            total += 10;
        }
        else {
            total += parseInt(card.value);
        }
    }
    return total;
}


/***/ }),

/***/ "./src/models/Game.ts":
/*!****************************!*\
  !*** ./src/models/Game.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameResult: () => (/* binding */ GameResult),
/* harmony export */   calculatePayout: () => (/* binding */ calculatePayout),
/* harmony export */   defaultGameConfig: () => (/* binding */ defaultGameConfig),
/* harmony export */   determineGameResult: () => (/* binding */ determineGameResult),
/* harmony export */   initialGameState: () => (/* binding */ initialGameState)
/* harmony export */ });
/**
 * Enumeração para os possíveis resultados do jogo
 */
var GameResult;
(function (GameResult) {
    GameResult["PLAYER_WIN"] = "player_win";
    GameResult["PLAYER_BLACKJACK"] = "player_blackjack";
    GameResult["DEALER_WIN"] = "dealer_win";
    GameResult["PUSH"] = "push";
    GameResult["PLAYER_BUST"] = "player_bust";
    GameResult["DEALER_BUST"] = "dealer_bust";
})(GameResult || (GameResult = {}));
/**
 * Estado inicial do jogo
 */
const initialGameState = {
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
    hasBlackjack: false // Inicializado como falso
};
/**
 * Configurações padrão do jogo
 */
const defaultGameConfig = {
    minimumBet: 5,
    minimumStandScore: 14,
    dealerStandScore: 17,
    blackjackPayout: 1.5, // Pagamento 3:2 para blackjack
    regularWinPayout: 1, // Pagamento 1:1 para vitória normal
    initialBalance: 1000,
    reloadAmount: 10,
    reloadTime: 60 // segundos
};
/**
 * Determina o resultado do jogo
 * @param state Estado atual do jogo
 * @returns O resultado do jogo
 */
function determineGameResult(state) {
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
function calculatePayout(result, bet, config) {
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


/***/ }),

/***/ "./src/services/AnimationService.ts":
/*!******************************************!*\
  !*** ./src/services/AnimationService.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationService: () => (/* binding */ AnimationService)
/* harmony export */ });
/**
 * Serviço para gerenciar as animações e efeitos visuais do jogo
 */
class AnimationService {
    /**
     * Inicializa o serviço de animação
     * @param selectors Seletores para os elementos DOM
     */
    constructor(selectors) {
        this.deckElement = null;
        this.cardCounterElement = null;
        this.dealerCardsElement = null;
        this.playerCardsElement = null;
        this.gameMessageElement = null;
        document.addEventListener('DOMContentLoaded', () => {
            this.deckElement = document.querySelector(selectors.deckSelector);
            this.cardCounterElement = document.querySelector(selectors.cardCounterSelector);
            this.dealerCardsElement = document.querySelector(selectors.dealerCardsSelector);
            this.playerCardsElement = document.querySelector(selectors.playerCardsSelector);
            this.gameMessageElement = document.querySelector(selectors.gameMessageSelector);
            if (!this.deckElement) {
                this.createVisibleDeck();
            }
        });
    }
    /**
     * Cria um baralho visível na mesa
     */
    createVisibleDeck() {
        // Verificar se já existe um baralho
        if (document.querySelector('.card-deck')) {
            return;
        }
        const gameContainer = document.querySelector('.game-container') || document.body;
        // Criar elementos do baralho
        this.deckElement = document.createElement('div');
        this.deckElement.className = 'card-deck';
        this.deckElement.id = 'card-deck';
        const deckCards = document.createElement('div');
        deckCards.className = 'deck-cards';
        const deckTopCard = document.createElement('div');
        deckTopCard.className = 'deck-card';
        deckTopCard.id = 'deck-top-card';
        deckCards.appendChild(deckTopCard);
        this.deckElement.appendChild(deckCards);
        // Criar contador de cartas
        this.cardCounterElement = document.createElement('div');
        this.cardCounterElement.className = 'card-counter';
        this.cardCounterElement.textContent = 'Cartas: 52';
        this.deckElement.appendChild(this.cardCounterElement);
        // Adicionar à página
        gameContainer.appendChild(this.deckElement);
    }
    /**
     * Atualiza o contador de cartas
     * @param count Número de cartas no baralho
     */
    updateCardCount(count) {
        if (this.cardCounterElement) {
            this.cardCounterElement.textContent = `Cartas: ${count}`;
        }
    }
    /**
     * Anima o baralho (efeito de embaralhamento)
     */
    animateDeck() {
        if (this.deckElement) {
            this.deckElement.classList.remove('shuffling');
            void this.deckElement.offsetWidth; // Trigger reflow para reiniciar a animação
            this.deckElement.classList.add('shuffling');
        }
    }
    /**
     * Anima uma carta sendo retirada do baralho
     * @param cardElement Elemento da carta
     * @param targetElement Elemento onde a carta será colocada
     */
    animateCardDraw(cardElement, targetElement) {
        if (!this.deckElement)
            return;
        // Obter posição do baralho
        const deckRect = this.deckElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        // Criar um clone da carta para animação
        const cardClone = cardElement.cloneNode(true);
        cardClone.style.position = 'fixed';
        cardClone.style.zIndex = '1000';
        cardClone.style.left = `${deckRect.left}px`;
        cardClone.style.top = `${deckRect.top}px`;
        cardClone.style.transition = 'all 0.5s ease-out';
        cardClone.style.transform = 'rotate(0deg)';
        // Adicionar o clone ao corpo do documento
        document.body.appendChild(cardClone);
        // Trigger reflow para iniciar a animação
        void cardClone.offsetWidth;
        // Animar para a posição final
        cardClone.style.left = `${targetRect.left}px`;
        cardClone.style.top = `${targetRect.top}px`;
        cardClone.style.transform = 'rotate(360deg)';
        // Remover o clone após a animação
        setTimeout(() => {
            cardClone.remove();
            // Adicionar classe de animação à carta original
            cardElement.classList.add('drawn');
            // Se a carta estiver virada para baixo, adicionar classe de carta virada
            if (cardElement.classList.contains('card-back')) {
                setTimeout(() => {
                    cardElement.classList.add('flipping');
                }, 300);
            }
        }, 500);
    }
    /**
     * Anima a carta do dealer sendo virada
     * @param cardElement Elemento da carta
     */
    animateCardFlip(cardElement) {
        cardElement.classList.add('flipping');
        // Após metade da animação, remover a classe de carta virada para baixo
        setTimeout(() => {
            cardElement.classList.remove('card-back');
        }, 300);
    }
    /**
     * Anima o resultado do jogo
     * @param result Resultado do jogo ('win', 'lose', 'push', 'blackjack')
     * @param targetElement Elemento a ser animado (área do jogador ou dealer)
     */
    animateGameResult(result, targetElement) {
        switch (result) {
            case 'win':
                targetElement.classList.add('win-animation');
                setTimeout(() => targetElement.classList.remove('win-animation'), 2000);
                break;
            case 'lose':
                targetElement.classList.add('lose-animation');
                setTimeout(() => targetElement.classList.remove('lose-animation'), 2000);
                break;
            case 'blackjack':
                targetElement.classList.add('blackjack-animation');
                setTimeout(() => targetElement.classList.remove('blackjack-animation'), 2000);
                // Animar o texto de mensagem também
                if (this.gameMessageElement) {
                    this.gameMessageElement.classList.add('blackjack-text');
                    setTimeout(() => {
                        if (this.gameMessageElement) {
                            this.gameMessageElement.classList.remove('blackjack-text');
                        }
                    }, 2000);
                }
                break;
            case 'push':
                targetElement.classList.add('push-animation');
                setTimeout(() => targetElement.classList.remove('push-animation'), 2000);
                break;
        }
    }
}


/***/ }),

/***/ "./src/services/DeckService.ts":
/*!*************************************!*\
  !*** ./src/services/DeckService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeckService: () => (/* binding */ DeckService)
/* harmony export */ });
/* harmony import */ var _models_Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Card */ "./src/models/Card.ts");

/**
 * Serviço para gerenciar operações relacionadas ao baralho
 */
class DeckService {
    /**
     * Cria um novo baralho completo
     * @returns Um array com todas as 52 cartas
     */
    static createDeck() {
        const newDeck = [];
        _models_Card__WEBPACK_IMPORTED_MODULE_0__.SUITS.forEach(suit => {
            _models_Card__WEBPACK_IMPORTED_MODULE_0__.VALUES.forEach(value => {
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
    static shuffleDeck(deck) {
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
    static drawCard(deck, faceUp = true) {
        if (deck.length === 0) {
            throw new Error('O baralho está vazio');
        }
        // Copia o baralho para não modificar o original
        const updatedDeck = [...deck];
        // Remove a carta do topo e define seu estado
        const card = Object.assign(Object.assign({}, updatedDeck.pop()), { faceUp });
        return { card, updatedDeck };
    }
    /**
     * Retorna o número de cartas no baralho
     * @param deck O baralho
     * @returns O número de cartas
     */
    static getCardCount(deck) {
        return deck.length;
    }
    /**
     * Vira todas as cartas de uma mão para cima
     * @param cards A mão de cartas
     * @returns A mão com todas as cartas viradas para cima
     */
    static revealHand(cards) {
        return cards.map(card => (Object.assign(Object.assign({}, card), { faceUp: true })));
    }
}


/***/ }),

/***/ "./src/services/GameService.ts":
/*!*************************************!*\
  !*** ./src/services/GameService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameService: () => (/* binding */ GameService)
/* harmony export */ });
/* harmony import */ var _models_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Game */ "./src/models/Game.ts");
/* harmony import */ var _models_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Card */ "./src/models/Card.ts");
/* harmony import */ var _DeckService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DeckService */ "./src/services/DeckService.ts");



/**
 * Serviço para gerenciar o estado e a lógica do jogo de Blackjack
 */
class GameService {
    /**
     * @param config Configurações do jogo
     * @param onStateUpdate Callback para notificar mudanças no estado
     */
    constructor(config, onStateUpdate) {
        this.config = config;
        this.onStateUpdate = onStateUpdate;
        // Inicializar o estado do jogo com o estado inicial
        this.gameState = Object.assign({}, _models_Game__WEBPACK_IMPORTED_MODULE_0__.initialGameState);
        // Carregar estado salvo do localStorage após inicialização
        this.loadGameState(false);
    }
    /**
     * Obtém o estado atual do jogo
     * @returns Estado atual do jogo
     */
    getState() {
        return Object.assign({}, this.gameState);
    }
    /**
     * Salva o estado atual no localStorage
     */
    saveGameState() {
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
    loadGameState(notify = true) {
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
            }
            else if (savedBalance && parseInt(savedBalance) <= 0) {
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
    startNewGame() {
        // Verificar se há uma aposta mínima
        if (this.gameState.currentBet < this.config.minimumBet) {
            this.gameState.message = `Você precisa apostar pelo menos ${this.config.minimumBet} fichas para jogar.`;
            this.notifyStateUpdate();
            return;
        }
        // Criar e embaralhar o baralho
        this.gameState.deck = _DeckService__WEBPACK_IMPORTED_MODULE_2__.DeckService.shuffleDeck(_DeckService__WEBPACK_IMPORTED_MODULE_2__.DeckService.createDeck());
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
    dealInitialCards() {
        // Jogador recebe duas cartas viradas para cima
        for (let i = 0; i < 2; i++) {
            const result = _DeckService__WEBPACK_IMPORTED_MODULE_2__.DeckService.drawCard(this.gameState.deck, true);
            this.gameState.playerHand.push(result.card);
            this.gameState.deck = result.updatedDeck;
        }
        // Dealer recebe uma carta virada para cima e uma para baixo
        let result = _DeckService__WEBPACK_IMPORTED_MODULE_2__.DeckService.drawCard(this.gameState.deck, true);
        this.gameState.dealerHand.push(result.card);
        this.gameState.deck = result.updatedDeck;
        result = _DeckService__WEBPACK_IMPORTED_MODULE_2__.DeckService.drawCard(this.gameState.deck, false);
        this.gameState.dealerHand.push(result.card);
        this.gameState.deck = result.updatedDeck;
    }
    /**
     * Atualiza as pontuações do jogador e do dealer
     */
    updateScores() {
        this.gameState.playerScore = (0,_models_Card__WEBPACK_IMPORTED_MODULE_1__.calculateHandValue)(this.gameState.playerHand);
        // Para o dealer, considera apenas as cartas viradas para cima
        const visibleDealerCards = this.gameState.dealerHand.filter(card => card.faceUp);
        this.gameState.dealerScore = (0,_models_Card__WEBPACK_IMPORTED_MODULE_1__.calculateHandValue)(visibleDealerCards);
    }
    /**
     * Verifica se há um blackjack inicial
     */
    checkForBlackjack() {
        // Um blackjack é uma mão inicial com pontuação 21 (Ás + 10/J/Q/K)
        const playerHasBlackjack = this.gameState.playerScore === 21 && this.gameState.playerHand.length === 2;
        if (playerHasBlackjack) {
            this.gameState.hasBlackjack = true;
            // Revelar a carta do dealer
            this.gameState.dealerHand = _DeckService__WEBPACK_IMPORTED_MODULE_2__.DeckService.revealHand(this.gameState.dealerHand);
            this.updateScores();
            // Verificar se o dealer também tem blackjack (empate)
            const dealerTotal = (0,_models_Card__WEBPACK_IMPORTED_MODULE_1__.calculateHandValue)(this.gameState.dealerHand);
            const dealerHasBlackjack = dealerTotal === 21 && this.gameState.dealerHand.length === 2;
            if (dealerHasBlackjack) {
                this.gameState.message = 'Empate! Ambos têm Blackjack.';
                this.processGameResult(_models_Game__WEBPACK_IMPORTED_MODULE_0__.GameResult.PUSH);
            }
            else {
                this.gameState.message = 'Blackjack! Você ganhou 3:2.';
                this.processGameResult(_models_Game__WEBPACK_IMPORTED_MODULE_0__.GameResult.PLAYER_BLACKJACK);
            }
            this.gameState.gameOver = true;
        }
    }
    /**
     * Permite ao jogador pedir uma carta adicional
     */
    hit() {
        if (this.gameState.gameOver || this.gameState.playerStands) {
            return;
        }
        // Tirar uma carta do baralho
        const result = _DeckService__WEBPACK_IMPORTED_MODULE_2__.DeckService.drawCard(this.gameState.deck, true);
        this.gameState.playerHand.push(result.card);
        this.gameState.deck = result.updatedDeck;
        // Atualizar pontuação
        this.updateScores();
        // Verificar se o jogador estourou
        if (this.gameState.playerScore > 21) {
            this.gameState.message = 'Você estourou! Dealer vence.';
            this.processGameResult(_models_Game__WEBPACK_IMPORTED_MODULE_0__.GameResult.PLAYER_BUST);
            this.gameState.gameOver = true;
        }
        this.notifyStateUpdate();
    }
    /**
     * Jogador decide parar e passar a vez para o dealer
     */
    stand() {
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
        this.gameState.dealerHand = _DeckService__WEBPACK_IMPORTED_MODULE_2__.DeckService.revealHand(this.gameState.dealerHand);
        // Atualizar pontuação do dealer considerando todas as cartas
        this.gameState.dealerScore = (0,_models_Card__WEBPACK_IMPORTED_MODULE_1__.calculateHandValue)(this.gameState.dealerHand);
        // Dealer compra cartas até ter pelo menos 17 pontos
        this.dealerPlay();
        // Determinar o resultado do jogo
        this.finalizeGame();
        this.notifyStateUpdate();
    }
    /**
     * Dealer joga sua vez (compra cartas até ter pelo menos 17 pontos)
     */
    dealerPlay() {
        while (this.gameState.dealerScore < 17) {
            const result = _DeckService__WEBPACK_IMPORTED_MODULE_2__.DeckService.drawCard(this.gameState.deck, true);
            this.gameState.dealerHand.push(result.card);
            this.gameState.deck = result.updatedDeck;
            this.gameState.dealerScore = (0,_models_Card__WEBPACK_IMPORTED_MODULE_1__.calculateHandValue)(this.gameState.dealerHand);
        }
    }
    /**
     * Finaliza o jogo e determina o resultado
     */
    finalizeGame() {
        const result = (0,_models_Game__WEBPACK_IMPORTED_MODULE_0__.determineGameResult)(this.gameState);
        let message = '';
        switch (result) {
            case _models_Game__WEBPACK_IMPORTED_MODULE_0__.GameResult.DEALER_BUST:
                message = 'Dealer estourou! Você ganhou.';
                break;
            case _models_Game__WEBPACK_IMPORTED_MODULE_0__.GameResult.PLAYER_WIN:
                message = 'Você ganhou!';
                break;
            case _models_Game__WEBPACK_IMPORTED_MODULE_0__.GameResult.DEALER_WIN:
                message = 'Dealer ganhou!';
                break;
            case _models_Game__WEBPACK_IMPORTED_MODULE_0__.GameResult.PUSH:
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
    processGameResult(result) {
        const payout = (0,_models_Game__WEBPACK_IMPORTED_MODULE_0__.calculatePayout)(result, this.gameState.currentBet, this.config);
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
    placeBet(amount) {
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
    clearBet() {
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
    startCountdown() {
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
    reloadBalance() {
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
    notifyStateUpdate() {
        if (this.onStateUpdate) {
            this.onStateUpdate(Object.assign({}, this.gameState));
        }
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_GameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/GameController */ "./src/controllers/GameController.ts");

/**
 * Ponto de entrada da aplicação Blackjack
 * Inicializa o controlador principal do jogo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar o controlador do jogo após carregar o DOM
    try {
        const gameController = new _controllers_GameController__WEBPACK_IMPORTED_MODULE_0__.GameController();
        console.log('Game controller initialized successfully');
        // Verificar se os elementos críticos existem
        const checkElements = ['#player-cards', '#dealer-cards', '#new-game-btn', '.chip'];
        checkElements.forEach(selector => {
            if (!document.querySelector(selector)) {
                console.error(`Element not found: ${selector}`);
            }
        });
    }
    catch (error) {
        console.error('Error initializing game controller:', error);
    }
    // Detectar orientação em dispositivos móveis
    handleOrientationWarning();
});
/**
 * Configura detecção de orientação para dispositivos móveis
 * Exibe um aviso quando o dispositivo está em modo retrato
 */
function handleOrientationWarning() {
    const orientationMessage = document.querySelector('.orientation-message');
    if (!orientationMessage)
        return; // Se não encontrou o elemento, sai da função
    // Verificar orientação inicial
    checkOrientation();
    // Configurar detector de mudança de orientação
    window.addEventListener('resize', checkOrientation);
    // Verificar orientação em dispositivos móveis
    function checkOrientation() {
        // Somente para dispositivos móveis
        if (window.innerWidth < 768) {
            if (window.innerWidth < window.innerHeight) {
                // Modo retrato
                orientationMessage.classList.add('visible');
            }
            else {
                // Modo paisagem
                orientationMessage.classList.remove('visible');
            }
        }
        else {
            // Desktop ou tablet grande - esconder mensagem
            orientationMessage.classList.remove('visible');
        }
    }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLHdCQUF3QixFQUFFLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxTQUFTLHdCQUF3QjtJQUM3QixNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUUxRSxJQUFJLENBQUMsa0JBQWtCO1FBQUUsT0FBTyxDQUFDLDZDQUE2QztJQUU5RSwrQkFBK0I7SUFDL0IsZ0JBQWdCLEVBQUUsQ0FBQztJQUVuQiwrQ0FBK0M7SUFDL0MsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXBELDhDQUE4QztJQUM5QyxTQUFTLGdCQUFnQjtRQUNyQixtQ0FBbUM7UUFDbkMsSUFBSSxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQzFCLElBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3pDLGVBQWU7Z0JBQ2Qsa0JBQWtDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqRSxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osZ0JBQWdCO2dCQUNmLGtCQUFrQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEUsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ0osK0NBQStDO1lBQzlDLGtCQUFrQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEUsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FzaW5vLWdhbWVzLy4vc3JjL2NvbnRyb2xsZXJzL0dhbWVDb250cm9sbGVyLnRzIiwid2VicGFjazovL2Nhc2luby1nYW1lcy8uL3NyYy9jb250cm9sbGVycy9VSUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vY2FzaW5vLWdhbWVzLy4vc3JjL21vZGVscy9DYXJkLnRzIiwid2VicGFjazovL2Nhc2luby1nYW1lcy8uL3NyYy9tb2RlbHMvR2FtZS50cyIsIndlYnBhY2s6Ly9jYXNpbm8tZ2FtZXMvLi9zcmMvc2VydmljZXMvQW5pbWF0aW9uU2VydmljZS50cyIsIndlYnBhY2s6Ly9jYXNpbm8tZ2FtZXMvLi9zcmMvc2VydmljZXMvRGVja1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vY2FzaW5vLWdhbWVzLy4vc3JjL3NlcnZpY2VzL0dhbWVTZXJ2aWNlLnRzIiwid2VicGFjazovL2Nhc2luby1nYW1lcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYXNpbm8tZ2FtZXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nhc2luby1nYW1lcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nhc2luby1nYW1lcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nhc2luby1nYW1lcy8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvR2FtZVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmltYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvQW5pbWF0aW9uU2VydmljZSc7XHJcbmltcG9ydCB7IFVJQ29udHJvbGxlciB9IGZyb20gJy4vVUlDb250cm9sbGVyJztcclxuaW1wb3J0IHsgZGVmYXVsdEdhbWVDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvR2FtZSc7XHJcblxyXG4vKipcclxuICogQ29udHJvbGFkb3IgcHJpbmNpcGFsIHF1ZSBpbmljaWFsaXphIGUgY29vcmRlbmEgdG9kb3Mgb3MgY29tcG9uZW50ZXMgZG8gam9nb1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdhbWVDb250cm9sbGVyIHtcclxuICAgIC8vIEFkaWNpb25hbmRvIGluaWNpYWxpemFkb3JlcyBwYXJhIGV2aXRhciBlcnJvIFRTMjU2NFxyXG4gICAgcHJpdmF0ZSBnYW1lU2VydmljZTogR2FtZVNlcnZpY2UgPSB7fSBhcyBHYW1lU2VydmljZTtcclxuICAgIHByaXZhdGUgYW5pbWF0aW9uU2VydmljZTogQW5pbWF0aW9uU2VydmljZSA9IHt9IGFzIEFuaW1hdGlvblNlcnZpY2U7XHJcbiAgICBwcml2YXRlIHVpQ29udHJvbGxlcjogVUlDb250cm9sbGVyID0ge30gYXMgVUlDb250cm9sbGVyO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEluaWNpYWxpemEgbyBjb250cm9sYWRvciBkbyBqb2dvXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdHYW1lQ29udHJvbGxlcjogSW5pdGlhbGl6aW5nLi4uJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gMS4gSW5pY2lhbGl6YXIgbyBjb250cm9sYWRvciBkYSBVSSBwcmltZWlyb1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVVSUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJlc3RvIGRvIGNvbnN0cnVjdG9yIHBlcm1hbmVjZSBvIG1lc21vXHJcbiAgICAgICAgICAgIC8vIEVzdGUgcGFkcsOjbyBzcGxpdC1pbml0aWFsaXphdGlvbiBwZXJtaXRlIHF1ZSBvIFR5cGVTY3JpcHRcclxuICAgICAgICAgICAgLy8gZW50ZW5kYSBxdWUgYXMgcHJvcHJpZWRhZGVzIGVzdMOjbyBzZW5kbyBpbmljaWFsaXphZGFzXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gR2FtZUNvbnRyb2xsZXIgY29uc3RydWN0b3I6JywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaWNpYWxpemEgbyBVSSBDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVVJQ29udHJvbGxlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVpQ29udHJvbGxlciA9IG5ldyBVSUNvbnRyb2xsZXIoe1xyXG4gICAgICAgICAgICBkZWFsZXJDYXJkc1NlbGVjdG9yOiAnI2RlYWxlci1jYXJkcycsXHJcbiAgICAgICAgICAgIHBsYXllckNhcmRzU2VsZWN0b3I6ICcjcGxheWVyLWNhcmRzJyxcclxuICAgICAgICAgICAgZGVhbGVyU2NvcmVTZWxlY3RvcjogJyNkZWFsZXItc2NvcmUnLFxyXG4gICAgICAgICAgICBwbGF5ZXJTY29yZVNlbGVjdG9yOiAnI3BsYXllci1zY29yZScsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VTZWxlY3RvcjogJyNtZXNzYWdlJyxcclxuICAgICAgICAgICAgYmFsYW5jZVNlbGVjdG9yOiAnI2JhbGFuY2UnLFxyXG4gICAgICAgICAgICBjdXJyZW50QmV0U2VsZWN0b3I6ICcjY3VycmVudC1iZXQnLFxyXG4gICAgICAgICAgICBiZXRDaGlwc1NlbGVjdG9yOiAnI2JldC1jaGlwcy1jb250YWluZXInLFxyXG4gICAgICAgICAgICBuZXdHYW1lQnRuU2VsZWN0b3I6ICcjbmV3LWdhbWUtYnRuJyxcclxuICAgICAgICAgICAgaGl0QnRuU2VsZWN0b3I6ICcjaGl0LWJ0bicsXHJcbiAgICAgICAgICAgIHN0YW5kQnRuU2VsZWN0b3I6ICcjc3RhbmQtYnRuJyxcclxuICAgICAgICAgICAgY2xlYXJCZXRCdG5TZWxlY3RvcjogJyNjbGVhci1iZXQtYnRuJyxcclxuICAgICAgICAgICAgY2hpcHNTZWxlY3RvcjogJy5jaGlwJyxcclxuICAgICAgICAgICAgY291bnRkb3duU2VsZWN0b3I6ICcjY291bnRkb3duJyxcclxuICAgICAgICAgICAgcmVsb2FkU2NyZWVuU2VsZWN0b3I6ICcjcmVsb2FkLXNjcmVlbidcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZygnR2FtZUNvbnRyb2xsZXI6IFVJIENvbnRyb2xsZXIgaW5pdGlhbGl6ZWQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gMi4gSW5pY2lhbGl6YXIgc2VydmnDp28gZGUgYW5pbWHDp8Ojb1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU2VydmljZSA9IG5ldyBBbmltYXRpb25TZXJ2aWNlKHtcclxuICAgICAgICAgICAgZGVja1NlbGVjdG9yOiAnI2NhcmQtZGVjaycsXHJcbiAgICAgICAgICAgIGNhcmRDb3VudGVyU2VsZWN0b3I6ICcuY2FyZC1jb3VudGVyJyxcclxuICAgICAgICAgICAgZGVhbGVyQ2FyZHNTZWxlY3RvcjogJyNkZWFsZXItY2FyZHMnLFxyXG4gICAgICAgICAgICBwbGF5ZXJDYXJkc1NlbGVjdG9yOiAnI3BsYXllci1jYXJkcycsXHJcbiAgICAgICAgICAgIGdhbWVNZXNzYWdlU2VsZWN0b3I6ICcjbWVzc2FnZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZygnR2FtZUNvbnRyb2xsZXI6IEFuaW1hdGlvbiBTZXJ2aWNlIGluaXRpYWxpemVkJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gMy4gSW5pY2lhbGl6YXIgc2VydmnDp28gZGUgam9nbyBwb3Igw7psdGltb1xyXG4gICAgICAgIHRoaXMuZ2FtZVNlcnZpY2UgPSBuZXcgR2FtZVNlcnZpY2UoXHJcbiAgICAgICAgICAgIGRlZmF1bHRHYW1lQ29uZmlnLFxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0YXRlVXBkYXRlLmJpbmQodGhpcylcclxuICAgICAgICApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdHYW1lQ29udHJvbGxlcjogR2FtZSBTZXJ2aWNlIGluaXRpYWxpemVkJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ29uZmlndXJhciBvcyBldmVudCBsaXN0ZW5lcnMgaW1lZGlhdGFtZW50ZVxyXG4gICAgICAgIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdHYW1lQ29udHJvbGxlcjogRXZlbnQgbGlzdGVuZXJzIHNldCB1cCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEF0dWFsaXphciBhIGludGVyZmFjZSBjb20gbyBlc3RhZG8gaW5pY2lhbFxyXG4gICAgICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHRoaXMuZ2FtZVNlcnZpY2UuZ2V0U3RhdGUoKTtcclxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RhdGVVcGRhdGUoaW5pdGlhbFN0YXRlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dhbWVDb250cm9sbGVyOiBJbml0aWFsIHN0YXRlIHVwZGF0ZSBwcm9jZXNzZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJhIG9zIG91dmludGVzIGRlIGV2ZW50b3MgcGFyYSBpbnRlcmHDp8OjbyBkbyB1c3XDoXJpb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldHVwRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gQm90w7VlcyBkZSBjb250cm9sZVxyXG4gICAgICAgIHRoaXMudWlDb250cm9sbGVyLm9uTmV3R2FtZUNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ05ldyBHYW1lIGJ1dHRvbiBjbGlja2VkJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVNlcnZpY2Uuc3RhcnROZXdHYW1lKCk7XHJcbiAgICAgICAgICAgIC8vIEFuaW1hciBvIGJhcmFsaG9cclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TZXJ2aWNlLmFuaW1hdGVEZWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51aUNvbnRyb2xsZXIub25IaXRDbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIaXQgYnV0dG9uIGNsaWNrZWQnKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU2VydmljZS5oaXQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVpQ29udHJvbGxlci5vblN0YW5kQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3RhbmQgYnV0dG9uIGNsaWNrZWQnKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU2VydmljZS5zdGFuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudWlDb250cm9sbGVyLm9uQ2xlYXJCZXRDbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDbGVhciBiZXQgYnV0dG9uIGNsaWNrZWQnKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU2VydmljZS5jbGVhckJldCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoaXBzIGRlIGFwb3N0YVxyXG4gICAgICAgIHRoaXMudWlDb250cm9sbGVyLm9uQ2hpcENsaWNrKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQ2hpcCBjbGlja2VkIHdpdGggdmFsdWU6ICR7dmFsdWV9YCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVNlcnZpY2UucGxhY2VCZXQodmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkaWNpb25hciBsaXN0ZXJuZXIgcGFyYSBvIGJvdMOjbyBkZSByZWdyYXMgZG8gam9nb1xyXG4gICAgICAgIGNvbnN0IHJ1bGVzQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3J1bGVzLWJ0bicpO1xyXG4gICAgICAgIGNvbnN0IHJ1bGVzTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncnVsZXMtbW9kYWwnKTtcclxuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idG4nKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAocnVsZXNCdG4gJiYgcnVsZXNNb2RhbCkge1xyXG4gICAgICAgICAgICBydWxlc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSdWxlcyBidXR0b24gY2xpY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgcnVsZXNNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNsb3NlQnRuICYmIHJ1bGVzTW9kYWwpIHtcclxuICAgICAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBydWxlc01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBNYW5pcHVsYSBhdHVhbGl6YcOnw7VlcyBubyBlc3RhZG8gZG8gam9nb1xyXG4gICAgICogQHBhcmFtIHN0YXRlIE5vdm8gZXN0YWRvIGRvIGpvZ29cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVTdGF0ZVVwZGF0ZShzdGF0ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dhbWVDb250cm9sbGVyOiBIYW5kbGluZyBzdGF0ZSB1cGRhdGUnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFZlcmlmaWNhciBzZSBhIFVJIGZvaSBpbmljaWFsaXphZGFcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnVpQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVUkgQ29udHJvbGxlciBub3QgaW5pdGlhbGl6ZWQgZHVyaW5nIHN0YXRlIHVwZGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBBdHVhbGl6YXIgYSBpbnRlcmZhY2VcclxuICAgICAgICAgICAgdGhpcy51aUNvbnRyb2xsZXIudXBkYXRlVUkoc3RhdGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVuZGVyaXphciBjYXJ0YXNcclxuICAgICAgICAgICAgaWYgKHN0YXRlLnBsYXllckhhbmQgJiYgc3RhdGUuZGVhbGVySGFuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51aUNvbnRyb2xsZXIucmVuZGVyQ2FyZHMoc3RhdGUucGxheWVySGFuZCwgc3RhdGUuZGVhbGVySGFuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJlbmRlcml6YXIgZmljaGFzIGRhIGFwb3N0YVxyXG4gICAgICAgICAgICB0aGlzLnVpQ29udHJvbGxlci5yZW5kZXJCZXRDaGlwcyhzdGF0ZS5jdXJyZW50QmV0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEF0dWFsaXphciBjb250YWRvciBkZSBjYXJ0YXMgbm8gYmFyYWxob1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb25TZXJ2aWNlICYmIHN0YXRlLmRlY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU2VydmljZS51cGRhdGVDYXJkQ291bnQoc3RhdGUuZGVjay5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gaGFuZGxlU3RhdGVVcGRhdGU6JywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvR2FtZSc7XHJcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuLi9tb2RlbHMvQ2FyZCc7XHJcbmltcG9ydCB7IEdhbWVVdGlscyB9IGZyb20gJy4uL3V0aWxzL0dhbWVVdGlscyc7XHJcblxyXG4vKipcclxuICogQ2xhc3NlIHJlc3BvbnPDoXZlbCBwb3IgZ2VyZW5jaWFyIGEgaW50ZXJmYWNlIGRvIHVzdcOhcmlvXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVUlDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgZWxlbWVudHMhOiB7XHJcbiAgICAgICAgZGVhbGVyQ2FyZHM6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHBsYXllckNhcmRzOiBIVE1MRWxlbWVudDtcclxuICAgICAgICBkZWFsZXJTY29yZTogSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgcGxheWVyU2NvcmU6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGJhbGFuY2U6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGN1cnJlbnRCZXQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGJldENoaXBzOiBIVE1MRWxlbWVudDtcclxuICAgICAgICBuZXdHYW1lQnRuOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICBoaXRCdG46IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHN0YW5kQnRuOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICBjbGVhckJldEJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgY2hpcHM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIGNvdW50ZG93bkVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHJlbG9hZFNjcmVlbjogSFRNTEVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvLyBBZGljaW9uYW5kbyBhIHByb3ByaWVkYWRlIHNlbGVjdG9ycyBxdWUgZmFsdGF2YVxyXG4gICAgcHJpdmF0ZSBzZWxlY3RvcnM6IHtcclxuICAgICAgICBkZWFsZXJDYXJkc1NlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgcGxheWVyQ2FyZHNTZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIGRlYWxlclNjb3JlU2VsZWN0b3I6IHN0cmluZztcclxuICAgICAgICBwbGF5ZXJTY29yZVNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgbWVzc2FnZVNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgYmFsYW5jZVNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgY3VycmVudEJldFNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgYmV0Q2hpcHNTZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIG5ld0dhbWVCdG5TZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIGhpdEJ0blNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgc3RhbmRCdG5TZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIGNsZWFyQmV0QnRuU2VsZWN0b3I6IHN0cmluZztcclxuICAgICAgICBjaGlwc1NlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgY291bnRkb3duU2VsZWN0b3I6IHN0cmluZztcclxuICAgICAgICByZWxvYWRTY3JlZW5TZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JzIFNlbGV0b3JlcyBwYXJhIG9zIGVsZW1lbnRvcyBkYSBpbnRlcmZhY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3JzOiB7XHJcbiAgICAgICAgZGVhbGVyQ2FyZHNTZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIHBsYXllckNhcmRzU2VsZWN0b3I6IHN0cmluZztcclxuICAgICAgICBkZWFsZXJTY29yZVNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgcGxheWVyU2NvcmVTZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIG1lc3NhZ2VTZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIGJhbGFuY2VTZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIGN1cnJlbnRCZXRTZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIGJldENoaXBzU2VsZWN0b3I6IHN0cmluZztcclxuICAgICAgICBuZXdHYW1lQnRuU2VsZWN0b3I6IHN0cmluZztcclxuICAgICAgICBoaXRCdG5TZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIHN0YW5kQnRuU2VsZWN0b3I6IHN0cmluZztcclxuICAgICAgICBjbGVhckJldEJ0blNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgY2hpcHNTZWxlY3Rvcjogc3RyaW5nO1xyXG4gICAgICAgIGNvdW50ZG93blNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgICAgICAgcmVsb2FkU2NyZWVuU2VsZWN0b3I6IHN0cmluZztcclxuICAgIH0pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9ycyA9IHNlbGVjdG9yczsgLy8gQXJtYXplbmFyIG9zIHNlbGV0b3JlcyBwYXJhIHVzbyBwb3N0ZXJpb3JcclxuICAgICAgICBcclxuICAgICAgICAvLyBJbmljaWFsaXphciBvcyBlbGVtZW50b3MgaW1lZGlhdGFtZW50ZSBzZSBvIERPTSBqw6EgZXN0aXZlciBjYXJyZWdhZG9cclxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUVsZW1lbnRzKHNlbGVjdG9ycyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQ2FzbyBjb250csOhcmlvLCBhZ3VhcmRhciBvIGNhcnJlZ2FtZW50byBkbyBET01cclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUVsZW1lbnRzKHNlbGVjdG9ycyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gTcOpdG9kbyBwYXJhIGluaWNpYWxpemFyIG9zIGVsZW1lbnRvc1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplRWxlbWVudHMoc2VsZWN0b3JzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBkZWFsZXJDYXJkczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuZGVhbGVyQ2FyZHNTZWxlY3RvcikgYXMgSFRNTEVsZW1lbnQsXHJcbiAgICAgICAgICAgIHBsYXllckNhcmRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5wbGF5ZXJDYXJkc1NlbGVjdG9yKSBhcyBIVE1MRWxlbWVudCxcclxuICAgICAgICAgICAgZGVhbGVyU2NvcmU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmRlYWxlclNjb3JlU2VsZWN0b3IpIGFzIEhUTUxFbGVtZW50LFxyXG4gICAgICAgICAgICBwbGF5ZXJTY29yZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMucGxheWVyU2NvcmVTZWxlY3RvcikgYXMgSFRNTEVsZW1lbnQsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLm1lc3NhZ2VTZWxlY3RvcikgYXMgSFRNTEVsZW1lbnQsXHJcbiAgICAgICAgICAgIGJhbGFuY2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmJhbGFuY2VTZWxlY3RvcikgYXMgSFRNTEVsZW1lbnQsXHJcbiAgICAgICAgICAgIGN1cnJlbnRCZXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmN1cnJlbnRCZXRTZWxlY3RvcikgYXMgSFRNTEVsZW1lbnQsXHJcbiAgICAgICAgICAgIGJldENoaXBzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5iZXRDaGlwc1NlbGVjdG9yKSBhcyBIVE1MRWxlbWVudCxcclxuICAgICAgICAgICAgbmV3R2FtZUJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMubmV3R2FtZUJ0blNlbGVjdG9yKSBhcyBIVE1MQnV0dG9uRWxlbWVudCxcclxuICAgICAgICAgICAgaGl0QnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5oaXRCdG5TZWxlY3RvcikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQsXHJcbiAgICAgICAgICAgIHN0YW5kQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zdGFuZEJ0blNlbGVjdG9yKSBhcyBIVE1MQnV0dG9uRWxlbWVudCxcclxuICAgICAgICAgICAgY2xlYXJCZXRCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNsZWFyQmV0QnRuU2VsZWN0b3IpIGFzIEhUTUxCdXR0b25FbGVtZW50LFxyXG4gICAgICAgICAgICBjaGlwczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMuY2hpcHNTZWxlY3RvcikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgICAgIGNvdW50ZG93bkVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNvdW50ZG93blNlbGVjdG9yKSBhcyBIVE1MRWxlbWVudCxcclxuICAgICAgICAgICAgcmVsb2FkU2NyZWVuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5yZWxvYWRTY3JlZW5TZWxlY3RvcikgYXMgSFRNTEVsZW1lbnRcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudmFsaWRhdGVFbGVtZW50cygpO1xyXG4gICAgICAgIC8vIEVtaXRpciB1bSBldmVudG8gaW5kaWNhbmRvIHF1ZSBvcyBlbGVtZW50b3MgZXN0w6NvIHByb250b3NcclxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgndWktY29udHJvbGxlci1yZWFkeScpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJpZmljYSBzZSB0b2RvcyBvcyBlbGVtZW50b3MgZm9yYW0gZW5jb250cmFkb3NcclxuICAgICAqIEB0aHJvd3MgRXJybyBzZSBhbGd1bSBlbGVtZW50byBuw6NvIGZvciBlbmNvbnRyYWRvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdmFsaWRhdGVFbGVtZW50cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtaXNzaW5nID0gT2JqZWN0LmVudHJpZXModGhpcy5lbGVtZW50cylcclxuICAgICAgICAgICAgLmZpbHRlcigoW18sIGVsZW1lbnRdKSA9PiAhZWxlbWVudClcclxuICAgICAgICAgICAgLm1hcCgoW2tleV0pID0+IGtleSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG1pc3NpbmcubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFbGVtZW50b3MgbsOjbyBlbmNvbnRyYWRvczogJHttaXNzaW5nLmpvaW4oJywgJyl9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEF0dWFsaXphIGEgaW50ZXJmYWNlIGNvbSBiYXNlIG5vIGVzdGFkbyBkbyBqb2dvXHJcbiAgICAgKiBAcGFyYW0gc3RhdGUgRXN0YWRvIGF0dWFsIGRvIGpvZ29cclxuICAgICAqL1xyXG4gICAgdXBkYXRlVUkoc3RhdGU6IEdhbWVTdGF0ZSk6IHZvaWQge1xyXG4gICAgICAgIC8vIFZlcmlmaWNhciBzZSBvcyBlbGVtZW50b3MgZXhpc3RlbVxyXG4gICAgICAgIGlmICghdGhpcy5lbGVtZW50cykgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEF0dWFsaXphciBwb250dWHDp8O1ZXNcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmRlYWxlclNjb3JlLnRleHRDb250ZW50ID0gc3RhdGUuZGVhbGVyU2NvcmUudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLnBsYXllclNjb3JlLnRleHRDb250ZW50ID0gc3RhdGUucGxheWVyU2NvcmUudG9TdHJpbmcoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBdHVhbGl6YXIgbWVuc2FnZW1cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLm1lc3NhZ2UudGV4dENvbnRlbnQgPSBzdGF0ZS5tZXNzYWdlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEF0dWFsaXphciBzYWxkbyBlIGFwb3N0YVxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuYmFsYW5jZS50ZXh0Q29udGVudCA9IHN0YXRlLmJhbGFuY2UudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmN1cnJlbnRCZXQudGV4dENvbnRlbnQgPSBzdGF0ZS5jdXJyZW50QmV0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQXR1YWxpemFyIGVzdGFkbyBkb3MgYm90w7Vlc1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuaGl0QnRuLmRpc2FibGVkID0gIXN0YXRlLmNhbkhpdCB8fCBzdGF0ZS5nYW1lT3ZlcjtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLnN0YW5kQnRuLmRpc2FibGVkID0gIXN0YXRlLmNhblN0YW5kIHx8IHN0YXRlLmdhbWVPdmVyO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMubmV3R2FtZUJ0bi5kaXNhYmxlZCA9ICFzdGF0ZS5jYW5EZWFsIHx8IHN0YXRlLmdhbWVJblByb2dyZXNzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE1vc3RyYXIgb3UgZXNjb25kZXIgdGVsYSBkZSByZWNhcmdhXHJcbiAgICAgICAgaWYgKHN0YXRlLmNvdW50ZG93bkFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZWxvYWRTY3JlZW4oc3RhdGUuY291bnRkb3duVGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlUmVsb2FkU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEF0dWFsaXphIG8gZXN0YWRvIGRvcyBib3TDtWVzIGNvbSBiYXNlIG5vIGVzdGFkbyBkbyBqb2dvXHJcbiAgICAgKiBAcGFyYW0gc3RhdGUgRXN0YWRvIGF0dWFsIGRvIGpvZ29cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVCdXR0b25zKHN0YXRlOiBHYW1lU3RhdGUpOiB2b2lkIHtcclxuICAgICAgICAvLyBCb3TDtWVzIGRlIGpvZ29cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmhpdEJ0bi5kaXNhYmxlZCA9IHN0YXRlLmdhbWVPdmVyO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuc3RhbmRCdG4uZGlzYWJsZWQgPSBzdGF0ZS5nYW1lT3ZlcjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBCb3TDo28gZGUgbm92YSBwYXJ0aWRhXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5uZXdHYW1lQnRuLmRpc2FibGVkID0gc3RhdGUuY3VycmVudEJldCA8IDUgfHwgc3RhdGUuY291bnRkb3duQWN0aXZlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEJvdMOjbyBkZSBsaW1wYXIgYXBvc3RhXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5jbGVhckJldEJ0bi5kaXNhYmxlZCA9ICFzdGF0ZS5nYW1lT3ZlciB8fCBzdGF0ZS5jdXJyZW50QmV0ID09PSAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoaXBzIGRlIGFwb3N0YVxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuY2hpcHMuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hpcFZhbHVlID0gcGFyc2VJbnQoY2hpcC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSB8fCAnMCcpO1xyXG4gICAgICAgICAgICBjaGlwLmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgc3RhdGUuYmFsYW5jZSA8IGNoaXBWYWx1ZSB8fCAhc3RhdGUuZ2FtZU92ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcml6YSBhcyBjYXJ0YXMgbmEgbWVzYVxyXG4gICAgICogQHBhcmFtIHBsYXllckNhcmRzIENhcnRhcyBkbyBqb2dhZG9yXHJcbiAgICAgKiBAcGFyYW0gZGVhbGVyQ2FyZHMgQ2FydGFzIGRvIGRlYWxlclxyXG4gICAgICovXHJcbiAgICByZW5kZXJDYXJkcyhwbGF5ZXJDYXJkczogQ2FyZFtdLCBkZWFsZXJDYXJkczogQ2FyZFtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJIYW5kKHBsYXllckNhcmRzLCB0aGlzLmVsZW1lbnRzLnBsYXllckNhcmRzKTtcclxuICAgICAgICB0aGlzLnJlbmRlckhhbmQoZGVhbGVyQ2FyZHMsIHRoaXMuZWxlbWVudHMuZGVhbGVyQ2FyZHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcml6YSB1bWEgbcOjbyBkZSBjYXJ0YXNcclxuICAgICAqIEBwYXJhbSBoYW5kIE3Do28gZGUgY2FydGFzXHJcbiAgICAgKiBAcGFyYW0gY29udGFpbmVyIEVsZW1lbnRvIHF1ZSByZWNlYmVyw6EgYXMgY2FydGFzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVySGFuZChoYW5kOiBDYXJkW10sIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICAvLyBMaW1wYXIgbyBjb250YWluZXJcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRpY2lvbmFyIGNhZGEgY2FydGFcclxuICAgICAgICBoYW5kLmZvckVhY2goY2FyZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gdGhpcy5jcmVhdGVDYXJkRWxlbWVudChjYXJkKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhcmRFbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmlhIHVtIGVsZW1lbnRvIHBhcmEgcmVwcmVzZW50YXIgdW1hIGNhcnRhXHJcbiAgICAgKiBAcGFyYW0gY2FyZCBEYWRvcyBkYSBjYXJ0YVxyXG4gICAgICogQHJldHVybnMgRWxlbWVudG8gSFRNTCBkYSBjYXJ0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNhcmRFbGVtZW50KGNhcmQ6IENhcmQpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgY2FyZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjYXJkRWxlbWVudC5jbGFzc05hbWUgPSBgY2FyZCAke2NhcmQuZmFjZVVwID8gJycgOiAnY2FyZC1iYWNrJ31gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjYXJkLmZhY2VVcCkge1xyXG4gICAgICAgICAgICBjb25zdCBpc1JlZCA9IGNhcmQuc3VpdCA9PT0gJ+KZpScgfHwgY2FyZC5zdWl0ID09PSAn4pmmJztcclxuICAgICAgICAgICAgY2FyZEVsZW1lbnQuY2xhc3NOYW1lICs9IGlzUmVkID8gJyByZWQnIDogJyc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTmFtZSA9ICdjYXJkLXZhbHVlJztcclxuICAgICAgICAgICAgdmFsdWVFbGVtZW50LmlubmVySFRNTCA9IGAke2NhcmQudmFsdWV9PGJyPiR7Y2FyZC5zdWl0fWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjZW50ZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNlbnRlckVsZW1lbnQuY2xhc3NOYW1lID0gJ2NhcmQtY2VudGVyJztcclxuICAgICAgICAgICAgY2VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGNhcmQuc3VpdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhcmRFbGVtZW50LmFwcGVuZENoaWxkKHZhbHVlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGNhcmRFbGVtZW50LmFwcGVuZENoaWxkKGNlbnRlckVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY2FyZEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyaXphIGFzIGZpY2hhcyBkYSBhcG9zdGEgYXR1YWxcclxuICAgICAqIEBwYXJhbSBiZXRBbW91bnQgVmFsb3IgZGEgYXBvc3RhXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckJldENoaXBzKGJldEFtb3VudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gTGltcGFyIG8gY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5iZXRDaGlwcy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBcclxuICAgICAgICBpZiAoYmV0QW1vdW50ID4gMCkge1xyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmFyIHF1YWlzIGZpY2hhcyBtb3N0cmFyXHJcbiAgICAgICAgICAgIGNvbnN0IGNoaXBWYWx1ZXMgPSBbMTAwLCA1MCwgMjUsIDEwLCA1XTtcclxuICAgICAgICAgICAgbGV0IHJlbWFpbmluZ0JldCA9IGJldEFtb3VudDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNoaXBWYWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IE1hdGguZmxvb3IocmVtYWluaW5nQmV0IC8gdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nQmV0ICU9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JpYXIgdW1hIHBpbGhhIHBhcmEgZmljaGFzIGRvIG1lc21vIHZhbG9yXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhY2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFja0NvbnRhaW5lci5jbGFzc05hbWUgPSAnY2hpcC1zdGFjayc7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1pbihjb3VudCwgNSk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlwRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlwRWxlbWVudC5jbGFzc05hbWUgPSBgYmV0LWNoaXAgY2hpcC0ke3ZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaXBFbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hpcEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZSBob3V2ZXIgbWFpcyBkZSA1IGZpY2hhcyBkbyBtZXNtbyB2YWxvciwgYWRpY2lvbmUgdW0gY29udGFkb3JcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NoaXAtY291bnQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudEVsZW1lbnQudGV4dENvbnRlbnQgPSBgeCR7Y291bnR9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tDb250YWluZXIuYXBwZW5kQ2hpbGQoY291bnRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5iZXRDaGlwcy5hcHBlbmRDaGlsZChzdGFja0NvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGliZSBhIHRlbGEgZGUgcmVjYXJnYSBkZSBzYWxkb1xyXG4gICAgICogQHBhcmFtIHNlY29uZHMgVGVtcG8gcmVzdGFudGUgZW0gc2VndW5kb3NcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93UmVsb2FkU2NyZWVuKHNlY29uZHM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMucmVsb2FkU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5jb3VudGRvd25FbGVtZW50LnRleHRDb250ZW50ID0gc2Vjb25kcy50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEVzY29uZGUgYSB0ZWxhIGRlIHJlY2FyZ2EgZGUgc2FsZG9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoaWRlUmVsb2FkU2NyZWVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMucmVsb2FkU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRpY2lvbmEgdW0gb3V2aW50ZSBkZSBldmVudG8gcGFyYSBvIGJvdMOjbyBkZSBOb3ZhIFBhcnRpZGFcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBGdW7Dp8OjbyBhIHNlciBjaGFtYWRhIHF1YW5kbyBvIGJvdMOjbyBmb3IgY2xpY2Fkb1xyXG4gICAgICovXHJcbiAgICBvbk5ld0dhbWVDbGljayhjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMubmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGljaW9uYSB1bSBvdXZpbnRlIGRlIGV2ZW50byBwYXJhIG8gYm90w6NvIGRlIFBlZGlyIENhcnRhXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgRnVuw6fDo28gYSBzZXIgY2hhbWFkYSBxdWFuZG8gbyBib3TDo28gZm9yIGNsaWNhZG9cclxuICAgICAqL1xyXG4gICAgb25IaXRDbGljayhjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuaGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkaWNpb25hIHVtIG91dmludGUgZGUgZXZlbnRvIHBhcmEgbyBib3TDo28gZGUgUGFyYXJcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBGdW7Dp8OjbyBhIHNlciBjaGFtYWRhIHF1YW5kbyBvIGJvdMOjbyBmb3IgY2xpY2Fkb1xyXG4gICAgICovXHJcbiAgICBvblN0YW5kQ2xpY2soY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLnN0YW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkaWNpb25hIHVtIG91dmludGUgZGUgZXZlbnRvIHBhcmEgbyBib3TDo28gZGUgTGltcGFyIEFwb3N0YVxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEZ1bsOnw6NvIGEgc2VyIGNoYW1hZGEgcXVhbmRvIG8gYm90w6NvIGZvciBjbGljYWRvXHJcbiAgICAgKi9cclxuICAgIG9uQ2xlYXJCZXRDbGljayhjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuY2xlYXJCZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRpY2lvbmEgb3V2aW50ZXMgZGUgZXZlbnRvIHBhcmEgb3MgY2hpcHMgZGUgYXBvc3RhXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgRnVuw6fDo28gYSBzZXIgY2hhbWFkYSBxdWFuZG8gdW0gY2hpcCBmb3IgY2xpY2FkbyAocmVjZWJlIG8gdmFsb3IgY29tbyBwYXLDom1ldHJvKVxyXG4gICAgICovXHJcbiAgICBvbkNoaXBDbGljayhjYWxsYmFjazogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBPIHByb2JsZW1hIMOpIHRlbnRhciB1c2FyIHRoaXMuZWxlbWVudHMuY2hpcHNTZWxlY3RvciwgcXVhbmRvIG8gY29ycmV0byDDqSB1c2FyIGFzIGNoaXBzIGrDoSBzZWxlY2lvbmFkYXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFNldHRpbmcgdXAgY2hpcCBjbGljayBsaXN0ZW5lcnMgb24gJHt0aGlzLmVsZW1lbnRzLmNoaXBzLmxlbmd0aH0gY2hpcCBlbGVtZW50c2ApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jaGlwcy5mb3JFYWNoKGNoaXBFbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNoaXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoY2hpcEVsZW1lbnQuZGF0YXNldC52YWx1ZSB8fCAnMCcsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQ2hpcCBjbGlja2VkIHdpdGggdmFsdWU6ICR7dmFsdWV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNldHRpbmcgdXAgY2hpcCBjbGljayBsaXN0ZW5lcnM6JywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvLyBNb2RlbG8gcGFyYSByZXByZXNlbnRhciB1bWEgY2FydGEgZGUgYmFyYWxob1xyXG5leHBvcnQgaW50ZXJmYWNlIENhcmQge1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHN1aXQ6IHN0cmluZztcclxuICAgIGZhY2VVcD86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8vIENvbnN0YW50ZXMgcGFyYSBvcyB2YWxvcmVzIGUgbmFpcGVzIGRhcyBjYXJ0YXNcclxuZXhwb3J0IGNvbnN0IFNVSVRTOiBzdHJpbmdbXSA9IFsn4pmgJywgJ+KZpScsICfimaYnLCAn4pmjJ107XHJcbmV4cG9ydCBjb25zdCBWQUxVRVM6IHN0cmluZ1tdID0gWydBJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcxMCcsICdKJywgJ1EnLCAnSyddO1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGEgbyB2YWxvciBudW3DqXJpY28gZGUgdW1hIGNhcnRhIHBhcmEgbyBqb2dvIGRlIEJsYWNramFja1xyXG4gKiBAcGFyYW0gY2FyZCBBIGNhcnRhIHBhcmEgY2FsY3VsYXIgbyB2YWxvclxyXG4gKiBAcmV0dXJucyBPIHZhbG9yIG51bcOpcmljbyBkYSBjYXJ0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcmRWYWx1ZShjYXJkOiBDYXJkLCBjdXJyZW50VG90YWw6IG51bWJlciA9IDApOiBudW1iZXIge1xyXG4gICAgaWYgKGNhcmQudmFsdWUgPT09ICdBJykge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIGlmIChbJ0onLCAnUScsICdLJ10uaW5jbHVkZXMoY2FyZC52YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gMTA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChjYXJkLnZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGEgYSBtZWxob3IgcG9udHVhw6fDo28gcG9zc8OtdmVsIHBhcmEgdW1hIG3Do28gZGUgY2FydGFzXHJcbiAqIEBwYXJhbSBjYXJkcyBBcnJheSBkZSBjYXJ0YXMgbmEgbcOjb1xyXG4gKiBAcmV0dXJucyBBIHBvbnR1YcOnw6NvIHRvdGFsIGRhIG3Do29cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVIYW5kVmFsdWUoY2FyZHM6IENhcmRbXSk6IG51bWJlciB7XHJcbiAgICBsZXQgdG90YWwgPSAwO1xyXG5cclxuICAgIC8vIFByaW1laXJvLCBjb250YXIgY2FydGFzIHNlbSDDgXNcclxuICAgIGZvciAoY29uc3QgY2FyZCBvZiBjYXJkcykge1xyXG4gICAgICAgIGlmIChjYXJkLnZhbHVlID09PSAnQScpIHtcclxuICAgICAgICAgICAgdG90YWwgKz0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKFsnSicsICdRJywgJ0snXS5pbmNsdWRlcyhjYXJkLnZhbHVlKSkge1xyXG4gICAgICAgICAgICB0b3RhbCArPSAxMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b3RhbCArPSBwYXJzZUludChjYXJkLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRvdGFsO1xyXG59XHJcbiIsImltcG9ydCB7IENhcmQgfSBmcm9tICcuL0NhcmQnO1xyXG5cclxuLyoqXHJcbiAqIEVudW1lcmHDp8OjbyBwYXJhIG9zIHBvc3PDrXZlaXMgcmVzdWx0YWRvcyBkbyBqb2dvXHJcbiAqL1xyXG5leHBvcnQgZW51bSBHYW1lUmVzdWx0IHtcclxuICAgIFBMQVlFUl9XSU4gPSAncGxheWVyX3dpbicsXHJcbiAgICBQTEFZRVJfQkxBQ0tKQUNLID0gJ3BsYXllcl9ibGFja2phY2snLFxyXG4gICAgREVBTEVSX1dJTiA9ICdkZWFsZXJfd2luJyxcclxuICAgIFBVU0ggPSAncHVzaCcsXHJcbiAgICBQTEFZRVJfQlVTVCA9ICdwbGF5ZXJfYnVzdCcsXHJcbiAgICBERUFMRVJfQlVTVCA9ICdkZWFsZXJfYnVzdCdcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBwYXJhIGNvbmZpZ3VyYcOnw7VlcyBkbyBqb2dvXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVDb25maWcge1xyXG4gICAgbWluaW11bUJldDogbnVtYmVyO1xyXG4gICAgbWluaW11bVN0YW5kU2NvcmU6IG51bWJlcjtcclxuICAgIGRlYWxlclN0YW5kU2NvcmU6IG51bWJlcjtcclxuICAgIGJsYWNramFja1BheW91dDogbnVtYmVyO1xyXG4gICAgcmVndWxhcldpblBheW91dDogbnVtYmVyO1xyXG4gICAgaW5pdGlhbEJhbGFuY2U6IG51bWJlcjtcclxuICAgIHJlbG9hZEFtb3VudDogbnVtYmVyO1xyXG4gICAgcmVsb2FkVGltZTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIHBhcmEgbyBlc3RhZG8gZG8gam9nb1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBHYW1lU3RhdGUge1xyXG4gICAgZGVjazogQ2FyZFtdO1xyXG4gICAgcGxheWVySGFuZDogQ2FyZFtdO1xyXG4gICAgZGVhbGVySGFuZDogQ2FyZFtdO1xyXG4gICAgcGxheWVyU2NvcmU6IG51bWJlcjtcclxuICAgIGRlYWxlclNjb3JlOiBudW1iZXI7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBiYWxhbmNlOiBudW1iZXI7XHJcbiAgICBjdXJyZW50QmV0OiBudW1iZXI7XHJcbiAgICBnYW1lT3ZlcjogYm9vbGVhbjtcclxuICAgIHBsYXllclN0YW5kczogYm9vbGVhbjtcclxuICAgIGdhbWVSZXN1bHQ6IEdhbWVSZXN1bHQgfCBudWxsO1xyXG4gICAgY2FuSGl0OiBib29sZWFuO1xyXG4gICAgY2FuU3RhbmQ6IGJvb2xlYW47XHJcbiAgICBjYW5EZWFsOiBib29sZWFuO1xyXG4gICAgY291bnRkb3duQWN0aXZlOiBib29sZWFuO1xyXG4gICAgY291bnRkb3duVGltZTogbnVtYmVyO1xyXG4gICAgZ2FtZUluUHJvZ3Jlc3M6IGJvb2xlYW47XHJcbiAgICBoYXNCbGFja2phY2s6IGJvb2xlYW47IC8vIEFkaWNpb25hbmRvIGEgcHJvcHJpZWRhZGUgcXVlIGZhbHRhdmFcclxufVxyXG5cclxuLyoqXHJcbiAqIEVzdGFkbyBpbmljaWFsIGRvIGpvZ29cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbml0aWFsR2FtZVN0YXRlOiBHYW1lU3RhdGUgPSB7XHJcbiAgICBkZWNrOiBbXSxcclxuICAgIHBsYXllckhhbmQ6IFtdLFxyXG4gICAgZGVhbGVySGFuZDogW10sXHJcbiAgICBwbGF5ZXJTY29yZTogMCxcclxuICAgIGRlYWxlclNjb3JlOiAwLFxyXG4gICAgbWVzc2FnZTogJ0JlbS12aW5kbyBhbyBCbGFja2phY2shIENsaXF1ZSBlbSBcIkluaWNpYXIgSm9nb1wiIHBhcmEgY29tZcOnYXIuJyxcclxuICAgIGJhbGFuY2U6IDEwMDAsXHJcbiAgICBjdXJyZW50QmV0OiAwLFxyXG4gICAgZ2FtZU92ZXI6IHRydWUsXHJcbiAgICBwbGF5ZXJTdGFuZHM6IGZhbHNlLFxyXG4gICAgZ2FtZVJlc3VsdDogbnVsbCxcclxuICAgIGNhbkhpdDogZmFsc2UsXHJcbiAgICBjYW5TdGFuZDogZmFsc2UsXHJcbiAgICBjYW5EZWFsOiB0cnVlLFxyXG4gICAgY291bnRkb3duQWN0aXZlOiBmYWxzZSxcclxuICAgIGNvdW50ZG93blRpbWU6IDAsXHJcbiAgICBnYW1lSW5Qcm9ncmVzczogZmFsc2UsXHJcbiAgICBoYXNCbGFja2phY2s6IGZhbHNlICAvLyBJbmljaWFsaXphZG8gY29tbyBmYWxzb1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYcOnw7VlcyBwYWRyw6NvIGRvIGpvZ29cclxuICovXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0R2FtZUNvbmZpZzogR2FtZUNvbmZpZyA9IHtcclxuICAgIG1pbmltdW1CZXQ6IDUsXHJcbiAgICBtaW5pbXVtU3RhbmRTY29yZTogMTQsXHJcbiAgICBkZWFsZXJTdGFuZFNjb3JlOiAxNyxcclxuICAgIGJsYWNramFja1BheW91dDogMS41LCAvLyBQYWdhbWVudG8gMzoyIHBhcmEgYmxhY2tqYWNrXHJcbiAgICByZWd1bGFyV2luUGF5b3V0OiAxLCAgLy8gUGFnYW1lbnRvIDE6MSBwYXJhIHZpdMOzcmlhIG5vcm1hbFxyXG4gICAgaW5pdGlhbEJhbGFuY2U6IDEwMDAsXHJcbiAgICByZWxvYWRBbW91bnQ6IDEwLFxyXG4gICAgcmVsb2FkVGltZTogNjAgLy8gc2VndW5kb3NcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmEgbyByZXN1bHRhZG8gZG8gam9nb1xyXG4gKiBAcGFyYW0gc3RhdGUgRXN0YWRvIGF0dWFsIGRvIGpvZ29cclxuICogQHJldHVybnMgTyByZXN1bHRhZG8gZG8gam9nb1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluZUdhbWVSZXN1bHQoc3RhdGU6IEdhbWVTdGF0ZSk6IEdhbWVSZXN1bHQge1xyXG4gICAgLy8gU2UgbyBqb2dhZG9yIHVsdHJhcGFzc291IDIxLCBlbGUgcGVyZGVcclxuICAgIGlmIChzdGF0ZS5wbGF5ZXJTY29yZSA+IDIxKSB7XHJcbiAgICAgICAgcmV0dXJuIEdhbWVSZXN1bHQuUExBWUVSX0JVU1Q7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFNlIG8gZGVhbGVyIHVsdHJhcGFzc291IDIxLCBvIGpvZ2Fkb3IgZ2FuaGFcclxuICAgIGlmIChzdGF0ZS5kZWFsZXJTY29yZSA+IDIxKSB7XHJcbiAgICAgICAgcmV0dXJuIEdhbWVSZXN1bHQuREVBTEVSX0JVU1Q7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFNlIG8gam9nYWRvciB0ZW0gYmxhY2tqYWNrLCBlbGUgZ2FuaGEgKGEgbWVub3MgcXVlIG8gZGVhbGVyIHRhbWLDqW0gdGVuaGEgYmxhY2tqYWNrKVxyXG4gICAgaWYgKHN0YXRlLmhhc0JsYWNramFjayAmJiBzdGF0ZS5wbGF5ZXJIYW5kLmxlbmd0aCA9PT0gMiAmJiBzdGF0ZS5wbGF5ZXJTY29yZSA9PT0gMjEpIHtcclxuICAgICAgICBpZiAoc3RhdGUuZGVhbGVyU2NvcmUgPT09IDIxICYmIHN0YXRlLmRlYWxlckhhbmQubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lUmVzdWx0LlBVU0g7IC8vIEFtYm9zIHTDqm0gYmxhY2tqYWNrID0gZW1wYXRlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lUmVzdWx0LlBMQVlFUl9CTEFDS0pBQ0s7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEVtcGF0ZSBzZSBhcyBwb250dWHDp8O1ZXMgc8OjbyBpZ3VhaXNcclxuICAgIGlmIChzdGF0ZS5wbGF5ZXJTY29yZSA9PT0gc3RhdGUuZGVhbGVyU2NvcmUpIHtcclxuICAgICAgICByZXR1cm4gR2FtZVJlc3VsdC5QVVNIO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBDb21wYXJhw6fDo28gZGUgcG9udHVhw6fDtWVzXHJcbiAgICByZXR1cm4gc3RhdGUucGxheWVyU2NvcmUgPiBzdGF0ZS5kZWFsZXJTY29yZSBcclxuICAgICAgICA/IEdhbWVSZXN1bHQuUExBWUVSX1dJTiBcclxuICAgICAgICA6IEdhbWVSZXN1bHQuREVBTEVSX1dJTjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGEgbyBwYWdhbWVudG8gY29tIGJhc2Ugbm8gcmVzdWx0YWRvIGRvIGpvZ28gZSBuYSBjb25maWd1cmHDp8Ojb1xyXG4gKiBAcGFyYW0gcmVzdWx0IFJlc3VsdGFkbyBkbyBqb2dvXHJcbiAqIEBwYXJhbSBiZXQgVmFsb3IgZGEgYXBvc3RhXHJcbiAqIEBwYXJhbSBjb25maWcgQ29uZmlndXJhw6fDtWVzIGRvIGpvZ29cclxuICogQHJldHVybnMgTyB2YWxvciBhIHNlciBwYWdvIGFvIGpvZ2Fkb3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQYXlvdXQocmVzdWx0OiBHYW1lUmVzdWx0LCBiZXQ6IG51bWJlciwgY29uZmlnOiBHYW1lQ29uZmlnKTogbnVtYmVyIHtcclxuICAgIHN3aXRjaCAocmVzdWx0KSB7XHJcbiAgICAgICAgY2FzZSBHYW1lUmVzdWx0LlBMQVlFUl9CTEFDS0pBQ0s6XHJcbiAgICAgICAgICAgIHJldHVybiBiZXQgKyBiZXQgKiBjb25maWcuYmxhY2tqYWNrUGF5b3V0O1xyXG4gICAgICAgIGNhc2UgR2FtZVJlc3VsdC5QTEFZRVJfV0lOOlxyXG4gICAgICAgIGNhc2UgR2FtZVJlc3VsdC5ERUFMRVJfQlVTVDpcclxuICAgICAgICAgICAgcmV0dXJuIGJldCArIGJldCAqIGNvbmZpZy5yZWd1bGFyV2luUGF5b3V0O1xyXG4gICAgICAgIGNhc2UgR2FtZVJlc3VsdC5QVVNIOlxyXG4gICAgICAgICAgICByZXR1cm4gYmV0OyAvLyBEZXZvbHZlIGEgYXBvc3RhXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIDA7IC8vIFBlcmRlIGEgYXBvc3RhXHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIFNlcnZpw6dvIHBhcmEgZ2VyZW5jaWFyIGFzIGFuaW1hw6fDtWVzIGUgZWZlaXRvcyB2aXN1YWlzIGRvIGpvZ29cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25TZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgZGVja0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNhcmRDb3VudGVyRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgZGVhbGVyQ2FyZHNFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXJDYXJkc0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGdhbWVNZXNzYWdlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmljaWFsaXphIG8gc2VydmnDp28gZGUgYW5pbWHDp8Ojb1xyXG4gICAgICogQHBhcmFtIHNlbGVjdG9ycyBTZWxldG9yZXMgcGFyYSBvcyBlbGVtZW50b3MgRE9NXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yczoge1xyXG4gICAgICAgIGRlY2tTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgICAgIGNhcmRDb3VudGVyU2VsZWN0b3I6IHN0cmluZyxcclxuICAgICAgICBkZWFsZXJDYXJkc1NlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICAgICAgcGxheWVyQ2FyZHNTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgICAgIGdhbWVNZXNzYWdlU2VsZWN0b3I6IHN0cmluZ1xyXG4gICAgfSkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVja0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5kZWNrU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRDb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNhcmRDb3VudGVyU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLmRlYWxlckNhcmRzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmRlYWxlckNhcmRzU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckNhcmRzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnBsYXllckNhcmRzU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVNZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmdhbWVNZXNzYWdlU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlY2tFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVZpc2libGVEZWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmlhIHVtIGJhcmFsaG8gdmlzw612ZWwgbmEgbWVzYVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVZpc2libGVEZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIFZlcmlmaWNhciBzZSBqw6EgZXhpc3RlIHVtIGJhcmFsaG9cclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtZGVjaycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWNvbnRhaW5lcicpIHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3JpYXIgZWxlbWVudG9zIGRvIGJhcmFsaG9cclxuICAgICAgICB0aGlzLmRlY2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5kZWNrRWxlbWVudC5jbGFzc05hbWUgPSAnY2FyZC1kZWNrJztcclxuICAgICAgICB0aGlzLmRlY2tFbGVtZW50LmlkID0gJ2NhcmQtZGVjayc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZGVja0NhcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZGVja0NhcmRzLmNsYXNzTmFtZSA9ICdkZWNrLWNhcmRzJztcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBkZWNrVG9wQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGRlY2tUb3BDYXJkLmNsYXNzTmFtZSA9ICdkZWNrLWNhcmQnO1xyXG4gICAgICAgIGRlY2tUb3BDYXJkLmlkID0gJ2RlY2stdG9wLWNhcmQnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRlY2tDYXJkcy5hcHBlbmRDaGlsZChkZWNrVG9wQ2FyZCk7XHJcbiAgICAgICAgdGhpcy5kZWNrRWxlbWVudC5hcHBlbmRDaGlsZChkZWNrQ2FyZHMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENyaWFyIGNvbnRhZG9yIGRlIGNhcnRhc1xyXG4gICAgICAgIHRoaXMuY2FyZENvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5jYXJkQ291bnRlckVsZW1lbnQuY2xhc3NOYW1lID0gJ2NhcmQtY291bnRlcic7XHJcbiAgICAgICAgdGhpcy5jYXJkQ291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSAnQ2FydGFzOiA1Mic7XHJcbiAgICAgICAgdGhpcy5kZWNrRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhcmRDb3VudGVyRWxlbWVudCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRpY2lvbmFyIMOgIHDDoWdpbmFcclxuICAgICAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGVja0VsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEF0dWFsaXphIG8gY29udGFkb3IgZGUgY2FydGFzXHJcbiAgICAgKiBAcGFyYW0gY291bnQgTsO6bWVybyBkZSBjYXJ0YXMgbm8gYmFyYWxob1xyXG4gICAgICovXHJcbiAgICB1cGRhdGVDYXJkQ291bnQoY291bnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcmRDb3VudGVyRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRDb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGBDYXJ0YXM6ICR7Y291bnR9YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQW5pbWEgbyBiYXJhbGhvIChlZmVpdG8gZGUgZW1iYXJhbGhhbWVudG8pXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGVEZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmRlY2tFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVja0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2h1ZmZsaW5nJyk7XHJcbiAgICAgICAgICAgIHZvaWQgdGhpcy5kZWNrRWxlbWVudC5vZmZzZXRXaWR0aDsgLy8gVHJpZ2dlciByZWZsb3cgcGFyYSByZWluaWNpYXIgYSBhbmltYcOnw6NvXHJcbiAgICAgICAgICAgIHRoaXMuZGVja0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2h1ZmZsaW5nJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFuaW1hIHVtYSBjYXJ0YSBzZW5kbyByZXRpcmFkYSBkbyBiYXJhbGhvXHJcbiAgICAgKiBAcGFyYW0gY2FyZEVsZW1lbnQgRWxlbWVudG8gZGEgY2FydGFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRFbGVtZW50IEVsZW1lbnRvIG9uZGUgYSBjYXJ0YSBzZXLDoSBjb2xvY2FkYVxyXG4gICAgICovXHJcbiAgICBhbmltYXRlQ2FyZERyYXcoY2FyZEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5kZWNrRWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE9idGVyIHBvc2nDp8OjbyBkbyBiYXJhbGhvXHJcbiAgICAgICAgY29uc3QgZGVja1JlY3QgPSB0aGlzLmRlY2tFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFJlY3QgPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENyaWFyIHVtIGNsb25lIGRhIGNhcnRhIHBhcmEgYW5pbWHDp8Ojb1xyXG4gICAgICAgIGNvbnN0IGNhcmRDbG9uZSA9IGNhcmRFbGVtZW50LmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjYXJkQ2xvbmUuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xyXG4gICAgICAgIGNhcmRDbG9uZS5zdHlsZS56SW5kZXggPSAnMTAwMCc7XHJcbiAgICAgICAgY2FyZENsb25lLnN0eWxlLmxlZnQgPSBgJHtkZWNrUmVjdC5sZWZ0fXB4YDtcclxuICAgICAgICBjYXJkQ2xvbmUuc3R5bGUudG9wID0gYCR7ZGVja1JlY3QudG9wfXB4YDtcclxuICAgICAgICBjYXJkQ2xvbmUuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMC41cyBlYXNlLW91dCc7XHJcbiAgICAgICAgY2FyZENsb25lLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUoMGRlZyknO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkaWNpb25hciBvIGNsb25lIGFvIGNvcnBvIGRvIGRvY3VtZW50b1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FyZENsb25lKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBUcmlnZ2VyIHJlZmxvdyBwYXJhIGluaWNpYXIgYSBhbmltYcOnw6NvXHJcbiAgICAgICAgdm9pZCBjYXJkQ2xvbmUub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQW5pbWFyIHBhcmEgYSBwb3Npw6fDo28gZmluYWxcclxuICAgICAgICBjYXJkQ2xvbmUuc3R5bGUubGVmdCA9IGAke3RhcmdldFJlY3QubGVmdH1weGA7XHJcbiAgICAgICAgY2FyZENsb25lLnN0eWxlLnRvcCA9IGAke3RhcmdldFJlY3QudG9wfXB4YDtcclxuICAgICAgICBjYXJkQ2xvbmUuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZSgzNjBkZWcpJztcclxuICAgICAgICBcclxuICAgICAgICAvLyBSZW1vdmVyIG8gY2xvbmUgYXDDs3MgYSBhbmltYcOnw6NvXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNhcmRDbG9uZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEFkaWNpb25hciBjbGFzc2UgZGUgYW5pbWHDp8OjbyDDoCBjYXJ0YSBvcmlnaW5hbFxyXG4gICAgICAgICAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmF3bicpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gU2UgYSBjYXJ0YSBlc3RpdmVyIHZpcmFkYSBwYXJhIGJhaXhvLCBhZGljaW9uYXIgY2xhc3NlIGRlIGNhcnRhIHZpcmFkYVxyXG4gICAgICAgICAgICBpZiAoY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkLWJhY2snKSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpcHBpbmcnKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFuaW1hIGEgY2FydGEgZG8gZGVhbGVyIHNlbmRvIHZpcmFkYVxyXG4gICAgICogQHBhcmFtIGNhcmRFbGVtZW50IEVsZW1lbnRvIGRhIGNhcnRhXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGVDYXJkRmxpcChjYXJkRWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBjYXJkRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmbGlwcGluZycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFww7NzIG1ldGFkZSBkYSBhbmltYcOnw6NvLCByZW1vdmVyIGEgY2xhc3NlIGRlIGNhcnRhIHZpcmFkYSBwYXJhIGJhaXhvXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NhcmQtYmFjaycpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQW5pbWEgbyByZXN1bHRhZG8gZG8gam9nb1xyXG4gICAgICogQHBhcmFtIHJlc3VsdCBSZXN1bHRhZG8gZG8gam9nbyAoJ3dpbicsICdsb3NlJywgJ3B1c2gnLCAnYmxhY2tqYWNrJylcclxuICAgICAqIEBwYXJhbSB0YXJnZXRFbGVtZW50IEVsZW1lbnRvIGEgc2VyIGFuaW1hZG8gKMOhcmVhIGRvIGpvZ2Fkb3Igb3UgZGVhbGVyKVxyXG4gICAgICovXHJcbiAgICBhbmltYXRlR2FtZVJlc3VsdChyZXN1bHQ6IHN0cmluZywgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBjYXNlICd3aW4nOlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCd3aW4tYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnd2luLWFuaW1hdGlvbicpLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdsb3NlJzpcclxuICAgICAgICAgICAgICAgIHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbG9zZS1hbmltYXRpb24nKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsb3NlLWFuaW1hdGlvbicpLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGFja2phY2snOlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdibGFja2phY2stYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYmxhY2tqYWNrLWFuaW1hdGlvbicpLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgLy8gQW5pbWFyIG8gdGV4dG8gZGUgbWVuc2FnZW0gdGFtYsOpbVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZU1lc3NhZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYmxhY2tqYWNrLXRleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZU1lc3NhZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVNZXNzYWdlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdibGFja2phY2stdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncHVzaCc6XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3B1c2gtYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncHVzaC1hbmltYXRpb24nKSwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ2FyZCwgU1VJVFMsIFZBTFVFUyB9IGZyb20gJy4uL21vZGVscy9DYXJkJztcclxuXHJcbi8qKlxyXG4gKiBTZXJ2acOnbyBwYXJhIGdlcmVuY2lhciBvcGVyYcOnw7VlcyByZWxhY2lvbmFkYXMgYW8gYmFyYWxob1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERlY2tTZXJ2aWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JpYSB1bSBub3ZvIGJhcmFsaG8gY29tcGxldG9cclxuICAgICAqIEByZXR1cm5zIFVtIGFycmF5IGNvbSB0b2RhcyBhcyA1MiBjYXJ0YXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZURlY2soKTogQ2FyZFtdIHtcclxuICAgICAgICBjb25zdCBuZXdEZWNrOiBDYXJkW10gPSBbXTtcclxuICAgICAgICBTVUlUUy5mb3JFYWNoKHN1aXQgPT4ge1xyXG4gICAgICAgICAgICBWQUxVRVMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZXdEZWNrLnB1c2goeyB2YWx1ZSwgc3VpdCwgZmFjZVVwOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3RGVjaztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtYmFyYWxoYSB1bSBhcnJheSBkZSBjYXJ0YXMgdXNhbmRvIG8gYWxnb3JpdG1vIEZpc2hlci1ZYXRlc1xyXG4gICAgICogQHBhcmFtIGRlY2sgTyBiYXJhbGhvIGEgc2VyIGVtYmFyYWxoYWRvXHJcbiAgICAgKiBAcmV0dXJucyBPIGJhcmFsaG8gZW1iYXJhbGhhZG9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNodWZmbGVEZWNrKGRlY2s6IENhcmRbXSk6IENhcmRbXSB7XHJcbiAgICAgICAgY29uc3Qgc2h1ZmZsZWQgPSBbLi4uZGVja107IC8vIENyaWEgdW1hIGPDs3BpYSBkbyBiYXJhbGhvIHBhcmEgbsOjbyBtb2RpZmljYXIgbyBvcmlnaW5hbFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFsZ29yaXRtbyBkZSBGaXNoZXItWWF0ZXMgcGFyYSBlbWJhcmFsaGFyXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHNodWZmbGVkLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICAgICAgICBbc2h1ZmZsZWRbaV0sIHNodWZmbGVkW2pdXSA9IFtzaHVmZmxlZFtqXSwgc2h1ZmZsZWRbaV1dO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gc2h1ZmZsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRpcmEgdW1hIGNhcnRhIGRvIHRvcG8gZG8gYmFyYWxob1xyXG4gICAgICogQHBhcmFtIGRlY2sgTyBiYXJhbGhvXHJcbiAgICAgKiBAcGFyYW0gZmFjZVVwIFNlIGEgY2FydGEgc2Vyw6EgdmlyYWRhIHBhcmEgY2ltYSAodHJ1ZSkgb3UgcGFyYSBiYWl4byAoZmFsc2UpXHJcbiAgICAgKiBAcmV0dXJucyBVbSBvYmpldG8gY29tIGEgY2FydGEgcmV0aXJhZGEgZSBvIGJhcmFsaG8gYXR1YWxpemFkb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZHJhd0NhcmQoZGVjazogQ2FyZFtdLCBmYWNlVXA6IGJvb2xlYW4gPSB0cnVlKTogeyBjYXJkOiBDYXJkLCB1cGRhdGVkRGVjazogQ2FyZFtdIH0ge1xyXG4gICAgICAgIGlmIChkZWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ08gYmFyYWxobyBlc3TDoSB2YXppbycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBDb3BpYSBvIGJhcmFsaG8gcGFyYSBuw6NvIG1vZGlmaWNhciBvIG9yaWdpbmFsXHJcbiAgICAgICAgY29uc3QgdXBkYXRlZERlY2sgPSBbLi4uZGVja107XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmVtb3ZlIGEgY2FydGEgZG8gdG9wbyBlIGRlZmluZSBzZXUgZXN0YWRvXHJcbiAgICAgICAgY29uc3QgY2FyZCA9IHsgLi4udXBkYXRlZERlY2sucG9wKCkhLCBmYWNlVXAgfTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4geyBjYXJkLCB1cGRhdGVkRGVjayB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0b3JuYSBvIG7Dum1lcm8gZGUgY2FydGFzIG5vIGJhcmFsaG9cclxuICAgICAqIEBwYXJhbSBkZWNrIE8gYmFyYWxob1xyXG4gICAgICogQHJldHVybnMgTyBuw7ptZXJvIGRlIGNhcnRhc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0Q2FyZENvdW50KGRlY2s6IENhcmRbXSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGRlY2subGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFZpcmEgdG9kYXMgYXMgY2FydGFzIGRlIHVtYSBtw6NvIHBhcmEgY2ltYVxyXG4gICAgICogQHBhcmFtIGNhcmRzIEEgbcOjbyBkZSBjYXJ0YXNcclxuICAgICAqIEByZXR1cm5zIEEgbcOjbyBjb20gdG9kYXMgYXMgY2FydGFzIHZpcmFkYXMgcGFyYSBjaW1hXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXZlYWxIYW5kKGNhcmRzOiBDYXJkW10pOiBDYXJkW10ge1xyXG4gICAgICAgIHJldHVybiBjYXJkcy5tYXAoY2FyZCA9PiAoeyAuLi5jYXJkLCBmYWNlVXA6IHRydWUgfSkpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEdhbWVTdGF0ZSwgR2FtZVJlc3VsdCwgR2FtZUNvbmZpZywgaW5pdGlhbEdhbWVTdGF0ZSwgZGV0ZXJtaW5lR2FtZVJlc3VsdCwgY2FsY3VsYXRlUGF5b3V0IH0gZnJvbSAnLi4vbW9kZWxzL0dhbWUnO1xyXG5pbXBvcnQgeyBDYXJkLCBjYWxjdWxhdGVIYW5kVmFsdWUgfSBmcm9tICcuLi9tb2RlbHMvQ2FyZCc7XHJcbmltcG9ydCB7IERlY2tTZXJ2aWNlIH0gZnJvbSAnLi9EZWNrU2VydmljZSc7XHJcblxyXG4vKipcclxuICogU2VydmnDp28gcGFyYSBnZXJlbmNpYXIgbyBlc3RhZG8gZSBhIGzDs2dpY2EgZG8gam9nbyBkZSBCbGFja2phY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHYW1lU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGdhbWVTdGF0ZTogR2FtZVN0YXRlO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IEdhbWVDb25maWc7IC8vIFVzYW5kbyBjb25maWcgY29tbyBub21lIGRhIHZhcmnDoXZlbFxyXG4gICAgcHJpdmF0ZSBvblN0YXRlVXBkYXRlOiAoKHN0YXRlOiBHYW1lU3RhdGUpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBjb25maWcgQ29uZmlndXJhw6fDtWVzIGRvIGpvZ29cclxuICAgICAqIEBwYXJhbSBvblN0YXRlVXBkYXRlIENhbGxiYWNrIHBhcmEgbm90aWZpY2FyIG11ZGFuw6dhcyBubyBlc3RhZG9cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBHYW1lQ29uZmlnLFxyXG4gICAgICAgIG9uU3RhdGVVcGRhdGU/OiAoc3RhdGU6IEdhbWVTdGF0ZSkgPT4gdm9pZFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5vblN0YXRlVXBkYXRlID0gb25TdGF0ZVVwZGF0ZTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBJbmljaWFsaXphciBvIGVzdGFkbyBkbyBqb2dvIGNvbSBvIGVzdGFkbyBpbmljaWFsXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB7IC4uLmluaXRpYWxHYW1lU3RhdGUgfTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDYXJyZWdhciBlc3RhZG8gc2Fsdm8gZG8gbG9jYWxTdG9yYWdlIGFww7NzIGluaWNpYWxpemHDp8Ojb1xyXG4gICAgICAgIHRoaXMubG9hZEdhbWVTdGF0ZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogT2J0w6ltIG8gZXN0YWRvIGF0dWFsIGRvIGpvZ29cclxuICAgICAqIEByZXR1cm5zIEVzdGFkbyBhdHVhbCBkbyBqb2dvXHJcbiAgICAgKi9cclxuICAgIGdldFN0YXRlKCk6IEdhbWVTdGF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4udGhpcy5nYW1lU3RhdGUgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTYWx2YSBvIGVzdGFkbyBhdHVhbCBubyBsb2NhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgc2F2ZUdhbWVTdGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmxhY2tqYWNrX2JhbGFuY2UnLCB0aGlzLmdhbWVTdGF0ZS5iYWxhbmNlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVTdGF0ZS5jb3VudGRvd25BY3RpdmUpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2JsYWNramFja19jb3VudGRvd24nLCB0aGlzLmdhbWVTdGF0ZS5jb3VudGRvd25UaW1lLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQ2FsY3VsYSBvIHRlbXBvIGRlIGV4cGlyYcOnw6NvIHBhcmEgbyBjb250YWRvclxyXG4gICAgICAgICAgICBjb25zdCBleHBpcnlUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAodGhpcy5nYW1lU3RhdGUuY291bnRkb3duVGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmxhY2tqYWNrX2NvdW50ZG93bl9leHBpcnknLCBleHBpcnlUaW1lLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDYXJyZWdhIG8gZXN0YWRvIHNhbHZvIGRvIGxvY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvYWRHYW1lU3RhdGUobm90aWZ5OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNhdmVkQmFsYW5jZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdibGFja2phY2tfYmFsYW5jZScpO1xyXG4gICAgICAgIGNvbnN0IHNhdmVkQ291bnRkb3duID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JsYWNramFja19jb3VudGRvd24nKTtcclxuICAgICAgICBjb25zdCBzYXZlZENvdW50ZG93bkV4cGlyeSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdibGFja2phY2tfY291bnRkb3duX2V4cGlyeScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzYXZlZEJhbGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUuYmFsYW5jZSA9IHBhcnNlSW50KHNhdmVkQmFsYW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzYXZlZENvdW50ZG93biAmJiBzYXZlZENvdW50ZG93bkV4cGlyeSkge1xyXG4gICAgICAgICAgICBjb25zdCBleHBpcnlUaW1lID0gcGFyc2VJbnQoc2F2ZWRDb3VudGRvd25FeHBpcnkpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGV4cGlyeVRpbWUgPiBjdXJyZW50VGltZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29udGludWFyIG8gY29udGFkb3IgZG8gcG9udG8gb25kZSBwYXJvdVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUuY291bnRkb3duVGltZSA9IE1hdGguZmxvb3IoKGV4cGlyeVRpbWUgLSBjdXJyZW50VGltZSkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlLmNvdW50ZG93bkFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2F2ZWRCYWxhbmNlICYmIHBhcnNlSW50KHNhdmVkQmFsYW5jZSkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2UgbyB0ZW1wbyBleHBpcm91IG1hcyBvIHNhbGRvIGFpbmRhIMOpIHplcm9cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlLmJhbGFuY2UgPSB0aGlzLmNvbmZpZy5yZWxvYWRBbW91bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTm90aWZpY2FyIHNvbWVudGUgc2Ugc29saWNpdGFkb1xyXG4gICAgICAgIGlmIChub3RpZnkgJiYgdGhpcy5vblN0YXRlVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5U3RhdGVVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSW5pY2lhIHVtIG5vdm8gam9nb1xyXG4gICAgICovXHJcbiAgICBzdGFydE5ld0dhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gVmVyaWZpY2FyIHNlIGjDoSB1bWEgYXBvc3RhIG3DrW5pbWFcclxuICAgICAgICBpZiAodGhpcy5nYW1lU3RhdGUuY3VycmVudEJldCA8IHRoaXMuY29uZmlnLm1pbmltdW1CZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUubWVzc2FnZSA9IGBWb2PDqiBwcmVjaXNhIGFwb3N0YXIgcGVsbyBtZW5vcyAke3RoaXMuY29uZmlnLm1pbmltdW1CZXR9IGZpY2hhcyBwYXJhIGpvZ2FyLmA7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5U3RhdGVVcGRhdGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBDcmlhciBlIGVtYmFyYWxoYXIgbyBiYXJhbGhvXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuZGVjayA9IERlY2tTZXJ2aWNlLnNodWZmbGVEZWNrKERlY2tTZXJ2aWNlLmNyZWF0ZURlY2soKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTGltcGFyIG3Do29zIGFudGVyaW9yZXNcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5wbGF5ZXJIYW5kID0gW107XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuZGVhbGVySGFuZCA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIERpc3RyaWJ1aXIgY2FydGFzIGluaWNpYWlzXHJcbiAgICAgICAgdGhpcy5kZWFsSW5pdGlhbENhcmRzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2FsY3VsYXIgcG9udHVhw6fDtWVzIGluaWNpYWlzXHJcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZXMoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBWZXJpZmljYXIgYmxhY2tqYWNrIGluaWNpYWxcclxuICAgICAgICB0aGlzLmNoZWNrRm9yQmxhY2tqYWNrKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQXR1YWxpemFyIGVzdGFkbyBkbyBqb2dvXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuZ2FtZU92ZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5wbGF5ZXJTdGFuZHMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5nYW1lSW5Qcm9ncmVzcyA9IHRydWU7IC8vIERlZmluaXIgY29tbyB2ZXJkYWRlaXJvIHF1YW5kbyBvIGpvZ28gY29tZcOnYVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEF0dWFsaXphciBlc3RhZG8gZG9zIGJvdMO1ZXNcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5jYW5IaXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmNhblN0YW5kID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5jYW5EZWFsID0gZmFsc2U7IC8vIE7Do28gcG9kZSBpbmljaWFyIG5vdm8gam9nbyBlbnF1YW50byBlc3RlIGVzdMOhIGVtIGFuZGFtZW50b1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubm90aWZ5U3RhdGVVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXN0cmlidWkgYXMgY2FydGFzIGluaWNpYWlzIHBhcmEgbyBqb2dhZG9yIGUgbyBkZWFsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWFsSW5pdGlhbENhcmRzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIEpvZ2Fkb3IgcmVjZWJlIGR1YXMgY2FydGFzIHZpcmFkYXMgcGFyYSBjaW1hXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gRGVja1NlcnZpY2UuZHJhd0NhcmQodGhpcy5nYW1lU3RhdGUuZGVjaywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlLnBsYXllckhhbmQucHVzaChyZXN1bHQuY2FyZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlLmRlY2sgPSByZXN1bHQudXBkYXRlZERlY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIERlYWxlciByZWNlYmUgdW1hIGNhcnRhIHZpcmFkYSBwYXJhIGNpbWEgZSB1bWEgcGFyYSBiYWl4b1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBEZWNrU2VydmljZS5kcmF3Q2FyZCh0aGlzLmdhbWVTdGF0ZS5kZWNrLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5kZWFsZXJIYW5kLnB1c2gocmVzdWx0LmNhcmQpO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmRlY2sgPSByZXN1bHQudXBkYXRlZERlY2s7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmVzdWx0ID0gRGVja1NlcnZpY2UuZHJhd0NhcmQodGhpcy5nYW1lU3RhdGUuZGVjaywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmRlYWxlckhhbmQucHVzaChyZXN1bHQuY2FyZCk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuZGVjayA9IHJlc3VsdC51cGRhdGVkRGVjaztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHVhbGl6YSBhcyBwb250dWHDp8O1ZXMgZG8gam9nYWRvciBlIGRvIGRlYWxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNjb3JlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5wbGF5ZXJTY29yZSA9IGNhbGN1bGF0ZUhhbmRWYWx1ZSh0aGlzLmdhbWVTdGF0ZS5wbGF5ZXJIYW5kKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBQYXJhIG8gZGVhbGVyLCBjb25zaWRlcmEgYXBlbmFzIGFzIGNhcnRhcyB2aXJhZGFzIHBhcmEgY2ltYVxyXG4gICAgICAgIGNvbnN0IHZpc2libGVEZWFsZXJDYXJkcyA9IHRoaXMuZ2FtZVN0YXRlLmRlYWxlckhhbmQuZmlsdGVyKGNhcmQgPT4gY2FyZC5mYWNlVXApO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmRlYWxlclNjb3JlID0gY2FsY3VsYXRlSGFuZFZhbHVlKHZpc2libGVEZWFsZXJDYXJkcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZpY2Egc2UgaMOhIHVtIGJsYWNramFjayBpbmljaWFsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tGb3JCbGFja2phY2soKTogdm9pZCB7XHJcbiAgICAgICAgLy8gVW0gYmxhY2tqYWNrIMOpIHVtYSBtw6NvIGluaWNpYWwgY29tIHBvbnR1YcOnw6NvIDIxICjDgXMgKyAxMC9KL1EvSylcclxuICAgICAgICBjb25zdCBwbGF5ZXJIYXNCbGFja2phY2sgPSB0aGlzLmdhbWVTdGF0ZS5wbGF5ZXJTY29yZSA9PT0gMjEgJiYgdGhpcy5nYW1lU3RhdGUucGxheWVySGFuZC5sZW5ndGggPT09IDI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHBsYXllckhhc0JsYWNramFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZS5oYXNCbGFja2phY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmV2ZWxhciBhIGNhcnRhIGRvIGRlYWxlclxyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZS5kZWFsZXJIYW5kID0gRGVja1NlcnZpY2UucmV2ZWFsSGFuZCh0aGlzLmdhbWVTdGF0ZS5kZWFsZXJIYW5kKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZXMoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFZlcmlmaWNhciBzZSBvIGRlYWxlciB0YW1iw6ltIHRlbSBibGFja2phY2sgKGVtcGF0ZSlcclxuICAgICAgICAgICAgY29uc3QgZGVhbGVyVG90YWwgPSBjYWxjdWxhdGVIYW5kVmFsdWUodGhpcy5nYW1lU3RhdGUuZGVhbGVySGFuZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlYWxlckhhc0JsYWNramFjayA9IGRlYWxlclRvdGFsID09PSAyMSAmJiB0aGlzLmdhbWVTdGF0ZS5kZWFsZXJIYW5kLmxlbmd0aCA9PT0gMjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChkZWFsZXJIYXNCbGFja2phY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlLm1lc3NhZ2UgPSAnRW1wYXRlISBBbWJvcyB0w6ptIEJsYWNramFjay4nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzR2FtZVJlc3VsdChHYW1lUmVzdWx0LlBVU0gpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUubWVzc2FnZSA9ICdCbGFja2phY2shIFZvY8OqIGdhbmhvdSAzOjIuJztcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0dhbWVSZXN1bHQoR2FtZVJlc3VsdC5QTEFZRVJfQkxBQ0tKQUNLKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUuZ2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBQZXJtaXRlIGFvIGpvZ2Fkb3IgcGVkaXIgdW1hIGNhcnRhIGFkaWNpb25hbFxyXG4gICAgICovXHJcbiAgICBoaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZVN0YXRlLmdhbWVPdmVyIHx8IHRoaXMuZ2FtZVN0YXRlLnBsYXllclN0YW5kcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFRpcmFyIHVtYSBjYXJ0YSBkbyBiYXJhbGhvXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gRGVja1NlcnZpY2UuZHJhd0NhcmQodGhpcy5nYW1lU3RhdGUuZGVjaywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUucGxheWVySGFuZC5wdXNoKHJlc3VsdC5jYXJkKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5kZWNrID0gcmVzdWx0LnVwZGF0ZWREZWNrO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEF0dWFsaXphciBwb250dWHDp8Ojb1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmVzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVmVyaWZpY2FyIHNlIG8gam9nYWRvciBlc3RvdXJvdVxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVTdGF0ZS5wbGF5ZXJTY29yZSA+IDIxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlLm1lc3NhZ2UgPSAnVm9jw6ogZXN0b3Vyb3UhIERlYWxlciB2ZW5jZS4nO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NHYW1lUmVzdWx0KEdhbWVSZXN1bHQuUExBWUVSX0JVU1QpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZS5nYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubm90aWZ5U3RhdGVVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBKb2dhZG9yIGRlY2lkZSBwYXJhciBlIHBhc3NhciBhIHZleiBwYXJhIG8gZGVhbGVyXHJcbiAgICAgKi9cclxuICAgIHN0YW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVTdGF0ZS5nYW1lT3ZlciB8fCB0aGlzLmdhbWVTdGF0ZS5wbGF5ZXJTdGFuZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBWZXJpZmljYXIgc2UgbyBqb2dhZG9yIHRlbSBhIHBvbnR1YcOnw6NvIG3DrW5pbWEgcGFyYSBwYXJhclxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVTdGF0ZS5wbGF5ZXJTY29yZSA8IHRoaXMuY29uZmlnLm1pbmltdW1TdGFuZFNjb3JlKSB7IC8vIENvcnJpZ2lkbzogZ2FtZUNvbmZpZyAtPiBjb25maWdcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUubWVzc2FnZSA9IGBWb2PDqiBwcmVjaXNhIHRlciBwZWxvIG1lbm9zICR7dGhpcy5jb25maWcubWluaW11bVN0YW5kU2NvcmV9IHBvbnRvcyBwYXJhIHBhcmFyLmA7IC8vIENvcnJpZ2lkbzogZ2FtZUNvbmZpZyAtPiBjb25maWdcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnlTdGF0ZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLnBsYXllclN0YW5kcyA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmV2ZWxhciBhIGNhcnRhIG9jdWx0YSBkbyBkZWFsZXJcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5kZWFsZXJIYW5kID0gRGVja1NlcnZpY2UucmV2ZWFsSGFuZCh0aGlzLmdhbWVTdGF0ZS5kZWFsZXJIYW5kKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBdHVhbGl6YXIgcG9udHVhw6fDo28gZG8gZGVhbGVyIGNvbnNpZGVyYW5kbyB0b2RhcyBhcyBjYXJ0YXNcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5kZWFsZXJTY29yZSA9IGNhbGN1bGF0ZUhhbmRWYWx1ZSh0aGlzLmdhbWVTdGF0ZS5kZWFsZXJIYW5kKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBEZWFsZXIgY29tcHJhIGNhcnRhcyBhdMOpIHRlciBwZWxvIG1lbm9zIDE3IHBvbnRvc1xyXG4gICAgICAgIHRoaXMuZGVhbGVyUGxheSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIERldGVybWluYXIgbyByZXN1bHRhZG8gZG8gam9nb1xyXG4gICAgICAgIHRoaXMuZmluYWxpemVHYW1lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub3RpZnlTdGF0ZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlYWxlciBqb2dhIHN1YSB2ZXogKGNvbXByYSBjYXJ0YXMgYXTDqSB0ZXIgcGVsbyBtZW5vcyAxNyBwb250b3MpXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVhbGVyUGxheSgpOiB2b2lkIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5nYW1lU3RhdGUuZGVhbGVyU2NvcmUgPCAxNykge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBEZWNrU2VydmljZS5kcmF3Q2FyZCh0aGlzLmdhbWVTdGF0ZS5kZWNrLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUuZGVhbGVySGFuZC5wdXNoKHJlc3VsdC5jYXJkKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUuZGVjayA9IHJlc3VsdC51cGRhdGVkRGVjaztcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUuZGVhbGVyU2NvcmUgPSBjYWxjdWxhdGVIYW5kVmFsdWUodGhpcy5nYW1lU3RhdGUuZGVhbGVySGFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEZpbmFsaXphIG8gam9nbyBlIGRldGVybWluYSBvIHJlc3VsdGFkb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmFsaXplR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBkZXRlcm1pbmVHYW1lUmVzdWx0KHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZVJlc3VsdC5ERUFMRVJfQlVTVDpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnRGVhbGVyIGVzdG91cm91ISBWb2PDqiBnYW5ob3UuJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVSZXN1bHQuUExBWUVSX1dJTjpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVm9jw6ogZ2FuaG91ISc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lUmVzdWx0LkRFQUxFUl9XSU46XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0RlYWxlciBnYW5ob3UhJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVSZXN1bHQuUFVTSDpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnRW1wYXRlISc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnSm9nbyBmaW5hbGl6YWRvLic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0dhbWVSZXN1bHQocmVzdWx0KTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5nYW1lT3ZlciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2EgbyByZXN1bHRhZG8gZG8gam9nbyAocGFnYW1lbnRvcy9wZXJkYXMpXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0IE8gcmVzdWx0YWRvIGRvIGpvZ29cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwcm9jZXNzR2FtZVJlc3VsdChyZXN1bHQ6IEdhbWVSZXN1bHQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwYXlvdXQgPSBjYWxjdWxhdGVQYXlvdXQocmVzdWx0LCB0aGlzLmdhbWVTdGF0ZS5jdXJyZW50QmV0LCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuYmFsYW5jZSArPSBwYXlvdXQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuY3VycmVudEJldCA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQXR1YWxpemFyIGVzdGFkbyBkbyBqb2dvIHBhcmEgcGVybWl0aXIgbm92YSBwYXJ0aWRhXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuZ2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmdhbWVJblByb2dyZXNzID0gZmFsc2U7IC8vIE8gam9nbyBuw6NvIGVzdMOhIG1haXMgZW0gYW5kYW1lbnRvXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuY2FuRGVhbCA9IHRydWU7IC8vIEhhYmlsaXRhIG8gYm90w6NvIGRlIGluaWNpYXIgam9nb1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmNhbkhpdCA9IGZhbHNlOyAvLyBEZXNhYmlsaXRhIG8gYm90w6NvIGRlIHBlZGlyIGNhcnRhXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuY2FuU3RhbmQgPSBmYWxzZTsgLy8gRGVzYWJpbGl0YSBvIGJvdMOjbyBkZSBwYXJhclxyXG5cclxuICAgICAgICAvLyBTYWx2YXIgZGFkb3MgZG8gam9nb1xyXG4gICAgICAgIHRoaXMuc2F2ZUdhbWVTdGF0ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFZlcmlmaWNhciBzZSBvIGpvZ2Fkb3IgZmljb3Ugc2VtIHNhbGRvXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZVN0YXRlLmJhbGFuY2UgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q291bnRkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkaWNpb25hIHVtYSBhcG9zdGFcclxuICAgICAqIEBwYXJhbSBhbW91bnQgVmFsb3IgZGEgYXBvc3RhXHJcbiAgICAgKi9cclxuICAgIHBsYWNlQmV0KGFtb3VudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVTdGF0ZS5nYW1lT3Zlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChhbW91bnQgPiB0aGlzLmdhbWVTdGF0ZS5iYWxhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlLm1lc3NhZ2UgPSAnU2FsZG8gaW5zdWZpY2llbnRlIHBhcmEgZXNzYSBhcG9zdGEuJztcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnlTdGF0ZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmN1cnJlbnRCZXQgKz0gYW1vdW50O1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmJhbGFuY2UgLT0gYW1vdW50O1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLm1lc3NhZ2UgPSBgQXBvc3RhOiAke3RoaXMuZ2FtZVN0YXRlLmN1cnJlbnRCZXR9YDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vdGlmeVN0YXRlVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogTGltcGEgYSBhcG9zdGEgYXR1YWwgZSBkZXZvbHZlIG8gdmFsb3IgYW8gc2FsZG9cclxuICAgICAqL1xyXG4gICAgY2xlYXJCZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVTdGF0ZS5nYW1lT3Zlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmJhbGFuY2UgKz0gdGhpcy5nYW1lU3RhdGUuY3VycmVudEJldDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5jdXJyZW50QmV0ID0gMDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5tZXNzYWdlID0gJ0Fwb3N0YSBjYW5jZWxhZGEuJztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vdGlmeVN0YXRlVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSW5pY2lhIGEgY29udGFnZW0gcmVncmVzc2l2YSBxdWFuZG8gbyBqb2dhZG9yIGZpY2Egc2VtIHNhbGRvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRDb3VudGRvd24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuY291bnRkb3duVGltZSA9IHRoaXMuY29uZmlnLnJlbG9hZFRpbWU7IC8vIENvcnJpZ2lkbzogZ2FtZUNvbmZpZyAtPiBjb25maWdcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5jb3VudGRvd25BY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2F2ZUdhbWVTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMubm90aWZ5U3RhdGVVcGRhdGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBJbmljaWFyIG8gY29udGFkb3JcclxuICAgICAgICBjb25zdCBjb3VudGRvd25JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUuY291bnRkb3duVGltZSAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVHYW1lU3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnlTdGF0ZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZVN0YXRlLmNvdW50ZG93blRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGRvd25JbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZEJhbGFuY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkaWNpb25hIHNhbGRvIHF1YW5kbyBhIGNvbnRhZ2VtIHJlZ3Jlc3NpdmEgdGVybWluYVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbG9hZEJhbGFuY2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuYmFsYW5jZSA9IHRoaXMuY29uZmlnLnJlbG9hZEFtb3VudDsgLy8gQ29ycmlnaWRvOiBnYW1lQ29uZmlnIC0+IGNvbmZpZ1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLmNvdW50ZG93bkFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdibGFja2phY2tfY291bnRkb3duJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2JsYWNramFja19jb3VudGRvd25fZXhwaXJ5Jyk7XHJcbiAgICAgICAgdGhpcy5zYXZlR2FtZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlTdGF0ZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIE5vdGlmaWNhIHNvYnJlIG11ZGFuw6dhcyBubyBlc3RhZG9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBub3RpZnlTdGF0ZVVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5vblN0YXRlVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25TdGF0ZVVwZGF0ZSh7IC4uLnRoaXMuZ2FtZVN0YXRlIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWVDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlcic7XHJcblxyXG4vKipcclxuICogUG9udG8gZGUgZW50cmFkYSBkYSBhcGxpY2HDp8OjbyBCbGFja2phY2tcclxuICogSW5pY2lhbGl6YSBvIGNvbnRyb2xhZG9yIHByaW5jaXBhbCBkbyBqb2dvXHJcbiAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgLy8gSW5pY2lhbGl6YXIgbyBjb250cm9sYWRvciBkbyBqb2dvIGFww7NzIGNhcnJlZ2FyIG8gRE9NXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGdhbWVDb250cm9sbGVyID0gbmV3IEdhbWVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0dhbWUgY29udHJvbGxlciBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHknKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBWZXJpZmljYXIgc2Ugb3MgZWxlbWVudG9zIGNyw610aWNvcyBleGlzdGVtXHJcbiAgICAgICAgY29uc3QgY2hlY2tFbGVtZW50cyA9IFsnI3BsYXllci1jYXJkcycsICcjZGVhbGVyLWNhcmRzJywgJyNuZXctZ2FtZS1idG4nLCAnLmNoaXAnXTtcclxuICAgICAgICBjaGVja0VsZW1lbnRzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFbGVtZW50IG5vdCBmb3VuZDogJHtzZWxlY3Rvcn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgZ2FtZSBjb250cm9sbGVyOicsIGVycm9yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gRGV0ZWN0YXIgb3JpZW50YcOnw6NvIGVtIGRpc3Bvc2l0aXZvcyBtw7N2ZWlzXHJcbiAgICBoYW5kbGVPcmllbnRhdGlvbldhcm5pbmcoKTtcclxufSk7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhIGRldGVjw6fDo28gZGUgb3JpZW50YcOnw6NvIHBhcmEgZGlzcG9zaXRpdm9zIG3Ds3ZlaXNcclxuICogRXhpYmUgdW0gYXZpc28gcXVhbmRvIG8gZGlzcG9zaXRpdm8gZXN0w6EgZW0gbW9kbyByZXRyYXRvXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVPcmllbnRhdGlvbldhcm5pbmcoKTogdm9pZCB7XHJcbiAgICBjb25zdCBvcmllbnRhdGlvbk1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3JpZW50YXRpb24tbWVzc2FnZScpO1xyXG4gICAgXHJcbiAgICBpZiAoIW9yaWVudGF0aW9uTWVzc2FnZSkgcmV0dXJuOyAvLyBTZSBuw6NvIGVuY29udHJvdSBvIGVsZW1lbnRvLCBzYWkgZGEgZnVuw6fDo29cclxuICAgIFxyXG4gICAgLy8gVmVyaWZpY2FyIG9yaWVudGHDp8OjbyBpbmljaWFsXHJcbiAgICBjaGVja09yaWVudGF0aW9uKCk7XHJcbiAgICBcclxuICAgIC8vIENvbmZpZ3VyYXIgZGV0ZWN0b3IgZGUgbXVkYW7Dp2EgZGUgb3JpZW50YcOnw6NvXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tPcmllbnRhdGlvbik7XHJcbiAgICBcclxuICAgIC8vIFZlcmlmaWNhciBvcmllbnRhw6fDo28gZW0gZGlzcG9zaXRpdm9zIG3Ds3ZlaXNcclxuICAgIGZ1bmN0aW9uIGNoZWNrT3JpZW50YXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgLy8gU29tZW50ZSBwYXJhIGRpc3Bvc2l0aXZvcyBtw7N2ZWlzXHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgLy8gTW9kbyByZXRyYXRvXHJcbiAgICAgICAgICAgICAgICAob3JpZW50YXRpb25NZXNzYWdlIGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb2RvIHBhaXNhZ2VtXHJcbiAgICAgICAgICAgICAgICAob3JpZW50YXRpb25NZXNzYWdlIGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBEZXNrdG9wIG91IHRhYmxldCBncmFuZGUgLSBlc2NvbmRlciBtZW5zYWdlbVxyXG4gICAgICAgICAgICAob3JpZW50YXRpb25NZXNzYWdlIGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==