/**
 * Utilitários gerais para o jogo
 */
export class GameUtils {
    /**
     * Formata um valor monetário em formato de fichas
     * @param value Valor a ser formatado
     * @returns String formatada
     */
    static formatChips(value: number): string {
        return value.toLocaleString();
    }
    
    /**
     * Formata o tempo em minutos e segundos
     * @param seconds Tempo em segundos
     * @returns String formatada (MM:SS)
     */
    static formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    /**
     * Gera um ID único
     * @returns String ID único
     */
    static generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    /**
     * Cria um elemento DOM com atributos
     * @param tag Tag do elemento
     * @param attributes Atributos do elemento
     * @param textContent Conteúdo de texto (opcional)
     * @returns Elemento criado
     */
    static createElement<T extends HTMLElement>(
        tag: string,
        attributes: { [key: string]: string },
        textContent?: string
    ): T {
        const element = document.createElement(tag) as T;
        
        // Adicionar atributos
        for (const key in attributes) {
            if (key === 'className') {
                element.className = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        }
        
        // Adicionar texto, se fornecido
        if (textContent) {
            element.textContent = textContent;
        }
        
        return element;
    }
    
    /**
     * Salva dados no localStorage
     * @param key Chave
     * @param value Valor
     */
    static saveToLocalStorage(key: string, value: string): void {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.error('Erro ao salvar no localStorage:', e);
        }
    }
    
    /**
     * Carrega dados do localStorage
     * @param key Chave
     * @param defaultValue Valor padrão se não encontrado
     * @returns Valor carregado ou valor padrão
     */
    static loadFromLocalStorage(key: string, defaultValue: string = ''): string {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? value : defaultValue;
        } catch (e) {
            console.error('Erro ao carregar do localStorage:', e);
            return defaultValue;
        }
    }
}
