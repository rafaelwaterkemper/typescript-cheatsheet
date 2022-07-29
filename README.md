# CheatSheet Typescript 2022

Structural Typing
--
Extra info is ok. The problem is missing some information, and not if are some extra information.

public/private/protected
--
Those are access modifiers like Java;

private vs # (private notation)
--
The private keyword will be used just at compile time, while # will apply to not allow
the user access this propert at runtime. (ES2015 or higher support # prefix)

Any vs Unknow
--
When using any the compiler will not make any check how we are using the variable and your sub properties;
WIth Unknow we are able to use with specific type features if we apply a typeof equals for that type;
E.g:

        exampleUnknow: unknow;
        if (typeof exampleUnknow == 'string') {
            exampleUknow.trim();
        }

Type declarations
--
We can declare a new type at the source file, or as a "*.d.ts" file:

Code to declare a new type:
    declare const process: any;
    file for definitions: env.d.ts

ReadOnly
--
Is a compile time feature, not add any javascript support;
We can just assign a value in the instance creation;
    
Union Types
--
We can define a type to allow multiple type of values, like:

    type Text = string | string[]

Literal Types
--
We can define a set of allowed values for a variable, or define
a specific type:

    let directions: 'north' | 'south'
    type Direction = 'north'| 'south'

Type Narrowing
--
When we define a super type can be onw of two types,
we can use instanceOf to infer which type should be matched.
    
    type Square = {
        size: number;
    }

    type Rectangle = {
        width: number;
        height: number;
    }
    
    type Shape = 
        | Square
        | Rectangle

    if (shape instanceOf Square) {
        //do square operation
    }

    if (shape instanceOf Rectangle) {
        //do rectangle operation
    }

if the parameters was passed as a literal object, we can use the
in keyword to infer the type


    if ('size' in shape) {
        //do square operation
    }

    if ('width' in shape) {
        //do rectangle operation
    }

Discriminated Unions
--
Used to discriminate which type for a union type using a literal property when they have the same properties;
        type Square = {
            kind: 'square';
            size: number;
        }

        type Rectangle = {
            kind: 'rectangle';
            size: number;
        }

        if (shape.kind === 'square') { //do square operation}

Class parameters properties
--
We can define properties adding modifier access in the constructor property definition:

    class Car {
        constructor() {
            public engine: Engine,
            public maxSpeed: number;
        }
    }

Intersection Types
--
We can inherit definitions from another type by using it;

    type Person = {
        name: string;
    }

    type Email = {
        address: string;
    }

    type Contact = 
        & Person
        & Email
    
The contact type will have the name and address properties;

Optional members;
--
Turn the propertie nod obligatory;
The typescript will add undefined as an option value for the propertie;
When we access a optional property that wasn't initialized, the undefined value will be returned;

    type Person {
        name: string;
        age?: number;
    }

Non Null assertion
--
We can say to compiler the value will not be null at that point of code:
To make it we need to add "!" caracter on our object.
E.g:

    point!.x

We can also use it on the final propertie:
    
    point.x! - will assure x will not be null

Interfaces
--
The are used to define structures like types;

    interface Shape {
        size: number;
        type: string;
    }

We can use extensions by using to inherit properties;

    interface Square extends Shape {
        sides: 4;
    }

Using interfaces we can also using interface merging. When we define the interface twice, the properties will be merged. The example below
will make the interface Shape has the "size" and "type" propeties.

    interface Shape {
        size: number;
    }

    interface Shape {
        type: string;
    }

To create a short hand function, a union type and types from primitive types, we must use "type".

Never
--
We can use the never type to specify a value won't be returned from that... it can be a function throwing an exception or a while true.

We can also use it to forces some function handle all cases for a union type, like:

    type Square = {
        kind: 'square';
        size: number;
    }

    type Rectangle = {
        kind: 'rectangle';
        width: number;
        height: number;
    }
    
    type Shape = 
        | Square
        | Rectangle

    function area(s: Shape) {
        if (s.kind === 'square') {
            return s.size * s.size;
        } else if (s.kind === 'rectangle') {
            return s.width * s.height;
        }

        //this declaration will raise an error if we miss to
        //handle some kind of shape. Now if we add a Circle to the union Shape, we must handle it 
        in the function
        const _ensureAllCasesAreHandled: never = s;

        return _ensureAllCasesAreHandled;
    }

Definite Assignment Assertion
--
To tell to compiler the value will not be null at any time, we can use the exclamation (!) in the property declaration.

    let dice!: number;

    class Point {
        x!: number;
        y!: number;

        constructor() {
            this.moveRandom();
        }

        moveRandom() {
            this.x = Math.random();
            this.y = Math.random();
        }
    }

Type Guards
--
We can define functions instead of using (in) to return the type of the object:

    function isSquare(shape: Shape) shape is Square {
        return 'size' in shape;
    }

    function isRectangle(shape: Shape) shape is Rectangle {
        return 'width' in shape;
    }

ReadOnly Arrays and tuples
--
We can make arrays and tuples immutable by adding readonly in the front of parameter. We can also use it on type definition;
    
    function move(arr: readonly number[]) {
        //any mutate operation will be blocked
    }

    type Neat = readolny number[];
    type Long = ReadonlyArray<number>;

Const Assertion
--
    To turn objects immutable we can use readolny in the properties, but as an alternative we can use { object definition} as const;
    const rafa = {
        name: 'rafa',
        age: 26
    } as const;

We can also define a property as a const to be used as a literal value:

    function layout(settings: {
       align: 'left' | 'center' | 'right',
       padding: number
    }) {}

    const example = {
        align: 'left' as const, //should use it to be interpreted as literal type
        padding: 0
    }

this parameter
--
To assure the value exists in the this context during function execution, we can use this parameter specifying the this propert and the properties required;

    function double(this: {value: number}) {
        this.value = this.value * 2;
    }

    const valid = {
        value: 10,
        double,
    }

    valid.double(); //works

    const valid = {
        valve: 10, //error typing
        double,
    }
    
    valid.double(); //will not compile

typeof type
--
We can use typeof to alias a type from a object or from a json.

    const center = {
        x: 0,
        y: 0,
        z: 0,
    }

Can be defined a new type

    type Point = typeof center;

or use on type declaration

    const unit: typeof center = {
        x: center.x + 1,
        y: center.y + 1,
        z: center.z + 1,
    }

Lookup types
--
Using lookup we can get structure from part of other types

    type Person = {
        name: string,
        age: number,
        address: {
            street: string,
            number: number
        }
    }

    type AddressType = Person['address']
    type EmailsType = Person['emails'][0] //Get just the structure from array

Keyof
--
It returns a string union from properties of a type;

    type Person = {
        name: string,
        age: number,
        location: string,
    }

    type KeysPerson = keyof Person

    //the function accepts only key parameters from the list of keys
    //KeysPerson
    function logGet(obj: Person, key: KeysPerson){}

    //Generalize function relative to the Obj used
    function logGet<Obj, Key extends keyof Obj>(obj: Obj, key: key) {
        const value = obj[key];
        return value;
    }

    //In this way the typescript will check the keys and the type for value
    function logSet<Obj, Key extends keyof Obj>(obj: Obj, key: key, value: Obj[Key]) {
        obj[key] = value;
    }

infer keyword
--
We can use infer to return the type of a variable in conditional types.
E.g:

    type UnboxArray<T> =
        T extends Array<infer Member>
        ? Member
        : T;

    function createPerson(firsName: string, lastName: string) {
        return {
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`
        }
    }

    type ReturnType<T> =
        T extends (...args: any) => infer R
        ? R
        : never;
    
    type Person = ReturnType<typeof createPerson>;

Mapped type
--
Generate new type from the other types;

    export type Mapped<T> = {
        [P in keyof T]: T[P]
    }

    [P in keyof T]?: T[P]//We can turn every propertie optional
    //using - (minus) will remove optional from properties that are optional

The builtin Readonly<T> is a mapped type to freeze change the properties to readonly;

Template Literal Type
--
We can use it to define a string with a parameter from specific type:
E.g:

    type Example = `Example: ${string}`; //passing string type

    type Size = 'small' | 'medium' | 'large';
    type Color = 'primary' | 'secondary';
    type Style = `${Size}-${Color}`;

Will restrict the types of CSSValue accept just number and number + (px, em or rem).

    type CSSValue =
        | number
        | `${number}px`
        | `${number}em`
        | `${number}rem`

    function size(input: CSSValue) {
        return typeof input == 'number' ? input + px: input;
    }

Partial<T>
--
Make all properties optional.

Required<T>
--
Make all properties in T required; Removed optional option for all properties using it.

Readonly<T>
--
Turn all properties readonly. The value can just be set on instanciation;

Record<Keys, Type>
--
Define a structure for a type, where the key should respect the type used as "Keys" and the data should respect the type used for "Type".

undefined vs optional
--
When we define an element as optional, it shouldn't be specified in the object, but if we define a property with (string | undefined) the property must be specified either as "string" or undefined.
