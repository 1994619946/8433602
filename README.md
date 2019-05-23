# Object Oriented javaScript recap

## Section One (OOP)

```javascript
1. Pillars of oop:

	1 ENCAPSULATION:
		eg. let emplyoee={
		base_salary: 3000,
		over_time: 10,
		rate: 20,
		getWage: function(){
			return this.base_salary + (over_time * over_time)
		}
		}

	2 ABSTRACTION: eg in practice dvdPlayer: a bunch hidden propery and methods make it easier to use main function and also adding or changing hidden function not break instance

	3 INHERITENCE: eg textBox in html instead of define all props for each instance we defining once in Object and instance will inherite this props

	4 POLYMORPHISM: refactor ugly switch/case statement

```

## Section Two(Objects)

```javascript
1. literal object:

const cricle = {
  radius: 20,
  draw: function() {
    console.log(radius);
  }
};

cricle.draw();

2. factories // if function return object

function createCricle(radius) {
  return {
    radius
    draw: function() {
      console.log(radius);
    }
  };
}

const cricle = createCricle();

cricle.draw();

3. Constructor Function //if use this along new operator

function Cricle(radius) {
  console.log(this);
  this.radius = radius;
  this.draw = function() {
    console.log(radius);
  };
}

const cricle = new Cricle(10);

cricle.draw();

4. Constructor property
  // every object in js have property named constructor
  //and that refer the function used create that object

  eg1.
  function Cricle(radius) {
    this.radius = radius;
    this.draw = function() {
      console.log(radius);
    };
  }

  const cricle = new Cricle(50);

  cricle.constructor =>

  ƒ Cricle(radius) {
    this.radius = radius;
    this.draw = function() {
      console.log(radius);
    };
  }

  eg2.
  function createCricle(radius) {
    return {
      radius,
      draw: function() {
        console.log(radius);
      }
    };
  }

  const anotherCricle = createCricle(10);

  anotherCricle.constructor
  ƒ Object() { [native code] }
  //when using object literal js will turn it
  // to new Object()

4. in js function are object!

function createCricle(radius) {
  return {
    radius,
    draw: function() {
      console.log(radius);
    }
  };
}

createCricle.name
"createCricle"

createCricle.length //args count
  1

createCricle.constructor
  ƒ Function() { [native code] }
//when define a function js will
// insteade using new Function()

const Cricle = new Function(
  'radius',
  `{
  this.radius = radius;
  this.draw = function(){
    console.log('draw')
  }
}`
);

const cricle = new Cricle(10);

//to calling function
Cricle.call({},'10')
// to calling with a array of args
Cricle.apply({},['10','12'])

5. js types:
  //Primitives are copied by their value
  //Objects are copied by their refrence

             -----------------------
ValueTypes(primitive) | ReferenceTypes
              -------------------
            Number    | Object( Function, Array)
            String    |
            Boolean   |
            Symboles  |
            undefined |
            null      |
eg.
let x = 10
let y = x
x = 20
console.log(y) // 10

// when define an object using variable the object whill store someWhere in
// memory and addres of that place will store in variable
eg.
let x = {value : 10}
let y = x
x.value = 20
console.log(y)  //{value: 20}

6. dynamic Objects

function Cricle(radius){
  this.radius = radius
  this.cricle = function(){
    console.log(radius)
  }
}

const cricle = new Cricle(50)

//adding property
cricle.location = {x:10,y:20}
cricle['location'] = {x:10, y:20}
//removing propety
delete cricle.location
delete cricle['location']

7. Enumerating properties

  const cricle = new Cricle(10)

  for( let key in cricle){
    if(typeof cricle[key] !== 'function')
    console.log(key, cricle[key])
  }

const keys = Object.keys(cricle)  //return array of props and methods

if('readius' in cricle) console.log(cricle[radius])

8. Abstraction //hide the details just show essentials

function Cricle(radius){
  this.radius = radius
  this.draw = function(){
    console.log(radius)
  }
  //prop and method not accesable through instance
  let defaultLocation = {x: 1,y:3},
  //clauser
  let hideFunction= function(){
    //scoope
    console.log(defaultLocation)
  }
}

9. getter and setter

function Cricle(radius){
  this.radius = radius
  this.draw = function(){
    console.log(radius)
  }

  let defaultLocation = {x:20, y:30}

  Object.defineProperty(this,'defaultLocation',{
    get: function(){
      console.log(defaultLocation)
    }
    set: function(value){
      if(!value.x || value.y) throw new Error('invalid location')

      defaultLocation = value
    }
  })
}

const cricle = new Cricle

//getter
circle.defaultLocation //{X;20, y:30}

//settre
  cricle.defaultLocation = {x:45, y: 84}
```

## Section Three(Prototype)

```javascript
1. Inheritence

  Classical definition:
  //eg. Circle IS-A Shape(Circle inherited props and methods from Shape)
  Shape(Super/Base/Parent)->Circle(Derived/Sub/Child)

  Prototypical definition:
  //prototype is just a regular object
  //every object have prototype except rootObject

  //when try to using a property or method from a object js engine first look at object's methods and if can't find
  //that method look up for it and it's __proto__

2. property descriptor

  let dog = { name: 'Rex' };

  let baseObject = Object.getPrototypeOf(dog);
  let descriptor = Object.getOwnPropertyDescriptor(baseObject, 'toString');
  console.log(descriptor);

    {value: ƒ, writable: true, enumerable: false, configurable: true}
      configurable: true
      enumerable: false
      value: ƒ toString()
      writable: true
      __proto__: Object

  //describe own object props:
    let dog = { name: 'Rex' };

    Object.defineProperty(dog, 'name', {
      configurable: false,
      writable: false,
      enumerable: false
    });

    for (let key in dog) console.log(key); //nothing get


3. Constructor prototype:

    let obj = {}

    Object.getPrototypeOf(obj) === Object.prototype() // prototype that
                                                      //used for creating
    let array = []                                    //all objects

    Object.getPrototypeOf(array) === Array.prototype()

4. protype members vs instance memebers

  function Circle(radius) {
    //instance members
    this.radius = radius;
  }
  //prototype members
  Circle.prototype.draw = function() {
    console.log('draw');
  };

  let c1 = new Circle(10);

  //js engine look for method in it's prototype(s) and execute that's one
  //that is more accusable

  function Circle(radius) {
    this.radius = radius;
  }

  Circle.prototype.toString = function() {
    console.log("i'm in Circle constructor;");
  };

  let c1 = new Circle(10);

  c1.toString()
  // i'm in Circle constructor;

  5. iterating instance and prototype:

    function Circle(radius) {
      this.radius = radius;
      this.draw = function() {
        this.toString();
      };
    }

    Circle.prototype.toString = function() {
      console.log('object');
    };

    let c1 = new Circle();

      console.log(Object.keys(c1))  //['radius']

      for(key in c1) console.log(key) //radius \n draw \n toString

      c1.hasOwnProperty('toString')  //false cuz toString is a prototype property
```

## Section Four (Prototypical Inheritance)

```javascript
1. make an Constructor inherited another

  function Shape(){}
  Shape.prototype.draw = function(){console.log('draw')}

  function Cricle(){}

  Cricle.prototype = Object.create(Shape.prototype)

  const c1 = new Cricle()

  c1:
    Circle {}
    __proto__: Shape
    __proto__:
    draw: ƒ ()
    constructor: ƒ Shape()
    __proto__: Object

  //as best practice add constructor method whenever reset prototype
    Circle.prototype.constructor = Circle

2. calling super constructor:

  function Shape(color){
    this.color = color
  }

  function Circle(radius,color){
    Shape.call(this,color)
    this.radius = radius
  }

  Circle.prototype = Object.create(Shape.prototype)
  Circle.prototype.constructor = Circle

  const c1 = new Circle(10,'red')

3. extend refactor

  function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Circle;
  }

  function Shape(color) {
    this.color = color;
  }

  Shape.prototype.draw = function() {
    console.log('draw');
  };

  function Circle(radius, color) {
    Shape.call(this, color);
    this.radius = radius;
  }

  extend(Circle, Shape);

  const c1 = new Circle(10, 'red');

4. PolyMorphisem

function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Circle;
}

function Shape(color) {
  this.color = color;
}
Shape.prototype.draw = function() {
  console.log('draw');
};

function Circle(radius, color) {
  Shape.call(this, color);
  this.radius = radius;
}
extend(Circle, Shape);
Circle.prototype.draw = function() {
  console.log('draw Circle');
};

function Square(color) {
  Shape.call(this, color);
}
extend(Square, Shape);
Square.prototype.draw = function() {
  console.log('draw Square');
};

const shapes = [new Circle(10, 'red'), new Square('black')];
for (let shape of shapes) shape.draw();  // array loop  "of"
    //draw Circle
    //draw Square




exercise 2.

	function HtmlElement() {
  this.click = function() {
    console.log('Clicked');
  };
}
HtmlElement.prototype.focus = function() {
  console.log('Focused');
};
HtmlElement.prototype.render = function() {
  console.log('No render method specified to this element.');
};

function HtmlSelectElement(items = []) {
  this.items = items;
  this.addItem = function(value) {
    this.items.push(value);
  };
  this.removeItem = function(value) {
    this.items = this.items.filter(e => e !== value);
  };
}

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;
HtmlSelectElement.prototype.render = function() {
  return `
  <select>${this.items
    .map(
      v => `
  <option>${v}</option>`
    )
    .join('')}
  </select>`;
};

function ImageElement(src) {
  this.src = src;
}

ImageElement.prototype = new HtmlElement();
ImageElement.prototype.constructor = ImageElement;
ImageElement.prototype.render = function() {
  return `<img src="${this.src}" />`;
};

const elements = [
  new HtmlSelectElement([1, 2, 3]),
  new ImageElement('http://')
];

for (let element of elements) console.log(element.render());
```

## Section Five(ES6 Classes)

```javascript
1. Classes
  //Classes is actually constructor functions and that's just syntactical
  //sugar over es6

  class Circle {
    constructor(radius) {
      this.radius = radius;
      this.draw = function() {};
    }
    move() {} // define method in prototype
  }

2. Hoisting
  //there is two way in js to define a function
  1.Function Declaration  //hoisted
  function sayHello(){}
  2.Function Expression   //not hoisted
  const sayHello = function(){};

  //while defining a class we can use this two ways but no one will hoist!
  1.Decleration
    class Circle{}  //not hoisted
  2.Expression
    const Circle = class{}    //not hoisted

3.Static and Instance methods
  // instance methods just available in instance of a Class
  //static methods just available in Class itself

  eg.
  class Circle {
    constructor(radius) {
      this.radius = radius;
    }
    //instance method
    draw() {
      console.log('draw');
    }
  }

  const c = new Circle();
  c.draw();
  Circle.draw(); //throw error

  eg.
    1.
    class Circle {
      constructor(radius) {
        this.radius = radius;
      }
      //static method
      static parse(str) {
        const r = JSON.parse(str).radius; //parse json to object
        //console.log(JSON.stringify(str)); //parse json to string
        return new Circle(r);
      }
    }

    const c = Circle.parse('{ "radius": "10" }');
    c.parse(); //throw error

    2.
    class Math2{
      static abs(value){}
    }
    Math2.abs()

4. 'use strict' in js
    // strict mode (expect to following rules) in js prevent use to modify
    //global or window object

  eg.
  'use strict';

  function Circle() {
    this.draw = function() {
      console.log(this);
    };
  }
  const c = new Circle();
  const draw = c.draw;
  draw(); //undefined

  //by default in body of classes strict mode is enabled

  class Circle{
    static draw(){console.log(this)}
  }

  Circle.draw() //undefined

5. abstraction using Symbol

  const _radius = Symbol() //will return a unique identifier
  const _draw = Symbol()

  class Circle{
    constructor(radius){
      this[_radius]= radius
    }
    [_draw](){} //computed property in es6+
  }
6. abstraction using WeakMap

  const _radius = new WeakMap();
  const _move = new WeakMap();

  class Circle {
    constructor(radius) {
      _radius.set(this, radius);

      _move.set(this, function() {
        console.log('move', this);
        //this will be undefined cuz strict mode
         //using arrow function this will point to instance object
      });
    }

    draw() {
      _move.get(this)();

      console.log(_radius.get(this));
    }
  }

  const c = new Circle(10);

7. Getter and Setter in es6 Classes

  const _radius = new WeakMap();

  class Circle {
  constructor(radius) {
    _radius.set(this, radius);
  }

  get radius() {
    console.log(_radius.get(this));
  }

  set radius(v) {
    if (v <= 0 || typeof v !== 'number')
      throw new Error('Radius can not except numbers or negative.');
    _radius.set(this, v);
  }
  }

  const c = new Circle(10);

8. Class inheritance

class Shape {
  constructor(color){
    this.color= color
  }

  move() {
    console.log('move');
  }
}

class Circle extends Shape {
  constructor(color,radius){
    super(color)
    this.radius = radius
  }

  draw() {
    console.log('draw');
  }
}

const c = new Circle('red',10);

9. method overriding

class Shape{
  draw(){
    console.log('draw')
  }
}

class Circle extends Shape{
  draw(){
    console.log('draw Circle')

    super.draw() //calling super class methods
  }

}


eg.

const _stack = new WeakMap();

class Stack {
  constructor() {
    _stack.set(this, new Array());
  }

  get count() {
    return _stack.get(this).length;
  }

  push(v) {
    _stack.get(this).push(v);
  }

  pop() {
    if (_stack.get.length === 0) throw new Error('stack is empty');
    _stack.get(this).pop();
  }

  peek() {
    if (_stack.get.length === 0) throw new Error('stack is empty');

    const len = _stack.get(this).length;
    return _stack.get(this)[len - 1];
  }
}

const s = new Stack();
```

 ## TypeScript basics
```typescript
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
```