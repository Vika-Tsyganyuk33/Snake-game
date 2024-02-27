// 1. Поле 20*20 ячеек
// 2. Змейка длина по умолчанию 5 ячеек
// 3. Змейка "отгрызает" хвост если нашла на себя
// 4. На поле 1 ячейка еды (генерируется в случайном месте после того как была съедена)
// 5. Очки считаются так: +10 если съел еду -20 за каждый откушенный хвост
// 6. Условия победы: набрано 100 очков или змейка заняла все поле
// 7. Условие проигрыша: очков стало меньше 0 или змейка стала меньше 5 ячеек в длину.

let snakeLength = 5;
let snake = [];
let score = 0;
let winScore = 100;
toAddEat();
toShowScore();
let snakeField = document.querySelector('.snake_field');
snakeField.addEventListener('mouseover', toGoSnake);
function toGoSnake(event){
    if(event.target.classList.contains('snake')){ //откусить хвост
        let indexToDel = snake.indexOf(event.target, 0);
        let tailToDel = snake.splice(0, indexToDel+1);
        tailToDel.forEach(item => item.classList.remove('snake'));
        score -= 20; //кол-во
        toShowScore();
    }
    snake.push(event.target);
    event.target.classList.add('snake');
    if(snake.length > snakeLength){
        snake[0].classList.remove('snake');
        snake.shift();
    }
    if(event.target.classList.contains('eat')){
        toEat(event.target);
    }
}


function toAddEat(){
    let cells = document.querySelectorAll('.field_1:not(.snake, .eat, .stone)');
    let eatIndex = getRandomInt(0, cells.length);
    cells[eatIndex].classList.add('eat');
}

function toEat (eat){
    eat.classList.remove('eat');
    toAddEat();
    score+=10;
    snakeLength++;
    toShowScore();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}


// function toShowScore(){
//     let scoreSpan = document.querySelector('.score');
//     scoreSpan.innerText = score;
// }



function toWin(){
    snakeField.insertAdjacentHTML('afterbegin', `<div class="pop_up">
    <p class="p">Победа!</p>
    <p class="p_1">Набрано: <span class="total_score">${score}</span> очков.</p>
    <button onclick='window.location.reload(true)' class="restart">Начать заново</button></div>`);
    snakeField.removeEventListener('mouseover', toGoSnake);
}


function toLoose(){
    snakeField.insertAdjacentHTML('afterbegin', `<div class="pop_up"> 
    <p>Ты проиграл, попробуй ещё!</p>
    <p>Набрано: <span class="total_score">${score}</span> очков.</p>
    <button onclick='window.location.reload(true)' class="restart">Начать заново</button>
</div>`);
snakeField.removeEventListener('mouseover', toGoSnake);
}


// let restart = restart.window.location.reload();


function toShowScore(){
    let scoreText = document.querySelector('.score');
    if(score >= winScore){
        toWin();
    }else if(score < 0){
        toLoose();
    }else{
        scoreText.innerHTML = score;
    }
}