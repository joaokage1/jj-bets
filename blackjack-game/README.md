# JJ Bets - Blackjack Game

Um jogo de Blackjack implementado em TypeScript com animações e interface amigável.

## Estrutura do Projeto

O projeto segue uma arquitetura MVC (Model-View-Controller) para melhor organização e desacoplamento do código:

```
src/
├── assets/               # Recursos gráficos
├── components/           # Componentes reutilizáveis da interface
├── controllers/          # Controladores que conectam modelos e views
├── models/               # Modelos de dados e regras de negócio
├── services/             # Serviços para lógica de negócio
├── utils/                # Utilitários e funções auxiliares
├── views/                # Componentes de visualização
├── styles/               # Arquivos CSS
├── index.html            # Página do jogo
├── menu.html             # Menu principal
└── main.ts               # Ponto de entrada da aplicação
```

## Características

- Interface responsiva com suporte a dispositivos móveis
- Animações para distribuição e virada de cartas
- Baralho visível com contador de cartas
- Sistema de apostas com fichas
- Regras de Blackjack completas
- Menu de seleção de jogos

## Como Executar

1. Instale as dependências:
   ```
   npm install
   ```

2. Execute o build do projeto:
   ```
   npm run build
   ```

3. Inicie o servidor:
   ```
   npm start
   ```

4. Acesse o jogo em seu navegador:
   ```
   http://localhost:3000
   ```

Ou simplesmente use o script `build-and-run.bat` para realizar todas as etapas acima com um único comando.

## Tecnologias Utilizadas

- TypeScript
- HTML5 / CSS3
- Webpack
- Node.js

## Arquitetura Modular

### Modelos (Models)
Define os dados e regras de negócio:
- `Card.ts`: Modelo para cartas de baralho e funções relacionadas
- `Game.ts`: Estado do jogo e regras do Blackjack

### Controladores (Controllers)
Gerenciam o fluxo da aplicação:
- `GameController.ts`: Controlador principal que coordena o jogo
- `UIController.ts`: Gerencia a interface do usuário

### Serviços (Services)
Implementam a lógica de negócio:
- `DeckService.ts`: Gerencia operações com o baralho
- `GameService.ts`: Lógica central do jogo 
- `AnimationService.ts`: Controla animações e efeitos visuais

### Componentes (Components)
Elementos reutilizáveis da interface:
- `CardComponent.ts`: Componente para renderização de cartas
- `DeckComponent.ts`: Componente para o baralho visível

## Desenvolvimento Futuro

O sistema foi projetado para facilitar a adição de novos jogos de cassino no futuro, mantendo um código organizado e modular.
