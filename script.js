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
    "Помнишь, как ты пролила кофе на первом свидании? Я тогда понял — это любовь! ☕",
    "Тот самый случай, когда мы заблудились в трёх соснах, ища тот ресторан 🌲",
    "Твоё лицо, когда я пытаюсь забрать последнюю картошку фри 🍟",
    "Наше секретное кодовое слово, когда надо срочно уйти из гостей 😂",
    "2 года терпения моих глупых шуток — это тянет на медаль! 🥇",
    "Как мы под дождем бежали до автобуса и промокли до нитки, но было круто ☔"
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