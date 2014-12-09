EyePlay.controller('MController', ['$scope', '$modal',
    function ($scope, $modal) {

        var values = [];
        var spacesFlagged = 0;
        var remainingClicks;
        var bombsRemaining;
        var selectedSquare = false;
        var selectedButton;

//creates grid with html specs
        $scope.createGrid = function () {
            // pull values from number inputs
            var x = $("#gridRows").val();
            var y = $("#gridCols").val();
            var numBombs = $('#numMines').val();
            remainingClicks = x*y-numBombs;
            bombsRemaining = numBombs;
            spacesFlagged =0;
            $('.minesLeft').val(numBombs);
            for (i = 0; i < x; i++) {
                values[i] = new Array(y);
            }
            var gridLayout = $("#gridLayout");
            gridLayout.empty();
            //appends button for each grid location
            for (var i = 0; i < x; i++) {
                for (var j = 0; j < y; j++) {
                    values[i][j]=0;
                    var square = "<button id=" + i + ',' + j + " class='space'><span class='glyphicon'></span></button>";
                    gridLayout.append(square);
                }
                gridLayout.append("<br/>");
            }
            $scope.assignBombs();
            $scope.countBombs();
            $(".space").on("mousedown", $scope.eventHandler);

        };

// event Handler for when a button is mouseddown
        $scope.eventHandler = function(event) {
            switch (event.which) {
                case 1:
                    $scope.handleClick(this);
                    //$scope.checkBomb(this);
                    break;
                case 2:
                    alert('Middle mouse button pressed');
                    break;
                case 3:
                    //$scope.flagSquare(this);
                    break;
                default:
                    alert('You have a strange mouse');
            }
        };

        $scope.handleClick = function (button) {
            var span = $(button.children[0]);
            var x = $scope.parseId(button.id)[0];
            var y = $scope.parseId(button.id)[1];
            if(selectedSquare==false){
                $(button).addClass("selectedSpace");
                selectedSquare = true;
                selectedButton = button;
            }else {
                $(selectedButton).removeClass("selectedSpace");
                $(button).addClass("selectedSpace");
                selectedSquare = true;
                selectedButton = button;

            }

        };

        $scope.onAction = function (int) {
            if(int==1){
                $scope.checkBomb(selectedButton);
            }else{
                $scope.flagSquare(selectedButton);
                $(selectedButton).removeClass("selectedSquare");
            }
        };

// produces random int
        $scope.getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

//assigns bombs based on num from html
        $scope.assignBombs = function(){
            var numBombs = $('#numMines').val();
            var x = $("#gridRows").val();
            var y = $("#gridCols").val();
            var bombsPlaced = 0;
            while(bombsPlaced < numBombs){
                var xCord = $scope.getRandomInt(0,x-1);
                var yCord = $scope.getRandomInt(0,y-1);
                if(values[xCord][yCord]!="bomb"){
                    values[xCord][yCord]="bomb";
                    bombsPlaced++;
                }
            }
        };

// assigns adjacent spaces to an array to be checked for adjacent bombs
        $scope.countBombs = function(){
            var x = $("#gridRows").val();
            var y = $("#gridCols").val();
            var arr;
            for (var i = 0; i < x; i++) {
                for (var j = 0; j < y; j++) {
                    if (values[i][j] == "bomb") {
                        //top left corner
                        if(i==0 && j==0){
                            arr = [[i,j+1],[i+1,j],[i+1,j+1]];
                            // top right corner
                        } else if (i==0 && j==(y-1)) {
                            arr = [[i+1,j],[i,j-1],[i+1,j-1]];
                            // bottom left corner
                        } else if (i==(x-1) && j==0){
                            arr = [[i-1,j],[i-1,j+1],[i,j+1]];
                            // bottom right corner
                        } else if (i==(x-1) && j==(y-1)){
                            arr = [[i-1,j],[i-1,j-1],[i,j-1]];
                            //top row excluding corners
                        } else if (i==0 && (j!=0 && j!=(y-1))){
                            arr = [[i,j-1],[i,j+1],[i+1,j-1],[i+1,j],[i+1,j+1]];
                            // bottom row excluding corners
                        } else if(i==(x-1) && (j!=0 && j!=(y-1))){
                            arr = [[i,j-1],[i,j+1],[i-1,j-1],[i-1,j],[i-1,j+1]];
                            // left column excluding corners
                        } else if(j==0 && (i!=0 && i!=(x-1))){
                            arr = [[i-1,j],[i-1,j+1],[i,j+1],[i+1,j+1],[i+1,j]];
                            // right column excluding corners
                        } else if(j==(y-1) && (i!=0 && i!=(x-1))){
                            arr = [[i-1,j],[i-1,j-1],[i,j-1],[i+1,j-1],[i+1,j]];
                            // any other square
                        } else {
                            arr = [[i-1,j-1],[i-1,j],[i-1,j+1],[i,j+1],[i+1,j+1],[i+1,j],[i+1,j-1],[i,j-1]];
                        }
                        $scope.checkAdjacentBomb(arr);
                    }
                }
            }
        };

// checks for adjacent bombs and increments count if so
        $scope.checkAdjacentBomb = function(arr){
            for(var i = 0; i < arr.length ; i ++){
                var tmp = arr[i];
                if(values[tmp[0]][tmp[1]]!="bomb"){
                    values[tmp[0]][tmp[1]]++;
                }
            }
        };

        $scope.loss = function() {
            var modalInstance = $modal.open({
                templateUrl: '/Courses/comp426-f14/hajohn/COMP580/EyePlay//htmlPartials/loss.html',
                controller: 'ModalInstance'
            });
        };

// check if the space clicked represents a bomb
        $scope.checkBomb = function (button) {

            var span = $(button.children[0]);
            var x = $scope.parseId(button.id)[0];
            var y = $scope.parseId(button.id)[1];

            if (values[x][y]=="bomb" && !span.hasClass("glyphicon-flag")) {
                span.addClass("glyphicon-asterisk");
                $scope.loss();
                $(".space").off();

            } else {
                if(span.hasClass("glyphicon") && !span.hasClass("glyphicon-flag")){
                    span.removeClass("glyphicon");
                    if(values[x][y]!=0){
                        span.append(values[x][y]);
                    }
                    var str = "#" + x + "," + y;
                    $(button).addClass("clickedSpace");
                    span.addClass($scope.getNumClass(x,y));
                    remainingClicks--;
                    if(values[x][y]==0){
                        $scope.revealBoard(x,y);
                    }
                } else if (span.hasClass("glyphicon-flag")){
                    alert("space is flagged");
                }
            }
            if(remainingClicks==0){
                $scope.winnerWinner();
            }
        };

        $scope.getNumClass = function(x,y){
            var tmp = values[x][y];
            var color;
            if(tmp==1){
                color = "one";
            }else if(tmp==2){
                color = "two";
            }else if(tmp==3){
                color = "three";
            }else if(tmp==4){
                color = "four";
            }else if(tmp==5){
                color = "five";
            }else if(tmp==6){
                color = "six";
            }else if(tmp==7){
                color = "seven";
            }else if(tmp==8){
                color = "eight";
            }
            return color;
        };

// parses the id selector of spans
        $scope.parseId = function(str){
            var x, y;
            if(str.length==3){
                x=parseInt(str[0]);
                y=parseInt(str[2]);
            } else if (str.length==4){
                if(str[1]==","){
                    x=parseInt(str[0]);
                    y=parseInt((str[2]+str[3]));
                }else{
                    x=parseInt((str[0]+str[1]));
                    y=parseInt(str[3]);
                }
            } else {
                x=parseInt((str[0]+str[1]));
                y=parseInt((str[3]+str[4]));
            }
            return [x,y];
        };

// reveals adjacent squares that aren't bombs
        $scope.revealBoard = function (x, y) {
            var maxX = $("#gridRows").val();
            var maxY = $("#gridCols").val();
            var arr = [[x-1,y-1],[x-1,y],[x-1,y+1],[x,y+1],[x+1,y+1],[x+1,y],[x+1,y-1],[x,y-1]];
            for(var i = 0; i < arr.length ; i ++){
                var tmp = arr[i];
                if((tmp[0]>-1 && tmp[0]<maxX) && (tmp[1]>-1 && tmp[1]<maxY) && values[[tmp[0]][tmp[1]]]!="bomb"){
                    var str = tmp[0] + "," + tmp[1];
                        $scope.checkBomb(document.getElementById(str));
                }
            }
        };

// flags or unflags square based on conditionals
        $scope.flagSquare = function (button) {
            var span = $(button.children[0]);
            var x = $scope.parseId(button.id)[0];
            var y = $scope.parseId(button.id)[1];
            if (span.hasClass("glyphicon glyphicon-flag")) {
                if (values[x][y] == "bomb") {
                    bombsRemaining++;
                }
                span.removeClass("glyphicon-flag");
                spacesFlagged--;
                if(bombsRemaining==0 && spacesFlagged == $("#numMines").val()){
                    $scope.winnerWinner();
                }
            } else if (span.hasClass("glyphicon") && !span.hasClass("glyphicon-asterisk")) {
                span.addClass("glyphicon-flag");
                spacesFlagged++;
                if (values[x][y] == "bomb") {
                    bombsRemaining--;
                    if(bombsRemaining==0 && spacesFlagged == $("#numMines").val()){
                        $scope.winnerWinner();
                    }
                }
            }
            var totalMines = $("#numMines").val();
            $(".minesLeft").val(totalMines - spacesFlagged);

        };

// checks if num mines is valid
        $scope.checkMines = function () {
            var x = $("#gridRows").val();
            var y = $("#gridCols").val();
            var mines = $("#numMines").val();

            if (x * y <= mines) {
                alert("Too many mines");
                var num = x * y - 1;
                $("#numMines").val(num);
                $('.minesLeft').val(num);
            } else {
                $('.minesLeft').val(mines);
            }
            $scope.createGrid();
        };

        $scope.winnerWinner = function (){
            $scope.win();
            $(".space").off();

        };

        $scope.win = function() {
            var modalInstance = $modal.open({
                templateUrl: '/Courses/comp426-f14/hajohn/COMP580/EyePlay/htmlPartials/winner.html',
                controller: 'ModalInstance'
            });
        }
    }]);

