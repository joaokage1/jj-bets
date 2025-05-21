const fs = require('fs');
const path = require('path');

/**
 * Script para copiar arquivos estáticos para a pasta dist
 */

// Função para criar um diretório se não existir
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Criado diretório: ${dirPath}`);
    }
}

// Função para copiar arquivos
function copyFile(source, destination) {
    try {
        fs.copyFileSync(source, destination);
        console.log(`Copiado: ${source} → ${destination}`);
    } catch (err) {
        console.error(`Erro ao copiar ${source}: ${err.message}`);
    }
}

// Criar diretórios necessários
ensureDirectoryExists('./dist/styles');
ensureDirectoryExists('./dist/assets');

// Copiar arquivos HTML
copyFile('./src/index.html', './dist/index.html');
copyFile('./src/menu.html', './dist/menu.html');

// Copiar arquivos SVG
copyFile('./src/assets/blackjack-thumbnail.svg', './dist/assets/blackjack-thumbnail.svg');
copyFile('./src/assets/coming-soon.svg', './dist/assets/coming-soon.svg');

// Lista de arquivos CSS a serem copiados
const cssFiles = [
    'menu.css', 
    'svg-fixes.css', 
    'fallbacks.css', 
    'svg-browser-fixes.css', 
    'image-centering.css', 
    'mobile-fixes.css',
    'card-deck.css',
    'card-animations.css',
    'styles.css',
    'button-animations.css',
    'image-improvements.css'
];

// Copiar arquivos CSS
cssFiles.forEach(file => {
    const sourcePath = path.join('./src/styles', file);
    const destPath = path.join('./dist/styles', file);
    
    if (fs.existsSync(sourcePath)) {
        copyFile(sourcePath, destPath);
    } else {
        console.warn(`Aviso: ${file} não encontrado em src/styles`);
    }
});

// Lista de scripts JavaScript auxiliares a serem copiados
const jsFiles = [
    'svgHelper.js', 
    'preloadSvg.js', 
    'inlineSvg.js'
];

// Copiar arquivos JavaScript
jsFiles.forEach(file => {
    const sourcePath = path.join('./src', file);
    const destPath = path.join('./dist', file);
    
    if (fs.existsSync(sourcePath)) {
        copyFile(sourcePath, destPath);
    } else {
        console.warn(`Aviso: ${file} não encontrado em src`);
    }
});

console.log('Todos os arquivos estáticos foram copiados com sucesso!');
