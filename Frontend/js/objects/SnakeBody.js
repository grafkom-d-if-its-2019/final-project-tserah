import * as THREE from "three";
import Drawable from "./Drawable";
import Snake from "./Snake";
import Food from "./Food";
import Positioning from "./Positioning";
import Wall from "./Wall";

class SnakeBody extends Drawable {
  /**
   *
   * @param {Snake} snake
   * @param {Positioning} positioning
   */
  constructor(snake, positioning, _delay, index = 0) {
    // var texture = new THREE.TextureLoader().load( '../assets/skinn3.png' );
    var texture = new THREE.TextureLoader().load("../assets/images.jpeg");
    super(
      new THREE.SphereBufferGeometry(0.5, 100, 100),
      new THREE.MeshBasicMaterial({ map: texture })
    ); // TODO: implement

    if (snake == null) {
      this.position.setX(0);
      this.position.setZ(0);
    } else {
      this.snake = snake;
      window.snake = snake;
      this.position.setX(positioning.x);
      this.position.setZ(positioning.z);
    }
    this.position.setY(0.52);
    this._delay = _delay;
    this.index = index;
  }

  onCollide(drawable) {
    // console.log(drawable);
    if (drawable instanceof Food) {
      console.log("TABRAK FOOD SnakeBody.js");
      this.snake.onCollideWithFood();
      return true;
    } else if (drawable instanceof SnakeBody) {
      // let index1 =this.snake.body.indexOf(drawable);
      // let index2 =this.snake.body.indexOf(this);
      // let delta=index2-index1;
      // delta = delta*delta;
      // if((index1 == -1 || (delta != 1)) && index2 == 0){
      //     this.snake.onCollideWithSnake(drawable, this);
      // }

      if (this.snake != drawable.snake && this == this.snake.body[0]) {
        this.snake.onCollideWithSnake();
        // console.log("r1");
        return true;
      } 
    } else if (drawable instanceof Wall) {
      this.snake.onCollideWithWall();
      return true;
    }
  }
}

export default SnakeBody;
