// Генерируем случайное число от 1 до 100
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0; // Счетчик попыток

// Получаем ссылки на HTML-элементы
const guessInput = document.getElementById('guessInput');
const checkButton = document.getElementById('checkButton');
const messageDisplay = document.getElementById('message');

// --- ИЗМЕНЕНИЯ ЗДЕСЬ: Обновленные слушатели для поля ввода ---

// 1. Запрещаем ввод нецифровых символов (включая 'e', 'E', '+', '-') при наборе
guessInput.addEventListener('keydown', function(event) {
    // Разрешаем: цифры (0-9), стрелки, Backspace, Delete, Tab, Enter
    // Коды клавиш могут отличаться, но event.key более надежен
    if (
        !/[0-9]/.test(event.key) && // Если не цифра
        event.key !== 'Backspace' &&
        event.key !== 'Delete' &&
        event.key !== 'ArrowLeft' &&
        event.key !== 'ArrowRight' &&
        event.key !== 'Tab' &&
        event.key !== 'Enter'
    ) {
        event.preventDefault(); // Отменяем ввод символа
    }
});

// 2. Дополнительная очистка на случай вставки текста или других аномалий
guessInput.addEventListener('input', function() {
    // Удаляем все символы, кроме цифр, включая 'e', '+', '-'
    this.value = this.value.replace(/[^0-9]/g, '');
});

// --- КОНЕЦ ИЗМЕНЕНИЙ ---

// Добавляем обработчик события на кнопку "Проверить"
checkButton.addEventListener('click', checkGuess);

// Функция для проверки догадки игрока
function checkGuess() {
    // parseFloat вместо parseInt, чтобы точно обработать любые возможные числовые форматы,
    // хотя мы уже очищаем ввод от не-цифр.
    const userGuess = parseFloat(guessInput.value);

    // Проверяем, является ли ввод числом и находится ли он в диапазоне
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageDisplay.textContent = 'Пожалуйста, введите целое число от 1 до 100.';
        messageDisplay.style.color = '#dc3545';
        return;
    }

    attempts++;

    if (userGuess === secretNumber) {
        messageDisplay.textContent = `Поздравляю! Ты угадал число ${secretNumber} за ${attempts} попыток!`;
        messageDisplay.style.color = '#28a745';
        guessInput.disabled = true;
        checkButton.disabled = true;
    } else if (userGuess < secretNumber) {
        messageDisplay.textContent = 'Загаданное число больше. Попробуй еще раз!';
        messageDisplay.style.color = '#ffc107';
    } else {
        messageDisplay.textContent = 'Загаданное число меньше. Попробуй еще раз!';
        messageDisplay.style.color = '#ffc107';
    }
    guessInput.value = '';
    guessInput.focus();
}

// Обработка нажатия Enter в поле ввода
guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Мы уже фильтруем символы выше, так что здесь можно просто вызывать checkGuess
        checkGuess();
    }
});
