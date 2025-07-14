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
        messageDisplay.textContent = 'Если ты не Пельдорас и не Тауренская сволота напиши число от 1 до 100(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100)!';
        messageDisplay.style.color = '#dc3545'; // Красный для ошибки
        return; // Выходим из функции
    }

    attempts++; // Увеличиваем счетчик попыток

    if (userGuess === secretNumber) {
        messageDisplay.textContent = `Поздравляю! Ты угадал количество пЕздюлей ${secretNumber} за ${attempts} попыток!`;
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
