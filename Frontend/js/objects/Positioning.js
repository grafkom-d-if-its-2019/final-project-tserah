class Positioning {
    /**
     * 
     * @param {Number} x 
     * @param {Number} z 
     * @param {Number} orientation (degree)
     * @param {Number} speed 
     */
    constructor(x, z, orientation, speed) {
        this.x = x;
        this.z = z;
        this.orientation = orientation;
        this.speed = speed;
    }
}

export default Positioning;