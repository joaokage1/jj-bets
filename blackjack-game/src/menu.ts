// Arquivo TypeScript para o menu de escolha de jogos
document.addEventListener('DOMContentLoaded', () => {
    // Obter todos os cartões de jogos que não estão marcados como "coming soon"
    const gameCards = document.querySelectorAll('.game-card:not(.coming-soon)');
    
    // Adicionar event listeners para cada cartão de jogo
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            // Obter o nome do jogo a partir do atributo data-game
            const gameName = card.getAttribute('data-game');
            
            // Redirecionar para o jogo correspondente
            if (gameName === 'blackjack') {
                window.location.href = 'index.html';
            }
            // Aqui você pode adicionar mais jogos no futuro
        });
    });
});
