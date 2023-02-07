/* eslint-disable no-unneeded-ternary */
// @flow
import type {
   TGroup,
   TMatrix,
   TShape,
   TPointText,
   TTextItem,
   TItem,
   TView,
   TPathItem,
   TPath,
   TPoint,
   TCircle,
   TRectangle,
   TMouseEvent
} from 'paper'
import {_} from './lodash_addon'
import paper from 'paper'
import {ensure} from './Utils'

const Path: TPath           = paper.Path
const PointText: TPointText = paper.PointText
const Circle: TCircle       = Path.Circle
const Point: TPoint         = paper.Point
const view: TView           = paper.view
const Group: TGroup         = paper.Group
const Matrix: TMatrix       = paper.Matrix

//NOTE: types used in drawing segment rings
//@formatter:off
type TSegmentInfo      = Array<[number, string]>
type TSegment          = number | TSegmentInfo
type TPaperStyling     = { [string]: number | string }
type TSegmentRingParam =
   {
      paths: {
         segments: TSegment, oradius: number, iradius: number, rotation: number,
         center: number[], mouseEvent: boolean, isometric: boolean, style: TPaperStyling,
         extrude: number, dedensity: 'parallel' | 'vertical'
      },
      resources: {
         size: number, type: "icon" | "text", data: string[],
         style: TPaperStyling, reference: string[]
      },
      name: string
   }
type TDensity = { item: Path, rbound: number, lbound: number, shiftment: number, origin: number[] }
type TVector = { length: number, angle: number }

//NOTE: types used in animation object
type TProp       = { prop: string, value: any, unit?: string }
type TDest       = TProp[]
type TParsedProp = { path: string[], prop: string, value: any, unit?: string }
type TParsedDest = TParsedProp[]
type TSetter     = (ratio: number, dest: TProp, from: TProp, target: Object, linked: Object) => void
type TGetter     = (target?: Object, propname?: string) => { [string]: number | number[] }
type TSetters    = { [string]: TSetter }
type TGetters    = { [string]: TGetter }

type TPaperAnimeConfig = {
   to: TDest, from: TDest, decay: number, reusable: boolean, duration: number, from?: TDest, name?: string,
   easing: Function, linked: Object, target: Object, setters?: TSetters, getters?: TGetters, fromOrigin: boolean,
   relativeMode?: boolean
}

type TPaperAnimeSetting = {
   to: TDest, from: TDest, decay: number, reusable: boolean, duration: number, from: TDest, name?: string,
   easing: Function, linked: Object, target: Object, setters: TSetters, getters: TGetters, fromOrigin: boolean,
   relativeMode: boolean
}

type TPaperAnimeGroup = {
   to: TDest, from: TDest, decay: number, reusable: boolean, duration: number, from?: TDest, name?: string,
   easing: Function, linked: Object[], targets: Object[], setters?: TSetters[], getters?: TGetters[], fromOrigin: boolean,
   leading: number
}
//@formatter:on

_.merge(paper.Matrix.prototype, {
   _skewX     : 0,
   _p_skewX   : 0,
   _d_skewX   : 0,
   _skewY     : 0,
   _p_skewY   : 0,
   _d_skewY   : 0,
   _shearX    : 0,
   _p_shearX  : 0,
   _d_shearX  : 0,
   _shearY    : 0,
   _p_shearY  : 0,
   _d_shearY  : 0,
   //WARNING: not tested yet, TODO: further tests
   _p_matrixA :1,
   _matrixA   : 1,
   _d_matrixA : 0,
   _p_matrixB :0,
   _matrixB   : 0,
   _d_matrixB : 0,
   _p_matrixC :1,
   _matrixC   : 1,
   _d_matrixC : 0,
   _p_matrixD :0,
   _matrixD   : 0,
   _d_matrixD : 0,
   _p_matrixTX:0,
   _matrixTX  : 0,
   _d_matrixTX: 0,
   _p_matrixTY:0,
   _matrixTY  : 0,
   _d_matrixTY: 0,
   
   skewTo: function  skewTo(x:number, y:number){
      this._p_skewX = this._skewX
      this._skewX   = x
      this._d_skewX = this._skewX - this._p_skewX
      this._p_skewY = this._skewY
      this._skewY   = y
      this._d_skewY = this._skewY - this._p_skewY
      this.skew(this._d_skewX, this._d_skewY)
   },
   shearTo: function shearTo(x:number, y:number){
      this._p_shearX = this._shearX
      this._shearX   = x
      this._d_shearX = this._shearX - this._p_shearX
      this._p_shearY = this._shearY
      this._shearY   = y
      this._d_shearY = this._shearY - this._p_shearY
      this.shear(this._d_shearX, this._d_shearY)
   },
   //WARNING: not tested yet, TODO: further tests
   matrixTo:function matrixTo (a: number, b: number, c: number, d: number, tx: number, ty: number) {
      this._p_matrixA = this._matrixA
      this._matrixA   = a
      this._d_matrixA = this._matrixA - this._p_matrixA
   
      this._p_matrixB = this._matrixB
      this._matrixB   = b
      this._d_matrixB = this._matrixB - this._p_matrixB
   
      this._p_matrixC = this._matrixC
      this._matrixC   = c
      this._d_matrixC = this._matrixC - this._p_matrixC
   
      this._p_matrixD = this._matrixD
      this._matrixD   = d
      this._d_matrixD = this._matrixD - this._p_matrixD
   
      this._p_matrixTX = this._matrixTX
      this._matrixTX   = tx
      this._d_matrixTX = this._matrixTX - this._p_matrixTX
   
      this._p_matrixTY = this._matrixTY
      this._matrixTY   = ty
      this._d_matrixTY = this._matrixTY - this._p_matrixTY
   
      this.matrix(this._d_matrixA - this._p_matrixA, this._d_matrixB - this._p_matrixB, this._d_matrixC - this._p_matrixB, this._d_matrixD - this._p_matrixD, this._d_matrixTX - this._p_matrixTX, this._d_matrixTY - this._p_matrixTY)
   }
})


function createText(x: number, y: number, content: string): TPointText {
   let ret             = new PointText(new Point(x, y))
   ret.content         = content
   ret.fillColor.alpha = 1
   return ret
}


const radians = function (degrees: number) {
   return degrees * Math.PI / 180
}

// Converts from radians to degrees.
const degrees = function (radians: number) {
   return radians * 180 / Math.PI
}

function shiftVector(vector: TVector, point: TPoint): TPoint {
   let shiftx = vector.length * Math.cos(radians(vector.angle))
   let shifty = vector.length * Math.sin(radians(vector.angle))
   let ret    = point.clone()
   ret.x += shiftx
   ret.y += shifty
   return ret
}

function rotatePoint(degree: number, point: TPoint, center: TPoint): number[] {
   degree = degree % 360
   let px = point.x
   let py = point.y
   px     = center.x + (px - center.x) * Math.cos(radians(degree)) - (py - center.y) * Math.sin(radians(degree))
   py     = center.y + (px - center.x) * Math.sin(radians(degree)) + (py - center.y) * Math.cos(radians(degree))
   return [px, py]
}

function rotateCustomPoint(degree: number, point: Object, center: TPoint): [number, number] {
   degree = degree % 360
   
   let shiftx     = point.radius * Math.cos(radians(point.rotation + degree))
   let shifty     = point.radius * Math.sin(radians(point.rotation + degree))
   point.rotation = point.rotation + degree
   return [center.x + shiftx, center.y + shifty]
}

function drawArcByCenter(center: TPoint, radius: number, from_degree: number, to_degree: number, debug: boolean = true): TPath {
   from_degree = (from_degree + 180) % 360
   to_degree   = (to_degree) % 360
   let point2  = shiftVector({angle: from_degree, length: radius}, center)
   let point3  = shiftVector({angle: from_degree + to_degree / 2, length: radius}, center)
   let point4  = shiftVector({angle: from_degree + to_degree, length: radius}, center)
   let ret     = new Path.Arc(point2, point3, point4)
   if (debug) {
      let t1       = createText(point4.x, point4.y, `to:${point4}`)
      let t3       = createText(point2.x, point2.y, `from:${point2}`)
      let t2       = createText(point3.x, point3.y, `mid:${point3}`)
      t1.fillColor = t2.fillColor = t3.fillColor = ('red': any)
      t1.fillColor.alpha = t2.fillColor.alpha = t3.fillColor.alpha = 0.8
      ret.debugText1 = t1
      ret.debugText2 = t2
      ret.debutText3 = t3
   }
   return ret
}

function putPointsInCircle(center: TPoint, radius: number, angle: number, cb: Function) {
   let from_degree = (angle + 180) % 360
   let point       = shiftVector({angle: from_degree, length: radius}, center)
   cb(center, point, from_degree)
}

function drawPie(center: TPoint, oradius: number, iradius: number, from_deg: number, inc_degree: number, debug: boolean = false) {
   let arc      = drawArcByCenter(center, oradius, from_deg, inc_degree, debug)
   let arc2     = drawArcByCenter(center, iradius, from_deg + inc_degree, from_deg - (from_deg + inc_degree), false)
   arc.segments = arc.segments.concat(arc2.segments)
   arc.closed   = true
   return arc
}

function getIsoPolygonsPoints(center: Point, radius: number, polygons: number, rotation: number = 0): Object[] {
   let deg      = 360 / polygons
   let from_deg = rotation
   let points   = []
   let point
   let temp
   for (let i = 0; i < polygons; i++) {
      temp  = shiftVector({angle: from_deg, length: radius}, center)
      point = {x: temp.x, y: temp.y, id: i, rotation: from_deg, radius: radius}
      points.push(point)
      from_deg += deg
   }
   return points
}

// (rotation, ring, _center, segments, resources, resources_origpoint, radius, resource_size)
function rotateRing(rotation: number, ring: Group, _center: Point, segments: number, resources: PointText[] | Group[],
                    resources_origpoint: Object[],
                    radius: number, resource_size: number) {
   let point
   for (let i = 0; i < segments; i++) {
      point                = rotateCustomPoint(rotation, resources_origpoint[i], _center)
      resources[i].point.x = point[0] - resource_size / 2
      resources[i].point.y = point[1] + resource_size / 2
   }
   ring.rotate(rotation)
}

function importSVG(selector: string | HTMLElement, cb: Function,) {
   paper.project.importSVG(selector, {
      onLoad : function (item: paper.PathItem, element: HTMLElement) {
         cb('success', item, element)
      },
      onError: function (message: string) {
         cb('failed', message)
         console.error(message)
      }
   })
}

function route(obj: Object, sep?: string[] = [], i?: number = -1): any {
   i++
   if (!sep[i]) return obj
   return route(obj[sep[i]], sep, i)
}

class SegmentRing {
   center: Point
   oradius: number
   mradius: number
   iradius: number
   segments: [number, Array<[number, string]>]
   initial_rotation: number
   param: TSegmentRingParam
   name: string
   extrude: number
   dedensity: 'parallel' | 'vertical'
   pathItems: Path[]
   resource_type: 'icon' | 'text'
   resources: any[]
   resources_anchorPoint: Object[]
   nonIsometric_anchorPoint: Object[]
   resource_size: number
   pathRing: Group
   resourceRing: Group
   rootRing: Group
   isometric: boolean
   pathStyle: { [string]: number | string }
   resourceStyle: { [string]: number | string }
   reference: string[]
   
   constructor(param: TSegmentRingParam) {
      let center = this.center = param.paths.center
      let oradius = this.oradius = param.paths.oradius
      let iradius = this.iradius = param.paths.iradius
      let isometric = this.isometric = param.paths.isometric === undefined ? true : param.paths.isometric
      let resource_size = this.resource_size = param.resources.size
      let name = this.name = param.name
      let mradius = this.mradius = iradius + (oradius - iradius) / 2
      //let resources_anchorPoint     = getIsoPolygonsPoints(center, mradius, segments, param.paths.rotation + 360 / (2 * segments))
      this.resources                = []
      this.pathItems                = []
      this.initial_rotation         = param.paths.rotation
      this.center                   = param.paths.center
      this.resource_type            = param.resources.type
      this.pathStyle                = param.paths.style
      this.resourceStyle            = param.resources.style
      this.reference                = param.resources.reference
      this.extrude                  = 0 || param.paths.extrude
      this.dedensity                = param.paths.dedensity ? param.paths.dedensity : 'parallel'
      //this.resources_anchorPoint    = resources_anchorPoint
      this.param                    = param
      this.nonIsometric_anchorPoint = []
      this.segments                 = this.validifySegments(param.paths.segments)
      this.drawIsometricSegment(this.segments)
      this.drawResources()
      
      this.pathRing     = new Group(this.pathItems)
      this.resourceRing = new Group(this.resources)
      this.rootRing     = new Group([this.pathRing, this.resourceRing])
      this.pathRing.setName('pathRing')
      this.resourceRing.setName('resourceRing')
      this.rootRing.setName(name)
      if (param.paths.mouseEvent) {
         this.pathRing.onMouseEnter = function (event: TMouseEvent) {
            //console.log('ring enter', event.point)
         }
      }
   }
   
   setStyles(path: Path, styles: TPaperStyling) {
      let value
      for (let key in styles) {
         value                                    = styles[key]
         key                                      = key.split('.')
         route(path, _.initial(key))[_.last(key)] = value
      }
   }
   
   validifySegments(segments: TSegment): [number, Array<[number, string]>] {
      let segments_data
      if (Array.isArray(segments)) {
         segments_data = segments
         segments      = segments_data.length
         if (this.isometric) throw Error('Ambiguous usage, cannot infer whether to draw in isometric mode or not')
         return [segments, segments_data]
      } else {
         if (!this.isometric) throw Error('Ambiguous usage, cannot infer whether to draw in isometric mode or not')
         let segments_data = []
         return [segments, segments_data]
      }
   }
   
   drawIsometricSegment(segments: [number, Array<[number, string]>], debug: boolean = true) {
      let segments_data                   = segments
      let span                            = 360 / segments_data[0]
      let _from, _inc, pie, datname, self = this
      
      if (this.isometric) {
         for (let i = 0; i < segments_data[0]; i++) {
            _from = span * i + this.param.paths.rotation
            _inc  = span
            pie   = drawPie(this.center, this.oradius, this.iradius, _from, _inc)
            this.setStyles(pie, this.pathStyle)
            this.pathItems.push(pie)
            if (this.param.paths.mouseEvent) {
               pie.onMouseEnter = this.__onMouseEnter(i, pie)
               pie.onMouseLeave = this.__onMouseLeave(i, pie)
            }
         }
      } else {
         //NOTE: non-Isometric mode
         for (let i = 0; i < segments_data[0]; i++) {
            console.log('segments_data:', i, segments_data[1][i])
            _from   = segments_data[1][i][0]
            datname = segments_data[1][i][1]
            putPointsInCircle(this.center, this.oradius, _from, function (center: Point, point: Point, degree: number) {
               let circle: TCircle = Circle(point, self.resource_size / 2)
               self.setStyles(circle, self.pathStyle)
               self.pathItems.push(circle)
               self.nonIsometric_anchorPoint.push({x: point.x, y: point.y, center: center, degree: degree, datname: datname})
               if (debug) {
                  //NOTE: drawing debug point
                  let circle                 = Circle(point, 2)
                  circle.fillColor       = ('#00d7ff': any)
                  circle.fillColor.alpha = 1
                  self.resources.push(circle)
               }
            })
         }
         self.loosenPoints(self.resource_size / 2, 20, debug = true)
      }
      
   }
   
   recalcLoosen() {
   
   }
   
   moveOnCircle(displacement: number, degree: number, length: number = 0) {
      let center     = this.center
      let radius     = this.oradius + length
      let degree_inc = 360 * (displacement / (radius * 6.28))
      degree += degree_inc
      return shiftVector({angle: degree, length: radius}, center)
   }
   
   loosenPoints(lowestDensity: number = 16, extrude: number = 0, debug: boolean = true) {
      function Dot(_item: Path): TDensity {
         return {item: _item, rbound: 0, lbound: 0, shiftment: 0, origin: item.position}
      }
      
      let item, items     = this.pathItems, len = items.length
      let dist            = (a: Point, b: Point) => Math.pow(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2), 0.5)
      let size            = lowestDensity
      let ret: TDensity[] = new Array(len)
      let _next           = (i: number) => (len + i + 1) % len
      let _prev           = (i: number) => (len + i - 1) % len
      let next            = (i: number) => ret[_next(i)] ? ret[_next(i)] : new Dot(items[_next(i)])
      let prev            = (i: number) => ret[_prev(i)] ? ret[_prev(i)] : new Dot(items[_prev(i)])
      let prevItem: TDensity,
          nextItem: TDensity,
          currentItem: TDensity,
          prev_density: number,
          acc_shiftmet: number
      
      for (let i = 0; i < len; i++) {
         //NOTE: 以順時針方向為例，lbound -， rbound +
         item     = items[i]
         prevItem = prev(i)
         if (!ret[_prev(i)]) ret[_prev(i)] = prevItem
         
         prev_density       = (dist(item.position, prevItem.item.position) / 2) / size
         currentItem        = ret[i] ? ret[i] : new Dot(item)
         currentItem.lbound = prev_density
         prevItem.rbound    = prev_density
         ret[i]             = currentItem
         
      }
      
      
      let direction = 1
      let setlBound = (id: number, item: TDensity, value: number) => {
         item.lbound += value
         prev(id).rbound -= value
      }
      let setRbound = (id: number, item: TDensity, value: number) => {
         item.rbound += value
         next(id).lbound -= value
      }
      
      let shift = (id: number, item: TDensity) => {
         let ldiv_bound = 0
         let rdiv_bound = 0
         if (prev(id).shiftment / size > 0) ldiv_bound += prev(id).shiftment / size
         if (next(id).shiftment / size < 0) rdiv_bound -= next(id).shiftment / size
         
         if ((item.lbound - ldiv_bound < 1)) {
            ldiv_bound += 2 * (1 - item.lbound)
            
            setlBound(id, item, ldiv_bound)
            item.shiftment += ldiv_bound * size
         }
      }
      console.warn('lossen:')
      console.log(_.cloneDeep(ret))
      for (let i = 0; i < len; i++) {
         currentItem = ret[i]
         shift(i, currentItem)
         if (debug) {
            if (currentItem.shiftment !== 0) {
               currentItem.item.strokeColor = currentItem.shiftment < 0 ? 'red' : 'blue'
            }
         }
         let point                          = this.moveOnCircle(currentItem.shiftment, this.nonIsometric_anchorPoint[i].degree, extrude)
         currentItem.item.position          = point
         this.nonIsometric_anchorPoint[i].x = point.x
         this.nonIsometric_anchorPoint[i].y = point.y
         
         if (debug) {
            // NOTE: painting data name on resources for debug purposse
            let text2             = createText(currentItem.item.position.x, currentItem.item.position.y, `${i}: ${this.nonIsometric_anchorPoint[i].datname}`)
            text2.fontSize        = 8
            text2.fillColor       = ('black': any)
            text2.fillColor.alpha = 1
            this.resources.push(text2)
         }
      }
      console.warn('lossen:')
      console.log(ret)
   }
   
   drawResources() {
      let segments_data                               = this.segments
      let x, y, text, svg, param                      = this.param,
          segments: number = segments_data[0], center = this.center,
          resources                                   = this.resources, resource_size   = this.resource_size,
          self                                        = this
      
      let resources_anchorPoint
      if (this.isometric) {
         resources_anchorPoint = getIsoPolygonsPoints(center, this.mradius, segments, param.paths.rotation + 360 / (2 * segments))
      } else {
         resources_anchorPoint = this.nonIsometric_anchorPoint
         console.error('drawing resources mode in nonIsometric mode is not implemented yet')
         segments = resources_anchorPoint.length
      }
      
      if (param.resources.type === 'icon') {
         //FIXME: implemntation              :
         for (let i = 0; i < segments; i++) {
            x = resources_anchorPoint[i].x
            y = resources_anchorPoint[i].y
            //console.log('import svg:', i, param.resources.data[i])
            paper.project.importSVG(param.resources.data[i], {
               onLoad : function (item: TItem, element: HTMLElement) {
                  //console.log('svg item loaded:', i, item, arguments)
                  item.position.x = x
                  item.position.y = y
                  console.log('resource:', param.resources.data[i], item)
                  resources.push(item)
                  self.setStyles(item, self.resourceStyle)
                  item.onMouseEnter = null
                  item.onMouseLeave = null
               },
               onError: function (message: string) {
                  console.error(message)
               }
            })
         }
      } else if (param.resources.type === 'text') {
         for (let i = 0; i < segments; i++) {
            x                    = resources_anchorPoint[i].x
            y                    = resources_anchorPoint[i].y
            text                 = createText(x - resource_size / 2, y + resource_size / 2, param.resources.data[i])
            text.fillColor       = ('white': any)
            text.fillColor.alpha = 0.5
            text.fontSize        = resource_size
            resources.push(text)
            text.onMouseEnter = null
            text.onMouseLeave = null
         }
      } else {
         throw new Error()
      }
   }
   
   exportSVG() {
      return this.rootRing.exportSVG()
   }
   
   onMosueEnter(fn: (id: number, path: Path) => void) { //$flowNOTE:
      this._onMouseEnter = fn.bind(this)
   }
   
   onMouseLeave(fn: (id: number, path: Path) => void) { //$flowNOTE:
      this._onMouseLeave = fn.bind(this)
   }
   
   _onMouseEnter(id: number, path: Path): void {
   }
   
   _onMouseLeave(id: number, path: Path): void {
   }
   
   __onMouseEnter(id: number, path: Path) {
      let self = this
      
      function wrapper(event: TMouseEvent) {
         //TODO: process events............:
         self._onMouseEnter(id, path)
      }
      
      return wrapper.bind(path)
   }
   
   __onMouseLeave(id: number, path: Path) {
      let self = this
      
      function wrapper(event: TMouseEvent) {
         //TODO: process events............:
         self._onMouseLeave(id, path)
      }
      
      return wrapper.bind(path)
   }
   
   matrixCopy(number: number, fn: (number, number) => number, acc: number = 0) {
      for (let i = 0; i < number; i++) {
         acc = fn(i, acc)
      }
   }
   
   rotateResources(deg: number) {
      let point, res = this.resources
      let pos        = this.resource_type === 'text' ? (x) => x.point : (x) => x.position
      let shift      = this.resource_type === 'text' ? this.resource_size / 2 : 0
      for (let i = 0; i < this.segments[0]; i++) {
         point         = rotateCustomPoint(deg, this.resources_anchorPoint[i], this.center)
         pos(res[i]).x = point[0] - shift
         pos(res[i]).y = point[1] + shift
      }
   }
   
   rotate(deg: number) {
      this.rotateResources(deg)
      this.pathRing.rotate(deg)
   }
   
   //noinspection JSAnnotator
   set position(position: number[]) {
      this.rootRing.position.x = position[0]
      this.rootRing.position.y = position[1]
   }
   
   get position(): Point {
      return this.rootRing.position
   }
   
   get matrix(): Matrix {
      return this.rootRing.matrix
   }
   
   //noinspection JSAnnotator
   set matrix(props: Matrix) {
   
   }
}


function Prop(data: TProp | TParsedProp): TProp {
   data.unit = data.unit ? data.unit : 'px'
   return data
}

function ParsedProp(data: TParsedProp): TParsedProp {
   let ret  = (new Prop(data): any)
   ret.path = data.path
   console.log('parsedProp:', data, 'ret:', ret)
   return (ret: TParsedProp)
}


const AnimeStack       = []
const FORBIDDEN_PROPS  = ['matrix']
const PSEUDO_PROPS     = ['matrixTo', 'skewTo', 'shearTo']
const PSEUDO_PROPS_MAP = {
   skewTo  : ['_skewX', '_skewY'],
   shearTo : ['_shearX', '_shearY'],
   matrixTo: ['_matrixA', '_matrixB', '_matrixC', '_matrixD', '_matrixTX', '_matrixTY'],
}
const HANDY_PROPS      = ['position', 'scaling', 'scale']
const HANDY_PROPS_MAP  = {
   position: ['x', 'y'],
   scaling : ['x', 'y'],
}

class AnimePropHelpers {
   anime: AnimeObject
   params: TPaperAnimeSetting
   
   constructor(anime: AnimeObject) {
      this.anime  = anime
      this.params = this.anime.params
   }
   
   addHandyProps(propmediator: string, propnames: string[]) {
      if (propmediator in HANDY_PROPS) throw new Error(`addHandyProps propmediator: ${propmediator}, already in used`)
      HANDY_PROPS.push(propmediator)
      HANDY_PROPS_MAP[propmediator] = propnames
   }
   
   addPseudoProps(propmediator: string, propnames: string[]) {
      if (propmediator in PSEUDO_PROPS) throw new Error(`addPseudoProps propmediator: ${propmediator}, already in used`)
      PSEUDO_PROPS.push(propmediator)
      PSEUDO_PROPS_MAP[propmediator] = propnames
   }
   
   hasSetter   = (pth: string) => this.params.setters && this.params.setters[pth] !== undefined
   hasGetter   = (pth: string) => this.params.getters && this.params.getters[pth] !== undefined
   isPseudo    = (prop: string) => PSEUDO_PROPS.indexOf(prop) !== -1
   isHandyProp = (prop: string) => HANDY_PROPS.indexOf(prop) !== -1
   
   _getGeneralPropertySetter(_path: string, _prop: string, _dest: any, i: number) {
      let anime  = this.anime,
          params = this.params,
          self   = this,
          orig_value: number,
          _rel_dest: number
      
      if (params.from) {
         orig_value = anime.preprocessed_from[i].value
      } else if (params.fromOrigin) {
         orig_value = params.getters[_path](params.target)[_prop]
      } else {
         throw new Error('Unknown error animation config should contains fromOrigin:true or providing "from" attributes')
      }
      
      _rel_dest = this.absoluteToRelative(orig_value)
      return (ratio: number, dest: TProp, from: TProp, target: Object, linked: Object): void => {
         if (self.anime.relativeMode) {
            params.getters[_path](params.target)[_prop] = orig_value + ratio * (_rel_dest - orig_value)
         } else {
            params.getters[_path](params.target)[_prop] = orig_value + ratio * (_dest - orig_value)
         }
         
      }
   }
   
   _getHandyPropertySetter(_path: string, _props: string[], _prop: string, _dest: any, i: number) {
      let anime  = this.anime,
          params = this.params,
          self   = this,
          orig_value: number[],
          _rel_dest: number[]
      
      if (params.from) {
         orig_value = anime.preprocessed_from[i].value
      } else if (params.fromOrigin) {
         orig_value = params.getters[_path](params.target)[_prop]
      } else {
         throw new Error('Unknown error animation config should contains fromOrigin:true or providing "from" attributes')
      }
      let j                = -1, len = _dest.length
      let mediator: Object = anime.route(params.target, _props)[_prop]
      _rel_dest            = this.absoluteToRelative(orig_value)
      console.log('found handyProp:', _prop, orig_value, mediator)
      return (ratio: number, dest: TProp, from: TProp, target: Object, linked: Object): void => {
         mediator = anime.route(params.target, _props)[_prop]
         if (self.anime.relativeMode) {
            for (j = 0; j < len; j++) {
               mediator[HANDY_PROPS_MAP[_prop][j]] = orig_value[j] + ratio * (_rel_dest[j] - orig_value[j])
            }
         } else {
            for (j = 0; j < len; j++) {
               mediator[HANDY_PROPS_MAP[_prop][j]] = orig_value[j] + ratio * (_dest[j] - orig_value[j])
            }
         }
      }
   }
   
   _getPseudoPropertySetter(_path: string, _props: string[], _prop: string, _dest: any, i: number) {
      let anime  = this.anime,
          params = this.params,
          self   = this,
          orig_value: number[],
          _rel_dest: number[]
      if (params.from) {
         orig_value = anime.preprocessed_from[i].value
      } else if (params.fromOrigin) {
         orig_value = params.getters[_path](params.target, _prop)[_prop]
      } else {
         throw new Error('Unknown error animation config should contains fromOrigin:true or providing "from" attributes')
      }
      
      _rel_dest = this.absoluteToRelative(orig_value)
      console.log('found pseudoProp:', _prop, orig_value)
      let v: number[], j = -1
      return (ratio: number, dest: TProp, from: TProp, target: Object, linked: Object): void => {
         j = -1
         if (self.anime.relativeMode) {
            v = orig_value.map((x) => {
               j++
               return x + ratio * (_rel_dest[j] - x)
            })
         } else {
            v = orig_value.map((x) => {
               j++
               return x + ratio * (_dest[j] - x)
            })
         }
         anime.route(params.target, _props)[_prop](...v)
      }
   }
   
   absoluteToRelative(orig_value: number | number[]) {
      let ret = _.cloneDeep(orig_value)
      if (Array.isArray(orig_value) && Array.isArray(ret)) {
         for (let i = 0; i < orig_value.length; i++) {
            ret[i] += (orig_value[i]: number)
         }
      } else if (typeof orig_value === 'number' && typeof ret === 'number') {
         ret += (orig_value: number)
      }
      return ret
   }
   
   initializeSetterAndGetter() {
      const params = this.params
      const anime  = this.anime
      let destlen  = this.params.to.length, i = 0
      
      const hasSetter   = this.hasSetter
      const hasGetter   = this.hasGetter
      const isPseudo    = this.isPseudo
      const isHandyProp = this.isHandyProp
      
      for (i = 0; i < destlen; i++) {
         let parsed_destinations: TParsedProp
         let _prop: string, _props: string[], _path: string, _dest: any
         let _default_getter: TGetter,
             _pseudo_getter: TGetter,
             _handy_getter: TGetter,
             _default_setter: TSetter
         let _pseudo_retptn: Object, mediator: Object
         
         parsed_destinations = anime.parseDestination(params.to[i])
         _dest               = parsed_destinations.value
         _prop               = parsed_destinations.prop
         _props              = parsed_destinations.path
         console.log('parsed_destinations:', parsed_destinations)
         console.log('params.to:', params.to[i])
         _path                 = _props.length >= 1 ? _props.join('.') + `.${_prop}` : _prop
         _pseudo_retptn        = {}
         _pseudo_retptn[_prop] = null
         _default_getter       = () => anime.route(params.target, _props)
         _pseudo_getter        = () => {
            mediator              = anime.route(params.target, _props)
            _pseudo_retptn[_prop] = PSEUDO_PROPS_MAP[_prop].map((x) => mediator[x])
            return _pseudo_retptn
         }
         _handy_getter         = () => {
            mediator              = anime.route(params.target, _props)[_prop]
            _pseudo_retptn[_prop] = HANDY_PROPS_MAP[_prop].map((x) => mediator[x])
            return _pseudo_retptn
         }
         
         console.log('parsed dest,', _prop, _dest)
         if (!hasGetter(_path)) {
            if (isPseudo(_prop)) {
               params.getters[_path] = _pseudo_getter
            } else if (isHandyProp(_prop)) {
               params.getters[_path] = _handy_getter
            } else {
               params.getters[_path] = _default_getter
            }
         }
         if (params.from || params.fromOrigin) {
            //NOTE: general property              :
            if (!isPseudo(_prop) && !isHandyProp(_prop)) {
               _default_setter = this._getGeneralPropertySetter(_path, _prop, _dest, i)
               //NOTE: handyProperty              :
            } else if (isHandyProp(_prop)) {
               _default_setter = this._getHandyPropertySetter(_path, _props, _prop, _dest, i)
               //NOTE: pseudo property              :
            } else if (isPseudo(_prop)) {
               _default_setter = this._getPseudoPropertySetter(_path, _props, _prop, _dest, i)
            } else {
               throw new Error(`Uncaught error in initializeSetterAndGetter for propname:, ${_prop}`)
            }
            
         } else {
            _default_setter = (ratio: number, dest: TProp, from: TProp, target: Object, linked: Object): void => {
               params.getters[_path](params.target)[_prop] += ratio * (_dest - params.getters[_path](params.target)[_prop])
            }
         }
         if (!hasSetter(_path)) {
            params.setters[_path] = _default_setter
         }
         console.log(params)
      }
   }
   
   
}


// TODO: rewite with pure class style in different branches
class AnimeObject {
   //NOTE: property                       ;
   duration: number
   to: TDest
   relTo: TDest
   preprocessed_from: TDest
   linked: Object
   target: Object
   decay: number
   easing: Function
   bounding_t: number
   reusable: boolean
   finished: boolean
   params: TPaperAnimeSetting
   parsed_destinations: TParsedDest
   parsed_relDestinations: TParsedDest
   start_t: number
   name: string
   helper: AnimePropHelpers
   relativeMode: boolean
   // NOTE: states ---- TODO: implementation
   started: boolean
   // NOTE: on animation listener TODO: implementation
   onStart: Function
   onProgress: Function
   onFinished: Function
   
   // NOTE: function                      ;
   restart: () => void
   calc: (current_t: number) => boolean
   
   constructor(params: TPaperAnimeConfig) {
      this.start_t  = Date.now()
      this.duration = ensure(params.duration, (x) => x !== 0 && Number(x) === x)
      this.to       = ensure(params.to, (x) => Array.isArray(x) && x.length !== 0)
      this.linked   = params.linked
      this.target   = params.target
      this.decay    = params.decay
      this.easing   = params.easing
      
      if (params.from) throw new Error('setting animation "from" position is not implemented yet')
      
      this.preprocessed_from = params.from ? params.from : []
      this.bounding_t        = this.start_t + this.decay
      this.relativeMode      = params.relativeMode = params.relativeMode ? params.relativeMode : false
      if (params.from) params.fromOrigin = false
      
      this.reusable               = params.reusable ? true : false
      this.finished               = false
      this.parsed_destinations    = []
      this.parsed_relDestinations = ([]: any)
      this.relTo                  = []
      this.restart                = this.renew
      //NOTE: PRIVATE                ;
      params.setters              = !params.setters ? {} : params.setters
      params.getters              = !params.getters ? {} : params.getters
      this.params                 = (params: any)
      this.helper                 = new AnimePropHelpers(this)
      
      //NOTE: PRIVATE                ;
      let i, destlen = this.to.length, ratio, _dest, _prop, _props, _path
      
      
      // NOTE: for sharing local variables             ;
      const calc = this.calc = function calc(current_t: number): boolean {
         if (this.isOnFrame(current_t)) {
            ratio = this.getRatio(current_t)
            for (i = 0; i < destlen; i++) {
               _dest  = this.parsed_destinations[i].value
               _prop  = this.parsed_destinations[i].prop
               _props = this.parsed_destinations[i].path
               _path  = _props.length >= 1 ? _props.join('.') + `.${_prop}` : _prop
               this.params.setters[_path](ratio, this.params.to[i], this.preprocessed_from[i], this.params.target, this.params.linked)
            }
            return true
         } else {
            if (current_t >= this.bounding_t) return this._closeAnime()
            return true
         }
      }
      
      this.helper.initializeSetterAndGetter()
      this.initializeDestAndOrigin(this.to, this.parsed_destinations, this.preprocessed_from, this.target)
      
      if (params.from) this.preprocessed_from = params.from //NOTE: rewrite it
      AnimeStack.push(this)
   }
   
   route(obj: Object, sep?: string[] = [], i?: number = -1): any {
      i++
      if (!sep[i]) return obj
      return this.route(obj[sep[i]], sep, i)
   }
   
   restoreOrigins() {
      let _path
      for (let orig: TProp of this.preprocessed_from) {
         _path = orig.prop
         //FIXME: orig, orig??? should be  "to, orig"
         this.params.setters[_path](1, orig, orig, this.target, this.linked)
      }
   }
   
   renew(immediately: boolean = false) {
      this.finished = false
      this.restoreOrigins()
      this.decay      = immediately ? 0 : this.params.decay
      this.start_t    = Date.now()
      this.bounding_t = this.start_t + this.decay
   }
   
   isOnFrame = (current_t: number) => current_t >= this.bounding_t && current_t <= this.bounding_t + this.duration
   getRatio  = (current_t: number) => this.easing(Math.min(1, (current_t - this.bounding_t) / this.duration))
   
   _closeAnime = function () {
      if (this.reusable) {
         console.log('close anime', this.reusable)
         this.finished = true
         return true
      } else {
         console.log('close anime', this.reusable)
         AnimeStack.slice(AnimeStack.indexOf(this), 1)
         return false
      }
      
   }
   
   parseDestination(destprop: TProp): TParsedProp {
      if (destprop.prop.indexOf('.') !== -1) {
         let path = destprop.prop.split('.')
         return new ParsedProp({path: _.initial(path), prop: _.last(path), value: destprop.value})
      } else {
         return new ParsedProp({path: [], prop: destprop.prop, value: destprop.value})
      }
   }
   
   
   initializeDestAndOrigin(destproperties: TDest, parsed_destproperties: TParsedDest, _from: TDest,
                           target: Object): ?TParsedDest {
      try {
         let k, destprop
         //console.log(destproperties, parsed_destproperties)
         for (k = 0; k < destproperties.length; k++) {
            destprop            = destproperties[k]
            //console.log(destprop, this.params.getters)
            let parsed_destprop = []
            let _originprop     = []
            let orig_value: number | number[]
            parsed_destprop     = this.parseDestination(destprop)
            orig_value          = this.params.getters[destprop.prop](this.params.target)[parsed_destprop.prop]
            
            _originprop = new Prop({prop: destprop.prop, value: orig_value})
            _from.push(_originprop)
            parsed_destproperties.push(parsed_destprop)
            
            //NOTE: these following two - relTo + parsed_relDestinations - Unknown??
            let parsed_relprop = _.cloneDeep(parsed_destprop)
            let relprop        = _.cloneDeep(destprop)
            console.log('parsed_relprop:', parsed_relprop)
            console.log('relprop:', relprop)
            if (Array.isArray(orig_value)) {
               for (let i = 0; i < orig_value.length; i++) {
                  parsed_relprop.value[i] += orig_value[i]
                  relprop.value[i] += orig_value[i]
               }
            } else if (Number(orig_value) === orig_value) {
               parsed_relprop.value += orig_value
               relprop.value += orig_value
            } else {
               throw new Error('Unknown error')
            }
            
            this.relTo.push(relprop)
            this.parsed_relDestinations[k] = parsed_relprop
         }
      } catch (e) {
         console.error(e, 'one of following animation properties cannot be found:', destproperties)
         throw new Error(e)
      }
   }
   
   
   fromToAnimation(propname: string, dest: TProp, origin: TProp, target: Object) {
      let origprop = origin.value
      let destprop = dest.value
      
      function fromToAnimWrapper(ratio: number) {
         return origprop + ratio * (destprop - origprop)
      }
   }
   
   anywhereToAnimation(dest: TProp) {
      let destprop = dest.value
      
      function wrapper(ratio: number) {
         function anywhereToAnimWrapper(thisprop: number) {
            return thisprop + ratio * (destprop - thisprop)
         }
         
         return anywhereToAnimWrapper
      }
      
      return wrapper
   }
}


// TODO: 常用組件動畫依續fadein fadeout,  PRIORITY MEDIUM:
class AnimationGroup {
   //children: AnimeObject[]
   //configs: TPaperAnimeConfig[]
   //
   //constructor(data: TPaperAnimeGroup) {
   //   let configs = this.configs = this.initialize(data)
   //   this.children = []
   //   for (let i = 0; i < data.targets.length; i++) {
   //      let target = data.targets[i]
   //      let _data  = {}
   //      for (let key in data) {
   //         if (['getters', 'setters', 'targets'].indexOf(key) === -1) {
   //            _data[key] = data
   //         }
   //      }
   //      _data.target = target
   //      if (data.setters) _data.setter = data.setters[i]
   //      if (data.getters) _data.getter = data.getters[i]
   //      this.children.push(new AnimeObject(_data))
   //   }
   //}
}


type TPaperStageAnimeConfig = {
   name: string,
   configs: TPaperAnimeConfig[]
}

type TPaperSceneAnimeConfig = {
   [string]: TPaperStageAnimeConfig
}


// TODO: 命名動畫         PRIORITY: LOW:
class AnimationSceneObject {

}


export {
   //NOTE: expose paper properties           ;
   paper, Path, PointText, Circle,
   Point, view, Group, Matrix,
   //NOTE: paper utilities                   ;
   SegmentRing, rotateRing, putPointsInCircle,
   getIsoPolygonsPoints, drawPie, importSVG,
   drawArcByCenter, rotateCustomPoint,
   rotatePoint, shiftVector, createText,
   //NOTE: Animation utilities                ;
   AnimationGroup, AnimeObject, AnimeStack
   
}