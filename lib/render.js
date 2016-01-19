var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var scoreArea = document.getElementById('score');
var nextShape = document.getElementsByClassName('next-piece');
var ctx = canvas.getContext( '2d' );
var W = 300, H = 500;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
var renderInterval;

// draw a single square at (x, y)
function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
}


function drawNextBlock () {
  var img = document.createElement("IMG");

  if (id2 === 0) {
    img.src = "assets/i.png";
  } else if (id2 === 1) {
    img.src = "assets/right_l.png";
  } else if (id2 === 2) {
    img.src = "assets/left_l.png";
  } else if (id2 === 3) {
    img.src = "assets/square.png";
  } else if (id2 === 4) {
    img.src = "assets/left_s.png";
  } else if (id2 === 5) {
    img.src = "assets/right_s.png";
  } else if (id2 === 6) {
    img.src = "assets/t.png";
  }

  var div = document.getElementsByClassName('next-piece')[0];

  while (div.hasChildNodes()) {
      div.removeChild(div.lastChild);
  }
  div.appendChild(img);
}

// draws the board and the moving shape
function render() {
    scoreArea.innerHTML = 'Score: ' + score;
    drawNextBlock();

    ctx.clearRect( 0, 0, W, H );

    ctx.strokeStyle = 'black';
    for ( var col = 0; col < COLS; ++col ) {
        for ( var row = 0; row < ROWS; ++row ) {
            if ( board[ row ][ col ] ) {
                ctx.fillStyle = colors[ board[ row ][ col ] - 1 ];
                drawBlock( col, row );
            }
        }
    }

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( current[ y ][ x ] ) {
                ctx.fillStyle = colors[ current[ y ][ x ] - 1 ];
                drawBlock( currentX + x, currentY + y );
            }
        }
    }
}

function newGame() {
  var newGameButton = document.getElementsByClassName('new-game')[0];
  newGameButton.addEventListener("click", startGame);
}

function startGame () {
  clearInterval(interval);
  clearInterval(renderInterval);
  if (lose) {
    score = 0;
  }
  var gameover = document.getElementsByTagName('h2')[0];
  if (gameover) {
    gameover.parentNode.removeChild(gameover);
  }
  init();
  newShape();
  lose = false;
  interval = setInterval( tick, 300 );
  renderInterval = setInterval( render, 50 );
}

newGame();
