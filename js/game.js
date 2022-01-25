'use strict'
const WALL = '.';
const FOOD = '💲';
const EMPTY = ' ';
const SUPER_FOOD = '💰';
const CHERRY = '🍒'

var gBoard;
var gGame = {
    score: 0,
    isOn: false,
    foodCount: 0
}
var gIntervalCherry;

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    gGame.foodCount = getFoodCount(gBoard)
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0
    updateScore(0)
    gKilledGhosts = []
    
    gIntervalCherry = setInterval(() => {addCherry()}, 15000); 
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) || (i === SIZE - 2 && j === 1) ||
                (i === 1 && j === SIZE - 2) || (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board;
}

function getFoodCount(board) {
    var count = 0
    for (var i = 1; i < board.length - 1; i++) {
        for (var j = 1; j < board[0].length - 1; j++) {
            if (board[i][j] === FOOD) count++
        }
    }
    return count
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(gameModel) {
    var msg = (gameModel.foodCount === 0) ? `Done` : `Over`;

    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    document.querySelector('.modal-container span').innerText = `${msg}`
    document.querySelector('.modal-container').style.display = 'block'
}

function restart() {
    document.querySelector('.modal-container').style.display = 'none'
    init()    
}


function addCherry(){
    var emptyCells = getEmptyCells(gBoard)
    if (!emptyCells.length) return
    var cell = getEmptyCell(emptyCells)
    gBoard[cell.i][cell.j] = CHERRY
    renderCell(cell, CHERRY)
   }

function getEmptyCells(board) {
	var emptyCells = []
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			if (board[i][j] === EMPTY) {

                var emptyCell = { i, j }
                emptyCells.push(emptyCell)
            }
		}
	}
	return emptyCells
}
function getEmptyCell(emptyCells) {
   
	var randomIdx = getRandomInt(0, emptyCells.length-1)
	var emptyCell = emptyCells[randomIdx]
	emptyCells.splice(randomIdx, 1)
	return emptyCell
}