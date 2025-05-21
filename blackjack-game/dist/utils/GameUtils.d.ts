/**
 * Utilitários gerais para o jogo
 */
export declare class GameUtils {
    /**
     * Formata um valor monetário em formato de fichas
     * @param value Valor a ser formatado
     * @returns String formatada
     */
    static formatChips(value: number): string;
    /**
     * Formata o tempo em minutos e segundos
     * @param seconds Tempo em segundos
     * @returns String formatada (MM:SS)
     */
    static formatTime(seconds: number): string;
    /**
     * Gera um ID único
     * @returns String ID único
     */
    static generateId(): string;
    /**
     * Cria um elemento DOM com atributos
     * @param tag Tag do elemento
     * @param attributes Atributos do elemento
     * @param textContent Conteúdo de texto (opcional)
     * @returns Elemento criado
     */
    static createElement<T extends HTMLElement>(tag: string, attributes: {
        [key: string]: string;
    }, textContent?: string): T;
    /**
     * Salva dados no localStorage
     * @param key Chave
     * @param value Valor
     */
    static saveToLocalStorage(key: string, value: string): void;
    /**
     * Carrega dados do localStorage
     * @param key Chave
     * @param defaultValue Valor padrão se não encontrado
     * @returns Valor carregado ou valor padrão
     */
    static loadFromLocalStorage(key: string, defaultValue?: string): string;
}
