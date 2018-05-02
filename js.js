/*jslint browser, devel*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var tileImgs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L', 'M'];
    var board = document.getElementById('board');
    var tilesFlipped = [];
    var tilesMatch = [];
    var i;

    Array.prototype.doubleShuffle = function () {
        var d;
        console.log(this);
        for (d = 0; d < this.length; d = d + 2) {
            this.splice(d + 1, 0, this[d]);
        }
        var i = this.length;
        var j;
        var temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * i + 1);
            temp = this[j];
            this[j] = this[i];
            this[i] = temp;
        }
        return this;
    };
    function drawBoard(event) {
        event.preventDefault();
        document.getElementById('welcome').style.display = 'none';
        board.style.display = 'flex';

        var gameTiles = document.getElementById('playGame').level.value;
        var gameTileImgs = tileImgs.slice(0, gameTiles / 2);
        gameTileImgs = gameTileImgs.doubleShuffle();

        for (i = 0; i < gameTileImgs.length; i += 1) {
            var content = '';
            content += '<section>';
            content += '<div class="front"></div>';
            content += '<div class="back">' + gameTileImgs[i] + '</div>';
            content += '</section>';

            board.insertAdjacentHTML('beforeend', content);
        }
    }
    function newGame() {
        board.innerHTML = '';
        board.style.display = 'none';
        document.getElementById('welcome').style.display = 'flex';
        document.getElementById('message').classList.remove('show');
    }
    function endOfGame() {
        if (board.querySelectorAll('section').length === board.getElementsByClassName('reward').length) {
            document.getElementById('message').classList.add('show');
        }
    }
    function flipBack() {
        var tiles = board.querySelectorAll('section');
        tiles[tilesFlipped[0]].classList.remove('flipped');
        tiles[tilesFlipped[1]].classList.remove('flipped');
        tilesFlipped = [];
        tilesMatch = [];
        board.style.pointerEvents = 'auto';
    }
    function twotiles(tiles) {
        if (tilesFlipped.length >= 2) {
            board.style.pointerEvents = 'none';
            if (tilesMatch[0] === tilesMatch[1]) {
                tiles[tilesFlipped[0]].classList.add('reward');
                tiles[tilesFlipped[1]].classList.add('reward');
                tilesFlipped = [];
                tilesMatch = [];
                setTimeout(endOfGame, 500);
                board.style.pointerEvents = 'auto';
            } else {
                setTimeout(flipBack, 1500);
            }
        }
    }
    function flipTile(event) {
        var tiles = Array.from(board.querySelectorAll('section'));
        if (event.target !== event.currentTarget && envent.touches.length === 1) {
            if (!event.target.parentNode.classList.contains('flipped')) {
                event.target.parentNode.classList.add('flipped');
                tilesFlipped.push(tiles.indexOf(event.target.parentNode));
                tilesMatch.push(event.target.nextElementSibling.innerHTML);
                twotiles(tiles);
            }
        }
    }
    board.addEventListener('touchstart', flipTile);
    document.getElementById('message').querySelector('button').addEventListener('click', newGame);
    document.getElementById('playGame').addEventListener('submit', drawBoard);
});
