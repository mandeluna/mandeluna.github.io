import {PointSet} from './pointset/pointset.js'
import {Point} from './pointset/lib/geometry.js'

const points = new PointSet()
points.insert(new Point(100, 100))
console.log(`Added ${points.size} points to collection`)
const canvas = document.getElementById('tree_fig_1')
console.log(canvas)
