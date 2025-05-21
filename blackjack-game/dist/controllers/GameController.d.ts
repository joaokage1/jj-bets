/**
 * Controlador principal que inicializa e coordena todos os componentes do jogo
 */
export declare class GameController {
    private gameService;
    private animationService;
    private uiController;
    /**
     * Inicializa o controlador do jogo
     */
    constructor();
    /**
     * Inicializa o UI Controller
     */
    private initializeUIController;
    /**
     * Configura os ouvintes de eventos para interação do usuário
     */
    private setupEventListeners;
    /**
     * Manipula atualizações no estado do jogo
     * @param state Novo estado do jogo
     */
    private handleStateUpdate;
}
