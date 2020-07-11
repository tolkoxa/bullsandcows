let firstStart = true;
let firstCheck = 1;
let htmlStr = '';
let icount = 1;
let pcNumbArr = [];
let testArrFacts = [];


async function getJson() {
    let response = await fetch('./json/facts.json');
    let content = await response.json();
    let factNumb = startGame.randomizer(Object.keys(content).length);

    while (testArrFacts.indexOf(factNumb) != -1) {
        factNumb = startGame.randomizer(Object.keys(content).length);
        if (testArrFacts.length == Object.keys(content).length) {
            testArrFacts = [];
        };
    }

    document.querySelector('#fact-numb').innerHTML = '';
    document.querySelector('#fact-text').innerHTML = '';

    let factText = content[factNumb];
    testArrFacts.push(factNumb);
    factNumb++;
    startGame.renderFact(factNumb, factText);

};

class mainGame {
    constructor(firstStart = true, firstCheck = 1) {
            this.firstStart = firstStart;
            this.firstCheck = firstCheck;
            this._init();
        }
        //Инициализация
    _init() {
            document.querySelector('.inputs-all').addEventListener("change", (evt) => {
                this.checkChange(evt.target.dataset.change)
            });

            this.sendMsgFooter();
        }
        //Нажимаем на кнопку "Проверить"
    clickButton() {
            firstStart ? (firstCheck = 1) : (firstCheck = 0);
            let uNumb1 = document.getElementById('input1');
            let uNumb2 = document.getElementById('input2');
            let uNumb3 = document.getElementById('input3');
            let uNumb4 = document.getElementById('input4');

            let userNumbers = [uNumb1.value, uNumb2.value, uNumb3.value, uNumb4.value];
            startGame.mainPlay(userNumbers);
        }
        //Генератор случайных чисел (для числа компьютера, для фактов)
    randomizer(i) {
        return Math.floor(Math.random() * i);
    }

    //Формирую массив случайных чисел компьютера
    compNumb() {
        let numb;
        let compNumbArr = [];
        while (compNumbArr.length < 4) {
            numb = this.randomizer(10);
            if (compNumbArr.length == 0 && numb === 0) {
                return;
            } else {
                if (compNumbArr.indexOf(numb) === -1) {
                    compNumbArr.push(numb);
                }
            }
        }
        return compNumbArr;
    }

    //Проверка пользователя на количество игр
    checkUserTry(userTryArr, compNumbArr) {
        let bulls = 0;
        let cows = 0;

        userTryArr.forEach((num, i) => {
            if (+num === compNumbArr[i]) {
                bulls++;
            } else if (compNumbArr.indexOf(+num) >= 0) {
                cows++;
            }
        });

        if (bulls == 4) {
            this.userWin(compNumbArr, icount);
            firstStart = true;
        } else if (icount == 10) {
            this.userLost(compNumbArr);
            firstStart = true;
        }
        let bullscows = [bulls, cows];
        return bullscows;
    }

    //
    mainPlay(userArr) {
        if (firstStart) {
            pcNumbArr = this.compNumb();
            firstStart = false;
            let dynamicBlock = document.getElementById('instruction');
            dynamicBlock.classList.add('invisible__block');
        }
        //вывод загаданного числа в консоль
        console.log(pcNumbArr);
        let bcArr = this.checkUserTry(userArr, pcNumbArr);

        this.render(bcArr, userArr);
        document.querySelector('.start-new-game__text').onclick = this.reStartGame;
    }

    //Ситуация, когда пользователь выиграл
    userWin(numbArr, count) {
            let modalWindowClass = "modal-window-win";
            let modalText;
            let word = '';
            if (count <= 4) {

                let alphabet = '1234567890abcdefghijklmnopqrstuvwxyz';

                for (let i = 0; i < 8; i++) {
                    word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
                }
                // console.log(word);

                modalText = `<div class="win-modal">
            <div class="close-modal"></div>
            <div class="quote">
                <div class="quote-texts quote-texts_money">
                    <p class="quote-text">О! Кто–то тут выиграл деньги.</p>
                    <p class="quote-text">Поздравляю.</p>
                </div>
                <div class="quote-head">
                    <img src="img/site/einstein.png" alt="einstein" width="150" height="161">
                </div>
            </div>
            <div class="result">
                <div class="result-text result-text_margin">Компьютер загадал число</div>
                <div class="result-number result-number_margin">${numbArr[0]}&nbsp;${numbArr[1]}&nbsp;${numbArr[2]}&nbsp;${numbArr[3]}</div>
            </div>
            <div class="money-text footer-text_margin">Чтобы получить деньги, заполни форму</div>
            <div class="money-footer">
                <div class="secret-block form-text_margin">
                    <p class="secret-text">Код верификации</p>
                    <p class="secret-code">${word}</p>
                </div>
                <div class="money-form">
                    <label class="form-text form-text_margin" for="ver-code">Код верификации</label>
                    <input class="form-input form-input_maring" type="text" id="ver-code">
                    <label class="form-text form-text_margin" for="user-name">Имя</label>
                    <input class="form-input form-input_maring" type="text" id="user-name">
                    <label class="form-text form-text_margin" for="user-phone">Телефон</label>
                    <input class="form-input" type="text"  id="user-phone">
                    <button class="form-btn form-btn_margin" id="btn-win">Отправить</button>
                </div>
            </div>
        </div>`;
            } else {
                modalText = `<div class="win-modal">
        <div class="close-modal"></div>
        <div class="quote">
            <div class="quote-texts">
                <p class="quote-text">Ого! Даже я с такого хода не отгадывал!</p>
                <p class="quote-text">Поздравляю.</p>
            </div>
            <div class="quote-head">
                <img src="img/site/einstein.png" alt="einstein" width="150" height="161">
            </div>
        </div>
        <div class="result">
            <div class="result-text result-text_margin">Компьютер загадал число</div>
            <div class="result-number result-number_margin">${numbArr[0]}&nbsp;${numbArr[1]}&nbsp;${numbArr[2]}&nbsp;${numbArr[3]}</div>
        </div>
        <div class="modal-footer">
            <p class="footer-text footer-text_margin">Теперь ты можешь</p>
            <div class="footer-links">
                <div class="footer-links__left">
                    <p class="footer__text" id="share"><a class="footer__text_link">Поделиться с друзьями</a></p>
                    <p class="footer__text" id="restartGame"><a class="footer__text_link">Попробовать ещё раз</a></p>
                    <p class="footer__text" id="games"><a class="footer__text_link">Посмотреть другие игры</a></p>
                </div>
                <div class="footer-links__right">
                    <p class="footer__text" id="thxDev"><a class="footer__text_link">Отблагодарить разработчика игры</a></p>
                    <p class="footer__text" id="feedback"><a class="footer__text_link">Написать свои пожелания и предложения</a></p>
                    <p class="footer__text" id="closeGame"><a class="footer__text_link">Закрыть и идти заниматься своими делами</a></p>
                </div>
            </div>
        </div>
    </div>`;
            }

            this.modalWindow(modalWindowClass, modalText, count, word);
        }
        //Ситуация, когда пользователь проиграл
    userLost(numbArr) {
        let modalWindowClass = "modal-window-lost";
        let modalText = `<div class="win-modal">
        <div class="close-modal close-modal_lost"></div>
        <div class="quote quote_lost">
            <div class="quote-head">
                <img src="img/site/wolf.png" alt="einstein" width="101" height="167">
            </div>
            <div class="quote-texts_lost">
                <p class="quote-text">Ты, это...</p>
                <p class="quote-text">Не растраивайся, если чё</p>
            </div>
        </div>
        <div class="result">
            <div class="result-text result-text_margin">Компьютер загадал число</div>
            <div class="result-number result-number_margin">${numbArr[0]}&nbsp;${numbArr[1]}&nbsp;${numbArr[2]}&nbsp;${numbArr[3]}</div>
        </div>
        <div class="modal-footer">
            <p class="footer-text footer-text_margin">Теперь ты можешь</p>
            <div class="footer-links">
                <div class="footer-links__left">
                    <p class="footer__text" id="share"><a class="footer__text_link">Поделиться с друзьями</a></p>
                    <p class="footer__text" id="restartGame"><a class="footer__text_link">Попробовать ещё раз</a></p>
                    <p class="footer__text" id="games"><a class="footer__text_link">Посмотреть другие игры</a></p>
                </div>
                <div class="footer-links__right">
                    <p class="footer__text" id="thxDev"><a class="footer__text_link">Отблагодарить разработчика игры</a></p>
                    <p class="footer__text" id="feedback"><a class="footer__text_link">Написать свои пожелания и предложения</a></p>
                    <p class="footer__text" id="closeGame"><a class="footer__text_link">Закрыть и идти заниматься своими делами</a></p>
                </div>
            </div>
        </div>
    </div>`;

        this.modalWindow(modalWindowClass, modalText);
    }

    //Возврат текущей даты (Дата: дд.мм. Время: 00:00)
    getCurrentDate() {
        let date = new Date();
        let minutes = date.getMinutes();
        let hourse = date.getHours();
        let day = date.getDate();
        let month = date.getMonth() + 1;

        if (minutes < 10) { minutes = `0${minutes}` };
        if (hourse < 10) { hourse = `0${hourse}` };
        if (date.getDate() < 10) { day = `0${date.getDate()}` };
        if (month < 10) { month = `0${month}` };

        return `Дата: ${day}.${month}. Время: ${hourse}:${minutes}`;
    }

    //Сбор данных для системного сообщения в телеграм, если человек отгадал число до 4–х ходов.
    sendUserData(word, count) {
        let currentDate = this.getCurrentDate();
        let fullStr = `Игра «Быки и коровы». Ход: ${count}. Секретный код: ${word}. ${currentDate}`;

        this.sendTelegram(fullStr);
    }

    //Отправляю в телеграм
    sendTelegram(str) {
        const ttt = '1053632637:AAFpFofkIShIvCnZF3vXH-fG0wX4u-ekmYQ';
        // let str = `Имя: ${name_f}, Данные для связи: ${data_f}`;
        let url = `https://api.tlgr.org/bot${ttt}/sendMessage?chat_id=80268845&text=`;
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", url + str, true);
        xhttp.send();
    }

    //Построение модального окна
    modalWindow(modalWindowType, modalStr, count, secretWord) {
        document.getElementById('overlay').classList.remove('invisible__block');
        document.getElementById('modal-window').classList.add(modalWindowType);
        if (count <= 4) {
            document.getElementById('modal-window').classList.add('modal-window-win_money');

        }
        document.getElementById('modal-window').classList.remove('invisible__block');
        document.querySelector('.modal-window-text').insertAdjacentHTML("afterbegin", modalStr);

        this.sendUserData(secretWord, count);

        document.querySelector('.close-modal').addEventListener('click', this.closeModal);


        document.getElementById('btn-win').addEventListener('click', () => {
            let verCode = document.getElementById('ver-code').value;
            let userName = document.getElementById('user-name').value;
            let userPhone = document.getElementById('user-phone').value;
            let currentDate = this.getCurrentDate();
            let fullStr = `Игра «Быки и коровы». Сообщение от пользователя. Ход: ${count}. Секретный код (система): ${secretWord}. Секретный код (пользователь): ${verCode}. Имя: ${userName}. Телефон: ${userPhone}. ${currentDate}`;

            this.sendTelegram(fullStr);
            document.querySelector('.modal-window-text').innerHTML = '';

            let strWinMoney = `<div class="win-modal">
            <div class="close-modal"></div>
            <div class="quote">
                <div class="quote-texts">
                    <p class="quote-text">Отлично!</p>
                    <p class="quote-text">Мы скоро позвоним.</p>
                </div>
                <div class="quote-head">
                    <img src="img/site/einstein.png" alt="einstein" width="150" height="161">
                </div>
            </div>
            <div class="modal-footer">
                <p class="footer-text footer-text_margin">Теперь ты можешь</p>
                <div class="footer-links">
                    <div class="footer-links__left">
                        <p class="footer__text" id="share"><a class="footer__text_link">Поделиться с друзьями</a></p>
                        <p class="footer__text" id="restartGame"><a class="footer__text_link">Попробовать ещё раз</a></p>
                        <p class="footer__text" id="games"><a class="footer__text_link">Посмотреть другие игры</a></p>
                    </div>
                    <div class="footer-links__right">
                        <p class="footer__text" id="thxDev"><a class="footer__text_link">Отблагодарить разработчика игры</a></p>
                        <p class="footer__text" id="feedback"><a class="footer__text_link">Написать свои пожелания и предложения</a></p>
                        <p class="footer__text" id="closeGame"><a class="footer__text_link">Закрыть и идти заниматься своими делами</a></p>
                    </div>
                </div>
            </div>
        </div>`

            document.querySelector('.modal-window-text').innerHTML = strWinMoney;
            document.querySelector('.close-modal').addEventListener('click', this.closeModal);
            document.getElementById('modal-window').classList.remove('modal-window-win_money');

        });

    }


    //Начать игру с самого начала
    reStartGame() {
            firstStart = true;
            firstCheck = 1;
            htmlStr = '';
            icount = 1;
            pcNumbArr = [];

            document.getElementById('overlay').classList.add('invisible__block');
            document.getElementById('modal-window').classList.add('invisible__block');
            document.getElementById('instruction').classList.remove('invisible__block');
            document.querySelector('.start-new-game__text').classList.add('invisible__block');
            document.getElementById('input1').placeholder = '0';
            document.getElementById('input2').placeholder = '0';
            document.getElementById('input3').placeholder = '0';
            document.getElementById('input4').placeholder = '0';

            let blocks = document.querySelectorAll(".result-check");
            blocks.forEach((num, index) => {
                blocks[index].classList.add('invisible__block');
            })

            document.getElementById('modal-window').innerHTML = "<div></div>";
            document.getElementById('dynamic-text').classList.remove('dynamic-text');

        }
        //Рендер основных элементов игры: количество ходов, числа в окнах (прошлые ходы)
    render(userTryDesc, userNumberArr) {
        let str = `<p class="result-check">${icount}.&nbsp;&nbsp;&nbsp;<span class="number__${userNumberArr[0]}">${userNumberArr[0]}&nbsp;&nbsp;</span><span class="number__${userNumberArr[1]}">${userNumberArr[1]}&nbsp;&nbsp;</span><span class="number__${userNumberArr[2]}">${userNumberArr[2]}&nbsp;&nbsp;</span><span class="number__${userNumberArr[3]}">${userNumberArr[3]}</span>&nbsp;&nbsp;&nbsp;${userTryDesc[0]}Б&nbsp;${userTryDesc[1]}К</p>`;

        document.getElementById('input1').value = '';
        document.getElementById('input2').value = '';
        document.getElementById('input3').value = '';
        document.getElementById('input4').value = '';

        document.getElementById('input1').placeholder = userNumberArr[0];
        document.getElementById('input2').placeholder = userNumberArr[1];
        document.getElementById('input3').placeholder = userNumberArr[2];
        document.getElementById('input4').placeholder = userNumberArr[3];

        icount++;
        document.getElementById('dynamic-text').insertAdjacentHTML("beforeend", str);

        if (icount == 4) {
            document.querySelector('.start-new-game__link').classList.remove('invisible__block');
            document.querySelector('.start-new-game__text').classList.remove('invisible__block');
            document.getElementById('dynamic-text').classList.add('dynamic-text');
        }
        if (icount > 1) {
            userNumberArr.forEach((num, i) => {

                let arrNumbOver = document.querySelectorAll(".number__" + userNumberArr[i]);
                arrNumbOver.forEach((num, index) => {
                    arrNumbOver[index].addEventListener('mouseover', () => {
                        let numbs = document.querySelectorAll(".number__" + userNumberArr[i]);
                        numbs.forEach((num, index) => {
                            numbs[index].style.background = '#b1b1b1';
                        });
                    }, true);

                    arrNumbOver[index].addEventListener('mouseout', () => {
                        let numbs = document.querySelectorAll(".number__" + userNumberArr[i]);
                        numbs.forEach((num, index) => {
                            numbs[index].style.background = 'transparent';
                        });
                    }, true);
                });
            });
        }
        document.querySelector('.start-new-game__text').onclick = this.reStartGame;
    }

    //Вывожу на экран номер факта, его текст и ссылку на следующий случайный факт.
    renderFact(factNumb, factText) {
            document.querySelector('#fact-numb').insertAdjacentHTML("beforeend", `ФАКТ № ${factNumb}`);
            document.querySelector('#fact-text').insertAdjacentHTML("beforeend", factText);

            document.getElementById('next-fact').addEventListener('click', getJson);
        }
        //Проверка вводимых символом в поля игры
    checkChange(e) {
        let inp1 = document.getElementById('input1');
        let inp2 = document.getElementById('input2');
        let inp3 = document.getElementById('input3');
        let inp4 = document.getElementById('input4');

        let varAB, varAC, varAD, varBC, varBD, varCD = false;

        let mainBtn = document.getElementById('mainBtn');
        let disableBtn = false;

        if ((inp1.value == inp2.value) && (inp1.value > 0 && inp2.value > 0)) { varAB = true; }
        if ((inp1.value == inp3.value) && (inp1.value > 0 && inp3.value > 0)) { varAC = true; }
        if ((inp1.value == inp4.value) && (inp1.value > 0 && inp4.value > 0)) { varAD = true; }
        if ((inp2.value == inp3.value) && (inp2.value >= 0 && inp3.value >= 0)) { varBC = true; }
        if ((inp2.value == inp4.value) && (inp2.value >= 0 && inp4.value >= 0)) { varBD = true; }
        if ((inp3.value == inp4.value) && (inp3.value >= 0 && inp4.value >= 0)) { varCD = true; }

        if (!varAB) {
            inp1.classList.remove('input-numb_error');
            inp2.classList.remove('input-numb_error');
        }

        if (!varAC) {
            inp1.classList.remove('input-numb_error');
            inp3.classList.remove('input-numb_error');
        }

        if (!varAD) {
            inp1.classList.remove('input-numb_error');
            inp4.classList.remove('input-numb_error');
        }

        if (!varBC) {
            inp2.classList.remove('input-numb_error');
            inp3.classList.remove('input-numb_error');
        }

        if (!varBD) {
            inp2.classList.remove('input-numb_error');
            inp4.classList.remove('input-numb_error');
        }

        if (!varCD) {
            inp3.classList.remove('input-numb_error');
            inp4.classList.remove('input-numb_error');
        }

        if (varAB) {
            inp1.classList.add('input-numb_error');
            inp2.classList.add('input-numb_error');
            disableBtn = true;
        }

        if (varAC) {
            inp1.classList.add('input-numb_error');
            inp3.classList.add('input-numb_error');
            disableBtn = true;
        }

        if (varAD) {
            inp1.classList.add('input-numb_error');
            inp4.classList.add('input-numb_error');
            disableBtn = true;
        }

        if (varBC) {
            inp2.classList.add('input-numb_error');
            inp3.classList.add('input-numb_error');
            disableBtn = true;
        }

        if (varBD) {
            inp2.classList.add('input-numb_error');
            inp4.classList.add('input-numb_error');
            disableBtn = true;
        }

        if (varCD) {
            inp3.classList.add('input-numb_error');
            inp4.classList.add('input-numb_error');
            disableBtn = true;
        }

        if (inp1.value == 0) {
            inp1.classList.add('input-numb_error');
            disableBtn = true;
        };

        //Проверка на ввод только цифр
        let mask = /\d/;

        if (inp1.value.search(mask) == -1) {
            inp1.classList.add('input-numb_error');
            disableBtn = true;
        };
        if (inp2.value.search(mask) == -1) {
            inp2.classList.add('input-numb_error');
            disableBtn = true;
        };
        if (inp3.value.search(mask) == -1) {
            inp3.classList.add('input-numb_error');
            disableBtn = true;
        };
        if (inp4.value.search(mask) == -1) {
            inp4.classList.add('input-numb_error');
            disableBtn = true;
        };

        if (inp1.value == "" && inp2.value == "" && inp3.value == "" && inp4.value == "") { disableBtn = true };

        if (inp1.value == "" && inp2.value == "" && inp3.value == "" && inp4.value == "") { disableBtn = true };

        if (disableBtn) {
            mainBtn.disabled = true;
        } else {
            mainBtn.disabled = false;
            document.querySelector('.button-check').onclick = this.clickButton;
        }

    }

    //Простое закрытие окна, без ссылки "попробовать ещё раз"
    closeModal() {
        document.getElementById('overlay').classList.add('invisible__block');
        document.getElementById('modal-window').classList.add('invisible__block');
    }

    sendMsgFooter() {
        document.getElementById('userBtnFooter').addEventListener('click', () => {
            let userNameF = document.getElementById('userNameFooter');
            let userMsgF = document.getElementById('userMsgFooter');

            let strMsgF = `Игра «Быки и коровы». Сообщение из футтера. Имя: ${userNameF.value}. Сообщение: ${userMsgF.value}.`;

            document.querySelector('#footerText').innerHTML = `${userNameF.value}, сообщение получено. Спасибо. <br>Что–то добавим?`;
            userNameF.placeholder = 'Имя';
            userMsgF.placeholder = 'Сообщение';
            userNameF.value = '';
            userMsgF.value = '';

            this.sendTelegram(strMsgF);
        })
    }

};

let startGame = new mainGame();

//Загрузка фактов лишь когда загрузится вся страница и все стили
window.onload = function() {
    getJson();
};