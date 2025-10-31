// Оптимизированный матричный эффект
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let animationId;
let columns;
let drops = [];
let speeds = [];
const chars = '01BITKILLERS!@#$%&*';
const charArray = chars.split('');
const fontSize = 16;

// Оптимизация: предварительный расчет
let lastTime = 0;
const fps = 30;
const fpsInterval = 1000 / fps;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    
    // Переинициализация капель при изменении размера
    drops = [];
    speeds = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -canvas.height;
        speeds[i] = Math.random() * 8 + 4;
    }
}

// Упрощенная матрица для мобильных устройств
function isMobile() {
    return window.innerWidth <= 768;
}

function drawMatrix(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const elapsed = timestamp - lastTime;
    
    if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = `bold ${fontSize}px 'Courier New', monospace`;

        // Упрощение для мобильных - меньше символов
        const maxColumns = isMobile() ? Math.min(columns, 40) : columns;
        
        for (let i = 0; i < maxColumns; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            const x = i * fontSize;
            const y = drops[i];
            
            // Оптимизация: меньше эффектов свечения
            if (Math.random() > 0.8 && !isMobile()) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ff0000';
            }
            
            ctx.fillText(text, x, y);
            ctx.shadowBlur = 0;
            
            if (drops[i] > canvas.height && Math.random() > 0.95) {
                drops[i] = -fontSize;
                speeds[i] = Math.random() * 8 + 4;
            }
            drops[i] += speeds[i];
        }
    }
    
    animationId = requestAnimationFrame(drawMatrix);
}

// Создание энергетических эффектов
function createEnergyCrackles() {
    const container = document.getElementById('crackleContainer');
    const crackleCount = isMobile() ? 8 : 15;
    
    for (let i = 0; i < crackleCount; i++) {
        const crackle = document.createElement('div');
        crackle.className = 'crackle-line';
        crackle.style.top = Math.random() * 100 + '%';
        crackle.style.left = Math.random() * 100 + '%';
        crackle.style.width = (Math.random() * 200 + 100) + 'px';
        crackle.style.animationDelay = Math.random() * 3 + 's';
        crackle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(crackle);
    }
}

// Оптимизированные интерактивные эффекты
let mouseX = 0;
let mouseY = 0;
let rafId;

function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!rafId) {
        rafId = requestAnimationFrame(updateLogoPosition);
    }
}

function updateLogoPosition() {
    const logo = document.querySelector('.logo');
    const x = (mouseX / window.innerWidth - 0.5) * 20;
    const y = (mouseY / window.innerHeight - 0.5) * 20;
    
    logo.style.transform = `skew(-5deg) translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
    
    rafId = null;
}

// Упрощенные глитч-эффекты
function startGlitchEffects() {
    setInterval(() => {
        const logo = document.querySelector('.logo-text');
        const originalTransform = logo.style.transform;
        
        // Быстрый глитч
        logo.style.transform = originalTransform + ' translateX(' + (Math.random() * 10 - 5) + 'px)';
        
        setTimeout(() => {
            logo.style.transform = originalTransform;
        }, 50);
    }, 5000);
}

// Инициализация
function init() {
    resizeCanvas();
    createEnergyCrackles();
    startGlitchEffects();
    
    // События
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    
    // Запуск матрицы
    animationId = requestAnimationFrame(drawMatrix);
}

// Запуск при загрузке
window.addEventListener('load', init);

// Очистка при разгрузке
window.addEventListener('beforeunload', () => {
    if (animationId) cancelAnimationFrame(animationId);
    if (rafId) cancelAnimationFrame(rafId);
});