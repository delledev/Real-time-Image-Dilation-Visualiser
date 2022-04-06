var firstGrid;
var secondGrid;
var resultGrid;

var firstGridBuffer;
var secondGridBuffer;
var resultGridBuffer;

function setup() {
    canvas = createCanvas(585, 600);
    canvas.parent("canvasContainer");
    firstGridBuffer = createGraphics(275, 275);
    secondGridBuffer = createGraphics(275, 275);
    resultGridBuffer = createGraphics(275, 275);



    background(0);
    firstGrid = new Grid(firstGridBuffer, 150, 150);
    secondGrid = new Grid(secondGridBuffer, 450, 150);
    resultGrid = new Grid(resultGridBuffer, 0, 0);
    
}


function draw() {
    firstGrid.drawGrid();
    secondGrid.drawGrid();
    resultGrid.drawGrid();
    //
    image(firstGridBuffer, 10, 10);
    image(secondGridBuffer, 300, 10);
    image(resultGridBuffer, 153, 300);
}


function dilation() {
    if (secondGrid.myGrid[5][5] == 0) {
        return;
    }
    var ArrayOfOffsets = [];
    for (let i = 0; i <= 11; i++) {
        for (let j = 0; j <= 11; j++) {
            if (secondGrid.isBlack(i, j)) {
                ArrayOfOffsets.push(new OffsetPoint(i - 5, j - 5));
            }
        }
    } 
    
    let workingGrid = new Grid();
    
    for(let i = 0; i <= 11; i++){
        for(let j = 0; j <= 11; j++){
            workingGrid.myGrid[i][j] = firstGrid.myGrid[i][j];  
        }
    }

    for (let i = 0; i <= 11; i++) {
        for (let j = 0; j <= 11; j++) {
            if (workingGrid.isBlack(i, j)) { //middle
                continue;
            }
            var canPlace = false;
            if (i - 1 >= 0 && j - 1 >= 0) {
                if (workingGrid.isBlack(i - 1, j - 1)) { //top left
                    canPlace = true;
                }
            }
            if (j - 1 >= 0) {
                if (workingGrid.isBlack(i, j - 1)) { //top middle
                    canPlace = true;
                }
            }
            if (i - 1 >= 0 && j + 1 <= 10) {
                if (workingGrid.isBlack(i - 1, j + 1)) { //top right
                    canPlace = true;
                }
            }
            if (i - 1 >= 0) {
                if (workingGrid.isBlack(i - 1, j)) { //middle left
                    canPlace = true;
                }
            }
            if (i + 1 <= 11) {
                if (workingGrid.isBlack(i + 1, j)) { //middle right
                    canPlace = true;
                }
            }
            if (i - 1 >= 0 && j + 1 <= 11) {
                if (workingGrid.isBlack(i - 1, j + 1)) { //bottom left
                    canPlace = true;
                }
            }
            if (j + 1 <= 11) {
                if (workingGrid.isBlack(i, j + 1)) { //bottom middle
                    canPlace = true;
                }
            }
            if (i + 1 <= 11 && j + 1 <= 11) {
                if (workingGrid.isBlack(i + 1, j + 1)) { //bottom right
                    canPlace = true;
                }
            }
            if (!canPlace) {
                continue;
            }
            var check = true;
            for (let k = 0; k < ArrayOfOffsets.length; k++) {
                if (firstGrid.myGrid[i + ArrayOfOffsets[k].x][j + ArrayOfOffsets[k].y] == 1) {
                    check = false;
                }
            }

            if (check) {
                for (let k = 0; k < ArrayOfOffsets.length; k++) {
                    var hasBlackNeighbour = false;
                    if(firstGrid.myGrid[i + ArrayOfOffsets[k].x + 1][j + ArrayOfOffsets[k].y] == 1){
                        hasBlackNeighbour = true;
                    }
                    if(firstGrid.myGrid[i + ArrayOfOffsets[k].x - 1][j + ArrayOfOffsets[k].y] == 1){
                        hasBlackNeighbour = true;
                    }
                    if(firstGrid.myGrid[i + ArrayOfOffsets[k].x][j + ArrayOfOffsets[k].y + 1] == 1){
                        hasBlackNeighbour = true;
                    }
                    if(firstGrid.myGrid[i + ArrayOfOffsets[k].x][j + ArrayOfOffsets[k].y - 1] == 1){
                        hasBlackNeighbour = true;
                    }
                    if(hasBlackNeighbour){
                        workingGrid.myGrid[i + ArrayOfOffsets[k].x][j + ArrayOfOffsets[k].y] = 1;
                    }
                }
            }
        }
    }
    for(let i = 0; i <= 11; i++){
        for(let j = 0; j <= 11; j++){
            resultGrid.myGrid[i][j] = workingGrid.myGrid[i][j];  
        }
    }
}

function mouseClicked() {
    //console.log(mouseX, mouseY);
    if (mouseX > 584 || mouseY > 285) {
        return;
    }

    if (firstGrid.getDistFromPoint(mouseX, mouseY) < secondGrid.getDistFromPoint(mouseX, mouseY)) {
        var x = 0;
        for (let i = mouseX; i > 10; i -= 25) {
            x++;
        }
        var y = 0;
        for (let i = mouseY; i > 10; i -= 25) {
            y++;
        }
        //console.log((x - 1) + " " + (y - 1));
        firstGrid.reverse(x - 1, y - 1);
    } else {
        var x = 0;
        for (let i = mouseX; i > 300; i -= 25) {
            x++;
        }
        var y = 0;
        for (let i = mouseY; i > 10; i -= 25) {
            y++;
        }

        secondGrid.reverse(x - 1, y - 1);
    }
    dilation();
}