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




    const _privateAddClasses = (ele, classes) => {
        classes = classes.split(" ")
        for (let i = 0; i < classes.length; i++) {
            ele.classList.add(classes[i])
        }
        return ele;
    }


    const _privateComputerMove = () => {
        if (_privateComputerMode === "easy") {
            while (!setTile(Math.floor(Math.random() * 3), Math.floor(Math.random() * 3), "O")) {}
        }

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
        console.log(_privateTiles, "check")
        console.log("here")
        _privateTiles = _privateTiles.map(row => ["", "", ""])
        console.log(_privateTiles, "check")

    }

    const _privateCreateTiles = () => {
        console.log("here")
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
                                document.querySelector(".wrapper").style.backgroundColor = "rgba(0, 0, 100, .15)";
                            else
                                document.querySelector(".wrapper").style.backgroundColor = "rgba(100, 0, 0, 0.15)";


                        } else if (_privateTilesFilled()) {
                            setTimeout(() => document.querySelector(".wrapper").classList.add("won"), 3000)
                            document.querySelector(".wrapper").style.backgroundColor = "rgba(0, 0, 0, 0.145)";
                        } else if (_privateComputerMode === "none") {
                            charSel = (charSel - 1) ** 2
                        } else {
                            _privateComputerMove();
                            if (win("O")) {
                                console.log("loss")
                                _privateDrawWinningTiles("O");
                                _privatefillTiles(null);
                                setTimeout(() => document.querySelector(".wrapper").classList.add("won"), 3000)
                                if (charList[charSel] === "X")
                                    document.querySelector(".wrapper").style.backgroundColor = "rgba(0, 0, 100, .15)";
                                else
                                    document.querySelector(".wrapper").style.backgroundColor = "rgba(100, 0, 0, 0.15)";


                            } else if (_privateTilesFilled()) {
                                console.log("filled")
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

    const _privateTilesFilled = () => {
        for (let i = 0; i < _privateTiles.length; i++) {
            for (let j = 0; j < _privateTiles[i].length; j++) {
                if (_privateTiles[i][j] === "") {
                    return false
                }
            }

        }
        return true
    }





    const _privateDrawAWin = () => {

        Array.from(document.querySelectorAll(".sq")).forEach(sq => {
            console.log(sq);
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
        console.log(winStr);
        if (_privateGetDiagonalTopLeft() === winStr) {
            return [
                [0, 0],
                [1, 1],
                [2, 2]
            ];
        } else if (_privateGetDiagonalTopRight() === winStr) {
            return [
                [2, 0],
                [1, 1],
                [0, 2]
            ];
        }
        for (let i = 0; i < 3; i++) {
            if (winStr === _privateGetRow(i)) {
                console.log("vert")
                return [
                    [i, 0],
                    [i, 1],
                    [i, 2]
                ];
            }
            //return [i, 0], [i, 1], [i, 2]; }
            if (winStr === _privateGetCol(i)) {
                console.log("not-vert")
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



    const _privateGetCol = (col) => {
        return _privateTiles.reduce((a, c) => a + c[col], '')
    }
    const _privateGetDiagonalTopLeft = () => {
        return _privateTiles[0][0] + _privateTiles[1][1] + _privateTiles[2][2]
    }
    const _privateGetDiagonalTopRight = () => {
        return _privateTiles[0][2] + _privateTiles[1][1] + _privateTiles[2][0]
    }
    const _privateGetRow = (row) => {
        return _privateTiles[row].reduce((a, c) => a + c, "")
        ''
    }
    const _privateWinInCols = (string) => {
        for (let i = 0; i < 3; i++) {
            if (string === _privateGetCol(i)) { return true; }
        }
        return false;
    }
    const _privateWinInRows = (string) => {
        for (let i = 0; i < 3; i++) {
            if (string === _privateGetRow(i)) { return true; }
        }
        return false;
    }
    const _privateWinInDiagonals = (string) => {
        if (_privateGetDiagonalTopLeft() === string || _privateGetDiagonalTopRight() === string) { return true; }
        return false
    }




    const win = (char) => {
        let winStr = char.repeat(3);
        console.log(winStr);
        console.log(_privateWinInCols(winStr), _privateWinInRows(winStr), _privateWinInDiagonals(winStr))
        return (_privateWinInCols(winStr) || _privateWinInRows(winStr) || _privateWinInDiagonals(winStr))
    }


    const setTile = (row, col, char) => {
        console.log(_privateTiles[row][col], "see")
        if (_privateTiles[row][col] !== "") {
            console.log("ret false", char)
            return false
        }
        console.log("ret true", char)
        _privateTiles[row][col] = char;
        _privateDrawTile(row, col, char);
        return true
    }

    const print = () => {
        console.log(_privateTiles)
    }



    const reset = () => {
        charSel = 0;
        _privateClearTiles()

    }





    _privateCreateTiles();
    return {
        win,
        setTile,
        print,
        reset,

    }











})();


console.log(gameboard.win("x"))
gameboard.print();


document.querySelector(".wrapper").addEventListener('click', e => {
    console.log("restting")
    gameboard.reset()
    document.querySelector(".wrapper").classList.remove("won")
})