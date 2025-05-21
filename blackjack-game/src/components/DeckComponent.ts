/**
 * Componente para renderizar o baralho visível na mesa
 */
export class DeckComponent {
    private element!: HTMLElement;
    private counterElement!: HTMLElement;
    private cardCount: number = 52;
    
    /**
     * @param containerId ID do contêiner onde o baralho será renderizado
     */
    constructor(containerId: string = 'table') {
        // Criar o baralho quando o DOM estiver pronto
        document.addEventListener('DOMContentLoaded', () => {
            this.createDeck(containerId);
        });
    }
    
    /**
     * Cria o elemento do baralho e o adiciona ao DOM
     * @param containerId ID do contêiner onde o baralho será renderizado
     */
    private createDeck(containerId: string): void {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Contêiner com ID '${containerId}' não encontrado`);
            return;
        }
        
        // Verificar se já existe um baralho
        if (document.getElementById('card-deck')) {
            this.element = document.getElementById('card-deck') as HTMLElement;
            this.counterElement = this.element.querySelector('.card-counter') as HTMLElement;
            return;
        }
        
        // Criar elemento do baralho
        this.element = document.createElement('div');
        this.element.id = 'card-deck';
        this.element.className = 'card-deck';
        
        // Criar cartas do baralho
        const deckCards = document.createElement('div');
        deckCards.className = 'deck-cards';
        
        // Adicionar carta do topo
        const topCard = document.createElement('div');
        topCard.id = 'deck-top-card';
        topCard.className = 'deck-card';
        deckCards.appendChild(topCard);
        
        // Criar contador de cartas
        this.counterElement = document.createElement('div');
        this.counterElement.className = 'card-counter';
        this.updateCardCount(52);
        
        // Montar o baralho
        this.element.appendChild(deckCards);
        this.element.appendChild(this.counterElement);
        
        // Adicionar ao DOM
        container.appendChild(this.element);
    }
    
    /**
     * Retorna o elemento DOM do baralho
     */
    getElement(): HTMLElement {
        return this.element;
    }
    
    /**
     * Atualiza o contador de cartas
     * @param count Número de cartas no baralho
     */
    updateCardCount(count: number): void {
        this.cardCount = count;
        if (this.counterElement) {
            this.counterElement.textContent = `Cartas: ${count}`;
        }
    }
    
    /**
     * Anima o embaralhamento do baralho
     */
    shuffle(): void {
        if (this.element) {
            this.element.classList.remove('shuffling');
            void this.element.offsetWidth; // Trigger reflow
            this.element.classList.add('shuffling');
        }
    }
    
    /**
     * Anima uma carta sendo comprada do baralho
     * @param targetElement Elemento para onde a carta vai
     * @param onComplete Callback a ser chamado quando a animação terminar
     */
    animateCardDraw(targetElement: HTMLElement, onComplete?: () => void): void {
        if (!this.element || !targetElement) return;
        
        // Só animar se houver cartas
        if (this.cardCount <= 0) {
            if (onComplete) onComplete();
            return;
        }
        
        // Obter posição do baralho e do alvo
        const deckRect = this.element.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        
        // Criar um elemento de carta temporário para animação
        const tempCard = document.createElement('div');
        tempCard.className = 'card card-back card-animation';
        tempCard.style.position = 'fixed';
        tempCard.style.zIndex = '1000';
        tempCard.style.left = `${deckRect.left}px`;
        tempCard.style.top = `${deckRect.top}px`;
        tempCard.style.width = '80px';
        tempCard.style.height = '120px';
        
        // Adicionar ao corpo do documento
        document.body.appendChild(tempCard);
        
        // Iniciar animação
        setTimeout(() => {
            tempCard.style.transform = 'translate(0, 0) rotate(0deg)';
            tempCard.style.left = `${targetRect.left}px`;
            tempCard.style.top = `${targetRect.top}px`;
            
            // Quando a animação terminar, remover o elemento temporário
            setTimeout(() => {
                tempCard.remove();
                if (onComplete) onComplete();
            }, 500);
        }, 10);
        
        // Atualizar contador
        this.updateCardCount(this.cardCount - 1);
    }
    
    /**
     * Reseta o contador de cartas
     * @param count Número de cartas (padrão: 52)
     */
    resetCardCount(count: number = 52): void {
        this.updateCardCount(count);
        
        // Animar embaralhamento
        this.shuffle();
    }
}
