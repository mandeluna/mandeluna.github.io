/**
 *  2d Point Set (k-d tree)
 * 
 *  This class provides O(log N) operations on points in 2-dimensional space.
 */

import { Rect, Point, Size } from './lib/geometry.js';

const numeric_compare = (a, b) => {
  if (a < b) {
    return -1;
  }
  else if (b < a) {
    return 1;
  }
  return 0;
}

export class PointSet {
	
  constructor(comparator = numeric_compare) {
    this.comparator = comparator
    this.root = null;
    this.size = 0;
  }

  /* -- Public API -- */

  /**
   * @returns {Boolean} if the set is empty
   */
  isEmpty() {
    return this.root === null;
  }

  /**
   * @returns {Number} the number of elements in the set
   */
  size() {
    return this.size;
  }


  /**
   * Add the point to the set (if it is not already in the set)
   * 
   * @param {Point} point
   */
  insert(point) {
    if (!point) {
      throw new Error("insert(): argument should not be null");
    }
    // initial orientation is left-right and box is entire unit square
    this.root = this.insert_node(this.root, point, 0.0, 1.0, 0.0, 1.0, true);
  }

  /**
   * Does the set contain a point? 
   * 
   * @param {Point} point
   * @returns {Boolean}
   */
  contains(point) {
    if (p == null) {
      throw new Error("contains(): argument should not be null");
    }
    return !!this.lookup(point, true);
  }

  /**
   * Range search. To find all points contained in a given query rectangle, start at the root and
   * recursively search for points in both subtrees using the following pruning rule:
   * if the query rectangle does not intersect the rectangle corresponding to a node,
   * there is no need to explore that node (or its subtrees).
   * 
   * A subtree is searched only if it might contain a point contained in the query rectangle.
   * 
   * @param {Rect} rect
   * @returns {Array<Point>}
   */
  range(rect) {
    if (rect == null) {
      throw new Error("range(): argument should not be null");
    }
    let results = [];
    this.findPointsInRange(root, rect, results);
    return results;
  }

  /**
   * private recursive method to support range search.
   * 
   * @param {Node} node
   * @param {Rect} rect
   * @param {Array<Point>} results
   * @returns {Array<Point>}
   */
  findPointsInRange(node, rect, results) {
    if (node == null) {
        return;
    }
    if (rect.contains(node.point)) {
      results.push(node.point);
    }
    if (rect.intersects(node.getRect())) {
      this.findPointsInRange(node.lb, rect, results);
      this.findPointsInRange(node.rt, rect, results);
    }
  }

  /**
   * Return the nearest neighbor in the set to a point, or null if the set is empty
   * 
   * @param {Point} point
   * @returns {Point}
   */
  nearest(point) {
    if (point == null) {
      throw new Error("nearest(): argument should not be null");
    }

    const x = this.nearestNodeTo(point, this.root, Number.POSITIVE_INFINITY, true);

    if (x == null) {
      return null;
    }
    return x.point;
  }

  /**
   * Nearest neighbor search. To find a closest point to a given query point, start at the root
   * and recursively search in both subtrees using the following pruning rule:
   * if the closest point discovered so far is closer than the distance between the query point
   * and the rectangle corresponding to a node, there is no need to explore that node (or its subtrees).
   * That is, a node is searched only if it might contain a point that is closer than the best one found so far.
   * The effectiveness of the pruning rule depends on quickly finding a nearby point.
   *
   * @param {Point} p
   * @param {Node} x
   * @param {Number} min
   * @param {Boolean} isLeftRight
   * @returns {Node}
   */
  nearestNodeTo(p, x, min, isLeftRight) {
    if (x === null) {
      return null;
    }
    let nearest = null;
    const nearestDist = x.point.distanceSquaredTo(p);
    if (nearestDist < min) {
      min = nearestDist;
      nearest = x;
    }

    /*
     * When there are two possible subtrees to go down, always choose the subtree that is on the same side
     * of the splitting line as the query point as the first subtree to explore -- the closest point found while
     * exploring the first subtree may enable pruning of the second subtree.
     */
    let subtree1 = null;
    let subtree2 = null;

    if (isLeftRight) {
      if (p.x < x.point.x) {
        subtree1 = x.lb;
        subtree2 = x.rt; 
      }
      else {
        subtree1 = x.rt;
        subtree2 = x.lb; 
      }
    }
    else {
      if (p.y < x.point.y) {
        subtree1 = x.lb;
        subtree2 = x.rt; 
      }
      else {
        subtree1 = x.rt;
        subtree2 = x.lb; 
      }
    }

    const rect1Distance =  subtree1 ? subtree1.getRect().distanceSquaredTo(p) : Number.POSITIVE_INFINITY;
    if (rect1Distance < min) {
      const nearest1 = this.nearestNodeTo(p, subtree1, min, !isLeftRight);
      if (nearest1) {
        const dist1 = nearest1.point.distanceSquaredTo(p);
        if (dist1 < min) {
          min = dist1;
          nearest = nearest1;
        }
      }
    }

    const rect2Distance = subtree2 ? subtree2.getRect().distanceSquaredTo(p) : Number.POSITIVE_INFINITY;
    if (rect2Distance < min) {
      const nearest2 = this.nearestNodeTo(p, subtree2, min, !isLeftRight);
      if (nearest2) {
        const dist2 = nearest2.point.distanceSquaredTo(p);
        if (dist2 < min) {
          nearest = nearest2;
        }
      }
    }
    return nearest;
  }

  /**
   * private Debugging and reporting.
   */
  printTree() {
    this.printNodes(this.root, 0);
  }

  /**
   * private recursive Debugging and reporting.
   * 
   * @param {Node} node
   * @param {Number} indent
   */
  printNodes(node, indent) {
    let chars = Array(indent).fill(' ')

    if (node == null) {
        console.log(chars + ".");
        return;
    }
    console.log(`${chars}${node}`);
    console.log(chars + "left/below: ");
    this.printNodes(node.lb, indent + 1);
    console.log(chars + "right/above: ");
    this.printNodes(node.rt, indent + 1);
  }

  /**
   * private recursive Insertion method.
   * 
   * @param {Node} h
   * @param {Point} point
   * @param {Number} xmin
   * @param {Number} xmax
   * @param {Number} ymin
   * @param {Number} ymax
   * @param {Boolean} leftToRight
   * @returns {Node}
   */
  insert_node(h, point, xmin, xmax, ymin, ymax, leftToRight) {
    if (h == null) {
        this.size++;
        return new Node(point, xmin, xmax, ymin, ymax, true);
    }
    const cmp = leftToRight ? this.comparator(point.x, h.point.x) : this.comparator(point.y, h.point.y);
    const cmp2 = leftToRight ? this.comparator(point.y, h.point.y) : this.comparator(point.x, h.point.x);

    if (cmp < 0) {
      // inserting to the left of the current node
      if (leftToRight) {
        h.lb = this.insert_node(h.lb, point, h.xmin, h.point.x, h.ymin, h.ymax, !leftToRight);
      }
      // inserting below the current node
      else {
        h.lb = this.insert_node(h.lb, point, h.xmin, h.xmax, h.ymin, h.point.y, !leftToRight);
      }
    }
    else { // if (cmp >= 0)
      // ignore duplicates
      if ((cmp == 0) && (cmp2 == 0)) {
        return h;
      }
      // inserting to the right of the current node
      if (leftToRight) {
        h.rt = this.insert_node(h.rt, point, h.point.x, h.xmax, h.ymin, h.ymax, !leftToRight);
      }
      // inserting above the current node
      else {
        h.rt = this.insert_node(h.rt, point, h.xmin, h.xmax, h.point.y, h.ymax, !leftToRight);
      }
    }
    return h;
  }

  /**
   * private lookup method.
   * 
   * @param {Point} point
   * @param {Boolean} isLeftRight
   * @returns {Node}
   */
  lookup(point, isLeftRight) {
    return lookup_node(this.root, point, isLeftRight);
  }

  /**
   * private recursive lookup method.
   * 
   * @param {Node} node
   * @param {Point} point
   * @param {Boolean} isLeftRight
   * @returns {Node}
   */
  lookup_node(node, point, isLeftRight) {
    if (!node) {
      return null;
    }

    const cmp = isLeftRight ? this.comparator(point.x, node.point.x) : this.comparator(point.y - node.point.y);
    if (cmp < 0) {
      return lookup_node(node.lb, point, !isLeftRight);
    }
    else {
      const cmp2 = isLeftRight ? this.comparator(point.y, node.point.y) : this.comparator(point.x, node.point.x);
      if (cmp == 0 && cmp2 == 0) {
        return node;
      }
      return lookup_node(node.rt, point, !isLeftRight);
    }
  }

}

class Node {

  /**
   * @param {Point} key
   * @param {Number} xmin
   * @param {Number} xmax
   * @param {Number} ymin
   * @param {Number} ymax
   */ 
  constructor (key, xmin, xmax, ymin, ymax) {
    this.point = key;
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
  }

  getRect() {
    const origin = new Point(this.xmin, this.ymin);
    const extent = new Size(this.xmax - this.xmin, this.ymax - this.ymin);

    return new Rect(origin, extent);
  }

  toString() {
    return `(${this.xmin}, ${this.xmax}, ${this.ymin}, ${this.ymax})`
  }

}