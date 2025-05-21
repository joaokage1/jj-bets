import { Card } from '../models/Card';

/**
 * Componente para renderizar uma carta de baralho
 */
export class CardComponent {
    private element: HTMLElement;
    
    /**
     * @param card Dados da carta
     * @param animated Se a carta deve ser animada
     */
    constructor(card: Card, animated: boolean = false) {
        this.element = this.createCardElement(card);
        
        if (animated) {
            this.element.classList.add('drawn');
        }
    }
    
    /**
     * Retorna o elemento DOM da carta
     */
    getElement(): HTMLElement {
        return this.element;
    }
    
    /**
     * Cria o elemento DOM da carta
     * @param card Dados da carta
     * @returns Elemento DOM da carta
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
     * Vira a carta (de face para baixo para face para cima)
     */
    flip(): void {
        if (this.element.classList.contains('card-back')) {
            this.element.classList.add('flipping');
            
            // Após metade da animação, revelar a carta
            setTimeout(() => {
                this.element.classList.remove('card-back');
                
                // Reconstruir o conteúdo da carta
                const card = {
                    value: this.element.getAttribute('data-value') || 'A',
                    suit: this.element.getAttribute('data-suit') || '♠',
                    faceUp: true
                };
                
                // Limpar o elemento
                this.element.innerHTML = '';
                
                // Adicionar conteúdo da carta
                const isRed = card.suit === '♥' || card.suit === '♦';
                this.element.className = `card flipping ${isRed ? 'red' : ''}`;
                
                const valueElement = document.createElement('div');
                valueElement.className = 'card-value';
                valueElement.innerHTML = `${card.value}<br>${card.suit}`;
                
                const centerElement = document.createElement('div');
                centerElement.className = 'card-center';
                centerElement.textContent = card.suit;
                
                this.element.appendChild(valueElement);
                this.element.appendChild(centerElement);
            }, 150); // Metade do tempo da animação de virada
        }
    }
    
    /**
     * Anima a carta (por exemplo, ao ganhar)
     * @param animationType Tipo de animação ('win', 'lose', 'blackjack')
     */
    animate(animationType: string): void {
        // Remover animações anteriores
        this.element.classList.remove('win-animation', 'lose-animation', 'blackjack-animation');
        
        // Adicionar nova animação
        this.element.classList.add(`${animationType}-animation`);
        
        // Remover a classe após a animação
        setTimeout(() => {
            this.element.classList.remove(`${animationType}-animation`);
        }, 2000);
    }
}
