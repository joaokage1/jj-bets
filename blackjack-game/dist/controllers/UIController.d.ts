import { GameState } from '../models/Game';
import { Card } from '../models/Card';
/**
 * Classe responsável por gerenciar a interface do usuário
 */
export declare class UIController {
    private elements;
    private selectors;
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
    });
    private initializeElements;
    /**
     * Verifica se todos os elementos foram encontrados
     * @throws Erro se algum elemento não for encontrado
     */
    private validateElements;
    /**
     * Atualiza a interface com base no estado do jogo
     * @param state Estado atual do jogo
     */
    updateUI(state: GameState): void;
    /**
     * Atualiza o estado dos botões com base no estado do jogo
     * @param state Estado atual do jogo
     */
    private updateButtons;
    /**
     * Renderiza as cartas na mesa
     * @param playerCards Cartas do jogador
     * @param dealerCards Cartas do dealer
     */
    renderCards(playerCards: Card[], dealerCards: Card[]): void;
    /**
     * Renderiza uma mão de cartas
     * @param hand Mão de cartas
     * @param container Elemento que receberá as cartas
     */
    private renderHand;
    /**
     * Cria um elemento para representar uma carta
     * @param card Dados da carta
     * @returns Elemento HTML da carta
     */
    private createCardElement;
    /**
     * Renderiza as fichas da aposta atual
     * @param betAmount Valor da aposta
     */
    renderBetChips(betAmount: number): void;
    /**
     * Exibe a tela de recarga de saldo
     * @param seconds Tempo restante em segundos
     */
    private showReloadScreen;
    /**
     * Esconde a tela de recarga de saldo
     */
    private hideReloadScreen;
    /**
     * Adiciona um ouvinte de evento para o botão de Nova Partida
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onNewGameClick(callback: () => void): void;
    /**
     * Adiciona um ouvinte de evento para o botão de Pedir Carta
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onHitClick(callback: () => void): void;
    /**
     * Adiciona um ouvinte de evento para o botão de Parar
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onStandClick(callback: () => void): void;
    /**
     * Adiciona um ouvinte de evento para o botão de Limpar Aposta
     * @param callback Função a ser chamada quando o botão for clicado
     */
    onClearBetClick(callback: () => void): void;
    /**
     * Adiciona ouvintes de evento para os chips de aposta
     * @param callback Função a ser chamada quando um chip for clicado (recebe o valor como parâmetro)
     */
    onChipClick(callback: (value: number) => void): void;
}
