/*
	Web Programming Section 1
	Project 3

	This is the game javascript file for the fifteen puzzle game.
*/
//call for table id
var table = document.getElementById("puzzle");

//starting tile number
var index = 1;

//create movecoutner

var moveCounter = 0;

//base x coordinate for image
var xCoord = 0;
//base y coordinate for image
var yCoord = 0;

//default values
var chosenImg = "";
var userReply = "";

//value for when the page first loads
var firstLoading = 0;

//background list
var imgList = new Array();
imgList[0] = "url('cat.jpg')";
imgList[1] = "url('dog.jpg')";
imgList[2] = "url('bunny.jpg')";
imgList[3] = "url('bird.jpg')";

//runs load function when site is first loaded
function load() {
  //confirms default value
  firstLoading = 0;
  //runs playGame function to create a puzzle
  playGame();
}

//run to create puzzle table
function playGame() {
  //default user input

  userReply = "cat";
  //if site is loading for the first time, choose a random image for the puzzle table
  if (firstLoading == 0) {
    //get a number from 0 to 3
    var randomImg = Math.floor(Math.random() * 4);
    //if number is 0
    if (randomImg == 0) {
      //place input as cat
      userReply = "cat";
    }
    //if number is 1
    else if (randomImg == 1) {
      //place input as dog
      userReply = "dog";
    }
    //if number is 2
    else if (randomImg == 2) {
      //place input as bunny
      userReply = "bunny";
    }
    //if number is 3
    else if (randomImg == 3) {
      //place input as bird
      userReply = "bird";
    }
    //as a precaution, a default value of cat is given
    else {
      userReply = "cat";
    }
    //page has loaded, so increment by 1 so it does not enter this part of the code again
    firstLoading++;
  }
  //otherwise
  else {
    //get actual user input from the text box
    userReply = document.getElementById("picNum").value;
  }
  //default values
  chosenImg = "";
  index = 1;
  //if puzzle table has been created before, delete it for the new requested puzzle table
  if (table.rows.length != 0) {
    while (table.rows.length > 0) {
      table.deleteRow(0);
    }
  }
  //if user did not enter a valid input, reprompt them to enter a valid input and stop
  if (
    userReply != "cat" &&
    userReply != "dog" &&
    userReply != "bunny" &&
    userReply != "bird"
  ) {
    alert("Please enter cat, dog, bunny, or bird.");
    reset();
  }
  //otherwise if valid input is given
  else {
    //if cat
    if (userReply == "cat") {
      //set chosen image value to cat
      chosenImg = imgList[0];
    }
    //if dog
    else if (userReply == "dog") {
      //set chosen image value to dog
      chosenImg = imgList[1];
    }
    //if bunny
    else if (userReply == "bunny") {
      //set chosen image value to bunny
      chosenImg = imgList[2];
    }
    //if bird
    else if (userReply == "bird") {
      //set chosen image value to bird
      chosenImg = imgList[3];
    } else {
      chosenImg = imgList[0];
    }
    //for loop that runs for four rows
    for (var x = 0; x < 4; x++) {
      //make a row each loop
      var row = table.insertRow(table.length);
      //for loop that runs for four cells per row with a part of the image
      for (var y = 0; y < 4; y++) {
        //make a cell each time
        var col = row.insertCell(y);
        //set the cell's HTML to number of tile
        col.innerHTML = "<div>" + index + "</div>";
        //set the cell's background to part of the image
        col.style.cssText =
          "background-image: " +
          chosenImg +
          "; background-position: " +
          xCoord +
          "px " +
          yCoord +
          "px";
        //shift x coordinate by 100px
        xCoord -= 100;
        //add square class to cell
        col.classList.add("square");
        //add click listener to cell for move function
        table.rows[x].cells[y].addEventListener("click", function () {
          move(this.parentNode.rowIndex, this.cellIndex);
        });
        //increase tile number for next cell
        index++;
        //if last cell, empty contents
        if (index == 17) {
          col.style.backgroundImage = "";
          col.innerHTML = "";
          continue;
        }
      }
      //shift y coordinate by 100px
      yCoord -= 100;
      //reset x coordinate for next loop
      xCoord = 0;
    }
  }
  //call function to find new neighboring tiles
  aroundEmptyTile();
}

//default values for second cell - for comparison
var otherIndex = 0;
var otherImage = 0;
var currentIndex = 0;
var currentCSS = 0;

//function check() {
//if((table.rows[x+1].cells[y].innerHTML == "") || (table.rows[x-1].cells[y].innerHTML == "") || (table.rows[x].cells[y+1].innerHTML == "") || (table.rows[x].cells[y-1].innerHTML == "")) {
//return true;
//	document.getElementById("puzzle").onmouseover = function() {mouseOver()};
//document.getElementById("puzzle").onmouseout = function() {mouseOut()};
//}else{
//	return false;
//}
//}

//clear hover class from old tiles
function resetNeighbor(x, y) {
  //run through all rows in puzzle
  for (var x = 0; x < 4; x++) {
    //run through the cells in rows
    for (var y = 0; y < 4; y++) {
      //if it has the hover class
      if (table.rows[x].cells[y].classList.contains("moveablepiece")) {
        //remove the class
        table.rows[x].cells[y].classList.remove("moveablepiece");
      }
    }
  }
}

//move tile function
function move(x, y) {
  //if end row
  if (x == table.rows.length - 1) {
    //if right corner
    if (y == table.rows[0].cells.length - 1) {
      //check left
      checkLeft(x, y);
    }
    //if left corner
    else if (y == 0) {
      //check right
      checkRight(x, y);
    }
    //otherwise
    else {
      //check both left and right
      checkLeft(x, y);
      checkRight(x, y);
    }
    //check above in all cases
    checkAbove(x, y);
  }
  //if top row
  else if (x == 0) {
    //if right corner
    if (y == table.rows[0].cells.length - 1) {
      //check left
      checkLeft(x, y);
    }
    //if left corner
    else if (y == 0) {
      //check right
      checkRight(x, y);
    }
    //otherwise
    else {
      //check both left and right
      checkLeft(x, y);
      checkRight(x, y);
    }
    //check below in all cases
    checkBelow(x, y);
  }
  //otherwise in middle rows
  else {
    //if right end
    if (y == table.rows[0].cells.length - 1) {
      //check left
      checkLeft(x, y);
    }
    //if left end
    else if (y == 0) {
      //check right
      checkRight(x, y);
    }
    //otherwise
    else {
      //check both left and right
      checkLeft(x, y);
      checkRight(x, y);
    }
    //check above and below in all cases
    checkAbove(x, y);
    checkBelow(x, y);
  }
}
/////////////////////////////////////////////////////////////////////
//									Animation function

//Takes coordinates of blank tile and movable tile as param

//Downward animation
function downardSwitch(x, y) {
  //get cells to be swithed
  var current = table.rows[x].cells[y];
  var empty = table.rows[x + 1].cells[y];

  //incremenet moveCounter
  moveCounter++;

  //get positionsto change
  var top = window.getComputedStyle(current, null).getPropertyValue("top");
  top = Math.round(top.substr(0, top.indexOf("p")));

  var h1 = window.getComputedStyle(current, null).getPropertyValue("height");
  h = Math.round(h1.substr(0, h1.indexOf("p")));

  // start animation
  var id = setInterval(frame, 3);
  function frame() {
    if (top >= h + 8) {
      clearInterval(id);
      table.rows[x].cells[y].innerHTML = otherIndex;
      table.rows[x].cells[y].style.cssText = otherImage;
      table.rows[x + 1].cells[y].innerHTML = currentIndex;
      table.rows[x + 1].cells[y].style.cssText = currentCSS;
      //reset neighbor tiles
      resetNeighbor(x, y);
      //find new neighbor tiles
      aroundEmptyTile();
      //check if puzzle is completed
      checkWin();
    } else {
      top++;
      current.style.top = top + "px";
    }
  }
}

//Upard animation
function upwwardSwitch(x, y) {
  //get cells to be swithed
  var current = table.rows[x].cells[y];
  var empty = table.rows[x - 1].cells[y];

  //incremenet moveCounter
  moveCounter++;

  //get positionsto change
  var bottom = window
    .getComputedStyle(current, null)
    .getPropertyValue("bottom");
  bottom = Math.round(bottom.substr(0, bottom.indexOf("p")));

  var h1 = window.getComputedStyle(current, null).getPropertyValue("height");
  h = Math.round(h1.substr(0, h1.indexOf("p")));

  // start animation
  var id = setInterval(frame, 3);
  function frame() {
    if (bottom >= h + 8) {
      clearInterval(id);
      //switch current tile values to the above tile's values
      table.rows[x].cells[y].innerHTML = otherIndex;
      table.rows[x].cells[y].style.cssText = otherImage;

      // switch the above tile values to the current tile's initial values
      table.rows[x - 1].cells[y].innerHTML = currentIndex;
      table.rows[x - 1].cells[y].style.cssText = currentCSS;
      //reset neighbor tiles
      resetNeighbor(x, y);
      //find new neighbor tiles
      aroundEmptyTile();
      //check if puzzle is completed
      checkWin();
    } else {
      bottom++;
      current.style.bottom = bottom + "px";
    }
  }
}

//rightward animation
function rightwardSwitch(x, y) {
  //get cells to be swithed
  var current = table.rows[x].cells[y];
  var empty = table.rows[x].cells[y + 1];

  //incremenet moveCounter
  moveCounter++;

  //get positionsto change
  var left = window.getComputedStyle(current, null).getPropertyValue("left");
  left = Math.round(left.substr(0, left.indexOf("p")));

  var w1 = window.getComputedStyle(current, null).getPropertyValue("width");
  w = Math.round(w1.substr(0, w1.indexOf("p")));

  // start animation
  var id = setInterval(frame, 3);
  function frame() {
    if (left >= w + 8) {
      clearInterval(id);
      //switch current tile values to the above tile's values
      table.rows[x].cells[y].innerHTML = otherIndex;
      table.rows[x].cells[y].style.cssText = otherImage;
      //
      // //switch the above tile values to the current tile's initial values
      table.rows[x].cells[y + 1].innerHTML = currentIndex;
      table.rows[x].cells[y + 1].style.cssText = currentCSS;
      //reset neighbor tiles
      resetNeighbor(x, y);
      //find new neighbor tiles
      aroundEmptyTile();
      //check if puzzle is completed
      checkWin();
    } else {
      left++;
      current.style.left = left + "px";
    }
  }
}

//lefttward animation
function leftwardSwitch(x, y) {
  //get cells to be swithed
  var current = table.rows[x].cells[y];
  var empty = table.rows[x].cells[y - 1];

  //incremenet moveCounter
  moveCounter++;

  //get positionsto change
  var right = window.getComputedStyle(current, null).getPropertyValue("right");
  right = Math.round(right.substr(0, right.indexOf("p")));

  var w1 = window.getComputedStyle(current, null).getPropertyValue("width");
  w = Math.round(w1.substr(0, w1.indexOf("p")));

  // start animation
  var id = setInterval(frame, 3);
  function frame() {
    if (right >= w + 8) {
      clearInterval(id);
      //switch current tile values to the above tile's values
      table.rows[x].cells[y].innerHTML = otherIndex;
      table.rows[x].cells[y].style.cssText = otherImage;
      //
      // //switch the above tile values to the current tile's initial values
      table.rows[x].cells[y - 1].innerHTML = currentIndex;
      table.rows[x].cells[y - 1].style.cssText = currentCSS;
      //reset neighbor tiles
      resetNeighbor(x, y);
      //find new neighbor tiles
      aroundEmptyTile();
      //check if puzzle is completed
      checkWin();
    } else {
      right++;
      current.style.right = right + "px";
    }
  }
}

///////////////////////////////////////////////////////////////////

//switch tiles if the tile below the current tile is empty
function checkBelow(x, y) {
  //if the tile below is empty
  if (table.rows[x + 1].cells[y].innerHTML == "") {
    downardSwitch(x, y);
    //set other values to above tile
    otherIndex = table.rows[x + 1].cells[y].innerHTML;
    otherImage = table.rows[x + 1].cells[y].style.cssText;

    //set current values to current tile
    currentIndex = table.rows[x].cells[y].innerHTML;
    currentCSS = table.rows[x].cells[y].style.cssText;

    //switch current tile values to the above tile's values
    // table.rows[x].cells[y].innerHTML = otherIndex;
    // table.rows[x].cells[y].style.cssText = otherImage;
    //
    // //switch the above tile values to the current tile's initial values
    // table.rows[x+1].cells[y].innerHTML = currentIndex;
    // table.rows[x+1].cells[y].style.cssText = currentCSS;
  }
}

//switch tiles if the tile above the current tile is empty
function checkAbove(x, y) {
  //if the tile above is empty
  if (table.rows[x - 1].cells[y].innerHTML == "") {
    upwwardSwitch(x, y);
    //set other values to above tile
    otherIndex = table.rows[x - 1].cells[y].innerHTML;
    otherImage = table.rows[x - 1].cells[y].style.cssText;

    //set current values to current tile
    currentIndex = table.rows[x].cells[y].innerHTML;
    currentCSS = table.rows[x].cells[y].style.cssText;

    //switch current tile values to the above tile's values
    // table.rows[x].cells[y].innerHTML = otherIndex;
    // table.rows[x].cells[y].style.cssText = otherImage;

    //switch the above tile values to the current tile's initial values
    // table.rows[x-1].cells[y].innerHTML = currentIndex;
    // table.rows[x-1].cells[y].style.cssText = currentCSS;
  }
}

//switch tiles if the tile to the right of the current tile is empty
function checkRight(x, y) {
  //if the tile to the right is empty
  if (table.rows[x].cells[y + 1].innerHTML == "") {
    rightwardSwitch(x, y);
    //set other values to above tile
    otherIndex = table.rows[x].cells[y + 1].innerHTML;
    otherImage = table.rows[x].cells[y + 1].style.cssText;

    //set current values to current tile
    currentIndex = table.rows[x].cells[y].innerHTML;
    currentCSS = table.rows[x].cells[y].style.cssText;

    //switch current tile values to the above tile's values
    // table.rows[x].cells[y].innerHTML = otherIndex;
    // table.rows[x].cells[y].style.cssText = otherImage;
    //
    // //switch the above tile values to the current tile's initial values
    // table.rows[x].cells[y+1].innerHTML = currentIndex;
    // table.rows[x].cells[y+1].style.cssText = currentCSS;
  }
}

//switch tiles if the tile to the left of the current tile is empty
function checkLeft(x, y) {
  //if the tile to the left is empty
  if (table.rows[x].cells[y - 1].innerHTML == "") {
    leftwardSwitch(x, y);
    //set other values to above tile
    otherIndex = table.rows[x].cells[y - 1].innerHTML;
    otherImage = table.rows[x].cells[y - 1].style.cssText;

    //set current values to current tile
    currentIndex = table.rows[x].cells[y].innerHTML;
    currentCSS = table.rows[x].cells[y].style.cssText;

    //switch current tile values to the above tile's values
    // table.rows[x].cells[y].innerHTML = otherIndex;
    // table.rows[x].cells[y].style.cssText = otherImage;
    //
    // //switch the above tile values to the current tile's initial values
    // table.rows[x].cells[y-1].innerHTML = currentIndex;
    // table.rows[x].cells[y-1].style.cssText = currentCSS;
  } else {
    //alert("left doesn't work!");
  }
}

/* Below is the code used to highlight neighboring tiles of the empty tile when a mouse is hovered over it. */

//function to find empty tile and its neighbors
function aroundEmptyTile() {
  for (var x = 0; x < 4; x++) {
    //run through the cells in rows
    for (var y = 0; y < 4; y++) {
      //if empty tile is found
      if (table.rows[x].cells[y].innerHTML == "") {
        colorTiles(x, y);
      }
    }
  }
}

//function to color neighboring tiles on hover
function colorTiles(x, y) {
  //if end row
  if (x == table.rows.length - 1) {
    //if right corner
    if (y == table.rows[0].cells.length - 1) {
      //check left
      hoverLeft(x, y);
    }
    //if left corner
    else if (y == 0) {
      //check right
      hoverRight(x, y);
    }
    //otherwise
    else {
      //check both left and right
      hoverLeft(x, y);
      hoverRight(x, y);
    }
    //check above in all cases
    hoverAbove(x, y);
  }
  //if top row
  else if (x == 0) {
    //if right corner
    if (y == table.rows[0].cells.length - 1) {
      //check left
      hoverLeft(x, y);
    }
    //if left corner
    else if (y == 0) {
      //check right
      hoverRight(x, y);
    }
    //otherwise
    else {
      //check both left and right
      hoverLeft(x, y);
      hoverRight(x, y);
    }
    //check below in all cases
    hoverBelow(x, y);
  }
  //otherwise in middle rows
  else {
    //if right end
    if (y == table.rows[0].cells.length - 1) {
      //check left
      hoverLeft(x, y);
    }
    //if left end
    else if (y == 0) {
      //check right
      hoverRight(x, y);
    }
    //otherwise
    else {
      //check both left and right
      hoverLeft(x, y);
      hoverRight(x, y);
    }
    //check above and below in all cases
    hoverAbove(x, y);
    hoverBelow(x, y);
  }
}

//check if there is a neighbor tile below the empty tile
function hoverBelow(x, y) {
  if (table.rows[x + 1].cells[y] != "") {
    //add hover effect if so
    table.rows[x + 1].cells[y].classList.add("moveablepiece");
  }
}

//check if there is a neighbor tile above the empty tile
function hoverAbove(x, y) {
  if (table.rows[x - 1].cells[y] != "") {
    //add hover effect if so
    table.rows[x - 1].cells[y].classList.add("moveablepiece");
  }
}

//check if there is a neighbor tile to the right of the empty tile
function hoverRight(x, y) {
  if (table.rows[x].cells[y + 1] != "") {
    //add hover effect if so
    table.rows[x].cells[y + 1].classList.add("moveablepiece");
  }
}

//check if there is a neighbor tile to the left of the empty tile
function hoverLeft(x, y) {
  if (table.rows[x].cells[y - 1] != "") {
    //add hover effect if so
    table.rows[x].cells[y - 1].classList.add("moveablepiece");
  }
}

/* Below is the code used to shuffle the tiles of the puzzle game. */

//default values
var count = 0;
var neighborsX = new Array();
var neighborsY = new Array();
var tileIndex = 0;

//shuffle function
function shuffleMe() {
  //while count is less than 1000 (will swap tiles 1000 times)
  while (count < 1000) {
    //run through all rows of the puzzle
    for (var x = 0; x < 4; x++) {
      //run through the cells in rows
      for (var y = 0; y < 4; y++) {
        //if empty tile is found
        if (table.rows[x].cells[y].innerHTML == "") {
          //call findNeighbors function to find potential swaps
          findNeighbors(x, y);
        }
      }
    }
    //add 1 to counter each time a tile swap is made
    count++;
  }
  //reset count to zero
  count = 0;
  //run through all the rows of the puzzle table
  for (var x = 0; x < 4; x++) {
    //run through the cells in rows
    for (var y = 0; y < 4; y++) {
      //clear old tiles with the class
      table.rows[x].cells[y].classList.remove("moveablepiece");
    }
  }
  //call function to find new neighboring tiles
  aroundEmptyTile();
  //reset timer
  resetTimer();
}

//find neighboring tiles to swap with
function findNeighbors(x, y) {
  //if end row
  if (x == table.rows.length - 1) {
    //if right corner
    if (y == table.rows[0].cells.length - 1) {
      //check left
      checkLeftOfEmpty(x, y);
    }
    //if left corner
    else if (y == 0) {
      //check right
      checkRightOfEmpty(x, y);
    }
    //otherwise
    else {
      //check both left and right
      checkLeftOfEmpty(x, y);
      checkRightOfEmpty(x, y);
    }
    //check above in all cases
    checkAboveOfEmpty(x, y);
  }
  //if top row
  else if (x == 0) {
    //if right corner
    if (y == table.rows[0].cells.length - 1) {
      //check left
      checkLeftOfEmpty(x, y);
    }
    //if left corner
    else if (y == 0) {
      //check right
      checkRightOfEmpty(x, y);
    }
    //otherwise
    else {
      //check both left and right
      checkLeftOfEmpty(x, y);
      checkRightOfEmpty(x, y);
    }
    //check below in all cases
    checkBelowOfEmpty(x, y);
  }
  //otherwise in middle rows
  else {
    //if right end
    if (y == table.rows[0].cells.length - 1) {
      //check left
      checkLeftOfEmpty(x, y);
    }
    //if left end
    else if (y == 0) {
      //check right
      checkRightOfEmpty(x, y);
    }
    //otherwise
    else {
      //check both left and right
      checkLeftOfEmpty(x, y);
      checkRightOfEmpty(x, y);
    }
    //check above and below in all cases
    checkAboveOfEmpty(x, y);
    checkBelowOfEmpty(x, y);
  }
  //find a random neighboring tile to swap the empty tile with
  tileIndex = Math.floor(Math.random() * neighborsX.length);
  //call function to actually swap the tiles
  swapTiles(x, y, tileIndex);
}

//check if there is a neighboring tile below the empty tile
function checkBelowOfEmpty(x, y) {
  //if it isn't an empty space
  if (table.rows[x + 1].cells[y].innerHTML != "") {
    //add the tile to the neighbors array
    neighborsX.push(x + 1);
    neighborsY.push(y);
  }
}

//check if there is a neighboring tile above the empty tile
function checkAboveOfEmpty(x, y) {
  //if it isn't an empty space
  if (table.rows[x - 1].cells[y].innerHTML != "") {
    //add the tile to the neighbors array
    neighborsX.push(x - 1);
    neighborsY.push(y);
  }
}

//check if there is a neighboring tile to the right of the empty tile
function checkRightOfEmpty(x, y) {
  //if it isn't an empty space
  if (table.rows[x].cells[y + 1].innerHTML != "") {
    //add the tile to the neighbors array
    neighborsX.push(x);
    neighborsY.push(y + 1);
  }
}

//check if there is a neighboring tile to the left of the empty tile
function checkLeftOfEmpty(x, y) {
  //if it isn't an empty space
  if (table.rows[x].cells[y - 1].innerHTML != "") {
    //add the tile to the neighbors array
    neighborsX.push(x);
    neighborsY.push(y - 1);
  }
}

//swap empty and a random tile neighbor
function swapTiles(x, y, tileIndex) {
  //call randomly selected neighboring tile
  otherX = neighborsX[tileIndex];
  otherY = neighborsY[tileIndex];

  //set other values to above tile
  otherIndex = table.rows[otherX].cells[otherY].innerHTML;
  otherImage = table.rows[otherX].cells[otherY].style.cssText;

  //set current values to current tile
  currentIndex = table.rows[x].cells[y].innerHTML;
  currentCSS = table.rows[x].cells[y].style.cssText;

  //switch current tile values to the above tile's values
  table.rows[x].cells[y].innerHTML = otherIndex;
  table.rows[x].cells[y].style.cssText = otherImage;

  //switch the above tile values to the current tile's initial values
  table.rows[otherX].cells[otherY].innerHTML = currentIndex;
  table.rows[otherX].cells[otherY].style.cssText = currentCSS;

  //empty arrays for next swap
  neighborsX = [];
  neighborsY = [];
}

/*Below is the code used for when the game is won.*/

//default values for checking
var gameWin = false;
var checkIndex = 1;
var checkHTML = "";

//function for checking if puzzle is in place
function checkWin() {
  //reset values
  document.getElementById("gameWin").innerHTML = "-";
  gameWin = false;
  checkIndex = 1;
  //run through all rows
  for (var x = 0; x < 4; x++) {
    //run through all cells per row
    for (var y = 0; y < 4; y++) {
      //set variable to current html value needed to see if tile is in place
      checkHTML = "<div>" + checkIndex + "</div>";
      //if at last tile, check if the html value is empty (for the empty tile)
      if (x == 3 && y == 3) {
        //if empty tile
        if (table.rows[x].cells[y].innerHTML == "") {
          //set to true
          gameWin = true;
          //add to index
          checkIndex++;
        }
        //otherwise, game is not won
        else {
          gameWin = false;
          checkIndex = 0;
        }
      }
      //at any other tile
      else {
        //if the number matches the correct cell
        if (table.rows[x].cells[y].innerHTML == checkHTML) {
          //set to true
          gameWin = true;
          //add to index
          checkIndex++;
        }
        //otherwise, game is not won
        else {
          gameWin = false;
          checkIndex = 0;
        }
      }
    }
  }
  //if won
  if (gameWin == true && checkIndex == 17) {
    //tell the user
    dropConfetti();
    document.getElementById("gameWin").innerHTML =
      "Game Win! The puzzle is completed!";
    //reset value
    gameWin = false;
    checkIndex = 1;
    $(document).ready(function () {
      // Show the Modal on load
      $("#modalOn").modal("show");
    });
  }
}

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  showButton("PLAY");
}

function pause() {
  clearInterval(timerInterval);
  showButton("PLAY");
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
  showButton("PLAY");
}

// Create function to display buttons

function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
  const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
}
// Create event listeners

let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");

playButton.addEventListener("click", start);
resetButton.addEventListener("click", reset);

var x = document.getElementById("myAudio");

function playAudio() {
  x.loop = true;
  x.play();
}

function pauseAudio() {
  x.pause();
}
function dropConfetti() {
  const canvasEl = document.querySelector("#canvas");

  const w = (canvasEl.width = window.innerWidth);
  const h = (canvasEl.height = window.innerHeight * 2);

  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, w, h);

    confs.forEach((conf) => {
      conf.update();
      conf.draw();
    });
  }

  function Confetti() {
    //construct confetti
    const colours = ["#fde132", "#009bde", "#ff6b00"];

    this.x = Math.round(Math.random() * w);
    this.y = Math.round(Math.random() * h) - h / 2;
    this.rotation = Math.random() * 360;

    const size = Math.random() * (w / 60);
    this.size = size < 15 ? 15 : size;

    this.color = colours[Math.floor(colours.length * Math.random())];

    this.speed = this.size / 7;

    this.opacity = Math.random();

    this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
  }

  Confetti.prototype.border = function () {
    if (this.y >= h) {
      this.y = h;
    }
  };

  Confetti.prototype.update = function () {
    this.y += this.speed;

    if (this.y <= h) {
      this.x += this.shiftDirection / 3;
      this.rotation += (this.shiftDirection * this.speed) / 100;
    }

    if (this.y > h) this.border();
  };

  Confetti.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.size,
      this.rotation,
      this.rotation + Math.PI / 2
    );
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  const ctx = canvasEl.getContext("2d");
  const confNum = Math.floor(w / 4);
  const confs = new Array(confNum).fill().map((_) => new Confetti());

  loop();
}

function scoreSubmit() {
  console.log("dd");
  var name = document.getElementById("name").value;
  var setTime = document.getElementById("time").value;
  var setMove = moveCounter;

  var currentBestTime = localStorage.getItem(name);
  var currentBestMove = localStorage.getItem(name + "move");

  if (setTime > currentBestTime) {
    localStorage.setItem(name, setTime);
    setTime = 0;
  } else {
    localStorage.setItem(name, currentBestTime);
  }

  if (setMove > currentBestMove) {
    localStorage.setItem(name + "move", setMove);
    setMove = 0;
  } else {
    localStorage.setItem(name + "move", currentBestMove);
  }

  var showBestTime = localStorage.getItem(name);
  var showBestMove = localStorage.getItem(name + "move");

  alert(
    "Congrats!" +
      name +
      "'s clear time is" +
      "and the clear move is" +
      moveCounter +
      "the best time is " +
      showBestTime +
      " and best move is " +
      showBestMove +
      "."
  );
}
