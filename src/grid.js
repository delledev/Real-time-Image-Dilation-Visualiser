class Grid{
    constructor(buffer,centerx,centery){
        this.myGrid = [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ];
        
        this.squareSize = 25;
        this.buffer = buffer;
        this.centerx = centerx;
        this.centery = centery;
    }

    isBlack(i,j){
        return this.myGrid[i][j] == 1;
    }

    reverse(i,j){
        if(this.myGrid[j][i] == 1){
            this.myGrid[j][i] = 0;
        }
        else{
            this.myGrid[j][i] = 1;
        }
    }

    getDistFromPoint(x,y){
        return dist(x,y,this.centerx,this.centery);
    }

    drawGrid(){
        for(let i = 0; i <= 11; i++){
            for(let j = 0; j <= 11; j++){
                this.buffer.stroke(255);
                if(this.myGrid[i][j] != 1){
                    this.buffer.fill(180);
                }
                else{
                    this.buffer.fill(0);
                }

                this.buffer.square(j * this.squareSize, i * this.squareSize ,this.squareSize);
            }
        }
        if(this.myGrid[5][5] != 1){
            this.buffer.fill(180);
        }
        else{
            this.buffer.fill(0);
        }
        this.buffer.stroke('red');
        this.buffer.square(5 * this.squareSize, 5 * this.squareSize , this.squareSize);
    }
}