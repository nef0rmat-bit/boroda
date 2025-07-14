// Генерируем случайное число от 1 до 100
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0; // Счетчик попыток

// Получаем ссылки на HTML-элементы
const guessInput = document.getElementById('guessInput');
const checkButton = document.getElementById('checkButton');
const messageDisplay = document.getElementById('message');

// Добавляем обработчик события на кнопку "Проверить"
checkButton.addEventListener('click', checkGuess);

// Функция для проверки догадки игрока
function checkGuess() {
    const userGuess = parseInt(guessInput.value); // Получаем число из поля ввода

    // Проверяем, является ли ввод числом и находится ли он в диапазоне
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageDisplay.textContent = 'Василич блеать, введите ЦЕЛОЕ(Единое, ПОЛОЖИТЕЛЬНОЕ, без знаков +/- и прочего говна)число от 1 до 100.';
        messageDisplay.style.color = '#dc3545'; // Красный для ошибки
        return; // Выходим из функции
    }

    attempts++; // Увеличиваем счетчик попыток

    if (userGuess === secretNumber) {
        messageDisplay.textContent = `Поздравляю! Ты угадал число ${secretNumber} за ${attempts} попыток!`;
        messageDisplay.style.color = '#28a745'; // Зеленый для успеха
        guessInput.disabled = true; // Отключаем поле ввода
        checkButton.disabled = true; // Отключаем кнопку
    } else if (userGuess < secretNumber) {
        messageDisplay.textContent = 'Загаданное число больше. Попробуй еще раз!';
        messageDisplay.style.color = '#ffc107'; // Желтый
    } else {
        messageDisplay.textContent = 'Загаданное число меньше. Попробуй еще раз!';
        messageDisplay.style.color = '#ffc107'; // Желтый
    }
    guessInput.value = ''; // Очищаем поле ввода после каждой попытки
    guessInput.focus(); // Возвращаем фокус на поле ввода
}

// Дополнительно: обработка нажатия Enter в поле ввода
guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});
