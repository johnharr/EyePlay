
Authors -- 
Jonathan Gaegler: gaegler@email.unc.edu
John Harrison: hajohn@email.unc.edu
Link: http://www.cs.unc.edu/Courses/comp426-f14/hajohn/COMP580/EyePlay/


Purpose -- 
This is a project for users with disabilities. The purpose is to give people using Eye Gaze technology a chance to use their device in a fun environment without stressing over the difficulties of the device.
We were informed about the lack of resources to learn how to use Eye Gaze. Eye Gaze is a device for children who do not have complete motor control and allows them to interact with a screen using eye movements instead of a mouse. Most of the resources for learning to use the device were not entertaining, and were thus not used to practice. The games we implemented are games that most people already know how to play, are easy to start and do not last very long to keep the user from getting bored.



Motivation -- 
We were motivated to complete this project by the opportunity presented by Hannah in lecture.  Hannah’s sister, Lexi, is the reason we are completing this project.  We wanted to build a project for someone who we could directly affect in a positive way.

Instructions -- 

The website is fairly straight forward. After loading the page, there are three games that can be selected from the top of the browser. There is also an about section located in the top right corner.


Tic-Tac-Toe
The user is always the first to move and is represented by the letter ‘O’. The computer will then follow up by placing an ‘X’ in a space that is an above average move (not unbeatable) at that particular time. The game is over when either player has three pieces in a row either horizontally, vertically or diagonally. Score is also kept on the bottom. At any point, the user can click the ‘New Game’ button located on the left or right side of the screen to reset the board. 

Connect 4
The goal of this game is to connect four of your pieces in a row either horizontally, vertically or diagonally. The user will hover over a column and the piece will stack on top of all other pieces in that column. This is a two player game with each player alternating after each turn. The game can be reset by clicking the ‘restart’ button located at the bottom of the browser. The pieces will light up when a player connects four in a row.

Minesweeper
The goal of this game is to reveal all spaces that do not contain bombs. After clicking on a tile, a player can either reveal or flag a piece on the board by selecting the respective buttons on the side of the browser. If the user selects an incorrect space, they can simply select a different piece. A flag represents a space that the player believes holds a bomb underneath. There are always eight bombs generated with the number in the top left and right corner representing the total number of bombs remaining. The number on a revealed tile indicates the number of bombs in the surrounding spaces. Clicking the start button resets (or creates) the board by randomizing the mine positions. If a player reveals a bomb the game is over.

Implementation --
General
This project was coded using HTML5, CSS, and JavaScript utilizing the Angular framework and jQuery library.
HTML partials were used to create each instance.
Bootstrap was used to create the general layout of the site.
The Workspace files are setup as follows:
* Assets (outside sources)
o Angular
o Bootstrap
o Images
o jQuery
* Angular Controllers
o C4Controller.js
o MController.js
o TTTController.js
o ModalInstance.js
* htmlPartials
o about.html
o c4.html
o loss.html
o mine.html
o ttt.html
o winner.html
* index.html
* main.js
* style.css

Tic-Tac-Toe
For tic-tac-toe, the board was created and stored using a 3 by 3 array. After each turn by the player, the AI calculates which move is best. The first best move is to win the game by connecting three in a row and the next best move is to block the opponent from winning the next round. The third best move is to randomly fill an empty space. This was done by checking every case of moves on the board (i.e. if [0][0] and [0][1] are both ‘X’ and [0][2] is empty, the computer will play in [0][2]).
The controller will then check the board to see if there are 3 of the same letter in a row and if all of the spaces are full. If either of those cases are true, the game is over and new game must be pressed to reset the instance of this game. 
There are helper functions that act as getters and setters for the board.

Connect 4
For Connect 4, the html of the board is setup as an arrangement of <div>s that are stacked on top of and beside each other to create a board like view.  Each column of these <div>s are representative of a column on the board.  The board is similarly represented as a 2d array in the JavaScript and allows us to check through the state of the board very easily.  Event handlers are bound to the user’s click which is registered when a user clicks a column instead of a single block.  

Minesweeper
For minesweeper, the board is represented by a collection of buttons which are dynamically appended using jQuery and all have the location of their “spot” on the board stored in the id of the button.  With this, each button has an event handler on it.  This allows us to harvest the id from each button on click and route actions to subsequent functions.   Depending on which action is clicked the board then “reveals” itself by propagating the click out appropriately or by “flagging” a space.


Roles --
Game engine for Tic-Tac-Toe was developed by Jonathan Gaegler.
Game engine for Minesweeper was developed by John Harrison.
Game engine for Connect 4 was a collaborative effort.
UI layout design and CSS was a collaborative effort.


Comp 5800EyePlay Readme012/9/14

