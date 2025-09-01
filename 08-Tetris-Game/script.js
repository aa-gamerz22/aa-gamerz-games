(function() {
    "use strict";

    var recordArr = [0, 0, 0, 0, 0];
    var savesArr = [["none"], ["none"], ["none"], ["none"]];

    var display = document.getElementById("display");
    var userNameField = document.getElementsByClassName("nickname")[0];
    var displayPoints = document.getElementById("points");
    var buttonControl = false;
    var gameEnd = false;
    var displayClear = false;
    var complexity = "easy";

    for (var i = 0; i < 250; i++) {
        var createPixel = document.createElement("div");
        createPixel.className = "pixel";
        display.appendChild(createPixel);
    }

    var displayArray = document.getElementsByClassName("pixel");

    /**
     * @type {Element}
     * отрисовка дисплея со следующей фигурой
     */
    var nextFigureDisplay = document.getElementById("nextFigure");

    for (var t = 0; t < 25; t++) {
        var createElementPixel = document.createElement("div");
        createElementPixel.className = "pixelDisplayNext";
        nextFigureDisplay.appendChild(createElementPixel);
    }

    var nextDisplayArr = document.getElementsByClassName("pixelDisplayNext");

    function AddNextFigure() {
        var positionElementsFigure = [
            [0, 1, 5, 6],

            [0, 1, 6, 7],

            [0, 5, 10, 15],

            [0, 5, 9, 10],

            [0, -1, 1, 5],

            [0, 5, 10, 11],

            [0, 1, 4, 5]
        ];

        var elementsPositionArr = [7, 6, 2, 7, 7, 7, 7];

        var element;
        var position;

        this.addFigureOfDisplay = function(el) {
            if (element !== undefined) {
                figureErase();
            }

            element = positionElementsFigure[el];
            position = elementsPositionArr[el];

            figureRow();
        };

        function figureRow() {
            for (var b = 0; b < 4; b++) {
                nextDisplayArr[position + element[b]].className +=
                    " pixelNextFigure";
            }
        }

        function figureErase() {
            for (var f = 0; f < 4; f++) {
                nextDisplayArr[position + element[f]].className =
                    "pixelDisplayNext";
            }
        }
    }
    var addFigure = new AddNextFigure();

    function ObjectForm() {
        var startPosition;
        var nextFigureStartPosition;

        var nextFigure;
        var addNextFigure;

        var arrPosition = [44, 44, 24, 35, 45, 34, 44];

        this.getStartPosition = function() {
            return startPosition;
        };

        this.FormSelection = function() {
            if (addNextFigure === undefined) {
                nextFigureAdd();
            }

            startPosition = nextFigureStartPosition;
            nextFigure = addNextFigure;
            var num = nextFigureAdd();
            addFigure.addFigureOfDisplay(num);
            return nextFigure;
        };

        this.refreshNexFigure = function() {
            var num = nextFigureAdd();
            addFigure.addFigureOfDisplay(num);
        };

        function nextFigureAdd() {
            var randNum = Math.floor(Math.random() * 6.99999);
            nextFigureStartPosition = arrPosition[randNum];
            addNextFigure = objectFormData(randNum);

            return randNum;
        }

        function objectFormData(objectType) {
            var objectPositionArray = [
                [
                    [0, 1, 10, 11],
                    [0, 1, 10, 11],
                    [0, 1, 10, 11],
                    [0, 1, 10, 11]
                ],

                [
                    [0, 1, 11, 12],
                    [-9, 1, 0, 10],
                    [0, 1, 11, 12],
                    [-9, 1, 0, 10]
                ],

                [
                    [0, 10, 20, 30],
                    [9, 10, 11, 12],
                    [0, 10, 20, 30],
                    [9, 10, 11, 12]
                ],

                [
                    [0, 10, 19, 20],
                    [9, 10, 11, 21],
                    [0, 1, 10, 20],
                    [9, 19, 20, 21]
                ],

                [
                    [0, -1, 1, 10],
                    [0, -10, 1, 10],
                    [-10, -1, 0, 1],
                    [-10, -1, 0, 10]
                ],

                [
                    [0, 10, 20, 21],
                    [9, 10, 11, 1],
                    [-1, 0, 10, 20],
                    [9, 10, 11, 19]
                ],

                [
                    [0, 1, 10, 9],
                    [-11, -1, 0, 10],
                    [0, 1, 10, 9],
                    [-11, -1, 0, 10]
                ]
            ];
            return objectPositionArray[objectType];
        }
    }
    var newFigure = new ObjectForm();

    function FigureController() {
        var interval;
        var figurePosition;
        var figureData;
        var rotateArr;
        var numRotateFigure = 0;
        var level = 400;

        this.setFigurePosition = function(val) {
            figurePosition = val;
        };
        this.setFigureDate = function(val) {
            figureData = val;
        };
        this.setRotateArr = function(val) {
            rotateArr = val;
        };

        this.getSave = function() {
            return {
                interval: interval,
                figurePosition: figurePosition,
                figureData: figureData,
                rotateArr: rotateArr,
                numRotateFigure: numRotateFigure,
                level: level
            };
        };

        this.installSave = function(arr) {
            interval = arr.interval;
            figurePosition = arr.figurePosition;
            figureData = arr.figureData;
            rotateArr = arr.rotateArr;
            numRotateFigure = arr.numRotateFigure;
            level = arr.level;
        };

        this.refreshRotate = function() {
            numRotateFigure = 0;
        };

        this.setLevel = function() {
            var easy = document.querySelector(".easy");
            var middle = document.querySelector(".middle");
            var hard = document.querySelector(".hard");

            if (this === easy) {
                level = 400;
                complexity = "easy";

                easy.className = "menuBlock easy indication";
                middle.className = "menuBlock middle";
                hard.className = "menuBlock hard";
            } else if (this === middle) {
                level = 200;
                complexity = "middle";

                easy.className = "menuBlock easy";
                middle.className = "menuBlock middle indication";
                hard.className = "menuBlock hard";
            } else if (this === hard) {
                level = 100;
                complexity = "hard";

                easy.className = "menuBlock easy";
                middle.className = "menuBlock middle";
                hard.className = "menuBlock hard indication";
            }
        };

        this.start = function() {
            interval = setInterval(this.downPositionCheck, level);
        };

        this.pause = function() {
            clearInterval(interval);
        };

        function positionCheck(step, elem) {
            if (step === undefined) {
                step = 10;
            }
            if (elem === undefined) {
                elem = figureData;
            }

            var downPosition = [];

            for (var l = 0; l < 4; l++) {
                if (
                    displayArray[figurePosition + elem[l] + step] === undefined
                ) {
                    downPosition[l] = false;
                    continue;
                } else downPosition[l] = true;

                if (
                    displayArray[figurePosition + elem[l] + step].classList
                        .length > 1
                ) {
                    downPosition[l] = isPartYourself(l, step, elem);
                }
            }
            return downPosition;
        }

        function isPartYourself(elem, step, renewed) {
            if (renewed === undefined) {
                renewed = figureData;
            }

            var result;

            for (var a = 0; a < 4; a++) {
                if (
                    figurePosition + renewed[elem] + step ===
                    figurePosition + figureData[a]
                ) {
                    result = true;
                    break;
                } else {
                    result = false;
                }
            }
            return result;
        }

        function edgeArr(side) {
            var sideValue;
            var result;

            if (side === "right") {
                sideValue = "0";
            } else if (side === "left") {
                sideValue = "9";
            }

            for (var q = 0; q < 4; q++) {
                var sumString = figurePosition + figureData[q] + "";
                var lastSumSymbol = sumString[sumString.length - 1];

                if (lastSumSymbol === sideValue) {
                    result = true;
                    break;
                } else {
                    result = false;
                }
            }
            return result;
        }

        function twoSideVisibility(elem) {
            var numberArr = [];
            var answerArr = [false, false];
            var answer = false;

            for (var d = 0; d < 4; d++) {
                var positionString = figurePosition + elem[d] + "";
                numberArr[d] = positionString[positionString.length - 1];
            }

            for (var j = 0; j < numberArr.length; j++) {
                if (numberArr[j] === "9") {
                    answerArr[0] = true;
                }

                if (numberArr[j] === "0") {
                    answerArr[1] = true;
                }
            }

            if (answerArr[0] && answerArr[1]) {
                answer = true;
            }

            return answer;
        }

        this.leftPositionCheck = function() {
            var arr = positionCheck(1);

            if (edgeArr("left")) {
                return false;
            }

            if (arr[0] && arr[1] && arr[2] && arr[3]) {
                objFigure.figureMoveRight();
            } else {
                return false;
            }
        };

        this.rightPositionCheck = function() {
            var arr = positionCheck(-1);

            if (edgeArr("right")) {
                return false;
            }

            if (arr[0] && arr[1] && arr[2] && arr[3]) {
                objFigure.figureMoveLeft();
            } else {
                return false;
            }
        };

        this.downPositionCheck = function() {
            var arr = positionCheck(10);

            if (arr[0] && arr[1] && arr[2] && arr[3]) {
                objFigure.figureDown();
            } else {
                nextFigure();
            }
        };

        this.rotateFigureCheck = function() {
            numRotateFigure++;
            if (numRotateFigure > 3) {
                numRotateFigure = 0;
            }

            if (twoSideVisibility(rotateArr[numRotateFigure])) {
                return false;
            }

            var arr = positionCheck(0, rotateArr[numRotateFigure]);

            if (arr[0] && arr[1] && arr[2] && arr[3]) {
                objFigure.rotateFigure(numRotateFigure);
            } else {
                return false;
            }
        };

        function nextFigure() {
            deletingRows.checkRows();
            objFigure.addNewFigure(
                newFigure.FormSelection(),
                newFigure.getStartPosition()
            );
        }
    }

    var figureCont = new FigureController();

    function ObjectFigure() {
        var positionFigure;
        var figureArray;
        var arrFigureRotate;

        this.addNewFigure = function(arr, pos) {
            positionFigure = pos;
            figureArray = arr[0];
            arrFigureRotate = arr;
            figureCont.setFigurePosition(pos);
            figureCont.setRotateArr(arr);
            figureCont.setFigureDate(arr[0]);
            figureCont.refreshRotate();
            if (gameOver.gameCheck(arr[0], pos)) {
                this.draw();
            }
        };

        this.getFigureSave = function() {
            return {
                positionFigure: positionFigure,
                figureArray: figureArray,
                arrFigureRotate: arrFigureRotate
            };
        };

        this.installFigureSave = function(arr) {
            positionFigure = arr.positionFigure;
            figureArray = arr.figureArray;
            arrFigureRotate = arr.arrFigureRotate;
        };

        this.draw = function() {
            for (var n = 0; n < 4; n++) {
                displayArray[positionFigure + figureArray[n]].className +=
                    " figurePixel";
            }
        };

        this.erase = function() {
            for (var n = 0; n < 4; n++) {
                displayArray[positionFigure + figureArray[n]].className =
                    "pixel";
            }
        };

        this.rotateFigure = function(elem) {
            this.erase();
            figureArray = arrFigureRotate[elem];
            figureCont.setFigureDate(figureArray);
            this.draw();
        };

        this.figureMoveRight = function() {
            this.erase();
            positionFigure += 1;
            figureCont.setFigurePosition(positionFigure);
            this.draw();
        };

        this.figureMoveLeft = function() {
            this.erase();
            positionFigure -= 1;
            figureCont.setFigurePosition(positionFigure);
            this.draw();
        };

        this.figureDown = function() {
            this.erase();
            positionFigure += 10;
            figureCont.setFigurePosition(positionFigure);
            this.draw();
        };

        this.newGame = function() {
            numeral = 50;
            var boxDelete = document.getElementsByClassName("gameOver")[0];
            document.getElementById("displayWindow").removeChild(boxDelete);
            displayClear = true;
            keyAccess = false;
            buttonControl = false;
            menuAccess = false;
            paintPixel(displayArray.length);
            gameEnd = false;

            newFigure.refreshNexFigure();
        };

        this.newGameFromButton = function() {
            menu.closeMenu();

            var boxDelete = document.getElementsByClassName("gameOver")[0];
            document.getElementById("displayWindow").removeChild(boxDelete);

            ent = 1;

            pauseButton.innerHTML = "Pause";
            keyAccess = false;
            gameEnd = false;
            displayClear = true;

            numeral = 50;
            paintPixel(displayArray.length);

            newFigure.refreshNexFigure();
        };

        function paintPixel(startValue) {
            animate({
                val: startValue,

                draw: function(progress) {
                    displayArray[progress].className = "pixel figurePixel";
                }
            });
        }

        var numeral = 50;

        function animate(options) {
            requestAnimationFrame(function animate() {
                options.draw(numeral);
                numeral++;

                if (numeral < options.val) {
                    requestAnimationFrame(animate);
                } else {
                    setTimeout(clearDisplay, 100);
                }
            });
        }

        function clearDisplay() {
            for (var s = 0; s < displayArray.length; s++) {
                displayArray[s].className = "pixel";
            }

            displayPoints.innerHTML = "0";
            objFigure.addNewFigure(
                newFigure.FormSelection(),
                newFigure.getStartPosition()
            );
            figureCont.start();

            keyAccess = true;
            menuAccess = true;
            displayClear = false;
            buttonControl = true;
        }
    }
    var objFigure = new ObjectFigure();

    function DeletingRows() {
        this.checkRows = function() {
            var checkResult = pixelPositionDefinition();

            if (checkResult[0][0]) {
                rowDelete(checkResult);
            }
        };

        var elements;

        function pixelPositionDefinition(refreh) {
            var elementsPixelArr = [];
            var numeral = 0;

            for (var z = 0; z < displayArray.length; z++) {
                if (displayArray[z].classList.length > 1) {
                    elementsPixelArr[numeral] = z;
                    numeral++;
                }
            }

            elements = elementsPixelArr;

            if (refreh === undefined) {
                return checkRows(elementsPixelArr);
            }
        }

        function checkRows(arr) {
            var fullRowArr = [[], []];
            var positionStart = undefined;
            var positionEnd = undefined;
            var numeralPos = 1;
            var numeral = 0;

            for (var t = 0; t < arr.length; t++) {
                if (arr[t] - positionStart === numeralPos) {
                    if (arr[t] - positionStart === 9) {
                        positionEnd = arr[t];
                        fullRowArr[0][numeral] = positionStart;
                        fullRowArr[1][numeral] = positionEnd;
                        numeral++;
                        numeralPos = 1;
                    }
                    numeralPos++;
                    continue;
                }

                var stringNumber = arr[t] + "";
                var lastNumber = stringNumber[stringNumber.length - 1];

                if (lastNumber === "0") {
                    positionStart = arr[t];
                    numeralPos = 1;
                }
            }
            return fullRowArr;
        }

        function rowDelete(arr) {
            pointsUp.addPoints(arr[0].length);

            for (var c = 0; c < arr[0].length; c++) {
                for (var p = 0; p < 10; p++) {
                    displayArray[arr[0][c] + p].className = "pixel";
                }

                pixelPositionDefinition("refresh");
                remainingElementsDown(arr[0][c]);
            }
        }

        function remainingElementsDown(val) {
            for (var y = 0; y < elements.length; y++) {
                if (elements[y] < val) {
                    displayArray[elements[y]].className = "pixel";
                } else break;
            }

            for (var h = 0; h < elements.length; h++) {
                if (elements[h] < val) {
                    displayArray[elements[h] + 10].className += " figurePixel";
                } else break;
            }

            return true;
        }
    }
    var deletingRows = new DeletingRows();

    function PointsUp() {
        this.addPoints = function(val) {
            var pointsStart = +displayPoints.innerHTML;

            var added = 100 * val;

            game.addPoints(val);

            app(pointsStart, added);
        };

        function animate(options) {
            var start = performance.now();

            requestAnimationFrame(function animate(time) {
                var timeFraction = (time - start) / options.duration;
                if (timeFraction > 1) timeFraction = 1;

                var progress = options.timing(timeFraction);

                options.draw(progress);

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        }

        function app(startValue, added) {
            animate({
                duration: 300,
                timing: function(timeFraction) {
                    return timeFraction;
                },
                draw: function(progress) {
                    displayPoints.innerHTML =
                        startValue + Math.floor(progress * added);
                }
            });
        }
    }
    var pointsUp = new PointsUp();

    function GameOver() {
        var box = document.createElement("div");
        box.className = "gameOver";

        this.gameCheck = function(elem, pos) {
            var answer = true;

            for (var p = 0; p < elem.length; p++) {
                if (displayArray[pos + elem[p]].classList.length > 1) {
                    answer = false;
                    break;
                } else answer = true;
            }

            if (answer === false) {
                gameOverBox();
            }

            return answer;
        };

        function gameOverBox() {
            box.innerHTML = "<span>Game</span> <span>Over</span>";

            var tryAgain = document.createElement("span");
            tryAgain.onclick = objFigure.newGame;
            tryAgain.innerHTML = "Try Again";

            box.appendChild(tryAgain);

            document.getElementById("displayWindow").appendChild(box);
            figureCont.pause();
            game.recordsRefresh();
            game.setPoints(0);
            keyAccess = false;
            gameEnd = true;
            buttonControl = false;
        }

        this.pauseBox = function() {
            box.innerHTML = "<p class='pause'>Pause</p>";
            document.getElementById("displayWindow").appendChild(box);
        };
    }
    var gameOver = new GameOver();

    var accessCreate = true;

    function User() {
        this.createUserForm = function() {
            document
                .getElementById("displayWindow")
                .appendChild(userFormBlock());
        };

        this.createUser = function() {
            if (accessCreate) {
                var userName = document.querySelector(".userCreate input")
                    .value;
                menuAccess = true;

                if (userName.length < 9 && userName.length >= 3) {
                    if (
                        ~userName.indexOf("<") ||
                        ~userName.indexOf(">") ||
                        ~userName.indexOf("&") ||
                        ~userName.indexOf(",")
                    ) {
                        return usernameError();
                    } else userNameField.innerHTML = userName;
                } else return usernameError();

                document
                    .getElementById("displayWindow")
                    .removeChild(document.querySelector(".userCreate"));
                buttonControl = true;
                keyAccess = true;
                objFigure.addNewFigure(
                    newFigure.FormSelection(),
                    newFigure.getStartPosition()
                );
                figureCont.start();
            }
        };

        function userFormBlock() {
            var userFormWindow = document.createElement("div");
            userFormWindow.className = "userCreate";

            var ultimatum = document.createElement("span");
            ultimatum.innerHTML = "Create a user";
            userFormWindow.appendChild(ultimatum);

            var form = document.createElement("input");
            form.type = "text";
            form.title = "Enter a nickname";
            userFormWindow.appendChild(form);

            var button = document.createElement("div");
            button.innerHTML = "Create";
            button.onclick = user.createUser;
            userFormWindow.appendChild(button);

            return userFormWindow;
        }

        function usernameError() {
            accessCreate = false;

            var errorMessage = document.createElement("div");
            errorMessage.className = "errorMessage";

            var messageText = document.createElement("span");
            messageText.innerHTML =
                '<span>Nickname should not contain characters: "<,> /", and not be shorter than 3 and not longer than 9 characters</span>';
            errorMessage.appendChild(messageText);

            var buttonClose = document.createElement("div");
            buttonClose.innerHTML = "Close";
            buttonClose.onclick = windowErrorClose;
            errorMessage.appendChild(buttonClose);

            document.getElementById("displayWindow").appendChild(errorMessage);
        }

        function windowErrorClose() {
            accessCreate = true;

            document
                .getElementById("displayWindow")
                .removeChild(document.querySelector(".errorMessage"));
        }
    }
    var user = new User();

    var buttons;
    var menuDisplay;

    function Menu() {
        var classArrRecords = [
            "firstPlace",
            "secondPlace",
            "thirdPlace",
            "fourthPlace",
            "fifthPlace"
        ];

        var level = ["easy", "middle", "hard"];

        this.clickButtonMenu = function() {
            paintButton(this);
        };

        this.showMenu = function() {
            if (menuAccess) {
                if (gameEnd) {
                } else if (ent === 1) {
                    game.pauses();
                }
                menuAccess = false;

                buttonControl = false;

                var HTMLFragmentMenu =
                    '<div class="menu"><div id="headerMenu"><div></div><div></div><div></div><div></div></div><div class="listMenu"><div class="menuBlock resume">Resume</div><div class="menuBlock newGameButton">New game</div><div class="menuBlock fullVersion">Full version</div></div></div>';
                display.insertAdjacentHTML("beforeBegin", HTMLFragmentMenu);

                buttons = document.querySelectorAll("#headerMenu div");
                menuDisplay = document.getElementsByClassName("menu")[0];
                menu.elementUse = buttons[0];

                menuDisplay.style.animationName = "menuShow";

                var closeButton = document.querySelector(
                    ".listMenu div:first-child"
                );
                closeButton.onclick = menu.closeMenu;

                var newGameButton = document.querySelector(
                    ".listMenu div:nth-child(2)"
                );
                newGameButton.onclick = objFigure.newGameFromButton;

                for (var elem = 0; elem < buttons.length; elem++) {
                    buttons[elem].onclick = menu.clickButtonMenu;
                }

                buttons[0].className = "home";
                buttons[0].style.backgroundColor = "#13B0A5";
            }
        };

        this.closeMenu = function() {
            menuDisplay.style.animationName = "menuClose";
            menuDisplay.style.animationDuration = "0.2s";

            setTimeout(function() {
                document
                    .getElementById("displayWindow")
                    .removeChild(menuDisplay);
                menuAccess = !displayClear;
                buttonControl = !displayClear;
            }, 200);
        };

        this.elementUse = false;

        function paintButton(elem) {
            if (elem === menu.elementUse) {
                return false;
            }

            menu.elementUse.removeAttribute("style");
            menu.elementUse.removeAttribute("class");

            menu.elementUse = elem;

            if (elem === buttons[0]) {
                elem.style.backgroundColor = "#13B0A5";
                elem.className = "home";
                return homeMenu();
            } else if (elem === buttons[1]) {
                elem.style.backgroundColor = "#13B0A5";
                elem.className = "records";
                return records();
            } else if (elem === buttons[2]) {
                elem.style.backgroundColor = "#13B0A5";
                elem.className = "saves";
                saves();
            }
            if (elem === buttons[3]) {
                elem.style.backgroundColor = "#13B0A5";
                elem.className = "settings";
                settings();
            }
        }

        this.refreshSave = function() {
            saves();
        };

        function homeMenu() {
            var menuBox = document.createElement("div");
            menuBox.className = "listMenu";

            for (var m = 0; m < 3; m++) {
                var block = document.createElement("div");
                block.className = "menuBlock";
                block.style.animationDelay = "0." + m * 2 + "s";
                if (m === 0) {
                    block.innerHTML = "Resume";
                    block.className += " resume";
                    block.onclick = menu.closeMenu;
                }
                if (m === 1) {
                    block.innerHTML = "New game";
                    block.className += " newGameButton";
                    block.onclick = objFigure.newGameFromButton;
                }
                if (m === 2) {
                    block.innerHTML = "Full version";
                    block.className += " fullVersion";
                }
                menuBox.appendChild(block);
            }
            menuDisplay.appendChild(menuBox);
            setTimeout(function() {
                menuDisplay.removeChild(
                    document.getElementsByClassName("listMenu")[0]
                );
            }, 900);
        }

        function records() {
            var menuBox = document.createElement("div");
            menuBox.className = "listMenu";

            for (var y = 0; y < recordArr.length; y++) {
                var block = document.createElement("div");
                block.innerHTML = recordArr[y];
                block.className = "menuBlock";
                block.className += " " + classArrRecords[y];
                block.style.animationDelay = "0." + y * 2 + "s";
                menuBox.appendChild(block);
            }
            menuDisplay.appendChild(menuBox);
            setTimeout(function() {
                menuDisplay.removeChild(
                    document.getElementsByClassName("listMenu")[0]
                );
            }, 1300);
        }

        function saves() {
            var menuBox = document.createElement("div");
            menuBox.className = "listMenu saveList";
            var add = document.createElement("div");
            add.innerHTML = "Add";
            add.className = "menuBlock add";
            add.onclick = preservation.addSave;
            menuBox.appendChild(add);

            for (var y = 0; y < savesArr.length; y++) {
                var block = document.createElement("button");
                block.innerHTML = savesArr[y][0];
                block.className = "menuBlock";

                if (savesArr[y][0].length > 4) {
                    block.value = y;
                    block.onclick = preservation.installSave;
                }

                block.className += " save";

                block.style.animationDelay = "0." + (y + 1) * 2 + "s";
                menuBox.appendChild(block);
            }
            menuDisplay.appendChild(menuBox);
            setTimeout(function() {
                menuDisplay.removeChild(
                    document.getElementsByClassName("listMenu")[0]
                );
            }, 1300);
        }

        function settings() {
            var menuBox = document.createElement("div");
            menuBox.className = "listMenu";
            var indication = document.createElement("div");

            for (var y = 0; y < level.length; y++) {
                var block = document.createElement("div");
                block.innerHTML = level[y] + "<div></div>";
                block.onclick = figureCont.setLevel;
                block.className = "menuBlock";
                block.className += " " + level[y];
                if (level[y] === complexity) {
                    block.className += " indication";
                }
                block.style.animationDelay = "0." + y * 2 + "s";
                menuBox.appendChild(block);
            }
            menuDisplay.appendChild(menuBox);
            setTimeout(function() {
                menuDisplay.removeChild(
                    document.getElementsByClassName("listMenu")[0]
                );
            }, 1000);
        }
    }
    var menu = new Menu();

    function Game() {
        var points = 0;

        this.addPoints = function(val) {
            points += val * 100;
        };

        this.getPoints = function() {
            return points;
        };

        this.setPoints = function(val) {
            points = val;
        };

        this.pauses = function() {
            figureCont.pause();
            pauseButton.innerHTML = "Continue";
            gameOver.pauseBox();
            keyAccess = false;
            return ent++;
        };

        this.continues = function() {
            figureCont.start();
            pauseButton.innerHTML = "Pause";
            var boxDelete = document.getElementsByClassName("gameOver")[0];
            document.getElementById("displayWindow").removeChild(boxDelete);
            keyAccess = true;
            return ent--;
        };

        this.recordsRefresh = function() {
            recordArr[recordArr.length] = points;

            recordArr.sort(sortRecords);

            recordArr.reverse();

            recordArr.splice(5);
        };

        function sortRecords(a, b) {
            return a - b;
        }
    }
    var game = new Game();

    function WindowMove() {
        var windowed;

        var startPositionCursorOnX = 0;
        var startPositionCursorOnY = 0;

        var accessMoveIdentification = false;

        var elementPositionX;
        var elementPositionY;

        this.clickCursorEvent = function(e) {
            accessMoveIdentification = true;

            startPositionCursorOnX = e.pageX;
            startPositionCursorOnY = e.pageY;

            if (this === document.getElementById("hitbox")) {
                windowed = document.getElementById("program");
            } else if (this === document.querySelector(".file")) {
                windowed = document.querySelector(".file");
            }

            elementPositionX = parseInt(getComputedStyle(windowed).left);
            elementPositionY = parseInt(getComputedStyle(windowed).top);
            console.log(getComputedStyle(windowed).top);
        };

        this.moveEvent = function(e) {
            if (accessMoveIdentification) {
                var awnX = e.pageX - startPositionCursorOnX;
                var awnY = e.pageY - startPositionCursorOnY;

                resultPosition(awnX, awnY);
            }
        };

        this.stopWindowMove = function() {
            accessMoveIdentification = false;
        };

        function resultPosition(x, y) {
            windowed.style.top = elementPositionY + y + "px";
            windowed.style.left = elementPositionX + x + "px";
        }
    }
    var windowMove = new WindowMove();

    function Preservation() {
        this.addSave = function() {
            var figureControllerSave = figureCont.getSave();
            var objectFigureSave = objFigure.getFigureSave();
            var date = getDate();
            var displaySaveArr = [];
            var points = game.getPoints();

            for (var t = 0; t < displayArray.length; t++) {
                displaySaveArr[t] = displayArray[t].classList.length;
            }

            return saveArrRefresh([
                date,
                points,
                figureControllerSave,
                objectFigureSave,
                displaySaveArr
            ]);
        };

        function getDate() {
            var dt = new Date();

            var month = dt.getMonth() + 1;
            if (month < 10) month = "0" + month;

            var day = dt.getDate();
            if (day < 10) day = "0" + day;

            var year = dt.getFullYear();

            var hours = dt.getHours();
            if (hours < 10) hours = "0" + hours;

            var minutes = dt.getMinutes();
            if (minutes < 10) minutes = "0" + minutes;

            var seconds = dt.getSeconds();
            if (seconds < 10) seconds = "0" + seconds;

            return (
                "<span>" +
                day +
                "." +
                month +
                "." +
                year +
                "</span><span>" +
                hours +
                ":" +
                minutes +
                ":" +
                seconds +
                "</span>"
            );
        }

        function saveArrRefresh(arr) {
            savesArr.splice(0, 0, arr);

            savesArr.splice(4);

            menu.refreshSave();

            console.log(savesArr[0]);
        }

        var objectSave;

        this.installSave = function() {
            objectSave = savesArr[this.value];

            game.setPoints(objectSave[1]);

            displayPoints.innerHTML = objectSave[1];

            figureCont.installSave(objectSave[2]);

            objFigure.installFigureSave(objectSave[3]);

            for (var q = 0; q < displayArray.length; q++) {
                if (objectSave[4][q] === 2) {
                    displayArray[q].className = "pixel figurePixel";
                } else displayArray[q].className = "pixel";
            }

            if (gameEnd) {
                document
                    .getElementById("displayWindow")
                    .removeChild(document.querySelector(".gameOver"));

                var box = document.createElement("div");
                box.className = "gameOver";
                box.innerHTML = "<p class='pause'>Pause</p>";
                document.getElementById("displayWindow").appendChild(box);

                document.getElementById("pause").innerHTML = "Continue";
                ent++;

                gameEnd = false;
                buttonControl = true;
            }

            newFigure.refreshNexFigure();

            menu.closeMenu();
        };
    }
    var preservation = new Preservation();

    var ent = 1;
    var keyAccess = false;
    var pauseButton = document.getElementById("pause");
    var menuAccess = false;

    document.onmousemove = windowMove.moveEvent;
    document.getElementById("hitbox").onmousedown = windowMove.clickCursorEvent;
    document.getElementById("hitbox").onmouseup = windowMove.stopWindowMove;
    document.querySelector(".file").onmousedown = windowMove.clickCursorEvent;
    document.onmouseup = windowMove.stopWindowMove;

    pauseButton.onclick = function() {
        if (buttonControl) {
            if (ent === 1) {
                game.pauses();
            } else if (ent === 2) {
                game.continues();
            }
        }
    };

    document.onkeydown = function(e) {
        if (keyAccess === true) {
            if (e.keyCode === 68 || e.keyCode === 39) {
                figureCont.leftPositionCheck();
            }
            if (e.keyCode === 65 || e.keyCode === 37) {
                figureCont.rightPositionCheck();
            }
            if (e.keyCode === 83 || e.keyCode === 40) {
                figureCont.downPositionCheck();
            }
            if (e.keyCode === 32) {
                figureCont.rotateFigureCheck();
            }
        }
    };

    document.getElementById("menu").onclick = menu.showMenu;

    user.createUserForm();
})();