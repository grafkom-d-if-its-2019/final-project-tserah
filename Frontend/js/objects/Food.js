import * as THREE from "three";
import Drawable from "./Drawable";
import Positioning from "./Positioning";
import Handler from "./Handler";
import SnakeBody from "./SnakeBody";
import THREECache from "../THREECache";

export default class Food extends Drawable {
  /**
   *
   * @param {Positioning} positioning
   */
  constructor(positioning) {
    var texture = new THREE.TextureLoader().load("../assets/2.png");
    super(
      THREECache.get("FoodGeometry") || THREECache.set("FoodGeometry", new THREE.SphereBufferGeometry(0.3, 32, 32)),
      THREECache.get("FoodMaterial") || THREECache.set("FoodMaterial", new THREE.MeshLambertMaterial({ map: texture }))
    );
    this.position.setX(positioning.x);
    this.position.setY(0.2);
    this.position.setZ(positioning.z);
  }

  /** @type {Drawable} */
  onCollide(drawable) {
    if (drawable instanceof SnakeBody) {
      this.destroy();
      Handler.generateFood();
    }
  }
}
