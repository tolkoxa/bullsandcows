let firstStart = true;
let firstCheck = 1;
let htmlStr = '';
let icount = 1;
let pcNumbArr = [];

class mainGame {
    constructor(firstStart = true, firstCheck = 1) {
        this.firstStart = firstStart;
        this.firstCheck = firstCheck;
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
                bulls++
            } else if (compNumbArr.indexOf(+num) >= 0) {
                cows++
            }
        })

        if (bulls == 4) {
            this.userWin();
            firstStart = true;
        } else if (icount == 10) {
            this.userLost();
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
        console.log(pcNumbArr);
        let bcArr = this.checkUserTry(userArr, pcNumbArr);

        this.render(bcArr, userArr);
        document.querySelector('.start-new-game__link').onclick = this.reStartGame;
    }

    userWin() {
        console.log('you win');
        let modalWindowClass = "modal-window-win";
        let modalText = '<h1>you win</h1><p class="restart-game">Попробуй ещё раз</p>';

        this.modalWindow(modalWindowClass, modalText);
    }

    userLost() {
        let modalWindowClass = "modal-window-lost";
        let modalText = '<h1>you lost</h1><p class="restart-game">Попробуй ещё раз</p>';

        this.modalWindow(modalWindowClass, modalText);
    }

    modalWindow(modalWindowType, modalStr) {
        document.getElementById('overlay').classList.remove('invisible__block');
        document.getElementById('modal-window').classList.add(modalWindowType);
        document.getElementById('modal-window').classList.remove('invisible__block');
        document.querySelector('.modal-window-text').insertAdjacentHTML("afterbegin", modalStr);
        document.querySelector('.restart-game').onclick = this.reStartGame;
    }

    reStartGame() {
        firstStart = true;
        firstCheck = 1;
        htmlStr = '';
        icount = 1;
        pcNumbArr = [];

        document.getElementById('overlay').classList.add('invisible__block');
        document.getElementById('modal-window').classList.add('invisible__block');
        document.getElementById('instruction').classList.remove('invisible__block');

        document.getElementById('input1').placeholder = '0';
        document.getElementById('input2').placeholder = '0';
        document.getElementById('input3').placeholder = '0';
        document.getElementById('input4').placeholder = '0';

        let blocks = document.querySelectorAll(".result-check");
        blocks.forEach((num, index) => {
            blocks[index].classList.add('invisible__block');
        })

        document.querySelector('.modal-window').innerHTML = "<div></div>";
        document.querySelector('.start-new-game__link').classList.add('invisible__block');

    }

    render(userTryDesc, userNumberArr) {
        let str = `<p class="result-check">${icount}.&nbsp;|&nbsp;&nbsp;<span class="number__${userNumberArr[0]}">${userNumberArr[0]}</span>&nbsp;<span class="number__${userNumberArr[1]}">${userNumberArr[1]}</span>&nbsp;<span class="number__${userNumberArr[2]}">${userNumberArr[2]}</span>&nbsp;<span class="number__${userNumberArr[3]}">${userNumberArr[3]}</span>&nbsp;&nbsp;|&nbsp;&nbsp;${userTryDesc[0]}Б&nbsp;${userTryDesc[1]}К</p>`;

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
        document.querySelector('.dynamic-text').insertAdjacentHTML("beforeend", str);

        if (icount == 4) {
            document.querySelector('.start-new-game__link').classList.remove('invisible__block');
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
    }

    stopGame() {

    }
}

let startGame = new mainGame();
// startGame.compNumb();
document.querySelector('.button-check').onclick = startGame.clickButton;