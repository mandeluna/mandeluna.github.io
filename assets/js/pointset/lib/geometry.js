/**
 *  Axis aligned Rectangle
 */
export class Rect {

  /**
   * @param {Point} origin
   * @param {Size} extent
   */
  constructor(origin, extent) {
    this.origin = origin;
    this.extent = extent;
  }

  get xmin() {
    return this.origin.x;
  }

  get xmax() {
    return this.origin.x + this.extent.x;
  }

  get ymin() {
    return this.origin.y;
  }

  get ymax() {
    return this.origin.y + this.extent.y;
  }

  /**
   * @param {Rect} rect
   * @returns {Boolean}
   */ 
  intersects(rect) {
    return this.xmax >= rect.xmin && this.ymax >= rect.ymin && rect.xmax >= this.xmin && rect.ymax >= this.ymin;
  }

  /**
   * @param {Point} point
   * @returns {Boolean}
   */
  contains(point) {
    return point.x >= this.xmin && point.x <= this.xmax && point.y >= this.ymin && point.y <= this.ymax;
  }

  /**
   * @param {Point} point
   * @returns {Number}
   */
  distanceTo(point) {
    return Math.sqrt(this.distanceSquaredTo(point));
  }

  /**
   * @param {Point} point
   * @returns {Number}
   */
  distanceSquaredTo(point) {
    let dx = 0;
    let dy = 0;

    if (point.x < this.xmin) {
      dx = point.x - this.xmin;
    }
    else if (point.x > this.xmax) {
      dx = point.x - this.xmax;
    }

    if (point.y < this.ymin) {
      dy = point.y - this.ymin;
    }
    else if (point.y > this.ymax) {
      dy = point.y - this.ymax;
    }

    return dx * dx + dy * dy;
  }

  /**
   * @param {Object} other
   * @returns {Boolean}
   */ 
  equals(other) {
    if (other === this) {
      return true;
    }
    else if (!other) {
      return false;
    }
    return this.xmin === other.xmin && this.ymin === other.ymin && this.xmax === other.xmax && this.ymax == other.ymax;
  }

} /* -- class Rect -- */


/**
 * 2d Point (can be extended)
 */
export class Point extends Array {

  /**
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x, y) {
    super();

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new Error("Coordinates must be finite");
    }

    this[0] = x;
    this[1] = y;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  set x(value) {
    if (!Number.isFinite(value)) {
      throw new Error("Coordinates must be finite");
    }
    this[0] = value;
  }

  set y(value) {
    if (!Number.isFinite(value)) {
      throw new Error("Coordinates must be finite");
    }
    this[1] = value;
  }

  static Zero = new Point(0, 0);

  static zero() {
    return this.Zero;
  }

  distanceTo(point) {
    const dx = this.x - point.x;
    const dy = this.y - point.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  distanceSquaredTo(point) {
    const dx = this.x - point.x;
    const dy = this.y - point.y;

    return dx * dx + dy * dy;
  }

} /* -- class Point -- */


/**
 * 2d Size
 */
export class Size {

  /**
   * @param {Number} width
   * @param {Number} height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  static Zero = new Size(0, 0);

  static zero() {
    return this.Zero;
  }

} /* -- class Size -- */
