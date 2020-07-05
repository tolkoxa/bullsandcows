let firstStart = true;
let firstCheck = 1;
let htmlStr = '';
let icount = 1;
let pcNumbArr = [];

class mainGame {
    constructor(firstStart = true, firstCheck = 1) {
        this.firstStart = firstStart;
        this.firstCheck = firstCheck;
        document.querySelector('.inputs-all').addEventListener("change", (evt) => { this.checkChange(evt.target.dataset.change) });
    }

    clickButton() {
        firstStart ? (firstCheck = 1) : (firstCheck = 0);
        let uNumb1 = document.getElementById('input1');
        let uNumb2 = document.getElementById('input2');
        let uNumb3 = document.getElementById('input3');
        let uNumb4 = document.getElementById('input4');

        let userNumbers = [uNumb1.value, uNumb2.value, uNumb3.value, uNumb4.value];
        startGame.mainPlay(userNumbers);
    }

    randomizer(i) {
        return Math.floor(Math.random() * i);
    }

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

    userWin(numbArr, count) {
        console.log('you win');
        let modalWindowClass = "modal-window-win";
        let modalText;
        if (count <= 4) {
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
                <div class="secret-block">
                    <p class="secret-text">Секретный код</p>
                    <p class="secret-code">XeWn42bc</p>
                </div>
                <div class="money-form">
                    <label class="form-text form-text_margin" for="secretCode">Секретный код</label>
                    <input class="form-input form-input_maring" type="text">
                    <label class="form-text form-text_margin" for="secretCode">Имя</label>
                    <input class="form-input form-input_maring" type="text">
                    <label class="form-text form-text_margin" for="secretCode">Телефон</label>
                    <input class="form-input" type="text">
                    <button class="form-btn form-btn_margin">Отправить</button>
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

        this.modalWindow(modalWindowClass, modalText, count);
    }

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

    modalWindow(modalWindowType, modalStr, count) {
        document.getElementById('overlay').classList.remove('invisible__block');
        document.getElementById('modal-window').classList.add(modalWindowType);
        if (count <= 4) {
            document.getElementById('modal-window').classList.add('modal-window-win_money');
        }
        document.getElementById('modal-window').classList.remove('invisible__block');
        document.querySelector('.modal-window-text').insertAdjacentHTML("afterbegin", modalStr);
        document.getElementById('restartGame').onclick = this.reStartGame;

        // В модальном окне уже срабатывает этот клик. Хотя он должен появляться только после нажатия "Закрыть и пойти домой", ну и крестика в правмо углу.
        // document.getElementById('closeGame').onclick = document.getElementById('ovelay').classList.add('invisible__block');
    }

    reStartGame() {
        console.log('reStartGame');

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


    }

    render(userTryDesc, userNumberArr) {
        let str = `<p class="result-check">${icount}.&nbsp;&nbsp;&nbsp;<span class="number__${userNumberArr[0]}">${userNumberArr[0]}&nbsp;&nbsp;</span><span class="number__${userNumberArr[1]}">${userNumberArr[1]}&nbsp;&nbsp;</span><span class="number__${userNumberArr[2]}">${userNumberArr[2]}&nbsp;&nbsp;</span><span class="number__${userNumberArr[3]}">${userNumberArr[3]}</span>&nbsp;&nbsp;&nbsp;${userTryDesc[0]}Б&nbsp;${userTryDesc[1]}К</p>`;

        console.log(userNumberArr);
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
                // for (let j = 0; j < userNumberArr.length; j++) {

                let arrNumbOver = document.querySelectorAll(".number__" + userNumberArr[i]);
                arrNumbOver.forEach((num, index) => {
                    // for (let a = 0; a < arrNumbOver.length; a++) {
                    arrNumbOver[index].addEventListener('mouseover', () => {
                        let numbs = document.querySelectorAll(".number__" + userNumberArr[i]);
                        numbs.forEach((num, index) => {
                            numbs[index].style.background = '#b1b1b1';
                        });
                        // for (let i = 0; i < numbs.length; i++) {
                        //     
                        // }
                    }, true);

                    arrNumbOver[index].addEventListener('mouseout', () => {
                        let numbs = document.querySelectorAll(".number__" + userNumberArr[i]);
                        numbs.forEach((num, index) => {
                            numbs[index].style.background = 'transparent';
                        });
                        // for (let i = 0; i < numbs.length; i++) {
                        //     numbs[i].style.background = 'transparent';
                        // }
                    }, true);
                    // }
                });
                // }
            });
        }
        document.querySelector('.start-new-game__text').onclick = this.reStartGame;

    }

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

        console.log(`varAB---${varAB}`);
        console.log(`varAC---${varAC}`);
        console.log(`varAD---${varAD}`);
        console.log(`varBC---${varBC}`);
        console.log(`varBD---${varBD}`);
        console.log(`varCD---${varCD}`);
        console.log(`-----------------`);

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

        if (disableBtn) {
            mainBtn.disabled = true;
            mainBtn.classList.add('button-check_disabled');
            mainBtn.classList.remove('button-check');
        } else {
            mainBtn.disabled = false;
            mainBtn.classList.remove('button-check_disabled');
            mainBtn.classList.add('button-check');
            document.querySelector('.button-check').onclick = this.clickButton;
        }
    }

    stopGame() {

    }
}

class facts {

}

let startGame = new mainGame();
// startGame.compNumb();
// document.querySelector('.button-check').onclick = startGame.clickButton;