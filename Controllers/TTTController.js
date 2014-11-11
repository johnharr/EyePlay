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
                alert('Already game over.');
                return
            }
            setCell(row, column, $scope.player);
            checkBoard();
            var tmp = $scope.currentPlayer;
            $scope.currentPlayer = nextPlayer(tmp);
            $scope.player = nextPlayer(tmp);
        };
        $scope.newGame = function () {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    setCell(i, j, null)
                }
            }
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
                if(winner=="X"){
                    $scope.xWins++;
                }
                if(winner=="O"){
                    $scope.oWins++;
                }
                alert("The winner is " + winner);
            }

            // no more empty cell - no winner
            if (!empty) {
                $scope.winner = 'NONE';
                return
            }
        }

    }]);
