import { GameState } from '../models/Game';
import { Card } from '../models/Card';
import { GameUtils } from '../utils/GameUtils';

/**
 * Classe responsável por gerenciar a interface do usuário
 */
export class UIController {
    private elements!: {
        dealerCards: HTMLElement;
        playerCards: HTMLElement;
        dealerScore: HTMLElement;
        playerScore: HTMLElement;
        message: HTMLElement;
        balance: HTMLElement;
        currentBet: HTMLElement;
        betChips: HTMLElement;
        newGameBtn: HTMLButtonElement;
        hitBtn: HTMLButtonElement;
        standBtn: HTMLButtonElement;
        clearBetBtn: HTMLButtonElement;
        chips: NodeListOf<HTMLElement>;
        countdownElement: HTMLElement;
        reloadScreen: HTMLElement;
    };
    
    // Adicionando a propriedade selectors que faltava
    private selectors: {
        dealerCardsSelector: string;
        playerCardsSelector: string;
        dealerScoreSelector: string;
        playerScoreSelector: string;
        messageSelector: string;
        balanceSelector: string;
        currentBetSelector: string;
        betChipsSelector: string;
        newGameBtnSelector: string;
        hitBtnSelector: string;
        standBtnSelector: string;
        clearBetBtnSelector: string;
        chipsSelector: string;
        countdownSelector: string;
        reloadScreenSelector: string;
    };
    
    /**
     * @param selectors Seletores para os elementos da interface
     */
    constructor(selectors: {
        dealerCardsSelector: string;
        playerCardsSelector: string;
        dealerScoreSelector: string;
        playerScoreSelector: string;
        messageSelector: string;
        balanceSelector: string;
        currentBetSelector: string;
        betChipsSelector: string;
        newGameBtnSelector: string;
        hitBtnSelector: string;
        standBtnSelector: string;
        clearBetBtnSelector: string;
        chipsSelector: string;
        countdownSelector: string;
        reloadScreenSelector: string;
    }) {
        this.selectors = selectors; // Armazenar os seletores para uso posterior
        
        // Inicializar os elementos imediatamente se o DOM já estiver carregado
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.initializeElements(selectors);
        } else {
            // Caso contrário, aguardar o carregamento do DOM
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeElements(selectors);
            });
        }
    }
    
    // Método para inicializar os elementos
    private initializeElements(selectors: any): void {
        this.elements = {
            dealerCards: document.querySelector(selectors.dealerCardsSelector) as HTMLElement,
            playerCards: document.querySelector(selectors.playerCardsSelector) as HTMLElement,
            dealerScore: document.querySelector(selectors.dealerScoreSelector) as HTMLElement,
            playerScore: document.querySelector(selectors.playerScoreSelector) as HTMLElement,
            message: document.querySelector(selectors.messageSelector) as HTMLElement,
            balance: document.querySelector(selectors.balanceSelector) as HTMLElement,
            currentBet: document.querySelector(selectors.currentBetSelector) as HTMLElement,
            betChips: document.querySelector(selectors.betChipsSelector) as HTMLElement,
            newGameBtn: document.querySelector(selectors.newGameBtnSelector) as HTMLButtonElement,
            hitBtn: document.querySelector(selectors.hitBtnSelector) as HTMLButtonElement,
            standBtn: document.querySelector(selectors.standBtnSelector) as HTMLButtonElement,
            clearBetBtn: document.querySelector(selectors.clearBetBtnSelector) as HTMLButtonElement,
            chips: document.querySelectorAll(selectors.chipsSelector) as NodeListOf<HTMLElement>,
            countdownElement: document.querySelector(selectors.countdownSelector) as HTMLElement,
            reloadScreen: document.querySelector(selectors.reloadScreenSelector) as HTMLElement
        };
        
        this.validateElements();
        // Emitir um evento indicando que os elementos estão prontos
        document.dispatchEvent(new CustomEvent('ui-controller-ready'));
    }
    
    /**
     * Verifica se todos os elementos foram encontrados
     * @throws Erro se algum elemento não for encontrado
     */
    private validateElements(): void {
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
    updateUI(state: GameState): void {
        // Verificar se os elementos existem
        if (!this.elements) return;
        
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
        } else {
            this.hideReloadScreen();
        }
    }
    
    /**
     * Atualiza o estado dos botões com base no estado do jogo
     * @param state Estado atual do jogo
     */
    private updateButtons(state: GameState): void {
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
    renderCards(playerCards: Card[], dealerCards: Card[]): void {
        this.renderHand(playerCards, this.elements.playerCards);
        this.renderHand(dealerCards, this.elements.dealerCards);
    }
    
    /**
     * Renderiza uma mão de cartas
     * @param hand Mão de cartas
     * @param container Elemento que receberá as cartas
     */
    private renderHand(hand: Card[], container: HTMLElement): void {
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
    private createCardElement(card: Card): HTMLElement {
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
    renderBetChips(betAmount: number): void {
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
    private showReloadScreen(seconds: number): void {
        this.elements.reloadScreen.style.display = 'flex';
        this.elements.countdownElement.textContent = seconds.toString();
    }
    
    /**
     * Esconde a tela de recarga de saldo
     */
    private hideReloadScreen(): void {
        this.elements.reloadScreen.style.display = 'none';
    }
    
    /**
     * Adiciona um ouvinte de evento para o botão de Nova Partida
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onNewGameClick(callback: () => void): void {
        this.elements.newGameBtn.addEventListener('click', callback);
    }
    
    /**
     * Adiciona um ouvinte de evento para o botão de Pedir Carta
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onHitClick(callback: () => void): void {
        this.elements.hitBtn.addEventListener('click', callback);
    }
    
    /**
     * Adiciona um ouvinte de evento para o botão de Parar
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onStandClick(callback: () => void): void {
        this.elements.standBtn.addEventListener('click', callback);
    }
    
    /**
     * Adiciona um ouvinte de evento para o botão de Limpar Aposta
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onClearBetClick(callback: () => void): void {
        this.elements.clearBetBtn.addEventListener('click', callback);
    }
    
    /**
     * Adiciona ouvintes de evento para os chips de aposta
     * @param callback Função a ser chamada quando um chip for clicado (recebe o valor como parâmetro)
     */
    onChipClick(callback: (value: number) => void): void {
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
        } catch (error) {
            console.error('Error setting up chip click listeners:', error);
        }
    }
}
