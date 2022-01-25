'use strict'
const PACMAN = `🤑`;

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false,
        toward: ''
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver(gGame);
            return
        }
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i
                && gGhosts[i].location.j === nextLocation.j) {
                var currGhostIdx = i
            }
        }
        var currGhost = gGhosts.splice(currGhostIdx, 1)[0]
        gKilledGhosts.unshift(currGhost)
        if (gKilledGhosts[0].currCellContent === FOOD) {
            gKilledGhosts[0].currCellContent = EMPTY
            updateScore(1)
            gGame.foodCount--
            if (gGame.foodCount === 0) gameOver(gGame)
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount--
        if (gGame.foodCount === 0) gameOver(gGame)
    }

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        setTimeout(() => { clearSuperMode(gPacman) }, 5000)
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    renderCell(gPacman.location, getPacmanHTML(gPacman.toward))

}

function getNextLocation(keyboardEvent) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.toward = `180deg`
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.toward = `0deg`
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.toward = `90deg`
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.toward = `270deg`
            break;
        default: return null
    }
    return nextLocation;
}

function clearSuperMode(pacmanModel) {
    for (var i = gKilledGhosts.length - 1; i >= 0; i--) {
        var currGhost = gKilledGhosts.pop()
        gGhosts.push(currGhost)
    }
    pacmanModel.isSuper = false
}

function getPacmanHTML(toward) {
    return `<div style="transform: rotate(${toward})">${PACMAN}</div>`
}