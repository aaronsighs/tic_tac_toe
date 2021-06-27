let currentChar = "X"



const gameboard = ((computer = "easy") => {
    let _privateTiles = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    let charList = ["X", "O"];
    let charSel = 0;
    let _privateComputerMode = computer;
    let _privateBestMove;
    let _moveCount = 0;




    const _privateAddClasses = (ele, classes) => {
        classes = classes.split(" ")
        for (let i = 0; i < classes.length; i++) {
            ele.classList.add(classes[i])
        }
        return ele;
    }


    const _privateComputerMove = () => {
        if (_privateComputerMode === "easy" || _moveCount <= 1) {
            while (!setTile(Math.floor(Math.random() * 3), Math.floor(Math.random() * 3), "O")) {}
            // } else if (_privateComputerMode === "hard") {
            //     _privateMinMax(_privateCopyBoard(_privateTiles), 1);
            //     setTile(_privateBestMove[0], _privateBestMove[1], "O");
            // }

        }

    }

    const _privateGetAvailableMoves = (gameboard) => {
        let moves = []
        gameboard.forEach((row, i) =>
            row.forEach((tile, j) => tile === "" ? moves.push([i, j]) : {})
        )
        return moves;
    }

    const _privateVirtualSet = (gameboard, move, char) => { gameboard[move[0]][move[1]] = char; return gameboard }



    const _privateGetScore = (gameboard, itr) => {
        if (win(charList[itr], gameboard)) {
            return 10;
        } else if (win(charList[(itr - 1) ** 2], gameboard)) {
            return -10
        }
        return 0;
    }

    const _privateCopyBoard = (gameboard) => {
        return gameboard.map(row => row.map(tile => tile));

    }
    let count = 0;

    const _privateMinMax = (gameboard, itr) => {



        let score = _privateGetScore(gameboard, itr)
        let availableMoves = _privateGetAvailableMoves(gameboard);
        if (score !== 0 || !availableMoves.length) {
            return score;
        }

        let scores = []
        let moves = []
        let outcomes = {}


        availableMoves.forEach(move => {
            let newBoard = _privateCopyBoard(gameboard);
            newBoard = _privateVirtualSet(newBoard, move, charList[itr]);
            let newScore = _privateMinMax(newBoard, itr ? 0 : 1);
            moves.push(move)
            scores.push(newScore)
            outcomes[String(move)] = [newBoard, newScore];
        })

        if (itr === 1) {
            let max = [...scores].sort((a, b) => b - a)[0]
            let maxIndex = scores.indexOf(max);
            _privateBestMove = moves[maxIndex];
            return max
        } else {
            let min = [...scores].sort((a, b) => a - b)[0]
            let minIndex = scores.indexOf(min);
            _privateBestMove = moves[minIndex];
            return min

        }







    }


    const _privateComputerHard = () => {







    }


    const _privateClearTiles = () => {
        let tiles = document.querySelectorAll(".sq");
        tiles.forEach((tile, index) => {
            // tiles[index].style.backgroundColor = "#FF0000";
            // tiles[index].style.color = "black";
            // if (tiles[index].lastChild) {
            //     tiles[index].lastChild.textContent = "";
            //     tiles[index].lastChild.color = "black";
            // }
            if (tiles[index].lastChild) {
                tile.lastChild.textContent = ""
            }
            tile.classList.remove("win")
        })

        _privateTiles = _privateTiles.map(row => ["", "", ""])

    }

    const _privateCreateTiles = () => {
        let board = document.querySelector("#board");
        for (let i = 0; i < _privateTiles.length; i++) {
            for (let j = 0; j < _privateTiles[i].length; j++) {
                let square = _privateAddClasses(document.createElement("div"), `sq r${i} c${j}`)
                square.addEventListener('click', e => {
                    if (setTile(i, j, charList[charSel])) {
                        if (win(charList[charSel])) {
                            _privateDrawWinningTiles(charList[charSel]);
                            _privatefillTiles(null);
                            setTimeout(() => document.querySelector(".wrapper").classList.add("won"), 3000)
                            if (charList[charSel] === "X")
                                document.querySelector(".wrapper").style.backgroundColor = "rgba(0, 0, 100, .05)";
                            else
                                document.querySelector(".wrapper").style.backgroundColor = "rgba(100, 0, 0, 0.05)";


                        } else if (_privateTilesFilled()) {
                            setTimeout(() => document.querySelector(".wrapper").classList.add("won"), 3000)
                            document.querySelector(".wrapper").style.backgroundColor = "rgba(0, 0, 0, 0.145)";
                        } else if (getDifficulty() === "none") {
                            charSel = (charSel - 1) ** 2
                        } else {
                            _privateComputerMove();

                            if (win("O")) {


                                _privateDrawWinningTiles("O");
                                _privatefillTiles(null);
                                setTimeout(() => document.querySelector(".wrapper").classList.add("won"), 3000)
                                document.querySelector(".wrapper").style.backgroundColor = "rgba(200, 0, 0, 0.25)";


                            } else if (_privateTilesFilled()) {

                                setTimeout(() => document.querySelector(".wrapper").classList.add("won"), 3000)
                                document.querySelector(".wrapper").style.backgroundColor = "rgba(0, 0, 0, 0.145)";
                            }
                        }
                    }
                })

                board.appendChild(square);

            }
        }
    }


    const _privatefillTiles = (value) => {
        _privateTiles = [
            [value, value, value],
            [value, value, value],
            [value, value, value]
        ]
    }

    const _privateTilesFilled = (gameboard = null) => {
        if (!gameboard) { gameboard = _privateTiles }
        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard.length; j++) {
                if (_privateTiles[i][j] === "") {
                    return false
                }
            }

        }
        return true
    }





    const _privateDrawAWin = () => {

        Array.from(document.querySelectorAll(".sq")).forEach(sq => {

            sq.style.backgroundColor = "#00FF00";
        });

    }


    const _privateDrawWinningTiles = (char) => {
        _privateFindWinningTiles(char).forEach((tile) => {
            let sq = document.querySelector(`.r${tile[0]}.c${tile[1]}`);

            setTimeout(() => {
                sq.classList.add("win")
            }, 500)
            setTimeout(() => {
                sq.classList.remove("win")
            }, 1000)
            setTimeout(() => {
                sq.classList.add("win")
            }, 1500)
        });

    }


    const _privateFindWinningTiles = (char) => {
        let winStr = char.repeat(3)
        if (_privateGetDiagonalTopLeft(_privateTiles) === winStr) {
            return [
                [0, 0],
                [1, 1],
                [2, 2]
            ];
        } else if (_privateGetDiagonalTopRight(_privateTiles) === winStr) {
            return [
                [2, 0],
                [1, 1],
                [0, 2]
            ];
        }
        for (let i = 0; i < 3; i++) {
            if (winStr === _privateGetRow(i, _privateTiles)) {

                return [
                    [i, 0],
                    [i, 1],
                    [i, 2]
                ];
            }
            //return [i, 0], [i, 1], [i, 2]; }
            if (winStr === _privateGetCol(i, _privateTiles)) {

                return [
                    [0, i],
                    [1, i],
                    [2, i]
                ];
            }
        }
    }





    const _privateDrawTile = (row, col, char) => {

        let square = document.querySelector(`.r${row}.c${col}`);
        let newElem;
        if (!square.childNodes.length) {
            newElem = document.createElement("div")
            newElem.classList.add("mark");



        } else {
            newElem = square.lastChild;
        }
        if (char === "O") {
            newElem.classList.add("red");
            newElem.classList.remove("blue");
        } else if (char === "X") {
            newElem.classList.add("blue");
            newElem.classList.remove("red");
        }
        newElem.textContent = char;
        newElem.classList.add("tran");
        square.appendChild(newElem);
        setTimeout(() => newElem.classList.remove("tran"), 5000);
    }



    const _privateGetCol = (col, gameboard) => {
        return gameboard.reduce((a, c) => a + c[col], '')
    }
    const _privateGetDiagonalTopLeft = (gameboard) => {
        return gameboard[0][0] + gameboard[1][1] + gameboard[2][2]
    }
    const _privateGetDiagonalTopRight = (gameboard) => {
        return gameboard[0][2] + gameboard[1][1] + gameboard[2][0]
    }
    const _privateGetRow = (row, gameboard) => {
        return gameboard[row].reduce((a, c) => a + c, "")
    }
    const _privateWinInCols = (string, gameboard) => {
        for (let i = 0; i < 3; i++) {
            if (string === _privateGetCol(i, gameboard)) { return true; }
        }
        return false;
    }
    const _privateWinInRows = (string, gameboard) => {
        for (let i = 0; i < 3; i++) {
            if (string === _privateGetRow(i, gameboard)) { return true; }
        }
        return false;
    }
    const _privateWinInDiagonals = (string, gameboard) => {
        if (_privateGetDiagonalTopLeft(gameboard) === string || _privateGetDiagonalTopRight(gameboard) === string) { return true; }
        return false
    }




    const win = (char, gameboard = null) => {
        if (!gameboard) { gameboard = _privateTiles; }
        let winStr = char.repeat(3);
        return (_privateWinInCols(winStr, gameboard) || _privateWinInRows(winStr, gameboard) || _privateWinInDiagonals(winStr, gameboard))
    }



    const setTile = (row, col, char) => {
        if (_privateTiles[row][col] !== "") {

            return false
        }
        _moveCount++;
        _privateTiles[row][col] = char;
        _privateDrawTile(row, col, char);
        return true
    }





    const reset = () => {
        charSel = 0;
        _moveCount = 0;
        _privateClearTiles()


    }

    const test = (itr) => {
        _privateMinMax(_privateTiles, itr)

    }


    const setComputer = (difficulty) => {
        if (difficulty !== "easy" && difficulty != "none") {
            return
        }
        _privateComputerMode = difficulty

    }
    const getDifficulty = () => {
        return _privateComputerMode;
    }

    const getCurrentTurn = () => {
        return charList[charSel];
    }





    _privateCreateTiles();
    // test(1, 1, "c");
    return {
        win,
        setTile,
        print,
        reset,
        test,
        setComputer,
        getCurrentTurn,
        getDifficulty,

    }











})("none");

// gameboard.setTile(0, 0, "b")
// gameboard.setTile(0, 1, "b")


document.querySelector(".wrapper").addEventListener('click', e => {

    gameboard.reset()
    document.querySelector(".wrapper").classList.remove("won")
})


document.querySelector(".p2 i").addEventListener('click', e => {

    if (gameboard.getCurrentTurn() !== "X") {
        return
    }

    if (gameboard.getDifficulty() === "none") {
        e.target.style.color = "rgba(10,230,10,1)"
        gameboard.setComputer("easy")

    } else if (gameboard.getDifficulty() === "easy") {
        e.target.style.color = "rgba(128, 128, 128, 0.116)";
        gameboard.setComputer("none")

    }
});