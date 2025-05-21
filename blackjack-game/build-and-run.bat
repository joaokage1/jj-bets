@echo off
echo Building Casino Games TypeScript Project
cd %~dp0
call npx webpack
node copy-static.js
echo Build completed!
echo Starting server on http://localhost:3000
echo Acesse o navegador em http://localhost:3000 para ver o menu de jogos
node server.js
