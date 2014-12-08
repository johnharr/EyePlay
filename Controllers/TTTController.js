EyePlay.controller('TTTController', ['$scope', '$modal',
    function ($scope, $modal) {
        $scope.currentPlayer = 'O';
        $scope.player = 'O';
        $scope.winner = null;
        $scope.oWins = 0;
        $scope.xWins = 0;
        $scope.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        $scope.cellClass = function (row, column) {
            var value = cell(row, column);
            return 'cell cell-' + value
        };
        $scope.cellText = function (row, column) {
            var value = cell(row, column);
            return value ? value : '-'
        };
        $scope.cellClick = function (row, column) {
            if ($scope.winner) {
                return;
            }

            //sees if space is occupied
            if (cell(row, column) != null) {
                return;
            }

            setCell(row, column, $scope.player);
            checkBoard();

            if ($scope.winner) {
                return;
            }
            var end = false;
            var close = false;
            end = checkWin();
            if (!end) {
                close = checkClose(row, column);
                if (!close) {
                    opponent()
                }
            }

            close = false;
            checkBoard();
        };

        $scope.newGame = function () {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    setCell(i, j, null)
                }
            }
            $('.winner').remove();
            $scope.currentPlayer = 'O';
            $scope.player = 'O';
            $scope.winner = null
        };

        // == utility functions ==

        // returns the value of cell
        function cell(row, column) {
            return $scope.board[row][column]
        }

        // sets the value of cell
        function setCell(row, column, value) {
            $scope.board[row][column] = value
        }

        // returns the next player
        function nextPlayer(player) {
            return {O: 'X', X: 'O'}[player]
        }

        function checkWin() {
            if (cell(0, 0) == 'X') {
                if (cell(0, 1) == 'X') {
                    if (cell(0, 2) == null) {
                        setCell(0, 2, 'X');
                        return true;
                    }
                }
                if (cell(0, 2) == 'X') {
                    if (cell(0, 1) == null) {
                        setCell(0, 1, 'X');
                        return true;
                    }
                }
                if (cell(1, 0) == 'X') {
                    if (cell(2, 0) == null) {
                        setCell(2, 0, 'X')
                        return true;
                    }
                }
                if (cell(2, 0) == 'X') {
                    if (cell(1, 0) == null) {
                        setCell(1, 0, 'X');
                        return true;
                    }
                }
                if (cell(1, 1) == 'X') {
                    if (cell(2, 2) == null) {
                        setCell(2, 2, 'X')
                        return true;
                    }
                }
                if (cell(2, 2) == 'X') {
                    if (cell(1, 1) == null) {
                        setCell(1, 1, 'X');
                        return true;
                    }
                }
            }


            if (cell(0, 1) == 'X') {
                if (cell(0, 2) == 'X') {
                    if (cell(0, 0) == null) {
                        setCell(0, 0, 'X');
                        return true;
                    }
                }
                if (cell(1, 1) == 'X') {
                    if (cell(2, 1) == null) {
                        setCell(2, 1, 'X');
                        return true;
                    }
                }
                if (cell(2, 1) == 'X') {
                    if (cell(1, 1) == null) {
                        setCell(1, 1, 'X');
                        return true;
                    }
                }
            }

            if (cell(0, 2) == 'X') {
                if (cell(1, 2) == 'X') {
                    if (cell(2, 2) == null) {
                        setCell(2, 2, 'X');
                        return true;
                    }
                }
                if (cell(2, 2) == 'X') {
                    if (cell(1, 2) == null) {
                        setCell(1, 2, 'X');
                        return true;
                    }
                }
                if (cell(1, 1) == 'X') {
                    if (cell(2, 0) == null) {
                        setCell(2, 0, 'X');
                        return true;
                    }
                }
                if (cell(2, 0) == 'X') {
                    if (cell(1, 1) == null) {
                        setCell(1, 1, 'X');
                        return true;
                    }
                }
            }
            if (cell(1, 0) == 'X') {
                if (cell(1, 1) == 'X') {
                    if (cell(1, 2) == null) {
                        setCell(1, 2, 'X');
                        return true;
                    }
                }
                if (cell(1, 2) == 'X') {
                    if (cell(1, 1) == null) {
                        setCell(1, 1, 'X')
                        return true;
                    }
                }
                if (cell(2, 0) == 'X') {
                    if (cell(0, 0) == null) {
                        setCell(0, 0, 'X')
                        return true;
                    }
                }
            }

            if (cell(1, 1) == 'X') {
                if (cell(1, 2) == 'X') {
                    if (cell(1, 0) == null) {
                        setCell(1, 0, 'X')
                        return true;
                    }
                }
                if (cell(2, 1) == 'X') {
                    if (cell(0, 1) == null) {
                        setCell(0, 1, 'X')
                        return true;
                    }
                }
                if (cell(2, 2) == 'X') {
                    if (cell(0, 0) == null) {
                        setCell(0, 0, 'X')
                        return true;
                    }
                }

                if (cell(2, 0) == 'X') {
                    if (cell(0, 2) == null) {
                        setCell(0, 2, 'X')
                        return true;
                    }
                }
            }
            if (cell(1, 2) == 'X') {
                if (cell(2, 2) == 'X') {
                    if (cell(0, 2) == null) {
                        setCell(0, 2, 'X')
                        return true;
                    }
                }
            }
            if (cell(2, 0) == 'X') {
                if (cell(2, 1) == 'X') {
                    if (cell(2, 2) == null) {
                        setCell(2, 2, 'X');
                        return true;
                    }
                }
            }
        }


        function checkClose() {
            if (cell(0, 0) == 'O') {
                if (cell(0, 1) == 'O') {
                    if (cell(0, 2) == null) {
                        setCell(0, 2, 'X');
                        return true;
                    }
                }
                if (cell(0, 2) == 'O') {
                    if (cell(0, 1) == null) {
                        setCell(0, 1, 'X');
                        return true;
                    }
                }
                if (cell(1, 0) == 'O') {
                    if (cell(2, 0) == null) {
                        setCell(2, 0, 'X')
                        return true;
                    }
                }
                if (cell(2, 0) == 'O') {
                    if (cell(1, 0) == null) {
                        setCell(1, 0, 'X');
                        return true;
                    }
                }
                if (cell(1, 1) == 'O') {
                    if (cell(2, 2) == null) {
                        setCell(2, 2, 'X')
                        return true;
                    }
                }
                if (cell(2, 2) == 'O') {
                    if (cell(1, 1) == null) {
                        setCell(1, 1, 'X');
                        return true;
                    }
                }
            }


            if (cell(0, 1) == 'O') {
                if (cell(0, 2) == 'O') {
                    if (cell(0, 0) == null) {
                        setCell(0, 0, 'X');
                        return true;
                    }
                }
                if (cell(1, 1) == 'O') {
                    if (cell(2, 1) == null) {
                        setCell(2, 1, 'X');
                        return true;
                    }
                }
                if (cell(2, 1) == 'O') {
                    if (cell(1, 1) == null) {
                        setCell(1, 1, 'X');
                        return true;
                    }
                }
            }

            if (cell(0, 2) == 'O') {
                if (cell(1, 2) == 'O') {
                    if (cell(2, 2) == null) {
                        setCell(2, 2, 'X');
                        return true;
                    }
                }
                if (cell(2, 2) == 'O') {
                    if (cell(1, 2) == null) {
                        setCell(1, 2, 'X');
                        return true;
                    }
                }
                if (cell(1, 1) == 'O') {
                    if (cell(2, 0) == null) {
                        setCell(2, 0, 'X');
                        return true;
                    }
                }
                if (cell(2, 0) == 'O') {
                    if (cell(1, 1) == null) {
                        setCell(1, 1, 'X');
                        return true;
                    }
                }
            }
            if (cell(1, 0) == 'O') {
                if (cell(1, 1) == 'O') {
                    if (cell(1, 2) == null) {
                        setCell(1, 2, 'X');
                        return true;
                    }
                }
                if (cell(1, 2) == 'O') {
                    if (cell(1, 1) == null) {
                        setCell(1, 1, 'X')
                        return true;
                    }
                }
                if (cell(2, 0) == 'O') {
                    if (cell(0, 0) == null) {
                        setCell(0, 0, 'X')
                        return true;
                    }
                }
            }

            if (cell(1, 1) == 'O') {
                if (cell(1, 2) == 'O') {
                    if (cell(1, 0) == null) {
                        setCell(1, 0, 'X')
                        return true;
                    }
                }
                if (cell(2, 1) == 'O') {
                    if (cell(0, 1) == null) {
                        setCell(0, 1, 'X')
                        return true;
                    }
                }
                if (cell(2, 2) == 'O') {
                    if (cell(0, 0) == null) {
                        setCell(0, 0, 'X')
                        return true;
                    }
                }

                if (cell(2, 0) == 'O') {
                    if (cell(0, 2) == null) {
                        setCell(0, 2, 'X')
                        return true;
                    }
                }
            }
            if (cell(1, 2) == 'O') {
                if (cell(2, 2) == 'O') {
                    if (cell(0, 2) == null) {
                        setCell(0, 2, 'X')
                        return true;
                    }
                }
            }
            if (cell(2, 0) == 'O') {
                if (cell(2, 1) == 'O') {
                    if (cell(2, 2) == null) {
                        setCell(2, 2, 'X');
                        return true;
                    }
                }
            }
        }


        //randomly places opponent
        function opponent() {
            var row = Math.floor(Math.random() * 3);
            var column = Math.floor(Math.random() * 3);
            var value = 'X';

            while (cell(row, column) != null) {
                var row = Math.floor(Math.random() * 3);
                var column = Math.floor(Math.random() * 3);
            }
            setCell(row, column, value);
        }

        // checks the board and declare winner
        function checkBoard() {
            var winner, empty = false;
            // check for any empty cell
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (!cell(i, j)) empty = true
                }
            }

            // check board vertically and horizontally
            for (var i = 0; i < 3; i++) {
                if (cell(i, 0) && cell(i, 0) == cell(i, 1) && cell(i, 1) == cell(i, 2)) {
                    winner = cell(i, 0)
                }
                if (cell(0, i) && cell(0, i) == cell(1, i) && cell(1, i) == cell(2, i)) {
                    winner = cell(0, i)
                }
            }
            // check board diagonally
            if (cell(0, 0) && cell(0, 0) == cell(1, 1) && cell(1, 1) == cell(2, 2)) {
                winner = cell(0, 0)
            }
            if (cell(0, 2) && cell(0, 2) == cell(1, 1) && cell(1, 1) == cell(2, 0)) {
                winner = cell(0, 2)
            }
            // winner? declare!
            if (winner) {
                $scope.winner = winner;
                if (winner == "X") {
                    $scope.xWins++;
                }
                if (winner == "O") {
                    $scope.oWins++;
                }
                $('body').prepend('<div class = "winner">The winner is ' + winner + '</div>');
            }

            // no more empty cell - no winner
            if (!empty) {
                $scope.winner = 'NONE';
                return
            }
        }

    }

])
;
