// Script para adicionar animações e baralho visível sem modificar o código TypeScript principal
(function() {
    // Esperar o DOM carregar completamente
    document.addEventListener('DOMContentLoaded', function() {
        // Aguardar um pouco para garantir que o jogo original foi carregado
        setTimeout(enhanceBlackjack, 500);
    });

    function enhanceBlackjack() {
        console.log('Melhorando o jogo de Blackjack com animações');
        
        // Se já existe o baralho original, não criar um novo
        if (!document.getElementById('card-deck')) {
            createVisibleDeck();
        } else {
            // Adicionar contador ao baralho original
            const originalDeck = document.getElementById('card-deck');
            if (originalDeck && !originalDeck.querySelector('.card-counter')) {
                const cardCounter = document.createElement('div');
                cardCounter.className = 'card-counter';
                cardCounter.textContent = 'Cartas: 52';
                originalDeck.appendChild(cardCounter);
            }
        }
        
        // Monitorar mudanças no DOM para aplicar animações
        setupMutationObserver();
        
        // Interceptar os cliques nos botões para animações
        interceptButtonClicks();
        
        // Adicionar listener para o botão "Iniciar Jogo" para resetar o contador
        setupNewGameListener();
    }

    function createVisibleDeck() {
        // Verificar se o elemento game-container existe
        const gameContainer = document.querySelector('.game-container');
        if (!gameContainer) {
            console.warn('Contêiner do jogo não encontrado');
            return;
        }
        
        // Remover qualquer baralho duplicado
        const existingDecks = document.querySelectorAll('.card-deck');
        existingDecks.forEach(deck => {
            if (!deck.id) {
                deck.remove();
            }
        });
        
        // Criar o elemento do baralho
        const deckContainer = document.createElement('div');
        deckContainer.className = 'card-deck';
        deckContainer.id = 'animated-deck';
        
        // Adicionar o contador de cartas
        const cardCounter = document.createElement('div');
        cardCounter.className = 'card-counter';
        cardCounter.textContent = 'Cartas: 52';
        deckContainer.appendChild(cardCounter);
        
        // Adicionar ao jogo
        gameContainer.appendChild(deckContainer);
    }

    // Adicionar listener ao botão "Iniciar Jogo" para resetar o contador
    function setupNewGameListener() {
        const newGameBtn = document.getElementById('new-game-btn');
        if (newGameBtn) {
            newGameBtn.addEventListener('click', function() {
                // Resetar o contador de cartas para 52
                resetDeckCounter();
                
                // Adicionar efeito visual ao baralho quando um novo jogo é iniciado
                const decks = document.querySelectorAll('.card-deck');
                decks.forEach(deck => {
                    // Efeito de brilho
                    deck.style.boxShadow = '0 0 20px rgba(255, 209, 102, 0.8)';
                    
                    // Efeito de shake
                    deck.style.animation = 'deck-shuffle 0.5s ease-in-out';
                    
                    // Remover os efeitos após a animação
                    setTimeout(function() {
                        deck.style.boxShadow = '';
                        deck.style.animation = '';
                    }, 500);
                });
            });
        }
    }

    // Função para resetar o contador do baralho
    function resetDeckCounter() {
        const counters = document.querySelectorAll('.card-counter');
        counters.forEach(counter => {
            // Resetar o texto do contador
            counter.textContent = 'Cartas: 48';
            
            // Resetar a cor do contador
            counter.style.color = '#ffffff';
        });
    }

    function setupMutationObserver() {
        // Observar mudanças no DOM para detectar cartas sendo adicionadas
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Verificar cada novo nó adicionado
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i];
                        if (node.nodeType === 1) { // Element node
                            // Verificar se é uma carta
                            if (node.classList && node.classList.contains('card')) {
                                // Aplicar animação à carta (tanto para classes do sistema original quanto novas)
                                applyCardAnimation(node);
                                
                                // Atualizar o contador do baralho
                                decrementDeckCounter();
                            }
                        }
                    }
                }
            });
        });
        
        // Observar as áreas de cartas do jogador e do dealer
        const playerCards = document.getElementById('player-cards');
        const dealerCards = document.getElementById('dealer-cards');
        
        if (playerCards) {
            observer.observe(playerCards, { childList: true });
        }
        
        if (dealerCards) {
            observer.observe(dealerCards, { childList: true });
        }
        
        // Observar também mensagens de resultado para aplicar animações de vitória/derrota
        const messageElement = document.getElementById('message');
        if (messageElement) {
            const messageObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        const message = messageElement.textContent.toLowerCase();
                        
                        if (message.includes('ganhou') || message.includes('vence')) {
                            applyWinAnimation();
                        } else if (message.includes('perdeu') || message.includes('estourou')) {
                            applyLoseAnimation();
                        } else if (message.includes('blackjack')) {
                            applyBlackjackAnimation();
                        }
                    }
                });
            });
            
            messageObserver.observe(messageElement, { 
                childList: true, 
                characterData: true,
                subtree: true
            });
        }
        
        // Observar alterações nas cartas para verificar inconsistências
        const cardValueObserver = new MutationObserver(function() {
            // Verificar se há inconsistências entre os elementos HTML e os valores armazenados no jogo
            setTimeout(verifyCardConsistency, 100);
        });

        // Observar toda a área do jogo para alterações
        const gameArea = document.querySelector('.table');
        if (gameArea) {
            cardValueObserver.observe(gameArea, { 
                childList: true,
                subtree: true,
                characterData: true
            });
        }
    }

    function applyCardAnimation(cardElement) {
        // Adicionar classes para animação (compatível com ambas as convenções)
        if (!cardElement.classList.contains('drawn')) {
            cardElement.classList.add('drawn');
        }
        if (!cardElement.classList.contains('card-drawn')) {
            cardElement.classList.add('card-drawn');
        }
        
        // Simular carta vindo do baralho
        cardElement.style.position = 'relative';
        
        // Se for uma carta virada para baixo (dealer), adicionar evento de clique para virar
        if ((cardElement.classList.contains('back') || cardElement.classList.contains('hidden')) && 
            cardElement.parentElement && 
            cardElement.parentElement.id === 'dealer-cards') {
            
            cardElement.addEventListener('click', function() {
                if (cardElement.classList.contains('back') || cardElement.classList.contains('hidden')) {
                    flipCard(cardElement);
                }
            });
        }
    }

    function flipCard(cardElement) {
        // Adicionar classe de animação
        cardElement.classList.add('flipping');
        
        // Após metade da animação, remover as classes de carta virada para baixo
        setTimeout(function() {
            cardElement.classList.remove('back');
            cardElement.classList.remove('hidden');
        }, 300);
        
        // Após a animação completa, remover a classe de animação
        setTimeout(function() {
            cardElement.classList.remove('flipping');
        }, 600);
    }

    function decrementDeckCounter() {
        // Procurar o contador em qualquer um dos elementos de baralho
        const counter = document.querySelector('.card-counter');
        if (counter) {
            // Extrair o número atual de cartas
            const currentCount = parseInt(counter.textContent.replace('Cartas: ', ''), 10);
            
            if (!isNaN(currentCount) && currentCount > 0) {
                // Atualizar o contador
                counter.textContent = `Cartas: ${currentCount - 1}`;
                
                // Adicionar efeito visual baseado no número de cartas
                if (currentCount - 1 <= 10) {
                    counter.style.color = '#ff6b6b';
                } else if (currentCount - 1 <= 26) {
                    counter.style.color = '#ffd166';
                }
                
                // Efeito de shake no baralho
                const decks = document.querySelectorAll('.card-deck');
                decks.forEach(deck => {
                    const originalTransform = deck.style.transform || '';
                    const hasTranslateY = originalTransform.includes('translateY');
                    
                    // Aplicar animação baseada no tipo de transformação original
                    if (hasTranslateY) {
                        deck.style.transform = 'translateY(-50%) translateX(-3px)';
                        setTimeout(function() {
                            deck.style.transform = 'translateY(-50%) translateX(2px)';
                            setTimeout(function() {
                                deck.style.transform = 'translateY(-50%)';
                            }, 50);
                        }, 50);
                    } else {
                        deck.style.transform = 'translateX(-3px)';
                        setTimeout(function() {
                            deck.style.transform = 'translateX(2px)';
                            setTimeout(function() {
                                deck.style.transform = '';
                            }, 50);
                        }, 50);
                    }
                });
            }
        }
    }

    function interceptButtonClicks() {
        // Interceptar o botão "Stand" para animar a virada de cartas do dealer
        const standButton = document.getElementById('stand-btn');
        if (standButton) {
            const originalOnClick = standButton.onclick;
            standButton.onclick = function(event) {
                // Verificar se há cartas do dealer viradas para baixo
                const backCards = document.querySelectorAll('#dealer-cards .card.hidden, #dealer-cards .card.back');
                
                if (backCards.length > 0) {
                    // Efeito visual no baralho
                    const decks = document.querySelectorAll('.card-deck');
                    decks.forEach(deck => {
                        deck.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.7)';
                        setTimeout(function() {
                            deck.style.boxShadow = '';
                        }, 500);
                    });
                }
                
                // Deixar o comportamento padrão acontecer
                return true;
            };
        }
        
        // Interceptar o botão "Hit" para animação adicional
        const hitButton = document.getElementById('hit-btn');
        if (hitButton) {
            const originalHitOnClick = hitButton.onclick;
            hitButton.onclick = function(event) {
                // Efeito visual no baralho antes de comprar
                const decks = document.querySelectorAll('.card-deck');
                decks.forEach(deck => {
                    deck.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.7)';
                    setTimeout(function() {
                        deck.style.boxShadow = '';
                    }, 300);
                });
                
                // Deixar o comportamento padrão acontecer
                return true;
            };
        }
    }

    function applyWinAnimation() {
        const playerCards = document.querySelectorAll('#player-cards .card');
        playerCards.forEach(function(card, index) {
            setTimeout(function() {
                card.classList.add('win-animation');
                setTimeout(function() {
                    card.classList.remove('win-animation');
                }, 1000);
            }, index * 100);
        });
    }

    function applyLoseAnimation() {
        const playerCards = document.querySelectorAll('#player-cards .card');
        playerCards.forEach(function(card, index) {
            setTimeout(function() {
                card.classList.add('lose-animation');
                setTimeout(function() {
                    card.classList.remove('lose-animation');
                }, 1000);
            }, index * 100);
        });
    }
    
    function applyBlackjackAnimation() {
        const playerCards = document.querySelectorAll('#player-cards .card');
        playerCards.forEach(function(card) {
            card.classList.add('blackjack-animation');
            setTimeout(function() {
                card.classList.remove('blackjack-animation');
            }, 1500);
        });
    }

    // Função para verificar consistência entre cartas exibidas e valores internos
    function verifyCardConsistency() {
        const playerCards = document.querySelectorAll('#player-cards .card');
        
        // Para cada carta visível do jogador
        playerCards.forEach((cardElement, index) => {
            // Obter o valor visível na carta
            const visibleValue = cardElement.querySelector('.card-value')?.textContent;
            
            // Se a carta tem um valor visível, verificar com os dados internos (via dataset)
            if (visibleValue) {
                const cardTop = cardElement.querySelector('.card-top');
                const cardBottom = cardElement.querySelector('.card-bottom');
                const cardCenter = cardElement.querySelector('.card-center');
                
                // Se os valores não correspondem ao naipe, corrigir
                if (cardTop?.dataset?.actualValue) {
                    const actualValue = cardTop.dataset.actualValue;
                    const valueElements = cardElement.querySelectorAll('.card-value');
                    
                    valueElements.forEach(valueEl => {
                        if (valueEl.textContent !== actualValue) {
                            valueEl.textContent = actualValue;
                        }
                    });
                    
                    // Corrigir o elemento de centro da carta para cartas de figura
                    if (['J', 'Q', 'K'].includes(actualValue)) {
                        if (!cardCenter.classList.contains('face-card')) {
                            cardCenter.classList.add('face-card');
                            cardCenter.innerHTML = '';
                            const figureInitial = document.createElement('span');
                            figureInitial.className = 'figure-initial';
                            figureInitial.textContent = actualValue;
                            cardCenter.appendChild(figureInitial);
                        } else if (cardCenter.querySelector('.figure-initial')) {
                            cardCenter.querySelector('.figure-initial').textContent = actualValue;
                        }
                    }
                    // Corrigir para Ases
                    else if (actualValue === 'A') {
                        cardCenter.classList.add('ace-card');
                    }
                }
            }
        });
        
        // Recalcular a pontuação do jogador com base nos valores corretos
        recalculatePlayerScore();
    }

    // Função para recalcular a pontuação do jogador
    function recalculatePlayerScore() {
        const playerScoreElement = document.getElementById('player-score');
        if (!playerScoreElement) return;
        
        const playerCards = document.querySelectorAll('#player-cards .card');
        let score = 0;
        
        playerCards.forEach(card => {
            const value = card.querySelector('.card-value')?.textContent;
            if (value === 'A') {
                score += 1;
            } else if (['J', 'Q', 'K'].includes(value)) {
                score += 10;
            } else if (value) {
                score += parseInt(value) || 0;
            }
        });
        
        // Atualizar a pontuação na interface
        playerScoreElement.textContent = score.toString();
    }
})();
