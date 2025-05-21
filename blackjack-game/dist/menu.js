/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*********************!*\
  !*** ./src/menu.ts ***!
  \*********************/

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBcUQ7QUFDckQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUMvQyw0RUFBNEU7SUFDNUUsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFFNUUscURBQXFEO0lBQ3JELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDaEMsc0RBQXNEO1lBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFaEQsMENBQTBDO1lBQzFDLElBQUksUUFBUSxLQUFLLFdBQVcsRUFBRSxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7WUFDeEMsQ0FBQztZQUNELGdEQUFnRDtRQUNwRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXNpbm8tZ2FtZXMvLi9zcmMvbWVudS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcnF1aXZvIFR5cGVTY3JpcHQgcGFyYSBvIG1lbnUgZGUgZXNjb2xoYSBkZSBqb2dvc1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgLy8gT2J0ZXIgdG9kb3Mgb3MgY2FydMO1ZXMgZGUgam9nb3MgcXVlIG7Do28gZXN0w6NvIG1hcmNhZG9zIGNvbW8gXCJjb21pbmcgc29vblwiXHJcbiAgICBjb25zdCBnYW1lQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZS1jYXJkOm5vdCguY29taW5nLXNvb24pJyk7XHJcbiAgICBcclxuICAgIC8vIEFkaWNpb25hciBldmVudCBsaXN0ZW5lcnMgcGFyYSBjYWRhIGNhcnTDo28gZGUgam9nb1xyXG4gICAgZ2FtZUNhcmRzLmZvckVhY2goY2FyZCA9PiB7XHJcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gT2J0ZXIgbyBub21lIGRvIGpvZ28gYSBwYXJ0aXIgZG8gYXRyaWJ1dG8gZGF0YS1nYW1lXHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWVOYW1lID0gY2FyZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2FtZScpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVkaXJlY2lvbmFyIHBhcmEgbyBqb2dvIGNvcnJlc3BvbmRlbnRlXHJcbiAgICAgICAgICAgIGlmIChnYW1lTmFtZSA9PT0gJ2JsYWNramFjaycpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2luZGV4Lmh0bWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEFxdWkgdm9jw6ogcG9kZSBhZGljaW9uYXIgbWFpcyBqb2dvcyBubyBmdXR1cm9cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9