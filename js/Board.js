class Board {
    constructor(x, y, width, height) {
      const options = {
        isStatic: true
      };
  
      this.body = Matter.Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      
      this.image = loadImage("./assets/board.png");
  
      World.add(world, this.body);

      
    }

    remove(index){
      setTimeout(()=>{
        Matter.World.remove(world, board[index].body)
        delete board[index];
      
      },2000
      )
        }

    display() {
        var pos = this.body.position;
        
    
        
        push();
        
        imageMode(CENTER);
        image(this.image, pos.x,pos.y, this.width, this.height);
        pop();
      }
}

