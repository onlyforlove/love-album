// ================= СЧЁТЧИК ВРЕМЕНИ =================

// 1. Укажи здесь дату ваших отношений! Формат: Год, Месяц (минус 1), День, Часы, Минуты
// ВАЖНО: В JavaScript месяцы считаются с 0. Январь = 0, Февраль = 1 ... Июнь = 5, и т.д.
// Например, если вы начали встречаться 15 июня 2024 года в 18:00:
const startDate = new Date(2024, 6, 16, 17, 0, 0); 

function updateCounter() {
    const now = new Date(); // Берем текущее время прямо сейчас
    const difference = now - startDate; // Получаем разницу в миллисекундах

    // Математическая магия перевода миллисекунд в привычные нам величины:
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    // Находим элементы на странице и заменяем в них цифры
    document.getElementById('days').textContent = days;
    // Обертка String().padStart(2, '0') нужна, чтобы вместо "5 секунд" показывало "05 секунд"
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Запускаем функцию один раз сразу при загрузке, чтобы не было задержки
updateCounter();

// Говорим браузеру: "Запускай эту функцию каждые 1000 миллисекунд (то есть каждую секунду)"
setInterval(updateCounter, 1000);

// ================= КОНЕЦ СЧЁТЧИКА =================

// 1. Исходный список мемов (он остается неизменным)
const memes = [
    "Это море!?🌊",
    "Не, завтра😅",
    "Скажи тутулуту🤪",
    "Абсент зло😈",
    "Более-менее🙃",
];

// 2. Создаем "рабочую колоду", копируя элементы из основного списка
// Слово let вместо const означает, что эту переменную мы сможем перезаписывать
let availableMemes = [...memes];

const memeButton = document.getElementById('meme-button');
const memeText = document.getElementById('meme-text');

memeButton.addEventListener('click', function() {
    // Если все мемы закончились (колода пустая), наполняем её заново
    if (availableMemes.length === 0) {
        availableMemes = [...memes];
    }
    
    // Выбираем случайный индекс, но уже из ОСТАВШИХСЯ мемов
    const randomIndex = Math.floor(Math.random() * availableMemes.length);
    
    // Достаем этот мем
    const randomMeme = availableMemes[randomIndex];
    
    // Выводим его на экран
    memeText.textContent = randomMeme;
    
    // Магия: удаляем этот использованный мем из рабочей колоды, 
    // чтобы он больше не выпал, пока колода не опустеет полностью
    availableMemes.splice(randomIndex, 1);
});
// ================= ФОТОГАЛЕРЕЯ (СЛАЙДЕР) =================

// 1. Находим все слайды и кнопки
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentSlide = 0; // Номер фотки, которая показывается сейчас (считаем с нуля)

// 2. Функция, которая переключает слайды
function showSlide(index) {
    // Сначала убираем класс active у текущей фотки (прячем её)
    slides[currentSlide].classList.remove('active');
    
    // ХИТРАЯ МАТЕМАТИКА:
    // Если мы дошли до конца и жмем "вперед", возвращаемся к 0.
    // Если мы на первой фотке и жмем "назад", прыгаем на самую последнюю.
    currentSlide = (index + slides.length) % slides.length;
    
    // Добавляем класс active новой фотке (показываем её)
    slides[currentSlide].classList.add('active');
}

// 3. Вешаем событие клика на кнопку "Вперед"
nextBtn.addEventListener('click', function() {
    showSlide(currentSlide + 1);
});

// 4. Вешаем событие клика на кнопку "Назад"
prevBtn.addEventListener('click', function() {
    showSlide(currentSlide - 1);
});
// ================= ЛИСТАНИЕ СЛАЙДОВ АЛЬБОМА =================

// Находим наши слайды-страницы и главные кнопки
const albumPages = document.querySelectorAll('.album-page');
const mainPrevBtn = document.getElementById('main-prev-btn');
const mainNextBtn = document.getElementById('main-next-btn');

let currentGridPage = 0; // Номер текущего слайда (0 — первый, 1 — второй)

function showAlbumPage(index) {
    // Скрываем текущую страницу
    albumPages[currentGridPage].classList.remove('active-page');
    
    // Хитрый переход по кругу (если дошли до конца — кидает в начало)
    currentGridPage = (index + albumPages.length) % albumPages.length;
    
    // Показываем новую страницу
    albumPages[currentGridPage].classList.add('active-page');
}

// Вешаем события на нижние кнопки
mainNextBtn.addEventListener('click', function() {
    showAlbumPage(currentGridPage + 1);
});

mainPrevBtn.addEventListener('click', function() {
    // 🛡️ УЧТЕНО: Переключаем назад только если страница КРУПНЕЕ первой (индекс больше 0)
    if (currentGridPage > 0) {
        showAlbumPage(currentGridPage - 1);
    }
});
// ================= ЛОГИКА ДЛЯ СПОЙЛЕРОВ (СЛАЙД 3) =================

const spoilerTriggers = document.querySelectorAll('.spoiler-trigger');

spoilerTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
        // Находим родительский элемент (.spoiler-item)
        const parent = this.parentElement;
        
        // Переключаем класс 'open' (если его нет — добавит, если есть — уберёт)
        parent.classList.toggle('open');
        
        // Меняем стрелочку в зависимости от того, открыт спойлер или закрыт
        if (parent.classList.contains('open')) {
            this.innerHTML = this.innerHTML.replace('🔽', '🔼');
        } else {
            this.innerHTML = this.innerHTML.replace('🔼', '🔽');
        }
    });
});
// ================= ЛОГИКА ДЛЯ ФЛИП-КАРТОЧЕК (СЛАЙД 4) =================

const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
    card.addEventListener('click', function() {
        // Переключаем класс flipped: если нажали — перевернулась, нажали еще раз — вернулась обратно
        this.classList.toggle('flipped');
    });
});
// ================= ЛОГИКА ДЛЯ СКАНЕРА ЛЮБВИ (СЛАЙД 5) =================
const loveScanner = document.getElementById('love-scanner');
const scannerStatus = document.getElementById('scanner-status');
const scannerResult = document.getElementById('scanner-result');
const scannerContainer = document.querySelector('.scanner-container');

let scannerTimeouts = []; // Массив для хранения таймеров (чтобы сбрасывать при отпускании)
let isScanComplete = false; // Флаг: завершено ли сканирование успешно

if (loveScanner) {
    // Функция активации при ЗАЖАТИИ кнопки
    function startScan(e) {
        e.preventDefault(); // Защита от лишних свайпов и выделений на смартфонах
        if (isScanComplete) return; // Если уже успешно отсканировали — выходим

        loveScanner.classList.add('scanning');
        if (scannerStatus) {
            scannerStatus.classList.add('active');
            scannerStatus.style.display = 'block';
            scannerStatus.innerText = "Инициализация био-датчиков... 7%";
        }

        // Чистим старые таймеры на всякий пожарный
        clearScannerTimeouts();

        // Цепочка шагов возвращена на полные 10 секунд удержания
        scannerTimeouts.push(setTimeout(() => { if (scannerStatus) scannerStatus.innerText = "Сканирование линии жизни... 24% счастья"; }, 1800));
        scannerTimeouts.push(setTimeout(() => { if (scannerStatus) scannerStatus.innerText = "Анализ пульса и теплоты рук... 43% счастья"; }, 3800));
        scannerTimeouts.push(setTimeout(() => { if (scannerStatus) scannerStatus.innerText = "Проверка искренности улыбки... 65% счастья"; }, 5800));
        scannerTimeouts.push(setTimeout(() => { if (scannerStatus) scannerStatus.innerText = "Подсчёт общего уровня счастья... 87% счастья"; }, 7600));
        scannerTimeouts.push(setTimeout(() => { if (scannerStatus) scannerStatus.innerText = "ВНИМАНИЕ: Превышение норм... 99% счастья"; }, 9000));

        // Финальный "взрыв" ровно на 10-й секунде удержания
        scannerTimeouts.push(setTimeout(() => {
            isScanComplete = true; // Фиксируем окончательную победу
            if (loveScanner) loveScanner.classList.remove('scanning');
            if (scannerStatus) scannerStatus.style.display = 'none';
            
            if (scannerResult) {
                scannerResult.innerHTML = `⚠️ СИСТЕМНАЯ ОШИБКА ⚠️<br>Уровень счастья превысил лимит шкалы!<br>❤️ <span class="infinity-highlight">БЕСКОНЕЧНО</span> ❤️`;
                scannerResult.style.opacity = "1";
                scannerResult.style.transform = "scale(1)";
                scannerResult.classList.add('show');
            }
            
            const icon = loveScanner ? loveScanner.querySelector('.scanner-icon') : null;
            if (icon) icon.innerText = '❤️‍🔥';
            
            if (scannerContainer) {
                scannerContainer.classList.add('boom-shake');
                for (let i = 0; i < 200; i++) {
                    createScannerParticle();
                }
            }
        }, 10000));
    }

    // Функция ОТМЕНЫ, если палец убрали раньше времени
    function cancelScan() {
        if (isScanComplete) return; // Если сканирование уже завершено, прерывать нельзя

        clearScannerTimeouts();
        loveScanner.classList.remove('scanning');
        
        if (scannerStatus) {
            scannerStatus.innerText = "Сканирование прервано! Держи палец до конца... 📲";
        }
    }

    function clearScannerTimeouts() {
        scannerTimeouts.forEach(t => clearTimeout(t));
        scannerTimeouts = [];
    }

    // Универсальные Pointer-события (мышь на ПК + тач на телефонах)
    loveScanner.addEventListener('pointerdown', startScan);
    loveScanner.addEventListener('pointerup', cancelScan);
    loveScanner.addEventListener('pointerleave', cancelScan); // Если увели палец/курсор за пределы кнопки
}

function createScannerParticle() {
    if (!scannerContainer) return;
    const particle = document.createElement('span');
    particle.classList.add('scan-particle');
    
    const emojiPool = ['❤️', '💖', '✨', '💕', '🥰', '🌸', '💥'];
    particle.innerText = emojiPool[Math.floor(Math.random() * emojiPool.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 300;
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const r = Math.random() * 360;

    particle.style.setProperty('--x', `${x}px`);
    particle.style.setProperty('--y', `${y}px`);
    particle.style.setProperty('--r', `${r}deg`);
    
    particle.style.left = '50%';
    particle.style.top = '30%';
    particle.style.marginLeft = '-15px';
    
    scannerContainer.appendChild(particle);
    
    setTimeout(() => { particle.remove(); }, 4000);
}
// =============================================================================
// ИГРОВОЙ ДВИЖОК "СПАСЕНИЕ ЛЮБВИ" (ВЕРСИЯ С РАСШИРЕННЫМИ ПРЕПЯТСТВИЯМИ)
// =============================================================================

const gameBox = document.getElementById('game-box');
const player = document.getElementById('game-player');
const obstacle = document.getElementById('game-obstacle');
const savior = document.getElementById('game-savior');
const overlay = document.getElementById('game-overlay');
const overlayText = document.getElementById('overlay-text');
const startBtn = document.getElementById('game-start-btn');
const scoreDisplay = document.getElementById('game-score');
const livesDisplay = document.getElementById('game-lives');

// Игровые параметры
let playerY = 120;
let velocity = 0;
let gravity = 0.07;         
let jumpStrength = -2.2;    
let obstacleX = 350;
         
let obstacleY = 100;
let obstacleSpeed = 1.4;    

let score = 0;
let lives = 5; 
let isPlaying = false;
let isSaving = false; 
let gameLoopId = null;
let canClickRestart = true; // Флаг-защита от случайного пропуска экрана

const problemsPool = ['Дедлайн', 'Учёба', 'Бытовуха', 'Стресс', 'Грустинка', 'Усталость', 'Отчаяние', 'Тильт'];

// 💬 Твой пул фраз
const saviorPhrases = [
    "Я рядом! ❤️",
    "Ты не один! 😘",
    "Ну ты чего, зай? 💖",
    "Я с тобой! 💞",
    "Я в тебя верю, ты сможешь! ✨",
    "Люблю тебя! 💕",
];

if (startBtn) {
    startBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Чтобы клик по кнопке не вызвал прыжок птички сразу после старта
        
        if (!canClickRestart) return; 
        
        resetGame();
        startGame();
    });
}

if (gameBox) {
    gameBox.addEventListener('click', function() {
        if (isPlaying && !isSaving) {
            velocity = jumpStrength;
        }
    });
}

function startGame() {
    isPlaying = true;
    overlay.style.display = 'none';
    gameLoop();
}

function resetGame() {
    playerY = 120;
    velocity = 0;
    obstacleX = 350;
    score = 0;
    lives = 5; 
    isSaving = false;
    if (scoreDisplay) scoreDisplay.innerText = `Счёт: 0 / 5`;
    if (livesDisplay) livesDisplay.innerText = '❤️❤️❤️❤️❤️'; 
    updateObstacleType();
}

function updateObstacleType() {
    if (obstacle) {
        obstacle.innerText = problemsPool[Math.floor(Math.random() * problemsPool.length)];
        obstacleY = 20 + Math.random() * 160; 
        obstacle.style.top = obstacleY + 'px';
    }
}

function gameLoop() {
    if (!isPlaying) return;

    if (!isSaving) {
        velocity += gravity;
        playerY += velocity;
        
        if (playerY < 0) playerY = 0;
        if (playerY > 242) { 
            triggerCollision();
        }
        
        if (player) player.style.top = playerY + 'px';

        obstacleX -= obstacleSpeed;
        if (obstacleX < -85) { // 👈 Учли новую ширину, чтобы объект плавно уходил за левый край полностью
            obstacleX = 350; 
            score++;
            if (scoreDisplay) scoreDisplay.innerText = `Счёт: ${score} / 5`;
            
            if (score >= 5) {
                endGame(true);
                return;
            }
            updateObstacleType();
        }
        if (obstacle) obstacle.style.left = obstacleX + 'px';

        if (checkCollision()) {
            triggerCollision();
        }
    }

    gameLoopId = requestAnimationFrame(gameLoop);
}

// Расчет столкновения с учетом новой ширины
function checkCollision() {
    const pLeft = 40;
    const pRight = 78;
    const pTop = playerY;
    const pBottom = playerY + 38;

    const oLeft = obstacleX;
    const oRight = obstacleX + 85; // 👈 УВЕЛИЧЕНО С 45 ДО 85! Теперь физическое тело совпадает с новым размером
    const oTop = obstacleY;
    const oBottom = obstacleY + 70; 

    return !(pRight < oLeft || pLeft > oRight || pBottom < oTop || pTop > oBottom);
}

function triggerCollision() {
    lives--;
    
    if (livesDisplay) {
        livesDisplay.innerText = '❤️'.repeat(lives) + '🖤'.repeat(5 - lives);
    }

    if (lives <= 0) {
        endGame(false);
    } else {
        isSaving = true;
        velocity = 0;
        
        const bubble = savior ? savior.querySelector('.savior-bubble') : null;
        
        if (savior) {
            if (bubble) {
                const randomPhrase = saviorPhrases[Math.floor(Math.random() * saviorPhrases.length)];
                bubble.innerText = randomPhrase;
                bubble.classList.add('active');
            }
            savior.style.bottom = '15px'; 
        }
        
        setTimeout(() => {
            playerY = 100; 
            if (player) player.style.top = playerY + 'px';
            obstacleX = 350;
            if (obstacle) obstacle.style.left = obstacleX + 'px';
            updateObstacleType();
        }, 900);

        setTimeout(() => {
            if (savior) {
                savior.style.bottom = '-75px'; 
                if (bubble) bubble.classList.remove('active'); 
            }
            isSaving = false;
        }, 1700);
    }
}

function endGame(isWin) {
    isPlaying = false;
    cancelAnimationFrame(gameLoopId);
    overlay.style.display = 'flex';
    
    canClickRestart = false;
    if (startBtn) startBtn.classList.add('cooldown');
    
    setTimeout(() => {
        canClickRestart = true;
        if (startBtn) startBtn.classList.remove('cooldown');
    }, 1200); 
    
    if (isWin) {
        overlayText.innerHTML = `🎉 ПОБЕДА!<br><br>С твоей поддержкой мне не страшны никакие угрозы.<br>Ты — моя главная поддержка! 🥰`;
        if (startBtn) startBtn.innerText = "Пройти заново ✨";
    } else {
        overlayText.innerHTML = `Упс... Проблемы одолели! 😢<br><br>Но ничего, вместе мы попробуем еще раз!`;
        if (startBtn) startBtn.innerText = "Попробовать заново 🔄";
    }
}
const introScreen = document.getElementById('intro-screen');
const openAlbumBtn = document.getElementById('open-album-btn');
const openingMessage = document.getElementById('opening-message');
const storyStart = document.getElementById('story-start');
const albumElements = [
    document.querySelector('header'),
    document.querySelector('main'),
    document.querySelector('.slides-navigation'),
    document.querySelector('footer')
];
const messages = [
    "❤️ Открываем воспоминания...",
    "💕 Загружаем счастливые моменты...",
    "💖 Проверяем уровень любви...",
    "✨ Готово!"
];


openAlbumBtn.addEventListener('click', () => {

    openAlbumBtn.style.display = 'none';

    openingMessage.classList.add('show');

    let currentMessage = 0;

    openingMessage.textContent =
        messages[currentMessage];

    const interval = setInterval(() => {

        currentMessage++;

        if (currentMessage < messages.length) {

            openingMessage.style.opacity = 0;

            setTimeout(() => {

                openingMessage.textContent =
                    messages[currentMessage];

                openingMessage.style.opacity = 1;

            }, 250);

        } else {

            clearInterval(interval);

            // показываем экран "Наша история"
            storyStart.classList.add('show');

            // убираем заставку
            setTimeout(() => {
                introScreen.classList.add('hidden');
            }, 300);

            // показываем альбом
            setTimeout(() => {
                albumElements.forEach(el => {
                    if (el) {
                        el.classList.add('album-visible');
                    }
                });

                const overlay = document.querySelector('.first-photo-overlay');

                if (overlay) {
                    overlay.classList.remove('play-intro');

                    void overlay.offsetWidth;

                    overlay.classList.add('play-intro');
                }

            }, 700);

            // убираем надпись
            setTimeout(() => {
                storyStart.classList.remove('show');
            }, 1200);
        }

    }, 1000);
});