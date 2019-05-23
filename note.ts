// ## TypeScript basics

// 1. var, let, const
//by default var will scoped in nearest function
function doSomeThing() {
  for (var i = 0; i < 5; i++) {
    //
  }
  console.log(`Finally ${i}`)
}

doSomeThing() // 5

//by default let and const will scoped in nearest block instead of function

function doSomeThingElse() {
  for (let i = 0; i < 5; i++) {
    //
  }
  console.log(`Finally ${i}`) // i is not defined
}

doSomeThingElse() // 5 cuz tsc will compile it to es5

// 2. types

const a: string = 'hello'
const b: number = 2
const c: boolean = true
const d: any = 'hello'
const e: number[] = [1, 2, 3]
const f: any[] = ['hello', 1, true]
enum Color { 'Red' = 0, 'Blue' = 1, 'Black' = 2 }
let backgroundColor = Color.Black

// 3. type assertion two approach

let message;
message = 'hello'

const messageLen1 = (<string>message).length
const messageLen2 = (message as string).length

// 4. custom types

// inline annotation
const draw = (point: { x: number, y: number }) => { }

draw({ x: 1, y: 2 })

// interface

interface Point {
  x: number,
  y: number
}

const draw1 = (point: Point) => { }

draw1({ x: 1, y: 2 })

// 5. class & optional constructor args

class Point {
  constructor(x1?: number, y1?: number) {
    this.x1 = x1
    this.y1 = y1
  }
  draw2() {
    console.log(this.x1, this.y1)
  }
}

const point = new Point()

// 6. Access Modifiers 
//public(default) private protected

class Point1 {
  private x: number
  private y: number

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  draw() {
    console.log(this.x, this.y)
  }
}

const point1 = new Point1(7, 7)

point1.x // not accessible

// use instead

class Point2 {
  constructor(private x: number, private y: number) {
    // tsc will automatically define this.x and this.y
  }
}

// 7. properties getter and setter 

class Point3 {
  constructor(private _x: number, private _y: number) { }

  get x() {
    return this._x
  }
  set x(value) {
    if (value < 0) throw new Error('x should be greater than zero.')
    this._x = value
  }
}

const point3 = new Point3(7, 7)

console.log(point3.x) //7

point.x = 4
